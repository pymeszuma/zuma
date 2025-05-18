import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { Answer } from '@/feature/sectors/types';

// Get company data and ID from local storage
function getCompanyDataFromStorage() {
  if (typeof window === 'undefined') return null;

  // Try to get company data from storage
  const companyData = localStorage.getItem('ZUMA_COMPANY_DATA');
  if (companyData) {
    try {
      const parsedData = JSON.parse(companyData);

      if (parsedData.id) {
        const id = parseInt(parsedData.id);
        if (!isNaN(id) && id > 0) {
          return { id, data: parsedData };
        }
      }
    } catch (error) {
      console.error('Error parsing company data from localStorage:', error);
    }
  }

  return null;
}

// Convert database enum value to UI value
function mapDbValueToAnswerValue(
  value: 'si' | 'no' | 'no_aplica' | 'en_proceso'
): string {
  const valueMap: Record<string, string> = {
    si: 'Si',
    no: 'No',
    no_aplica: 'No Aplica',
    en_proceso: 'En proceso'
  };
  return valueMap[value] || 'No';
}

export function useGetSurveyResponses(
  sectorId: number,
  surveyType: 'adaptacion' | 'mitigacion'
) {
  const companyInfo = getCompanyDataFromStorage();
  const companyId = companyInfo?.id;

  return useQuery({
    queryKey: ['surveyResponses', sectorId, surveyType, companyId],
    queryFn: async () => {
      if (!companyId) {
        return { answers: [], score: 0, hasSubmitted: false };
      }

      try {
        // 1. First, get the latest survey response header for this company, sector, and survey type
        const headerResponse = await client.api['survey-response-headers'][
          '$get'
        ]({
          query: {
            companyId: companyId.toString(),
            sectorId: sectorId.toString(),
            surveyType
          }
        });

        if (!headerResponse.ok) {
          throw new Error('Failed to fetch survey response headers');
        }

        const headerResult = await headerResponse.json();

        // If no headers found, return empty result
        if (!headerResult.data || headerResult.data.length === 0) {
          return { answers: [], score: 0, hasSubmitted: false };
        }

        // Get the most recent header (should be sorted by server, but let's make sure)
        const headers = headerResult.data;
        const latestHeader = headers.sort((a: any, b: any) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        })[0];

        // Extract score from notes (format is "Score: X")
        let score = 0;
        if (latestHeader.notes) {
          const scoreMatch = latestHeader.notes.match(/Score: (\d+)/);
          if (scoreMatch && scoreMatch[1]) {
            score = parseInt(scoreMatch[1], 10);
          }
        }

        // 2. Get the response items for this header
        const itemsResponse = await client.api['survey-response-items']['$get'](
          {
            query: {
              headerId: latestHeader.id.toString()
            }
          }
        );

        if (!itemsResponse.ok) {
          throw new Error('Failed to fetch survey response items');
        }

        const itemsResult = await itemsResponse.json();

        if (!itemsResult.data) {
          return { answers: [], score, hasSubmitted: true };
        }

        // 3. For each item, get the question details to map back to action IDs
        const answers: Answer[] = [];

        // We need to fetch all questions to map DB question IDs back to action IDs
        const questionsResponse = await client.api['survey-questions']['$get']({
          query: {}
        });

        if (!questionsResponse.ok) {
          throw new Error('Failed to fetch survey questions');
        }

        const questionsResult = await questionsResponse.json();
        const questions = questionsResult.data || [];

        // Create a map of question ID to action ID
        const questionIdToActionId = new Map();
        questions.forEach((q: any) => {
          if (q.id && q.actionId) {
            questionIdToActionId.set(q.id, q.actionId);
          }
        });

        // Map response items to answers
        itemsResult.data.forEach((item: any) => {
          const actionId = questionIdToActionId.get(item.questionId);
          if (actionId) {
            const question = questions.find(
              (q: any) => q.id === item.questionId
            );
            answers.push({
              questionId: actionId,
              question: question?.question || '',
              value: mapDbValueToAnswerValue(item.value)
            });
          }
        });

        return {
          answers,
          score,
          hasSubmitted: true
        };
      } catch (error) {
        console.error('Error fetching survey responses:', error);
        return { answers: [], score: 0, hasSubmitted: false };
      }
    },
    enabled: !!companyId
  });
}
