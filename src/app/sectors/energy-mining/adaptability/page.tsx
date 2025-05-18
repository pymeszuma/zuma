'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import { SurveyCard } from '@/feature/sectors/components/survey-card';
import questions from '@/feature/sectors/data/sector-1-adaptacion.json' assert { type: 'json' };
import { useCreateSurveyResponse } from '@/feature/sectors/api/use-create-survey-response';

export default function EnergyMiningAdaptabilityPage() {
  const createSurveyResponse = useCreateSurveyResponse(1, 'adaptacion');

  return (
    <ContentLayout
      title='Energy Mining Adaptability Survey'
      className='px-8 py-2'
    >
      <SurveyCard
        questions={questions}
        title='Encuesta de Adaptación'
        description='Evalúa tu nivel de adaptación a medidas energéticas.'
        onSubmit={(answers, score) => {
          createSurveyResponse.mutate({ answers, questions, score });
        }}
      />
    </ContentLayout>
  );
}
