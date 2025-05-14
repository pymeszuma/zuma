'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import SelectForm from '@/feature/sectors/components/form-selector';
import { sectorForms } from '@/feature/sectors/constants';

export default function AgriculturePage() {
  return (
    <ContentLayout
      title={sectorForms.agropecuarioForestal.sectorTitle}
      className='px-8 py-2'
    >
      <SelectForm
        surveyTitle={sectorForms.agropecuarioForestal.surveyTitle}
        surveySubtitle={sectorForms.agropecuarioForestal.surveySubtitle}
        options={sectorForms.agropecuarioForestal.options}
      />
    </ContentLayout>
  );
}
