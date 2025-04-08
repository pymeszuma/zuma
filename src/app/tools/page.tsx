import type React from 'react';
import { ContentLayout } from '@/components/panel/content-layout';
import { ContainerToolCards } from '@/feature/tools/components/container-tool-cards';

export default function ToolsPage() {
  return (
    <ContentLayout title='Tools' className='px-8 py-2'>
      <div className='container mx-auto py-10'>
        <div className='flex flex-col items-start mb-10'>
          <h1 className='text-3xl font-bold tracking-tight'>Herramientas</h1>
          <p className='text-muted-foreground mt-2'>
            Selecciona la herramienta de tu interés
          </p>
        </div>
        <ContainerToolCards />
      </div>
    </ContentLayout>
  );
}

