'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import { SurveyCard } from '@/feature/sectors/components/survey-card';
import questions from '@/feature/sectors/data/sector-5-mitigacion.json' assert { type: 'json' };

export default function AgricultureMitigationPage() {
  return (
    <ContentLayout
      title='Mitigación en el Sector Agropecuario y Forestal'
      className='px-8 py-2'
    >
      <SurveyCard
        questions={questions}
        title='Encuesta de Mitigación'
        description='Evalúa las acciones de mitigación de gases de efecto invernadero en tu empresa agropecuaria o forestal.'
        onSubmit={(answers, score) =>
          console.log('Resultados:', answers, score)
        }
      />
    </ContentLayout>
  );
}
