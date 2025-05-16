'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import SelectForm from '@/feature/sectors/components/form-selector';
import { sectorForms } from '@/feature/sectors/constants';

export default function ServicesPage() {
  return (
    <ContentLayout
      title={sectorForms.serviciosComercio.sectorTitle}
      className='px-8 py-2'
    >
      <SelectForm
        surveyTitle={sectorForms.serviciosComercio.surveyTitle}
        surveySubtitle={sectorForms.serviciosComercio.surveySubtitle}
        options={sectorForms.serviciosComercio.options}
      />
    </ContentLayout>
  );
}
