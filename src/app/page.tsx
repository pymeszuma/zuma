'use client';
import type React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Lightbulb, Factory, Leaf, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { ContentLayout } from '@/components/panel/content-layout';
import { DynamicBreadcrumb } from '@/components/common/dynamic-breadcrumb';

export default function Home() {
  return (
    <ContentLayout title='Inicio' className='px-8 py-2'>
      <div className='my-5'>
        <DynamicBreadcrumb />
      </div>
      {/* CONTENT */}
      <div className='container mx-auto py-10'>
        <div className='flex flex-col items-center text-center mb-10'>
          <h1 className='text-4xl font-bold tracking-tight'>Zuma</h1>
          <p className='text-xl text-muted-foreground mt-2'>
            Calculadora de Huella de Carbono para PYMES
          </p>
        </div>

        <Tabs defaultValue='sectors' className='w-full max-w-4xl mx-auto'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='sectors'>Sectores</TabsTrigger>
            <TabsTrigger value='tools'>Herramientas</TabsTrigger>
            <TabsTrigger value='training'>Capacitación</TabsTrigger>
          </TabsList>

          <TabsContent value='sectors' className='mt-6'>
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
          </TabsContent>

          <TabsContent value='tools' className='mt-6'>
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
          </TabsContent>

          <TabsContent value='training' className='mt-6'>
            <div className='grid grid-cols-1 gap-6'>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <BookOpen className='h-6 w-6' />
                    Módulos de Capacitación
                  </CardTitle>
                  <CardDescription>
                    Accede a nuestros módulos de capacitación sobre huella de
                    carbono y sostenibilidad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-2'>
                    <li className='p-2 rounded hover:bg-muted'>
                      <Link
                        href='/training/introduction'
                        className='flex items-center gap-2'
                      >
                        <span className='font-medium'>
                          Introducción a la Huella de Carbono
                        </span>
                      </Link>
                    </li>
                    <li className='p-2 rounded hover:bg-muted'>
                      <Link
                        href='/training/measurement'
                        className='flex items-center gap-2'
                      >
                        <span className='font-medium'>
                          Metodologías de Medición
                        </span>
                      </Link>
                    </li>
                    <li className='p-2 rounded hover:bg-muted'>
                      <Link
                        href='/training/reduction'
                        className='flex items-center gap-2'
                      >
                        <span className='font-medium'>
                          Estrategias de Reducción
                        </span>
                      </Link>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className='w-full'>
                    <Link href='/training'>Ver todos los módulos</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
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

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function ToolCard({ title, description, icon, href }: ToolCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild variant='outline' className='w-full'>
          <Link href={href}>Acceder</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
