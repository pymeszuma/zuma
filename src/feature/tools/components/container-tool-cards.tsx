'use client';

import { Factory, Leaf } from 'lucide-react';
import { ToolCard } from '@/feature/tools/components/tool-card';

export const ContainerToolCards = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <ToolCard
        title='Materialidad'
        description='Análisis de materialidad para identificar impactos ambientales significativos'
        icon={<Leaf className='h-10 w-10' />}
        href='/tools/materiality'
      />
      <ToolCard
        title='Estimación GEI'
        description='Estimación de Gases de Efecto Invernadero según estándares internacionales'
        icon={<Factory className='h-10 w-10' />}
        href='/tools/gei-estimation'
      />
    </div>
  );
};
