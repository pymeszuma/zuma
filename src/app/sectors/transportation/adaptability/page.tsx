'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import { SurveyCard } from '@/feature/sectors/components/survey-card';
import questions from '@/feature/sectors/data/sector-2-adaptabilidad.json' assert { type: 'json' };

export default function TransportationAdaptabilityPage() {
  return (
    <ContentLayout
      title='Transportation Adaptability Survey'
      className='px-8 py-2'
    >
      <SurveyCard
        questions={questions}
        title='Encuesta de Adaptabilidad'
        description='Evalúa tu nivel de adaptación a medidas de transporte.'
        onSubmit={(answers, score) =>
          console.log('Resultados:', answers, score)
        }
      />
    </ContentLayout>
  );
}
