'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import { SurveyCard } from '@/feature/sectors/components/survey-card';
import questions from '@/feature/sectors/data/sector-5-adaptacion.json' assert { type: 'json' };

export default function AgricultureAdaptabilityPage() {
  return (
    <ContentLayout
      title='Adaptación en el Sector Agropecuario y Forestal'
      className='px-8 py-2'
    >
      <SurveyCard
        questions={questions}
        title='Encuesta de Adaptación'
        description='Evalúa la preparación de tu empresa agropecuaria o forestal ante los efectos del cambio climático.'
        onSubmit={(answers, score) =>
          console.log('Resultados:', answers, score)
        }
      />
    </ContentLayout>
  );
}
