import type React from 'react';
import { ContentLayout } from '@/components/panel/content-layout';
import { SurveyForm } from '@/components/survey/form';

export default function SectorsPage() {
  return (
    <ContentLayout title='Survey' className='px-8 py-2'>
      <SurveyForm />
    </ContentLayout>
  );
}
