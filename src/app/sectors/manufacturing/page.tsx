'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import SelectForm from '@/feature/sectors/components/form-selector';
import { sectorForms } from '@/feature/sectors/constants';

export default function ManufacturingPage() {
  return (
    <ContentLayout
      title={sectorForms.industrialManufacturero.sectorTitle}
      className='px-8 py-2'
    >
      <SelectForm
        surveyTitle={sectorForms.industrialManufacturero.surveyTitle}
        surveySubtitle={sectorForms.industrialManufacturero.surveySubtitle}
        options={sectorForms.industrialManufacturero.options}
      />
    </ContentLayout>
  );
}
