'use client';

import { useState } from 'react';
import { Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

export function FloatingManualButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className='fixed top-6 right-6 z-50 flex items-center gap-2 rounded-full shadow-lg cursor-pointer'
      >
        <Book className='h-4 w-4' />
        <span>Manual de Usuario</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-[90vw] w-full h-[90vh] p-0 flex flex-col'>
          <DialogHeader className='px-6 pt-6 pb-2 border-b'>
            <DialogTitle className='text-xl'>Manual de Usuario</DialogTitle>
          </DialogHeader>
          <div className='flex-1 w-full h-full'>
            <iframe
              src='/manual.pdf'
              className='w-full h-full border-0'
              title='Manual de Usuario'
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
