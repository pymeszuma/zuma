'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface FloatingBubbleProps {
  iframeUrl: string;
  dialogTitle?: string;
}

export function FloatingBubble({
  iframeUrl,
  dialogTitle = 'External Content'
}: FloatingBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBubbleVisible, setIsBubbleVisible] = useState(true);

  // Add keyboard shortcut to toggle bubble visibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+B to toggle bubble visibility
      if (e.altKey && e.key === 'b') {
        setIsBubbleVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Floating Bubble */}
      {isBubbleVisible ? (
        <div className='fixed bottom-6 left-6 z-50 group'>
          <Button
            onClick={() => setIsOpen(true)}
            className='rounded-full w-14 h-14 shadow-lg flex items-center justify-center p-0 cursor-pointer'
            aria-label='Open dialog'
          >
            <MessageCircle className='h-6 w-6' />
          </Button>
          <Button
            onClick={() => setIsBubbleVisible(false)}
            className='absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-destructive hover:bg-destructive/90 opacity-0 group-hover:opacity-100 transition-opacity'
            aria-label='Hide bubble'
          >
            <X className='h-3 w-3' />
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => setIsBubbleVisible(true)}
          className='fixed bottom-2 left-2 h-6 w-6 rounded-full p-0 bg-muted opacity-50 hover:opacity-100 transition-opacity z-50'
          aria-label='Show bubble'
        >
          <MessageCircle className='h-3 w-3' />
        </Button>
      )}

      {/* Dialog with iframe */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='sm:max-w-[800px] max-h-[95vh] flex flex-col p-0'>
          <DialogHeader className='flex flex-row items-center justify-between p-4 border-b'>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <div className='h-[90vh] rounded-b-md overflow-hidden'>
            <iframe
              src={iframeUrl}
              className='w-full h-full'
              title={dialogTitle}
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
