'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import SelectForm from '@/feature/sectors/components/form-selector';
import { sectorForms } from '@/feature/sectors/constants';

export default function EnergyMiningPage() {
  return (
    <ContentLayout
      title={sectorForms.energiaMineria.sectorTitle}
      className='px-8 py-2'
    >
      <SelectForm
        surveyTitle={sectorForms.energiaMineria.surveyTitle}
        surveySubtitle={sectorForms.energiaMineria.surveySubtitle}
        options={sectorForms.energiaMineria.options}
      />
    </ContentLayout>
  );
}
