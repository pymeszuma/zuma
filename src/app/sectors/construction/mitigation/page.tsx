'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import { SurveyCard } from '@/feature/sectors/components/survey-card';
import questions from '@/feature/sectors/data/sector-3-mitigacion.json' assert { type: 'json' };
import { useCreateSurveyResponse } from '@/feature/sectors/api/use-create-survey-response';
import { useGetSurveyResponses } from '@/feature/sectors/api/use-get-survey-responses';

export default function ConstructionMitigationPage() {
  const createSurveyResponse = useCreateSurveyResponse(3, 'mitigacion');
  const { data: surveyData, isLoading } = useGetSurveyResponses(
    3,
    'mitigacion'
  );

  return (
    <ContentLayout title='Construction Mitigation Survey' className='px-8 py-2'>
      <SurveyCard
        questions={questions}
        title='Encuesta de Mitigación'
        description='Evalúa tu nivel de mitigación en prácticas de construcción sostenible.'
        onSubmit={(answers, score) => {
          createSurveyResponse.mutate({ answers, questions, score });
        }}
        preloadedAnswers={surveyData?.answers}
        preloadedScore={surveyData?.score}
        hasSubmitted={surveyData?.hasSubmitted}
        isLoading={isLoading}
      />
    </ContentLayout>
  );
}
