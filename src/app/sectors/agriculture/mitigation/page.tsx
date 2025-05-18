'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import { SurveyCard } from '@/feature/sectors/components/survey-card';
import questions from '@/feature/sectors/data/sector-5-mitigacion.json' assert { type: 'json' };
import { useCreateSurveyResponse } from '@/feature/sectors/api/use-create-survey-response';
import { useGetSurveyResponses } from '@/feature/sectors/api/use-get-survey-responses';

export default function AgricultureMitigationPage() {
  const createSurveyResponse = useCreateSurveyResponse(5, 'mitigacion');
  const { data: surveyData, isLoading } = useGetSurveyResponses(
    5,
    'mitigacion'
  );

  return (
    <ContentLayout
      title='Mitigación en el Sector Agropecuario y Forestal'
      className='px-8 py-2'
    >
      <SurveyCard
        questions={questions}
        title='Encuesta de Mitigación'
        description='Evalúa las acciones de mitigación de gases de efecto invernadero en tu empresa agropecuaria o forestal.'
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
