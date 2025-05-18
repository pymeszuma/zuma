'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import { SurveyCard } from '@/feature/sectors/components/survey-card';
import questions from '@/feature/sectors/data/sector-1-mitigacion.json' assert { type: 'json' };
import { useCreateSurveyResponse } from '@/feature/sectors/api/use-create-survey-response';
import { useGetSurveyResponses } from '@/feature/sectors/api/use-get-survey-responses';

export default function EnergyMiningMitigationPage() {
  const createSurveyResponse = useCreateSurveyResponse(1, 'mitigacion');
  const { data: surveyData, isLoading } = useGetSurveyResponses(
    1,
    'mitigacion'
  );

  return (
    <ContentLayout
      title='Energy Mining Mitigation Survey'
      className='px-8 py-2'
    >
      <SurveyCard
        questions={questions}
        title='Encuesta de Mitigación'
        description='Evalúa tu nivel de mitigación a medidas energéticas.'
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
