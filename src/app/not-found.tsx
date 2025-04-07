// This page renders when a route like `/unknown.txt` is requested.
// an invalid value or param and calls `notFound()`.

import NotFoundPage from '@/components/common/not-found-page';

export default function GlobalNotFound() {
  return <NotFoundPage />;
}
