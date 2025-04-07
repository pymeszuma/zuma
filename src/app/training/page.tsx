import type React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { BookOpen, FileText, Video, Award } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ContentLayout } from '@/components/panel/content-layout';
import { DynamicBreadcrumb } from '@/components/common/dynamic-breadcrumb';

export default function TrainingPage() {
  return (
    <ContentLayout title='Inicio' className='px-8 py-2'>
      <div className='my-5'>
        <DynamicBreadcrumb />
      </div>
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

interface TrainingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  type: string;
  duration: string;
  href: string;
}

function TrainingCard({
  title,
  description,
  icon,
  type,
  duration,
  href
}: TrainingCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-2 mb-2'>
          {icon}
          <span className='text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800'>
            {type}
          </span>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='text-sm text-muted-foreground'>
          <p>Duración: {duration}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className='w-full'>
          <Link href={href}>Acceder</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
