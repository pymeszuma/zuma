'use client';

import { ContentLayout } from '@/components/panel/content-layout';
import { EmissionCalculator } from '@/feature/tools/components/emission-calculator';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GEIEstimationPage() {
  return (
    <ContentLayout title='Estimation GEI' className='px-4 sm:px-8 py-4'>
      <div className='relative mb-8'>
        {/* Transparent Button at Top-Right */}
        <Button
          asChild
          variant='ghost'
          className='absolute top-2 right-2 sm:top-0 sm:right-0 flex items-center gap-2 text-xs sm:text-sm font-medium'
        >
          <Link href='/tools/gei-estimation/references'>
            <BookOpen className='h-4 w-4' />
            <span className='hidden sm:inline'>Referencias y Metodología</span>
          </Link>
        </Button>

        {/* Centered Title */}
        <h1 className='text-2xl sm:text-3xl font-bold text-center pt-13 sm:pt-12'>
          Calculadora de Huella de Carbono
        </h1>
      </div>

      <p className='text-center mb-8 max-w-xl sm:max-w-3xl mx-auto text-gray-500 sm:text-gray-400 italic text-xs sm:text-sm'>
        Basado en la metodología ISO 14064-1 y el GHG Protocol para el cálculo
        de emisiones de gases de efecto invernadero (GEI)
      </p>
      <EmissionCalculator />
    </ContentLayout>
  );
}
