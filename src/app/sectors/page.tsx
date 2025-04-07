import type React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Building2, Factory, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { ContentLayout } from '@/components/panel/content-layout';
import { DynamicBreadcrumb } from '@/components/common/dynamic-breadcrumb';

export default function SectorsPage() {
  return (
    <ContentLayout title='Inicio' className='px-8 py-2'>
      <div className='my-5'>
        <DynamicBreadcrumb />
      </div>
      <div className='container mx-auto py-10'>
        <div className='flex flex-col items-start mb-10'>
          <h1 className='text-3xl font-bold tracking-tight'>Sectores</h1>
          <p className='text-muted-foreground mt-2'>
            Selecciona el sector de tu empresa para calcular su huella de
            carbono
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <SectorCard
            title='Energía y Minería'
            description='Cálculo de huella de carbono para empresas del sector energético y minero'
            icon={<Lightbulb className='h-10 w-10' />}
            href='/sectors/energy-mining'
            active
          />
          <SectorCard
            title='Manufactura'
            description='Cálculo de huella de carbono para empresas manufactureras'
            icon={<Factory className='h-10 w-10' />}
            href='/sectors/manufacturing'
          />
          <SectorCard
            title='Servicios'
            description='Cálculo de huella de carbono para empresas de servicios'
            icon={<Building2 className='h-10 w-10' />}
            href='/sectors/services'
          />
        </div>
      </div>
    </ContentLayout>
  );
}

interface SectorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

function SectorCard({
  title,
  description,
  icon,
  href,
  active
}: SectorCardProps) {
  return (
    <Card className={active ? 'border-green-500 shadow-md' : ''}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          {icon}
          {title}
          {active && (
            <span className='ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full'>
              Disponible
            </span>
          )}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          asChild
          variant={active ? 'default' : 'outline'}
          className='w-full'
        >
          <Link href={href}>{active ? 'Comenzar' : 'Próximamente'}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
