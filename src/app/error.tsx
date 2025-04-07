'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { ContentLayout } from '@/components/panel/content-layout';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error tracking service
    console.error(error);
  }, [error]);

  return (
    <ContentLayout title='Error'>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <AlertCircle className='h-16 w-16 text-destructive mb-4' />
        <h1 className='text-4xl font-bold mb-2'>Oops, algo salió mal</h1>
        <p className='text-xl text-muted-foreground mb-4'>
          {error.message || 'Se ha producido un error inesperado.'}
        </p>
        <Button onClick={reset} variant='outline' size='lg'>
          Volver a intentar
        </Button>
      </div>
    </ContentLayout>
  );
}
