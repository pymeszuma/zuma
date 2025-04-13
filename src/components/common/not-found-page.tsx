'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-background text-foreground w-full'>
      <h1 className='text-9xl font-extrabold mb-4'>404</h1>
      <p className='text-xl mb-8 text-muted-foreground'>Página no encontrada</p>
      <Button asChild variant='outline' size='lg'>
        <Link href='/'>Volver a la página de inicio</Link>
      </Button>
    </div>
  );
}
