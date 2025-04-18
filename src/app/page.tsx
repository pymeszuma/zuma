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
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { ContentLayout } from '@/components/panel/content-layout';
import { ContainerSectorCards } from '@/feature/sectors/components/container-sector-cards';
import { ContainerToolCards } from '@/feature/tools/components/container-tool-cards';

export default function Home() {
  return (
    <ContentLayout title='Inicio' className='px-8 py-2'>
      {/* CONTENT */}
      <div className='container mx-auto py-10'>
        <div className='flex flex-col items-center text-center mb-10'>
          <h1 className='text-4xl font-bold tracking-tight'>Zuma</h1>
          <p className='text-sm text-muted-foreground mt-2'>
            Aplicativo informático para evaluar los impactos y avances en
            sostenibilidad de las pymes según los compromisos de las
            contribuciones determinadas a nivel nacional (NDC) de Colombia a
            2030.
          </p>
        </div>

        <Tabs defaultValue='sectors' className='w-full max-w-4xl mx-auto'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger className='cursor-pointer' value='sectors'>
              Sectores
            </TabsTrigger>
            <TabsTrigger className='cursor-pointer' value='tools'>
              Herramientas
            </TabsTrigger>
            <TabsTrigger className='cursor-pointer' value='training'>
              Capacitación
            </TabsTrigger>
          </TabsList>

          <TabsContent value='sectors' className='mt-6'>
            <ContainerSectorCards />
          </TabsContent>

          <TabsContent value='tools' className='mt-6'>
            <ContainerToolCards />
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
