'use client';

import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useZuma } from '@/components/theme/zuma-context';
import { CheckCircle2 } from 'lucide-react';

export function OnboardingCompleteAlert() {
  const { isOnboarded, formData } = useZuma();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if this is a newly onboarded user
    const isNewlyOnboarded = localStorage.getItem('ZUMA_NEWLY_ONBOARDED');

    if (isOnboarded && isNewlyOnboarded === 'true' && formData?.nombreEmpresa) {
      setShowWelcome(true);
      // Clear the flag so it only shows once
      localStorage.removeItem('ZUMA_NEWLY_ONBOARDED');
    }
  }, [isOnboarded, formData]);

  if (!showWelcome) {
    return null;
  }

  return (
    <Alert className='mb-6 bg-green-50 border-green-200'>
      <CheckCircle2 className='h-5 w-5 text-green-600' />
      <AlertTitle className='text-green-800'>
        ¡Bienvenido a ZUMA, {formData?.nombreEmpresa}!
      </AlertTitle>
      <AlertDescription className='text-green-700'>
        Gracias por completar la información de su empresa. Ahora puede explorar
        todas las herramientas y recursos disponibles para mejorar la
        sostenibilidad de su PyME.
      </AlertDescription>
    </Alert>
  );
}
