'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import { SurveyCard } from '@/feature/sectors/components/survey-card';
import questions from '@/feature/sectors/data/sector-4-mitigacion.json' assert { type: 'json' };
import { useCreateSurveyResponse } from '@/feature/sectors/api/use-create-survey-response';

export default function ManufacturingMitigationPage() {
  const createSurveyResponse = useCreateSurveyResponse(4, 'mitigacion');

  return (
    <ContentLayout
      title='Manufacturing Mitigation Survey'
      className='px-8 py-2'
    >
      <SurveyCard
        questions={questions}
        title='Encuesta de Mitigación'
        description='Evalúa tu nivel de mitigación en procesos industriales y manufactura.'
        onSubmit={(answers, score) => {
          createSurveyResponse.mutate({ answers, questions, score });
        }}
      />
    </ContentLayout>
  );
}
