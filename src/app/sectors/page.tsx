import type React from 'react';
import { ContentLayout } from '@/components/panel/content-layout';
import { ContainerSectorCards } from '@/feature/sectors/components/container-sector-cards';

export default function SectorsPage() {
  return (
    <ContentLayout title='Sectores' className='px-8 py-2'>
      <div className='container mx-auto py-10'>
        <div className='flex flex-col items-start mb-10'>
          <h1 className='text-3xl font-bold tracking-tight'>Sectores</h1>
          <p className='text-muted-foreground mt-2'>
            Selecciona el sector de tu empresa para calcular su huella de
            carbono
          </p>
        </div>

        <ContainerSectorCards />
      </div>
    </ContentLayout>
  );
}
