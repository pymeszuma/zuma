'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import SelectForm from '@/feature/sectors/components/form-selector';
import { sectorForms } from '@/feature/sectors/constants';

export default function EnergyMiningPage() {
  return (
    <ContentLayout
      title={sectorForms.transporteLogistica.sectorTitle}
      className='px-8 py-2'
    >
      <SelectForm
        surveyTitle={sectorForms.transporteLogistica.surveyTitle}
        surveySubtitle={sectorForms.transporteLogistica.surveySubtitle}
        options={sectorForms.transporteLogistica.options}
      />
    </ContentLayout>
  );
}
