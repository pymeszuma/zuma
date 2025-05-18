'use client';

import type React from 'react';

import { useEffect } from 'react';
import { ZumaFormDialog } from '@/components/pymes/zuma-form-dialog';
import { ZumaProvider } from '@/providers/zuma-context';

export function PymesMiddleware({ children }: { children: React.ReactNode }) {
  // Add the ZUMA logo to the public folder
  useEffect(() => {
    // This is just to ensure the component mounts properly
    // The actual check is done in the ZumaProvider
  }, []);

  return (
    <ZumaProvider>
      <ZumaFormDialog />
      {children}
    </ZumaProvider>
  );
}
