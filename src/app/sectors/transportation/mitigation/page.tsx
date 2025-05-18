'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import { SurveyCard } from '@/feature/sectors/components/survey-card';
import questions from '@/feature/sectors/data/sector-2-mitigacion.json' assert { type: 'json' };
import { useCreateSurveyResponse } from '@/feature/sectors/api/use-create-survey-response';

export default function TransportationAdaptabilityPage() {
  const createSurveyResponse = useCreateSurveyResponse(2, 'mitigacion');

  return (
    <ContentLayout
      title='Transportation Mitigation Survey'
      className='px-8 py-2'
    >
      <SurveyCard
        questions={questions}
        title='Encuesta de Mitigación'
        description='Evalúa tu nivel de mitigación a medidas de transporte.'
        onSubmit={(answers, score) => {
          createSurveyResponse.mutate({ answers, questions, score });
        }}
      />
    </ContentLayout>
  );
}
