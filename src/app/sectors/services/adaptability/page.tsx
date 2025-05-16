'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import { SurveyCard } from '@/feature/sectors/components/survey-card';
import questions from '@/feature/sectors/data/sector-6-adaptacion.json' assert { type: 'json' };

export default function ServicesAdaptabilityPage() {
  return (
    <ContentLayout
      title='Adaptación en el Sector de Servicios y Comercio'
      className='px-8 py-2'
    >
      <SurveyCard
        questions={questions}
        title='Encuesta de Adaptación'
        description='Evalúa la preparación de tu empresa ante los efectos del cambio climático.'
        onSubmit={(answers, score) =>
          console.log('Resultados:', answers, score)
        }
      />
    </ContentLayout>
  );
}
