'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import { SurveyCard } from '@/feature/sectors/components/survey-card';
import questions from '@/feature/sectors/data/sector-6-mitigacion.json' assert { type: 'json' };

export default function ServicesMitigationPage() {
  return (
    <ContentLayout
      title='Mitigación en el Sector de Servicios y Comercio'
      className='px-8 py-2'
    >
      <SurveyCard
        questions={questions}
        title='Encuesta de Mitigación'
        description='Evalúa las acciones de tu empresa para reducir emisiones y contribuir a la acción climática.'
        onSubmit={(answers, score) =>
          console.log('Resultados:', answers, score)
        }
      />
    </ContentLayout>
  );
}
