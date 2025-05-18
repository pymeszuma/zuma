import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';

export const useGetAllSurveyQuestions = (question?: string) => {
  const query = useQuery({
    queryKey: ['surveyQuestions', question],
    queryFn: async () => {
      const response = await client.api['survey-questions'].$get({
        query: {
          question
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener las preguntas de la encuesta');
      }

      const { data } = await response.json();

      return data;
    }
  });

  return query;
};
