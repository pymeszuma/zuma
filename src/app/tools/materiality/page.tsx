'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { ArrowRight, Save, FileText } from 'lucide-react';
import Link from 'next/link';
import { ContentLayout } from '@/components/panel/content-layout';
import { DynamicBreadcrumb } from '@/components/common/dynamic-breadcrumb';

export default function MaterialityPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <ContentLayout title='Inicio' className='px-8 py-2'>
      <div className='my-5'>
        <DynamicBreadcrumb />
      </div>
      <div className='container mx-auto py-10'>
        <div className='flex flex-col items-start mb-6'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Análisis de Materialidad
          </h1>
          <p className='text-muted-foreground'>
            Identifica los aspectos ambientales más relevantes para tu empresa
          </p>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Identificación de Aspectos</CardTitle>
              <CardDescription>
                Selecciona los aspectos ambientales relevantes para tu empresa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div className='space-y-2'>
                  <Label>Aspectos Ambientales</Label>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <AspectCheckbox id='energy' label='Consumo de Energía' />
                    <AspectCheckbox id='water' label='Consumo de Agua' />
                    <AspectCheckbox id='emissions' label='Emisiones de GEI' />
                    <AspectCheckbox id='waste' label='Generación de Residuos' />
                    <AspectCheckbox id='materials' label='Uso de Materiales' />
                    <AspectCheckbox
                      id='biodiversity'
                      label='Impacto en Biodiversidad'
                    />
                    <AspectCheckbox
                      id='pollution'
                      label='Contaminación del Aire'
                    />
                    <AspectCheckbox
                      id='water-pollution'
                      label='Contaminación del Agua'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label>Aspectos Sociales</Label>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <AspectCheckbox id='health' label='Salud y Seguridad' />
                    <AspectCheckbox
                      id='community'
                      label='Relaciones Comunitarias'
                    />
                    <AspectCheckbox id='labor' label='Prácticas Laborales' />
                    <AspectCheckbox
                      id='human-rights'
                      label='Derechos Humanos'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label>Aspectos Económicos</Label>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <AspectCheckbox
                      id='compliance'
                      label='Cumplimiento Normativo'
                    />
                    <AspectCheckbox
                      id='innovation'
                      label='Innovación y Tecnología'
                    />
                    <AspectCheckbox
                      id='supply-chain'
                      label='Cadena de Suministro'
                    />
                    <AspectCheckbox
                      id='market'
                      label='Presencia en el Mercado'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='custom-aspect'>Agregar Otro Aspecto</Label>
                  <div className='flex gap-2'>
                    <Input
                      id='custom-aspect'
                      placeholder='Ingrese otro aspecto relevante'
                    />
                    <Button variant='outline'>Agregar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button onClick={handleNext}>
                Siguiente
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Evaluación de Impacto</CardTitle>
              <CardDescription>
                Evalúa el impacto de cada aspecto en tu empresa y para tus
                grupos de interés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue='environmental'>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='environmental'>Ambiental</TabsTrigger>
                  <TabsTrigger value='social'>Social</TabsTrigger>
                  <TabsTrigger value='economic'>Económico</TabsTrigger>
                </TabsList>

                <TabsContent value='environmental' className='space-y-6 mt-6'>
                  <AspectEvaluation
                    aspect='Consumo de Energía'
                    description='Evalúa la importancia del consumo energético para tu empresa y grupos de interés'
                  />
                  <AspectEvaluation
                    aspect='Emisiones de GEI'
                    description='Evalúa la importancia de las emisiones de gases de efecto invernadero'
                  />
                  <AspectEvaluation
                    aspect='Generación de Residuos'
                    description='Evalúa la importancia de la gestión de residuos'
                  />
                  <AspectEvaluation
                    aspect='Consumo de Agua'
                    description='Evalúa la importancia del consumo de agua'
                  />
                </TabsContent>

                <TabsContent value='social' className='space-y-6 mt-6'>
                  <AspectEvaluation
                    aspect='Salud y Seguridad'
                    description='Evalúa la importancia de la salud y seguridad laboral'
                  />
                  <AspectEvaluation
                    aspect='Relaciones Comunitarias'
                    description='Evalúa la importancia de las relaciones con la comunidad local'
                  />
                </TabsContent>

                <TabsContent value='economic' className='space-y-6 mt-6'>
                  <AspectEvaluation
                    aspect='Cumplimiento Normativo'
                    description='Evalúa la importancia del cumplimiento de normativas ambientales'
                  />
                  <AspectEvaluation
                    aspect='Cadena de Suministro'
                    description='Evalúa la importancia de la sostenibilidad en la cadena de suministro'
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button variant='outline' onClick={handlePrevious}>
                Anterior
              </Button>
              <Button onClick={handleNext}>
                Siguiente
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Matriz de Materialidad</CardTitle>
              <CardDescription>
                Resultados del análisis de materialidad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div className='h-[400px] bg-gray-100 rounded-lg flex items-center justify-center'>
                  <p className='text-muted-foreground'>
                    Matriz de Materialidad
                  </p>
                </div>

                <div className='space-y-4'>
                  <h3 className='text-lg font-medium'>
                    Aspectos Materiales Prioritarios
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex items-start gap-3 p-3 rounded-lg border bg-card'>
                      <div className='rounded-full bg-red-100 p-1.5 mt-0.5 text-red-600'>
                        1
                      </div>
                      <div>
                        <h4 className='text-sm font-medium'>
                          Emisiones de GEI
                        </h4>
                        <p className='text-xs text-muted-foreground mt-1'>
                          Impacto: Alto | Importancia para stakeholders: Alta
                        </p>
                      </div>
                    </div>

                    <div className='flex items-start gap-3 p-3 rounded-lg border bg-card'>
                      <div className='rounded-full bg-orange-100 p-1.5 mt-0.5 text-orange-600'>
                        2
                      </div>
                      <div>
                        <h4 className='text-sm font-medium'>
                          Consumo de Energía
                        </h4>
                        <p className='text-xs text-muted-foreground mt-1'>
                          Impacto: Alto | Importancia para stakeholders: Media
                        </p>
                      </div>
                    </div>

                    <div className='flex items-start gap-3 p-3 rounded-lg border bg-card'>
                      <div className='rounded-full bg-yellow-100 p-1.5 mt-0.5 text-yellow-600'>
                        3
                      </div>
                      <div>
                        <h4 className='text-sm font-medium'>
                          Cumplimiento Normativo
                        </h4>
                        <p className='text-xs text-muted-foreground mt-1'>
                          Impacto: Medio | Importancia para stakeholders: Alta
                        </p>
                      </div>
                    </div>

                    <div className='flex items-start gap-3 p-3 rounded-lg border bg-card'>
                      <div className='rounded-full bg-green-100 p-1.5 mt-0.5 text-green-600'>
                        4
                      </div>
                      <div>
                        <h4 className='text-sm font-medium'>
                          Generación de Residuos
                        </h4>
                        <p className='text-xs text-muted-foreground mt-1'>
                          Impacto: Medio | Importancia para stakeholders: Media
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <h3 className='text-lg font-medium'>Recomendaciones</h3>
                  <ul className='space-y-2'>
                    <li className='flex items-start gap-2'>
                      <div className='rounded-full bg-green-100 p-1 mt-0.5'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='text-green-600'
                        >
                          <polyline points='20 6 9 17 4 12'></polyline>
                        </svg>
                      </div>
                      <p>
                        Desarrollar una estrategia de reducción de emisiones de
                        GEI
                      </p>
                    </li>
                    <li className='flex items-start gap-2'>
                      <div className='rounded-full bg-green-100 p-1 mt-0.5'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='text-green-600'
                        >
                          <polyline points='20 6 9 17 4 12'></polyline>
                        </svg>
                      </div>
                      <p>Implementar medidas de eficiencia energética</p>
                    </li>
                    <li className='flex items-start gap-2'>
                      <div className='rounded-full bg-green-100 p-1 mt-0.5'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='text-green-600'
                        >
                          <polyline points='20 6 9 17 4 12'></polyline>
                        </svg>
                      </div>
                      <p>
                        Establecer un sistema de gestión ambiental para asegurar
                        el cumplimiento normativo
                      </p>
                    </li>
                    <li className='flex items-start gap-2'>
                      <div className='rounded-full bg-green-100 p-1 mt-0.5'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='text-green-600'
                        >
                          <polyline points='20 6 9 17 4 12'></polyline>
                        </svg>
                      </div>
                      <p>Desarrollar un programa de gestión de residuos</p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button variant='outline' onClick={handlePrevious}>
                Anterior
              </Button>
              <div className='flex gap-2'>
                <Button variant='outline'>
                  <Save className='mr-2 h-4 w-4' />
                  Guardar Resultados
                </Button>
                <Button asChild>
                  <Link href='/dashboard'>
                    <FileText className='mr-2 h-4 w-4' />
                    Ver en Dashboard
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </ContentLayout>
  );
}

function AspectCheckbox({ id, label }: { id: string; label: string }) {
  return (
    <div className='flex items-center space-x-2'>
      <input
        type='checkbox'
        id={id}
        className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}

function AspectEvaluation({
  aspect,
  description
}: {
  aspect: string;
  description: string;
}) {
  return (
    <div className='space-y-4 p-4 border rounded-lg'>
      <div>
        <h3 className='text-lg font-medium'>{aspect}</h3>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>

      <div className='space-y-6'>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <Label>Impacto para la Empresa</Label>
            <span className='text-sm'>7</span>
          </div>
          <Slider defaultValue={[7]} max={10} step={1} />
          <div className='flex justify-between text-xs text-muted-foreground'>
            <span>Bajo</span>
            <span>Medio</span>
            <span>Alto</span>
          </div>
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between'>
            <Label>Importancia para Grupos de Interés</Label>
            <span className='text-sm'>8</span>
          </div>
          <Slider defaultValue={[8]} max={10} step={1} />
          <div className='flex justify-between text-xs text-muted-foreground'>
            <span>Bajo</span>
            <span>Medio</span>
            <span>Alto</span>
          </div>
        </div>
      </div>
    </div>
  );
}
