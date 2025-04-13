'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import { SurveyCard } from '@/feature/sectors/components/survey-card';
import questions from '@/feature/sectors/data/sector-2-mitigacion.json' assert { type: 'json' };

export default function TransportationAdaptabilityPage() {
  return (
    <ContentLayout
      title='Transportation Mitigation Survey'
      className='px-8 py-2'
    >
      <SurveyCard
        questions={questions}
        title='Encuesta de Mitigación'
        description='Evalúa tu nivel de mitigación a medidas de transporte.'
        onSubmit={(answers, score) =>
          console.log('Resultados:', answers, score)
        }
      />
    </ContentLayout>
  );
}
