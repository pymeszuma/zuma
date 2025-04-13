// This page renders when a route like `/unknown.txt` is requested.
// an invalid value or param and calls `notFound()`.

import NotFoundPage from '@/components/common/not-found-page';
import { ContentLayout } from '@/components/panel/content-layout';

export default function GlobalNotFound() {
  return (
    <ContentLayout title='Error' className='px-8 py-2'>
      <NotFoundPage />
    </ContentLayout>
  );
}
