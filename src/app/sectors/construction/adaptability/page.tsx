'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import { SurveyCard } from '@/feature/sectors/components/survey-card';
import questions from '@/feature/sectors/data/sector-3-adaptacion.json' assert { type: 'json' };
import { useCreateSurveyResponse } from '@/feature/sectors/api/use-create-survey-response';
import { useGetSurveyResponses } from '@/feature/sectors/api/use-get-survey-responses';

export default function ConstructionAdaptabilityPage() {
  const createSurveyResponse = useCreateSurveyResponse(3, 'adaptacion');
  const { data: surveyData, isLoading } = useGetSurveyResponses(
    3,
    'adaptacion'
  );

  return (
    <ContentLayout
      title='Construction Adaptability Survey'
      className='px-8 py-2'
    >
      <SurveyCard
        questions={questions}
        title='Encuesta de Adaptación'
        description='Evalúa tu nivel de adaptación a medidas de construcción.'
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
