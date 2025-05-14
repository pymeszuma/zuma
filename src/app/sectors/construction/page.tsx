'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import SelectForm from '@/feature/sectors/components/form-selector';
import { sectorForms } from '@/feature/sectors/constants';

export default function ConstructionPage() {
  return (
    <ContentLayout
      title={sectorForms.construccionInfraestructura.sectorTitle}
      className='px-8 py-2'
    >
      <SelectForm
        surveyTitle={sectorForms.construccionInfraestructura.surveyTitle}
        surveySubtitle={sectorForms.construccionInfraestructura.surveySubtitle}
        options={sectorForms.construccionInfraestructura.options}
      />
    </ContentLayout>
  );
}
