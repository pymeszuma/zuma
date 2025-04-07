'use client';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  const { open, isMobile } = useSidebar();
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center min-h-screen  w-[calc(100vw-17rem)]',
        'mt-16 h-[calc(100vh)] p-2',
        isMobile && 'w-[calc(100vw-1rem)]',
        open && !isMobile && 'w-[calc(100vw-17rem)]',
        !open && !isMobile && 'w-[calc(100vw-1rem)]'
      )}
    >
      <Loader2 className='h-16 w-16 animate-spin text-primary' />
      <p className='mt-4 text-lg text-muted-foreground'>Cargando...</p>
    </div>
  );
}
