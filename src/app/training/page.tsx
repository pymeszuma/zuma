import { FileText } from 'lucide-react';
import { ContentLayout } from '@/components/panel/content-layout';
import { TrainingCard } from '@/feature/training/components/training-card';

export default function TrainingPage() {
  return (
    <ContentLayout title='Training' className='px-8 py-2'>
      <div className='container mx-auto py-10'>
        <div className='flex flex-col items-start mb-10'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Módulos de Capacitación
          </h1>
          <p className='text-muted-foreground mt-2'>
            Aprende sobre sostenibilidad empresarial y cómo implementarla en tu
            PyME.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <TrainingCard
            title='Fundamentos de Sostenibilidad Empresarial'
            description='Aprende los conceptos básicos de sostenibilidad empresarial y su importancia'
            icon={<FileText className='h-10 w-10' />}
            type='Guía'
            duration='1 hora'
            href='/training/modulo-1'
          />

          <TrainingCard
            title='Consumo Responsable y Producción Sostenible'
            description='Conoce las mejores prácticas para un consumo responsable y producción sostenible'
            icon={<FileText className='h-10 w-10' />}
            type='Guía'
            duration='2 horas'
            href='/training/modulo-2'
          />

          <TrainingCard
            title='Enfrentando el Cambio Climático Desarrollo Regenerativo'
            description='Estrategias para enfrentar el cambio climático y promover un desarrollo regenerativo'
            icon={<FileText className='h-10 w-10' />}
            type='Guía'
            duration='1 hora'
            href='/training/modulo-3'
          />
        </div>
      </div>
    </ContentLayout>
  );
}
