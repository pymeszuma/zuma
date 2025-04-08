import type React from 'react';
import { BookOpen, FileText, Video, Award } from 'lucide-react';
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
            Aprende sobre huella de carbono y sostenibilidad con nuestros
            módulos de capacitación
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <TrainingCard
            title='Introducción a la Huella de Carbono'
            description='Conceptos básicos sobre huella de carbono y su importancia para las empresas'
            icon={<BookOpen className='h-10 w-10' />}
            type='Curso'
            duration='1 hora'
            href='/training/introduction'
          />

          <TrainingCard
            title='Metodologías de Medición'
            description='Aprende sobre las diferentes metodologías para medir la huella de carbono'
            icon={<FileText className='h-10 w-10' />}
            type='Guía'
            duration='2 horas'
            href='/training/measurement'
          />

          <TrainingCard
            title='Estrategias de Reducción'
            description='Estrategias efectivas para reducir la huella de carbono en tu empresa'
            icon={<Video className='h-10 w-10' />}
            type='Video'
            duration='45 minutos'
            href='/training/reduction'
          />

          <TrainingCard
            title='Normativa y Regulación'
            description='Conoce la normativa y regulación aplicable a la huella de carbono'
            icon={<FileText className='h-10 w-10' />}
            type='Guía'
            duration='1.5 horas'
            href='/training/regulation'
          />

          <TrainingCard
            title='Certificación y Reportes'
            description='Aprende a certificar y reportar la huella de carbono de tu empresa'
            icon={<Award className='h-10 w-10' />}
            type='Taller'
            duration='3 horas'
            href='/training/certification'
          />

          <TrainingCard
            title='Casos de Éxito'
            description='Conoce casos de éxito de empresas que han reducido su huella de carbono'
            icon={<Video className='h-10 w-10' />}
            type='Video'
            duration='1 hora'
            href='/training/success-cases'
          />
        </div>
      </div>
    </ContentLayout>
  );
}

