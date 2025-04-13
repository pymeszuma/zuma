'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import { SurveyCard } from '@/feature/sectors/components/survey-card';
import questions from '@/feature/sectors/data/sector-1-mitigacion.json' assert { type: 'json' };

export default function EnergyMiningMitigationPage() {
  return (
    <ContentLayout
      title='Energy Mining Mitigation Survey'
      className='px-8 py-2'
    >
      <SurveyCard
        questions={questions}
        title='Encuesta de Mitigación'
        description='Evalúa tu nivel de mitigación a medidas energéticas.'
        onSubmit={(answers, score) =>
          console.log('Resultados:', answers, score)
        }
      />
    </ContentLayout>
  );
}
