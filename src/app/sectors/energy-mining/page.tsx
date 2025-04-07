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
import { Progress } from '@/components/ui/progress';
import { Lightbulb, ArrowRight, Save, FileText } from 'lucide-react';
import Link from 'next/link';
import { EnergySurvey } from '@/feature/sectors/surveys/energy-mining';
import { ContentLayout } from '@/components/panel/content-layout';
import { DynamicBreadcrumb } from '@/components/common/dynamic-breadcrumb';

export default function EnergyMiningSectorPage() {
  const [step, setStep] = useState(1);
  const [surveyComplete, setSurveyComplete] = useState(false);
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

  const handleSurveyComplete = () => {
    setSurveyComplete(true);
  };

  return (
    <ContentLayout title='Inicio' className='px-8 py-2'>
      <div className='my-5'>
        <DynamicBreadcrumb />
      </div>
      <div className='container mx-auto py-10'>
        <div className='flex flex-col items-start mb-6'>
          <div className='flex items-center gap-2 mb-2'>
            <Lightbulb className='h-6 w-6 text-green-600' />
            <h1 className='text-3xl font-bold tracking-tight'>
              Sector Energía y Minería
            </h1>
          </div>
          <p className='text-muted-foreground'>
            Calculadora de huella de carbono para empresas del sector energético
            y minero
          </p>
        </div>

        <div className='mb-8'>
          <div className='flex justify-between mb-2 text-sm'>
            <span>Progreso</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
            <span>%</span>
          </div>
          <Progress value={(step / totalSteps) * 100} className='h-2' />
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Información de la Empresa</CardTitle>
              <CardDescription>
                Proporciona información básica sobre tu empresa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label
                      htmlFor='company-name'
                      className='text-sm font-medium'
                    >
                      Nombre de la Empresa
                    </label>
                    <input
                      id='company-name'
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                      placeholder='Ingrese el nombre de la empresa'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label
                      htmlFor='company-rut'
                      className='text-sm font-medium'
                    >
                      RUT
                    </label>
                    <input
                      id='company-rut'
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                      placeholder='XX.XXX.XXX-X'
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label
                      htmlFor='company-size'
                      className='text-sm font-medium'
                    >
                      Tamaño de la Empresa
                    </label>
                    <select
                      id='company-size'
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                      <option value=''>Seleccione el tamaño</option>
                      <option value='micro'>Micro (1-9 empleados)</option>
                      <option value='small'>Pequeña (10-49 empleados)</option>
                      <option value='medium'>Mediana (50-199 empleados)</option>
                    </select>
                  </div>
                  <div className='space-y-2'>
                    <label
                      htmlFor='company-subsector'
                      className='text-sm font-medium'
                    >
                      Subsector
                    </label>
                    <select
                      id='company-subsector'
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                      <option value=''>Seleccione el subsector</option>
                      <option value='electricity'>Generación eléctrica</option>
                      <option value='mining'>Minería</option>
                      <option value='oil-gas'>Petróleo y gas</option>
                      <option value='renewable'>Energías renovables</option>
                    </select>
                  </div>
                </div>
                <div className='space-y-2'>
                  <label
                    htmlFor='company-address'
                    className='text-sm font-medium'
                  >
                    Dirección
                  </label>
                  <input
                    id='company-address'
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    placeholder='Ingrese la dirección de la empresa'
                  />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='space-y-2'>
                    <label
                      htmlFor='company-region'
                      className='text-sm font-medium'
                    >
                      Región
                    </label>
                    <select
                      id='company-region'
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                      <option value=''>Seleccione la región</option>
                      <option value='metropolitana'>Metropolitana</option>
                      <option value='valparaiso'>Valparaíso</option>
                      <option value='biobio'>Biobío</option>
                      {/* Agregar más regiones */}
                    </select>
                  </div>
                  <div className='space-y-2'>
                    <label
                      htmlFor='company-comuna'
                      className='text-sm font-medium'
                    >
                      Comuna
                    </label>
                    <select
                      id='company-comuna'
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                      <option value=''>Seleccione la comuna</option>
                      {/* Opciones dinámicas según la región seleccionada */}
                    </select>
                  </div>
                  <div className='space-y-2'>
                    <label
                      htmlFor='company-year'
                      className='text-sm font-medium'
                    >
                      Año de Reporte
                    </label>
                    <select
                      id='company-year'
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                      <option value='2024'>2024</option>
                      <option value='2023'>2023</option>
                      <option value='2022'>2022</option>
                      <option value='2021'>2021</option>
                    </select>
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
              <CardTitle>Cuestionario de Huella de Carbono</CardTitle>
              <CardDescription>
                Responde las siguientes preguntas para calcular la huella de
                carbono de tu empresa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EnergySurvey onComplete={handleSurveyComplete} />
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button variant='outline' onClick={handlePrevious}>
                Anterior
              </Button>
              <Button onClick={handleNext} disabled={!surveyComplete}>
                Siguiente
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Resultados</CardTitle>
              <CardDescription>
                Resultados del cálculo de huella de carbono para tu empresa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div className='rounded-lg border bg-card p-6'>
                  <h3 className='text-xl font-semibold mb-4'>
                    Resumen de Emisiones
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='bg-green-50 p-4 rounded-lg text-center'>
                      <p className='text-sm text-muted-foreground'>Alcance 1</p>
                      <p className='text-2xl font-bold'>25.4</p>
                      <p className='text-xs text-muted-foreground'>
                        toneladas CO₂e
                      </p>
                    </div>
                    <div className='bg-blue-50 p-4 rounded-lg text-center'>
                      <p className='text-sm text-muted-foreground'>Alcance 2</p>
                      <p className='text-2xl font-bold'>18.7</p>
                      <p className='text-xs text-muted-foreground'>
                        toneladas CO₂e
                      </p>
                    </div>
                    <div className='bg-purple-50 p-4 rounded-lg text-center'>
                      <p className='text-sm text-muted-foreground'>Alcance 3</p>
                      <p className='text-2xl font-bold'>42.3</p>
                      <p className='text-xs text-muted-foreground'>
                        toneladas CO₂e
                      </p>
                    </div>
                  </div>
                  <div className='mt-6'>
                    <h4 className='text-lg font-medium mb-2'>
                      Emisiones Totales
                    </h4>
                    <div className='bg-gray-50 p-4 rounded-lg flex justify-between items-center'>
                      <span className='text-muted-foreground'>Total</span>
                      <span className='text-3xl font-bold'>
                        86.4 toneladas CO₂e
                      </span>
                    </div>
                  </div>
                </div>

                <div className='rounded-lg border bg-card p-6'>
                  <h3 className='text-xl font-semibold mb-4'>
                    Distribución por Categoría
                  </h3>
                  <div className='h-64 bg-gray-100 rounded-lg flex items-center justify-center'>
                    <p className='text-muted-foreground'>
                      Gráfico de distribución de emisiones
                    </p>
                  </div>
                </div>

                <div className='rounded-lg border bg-card p-6'>
                  <h3 className='text-xl font-semibold mb-4'>
                    Recomendaciones
                  </h3>
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
                        Implementar medidas de eficiencia energética en las
                        instalaciones
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
                      <p>
                        Evaluar la posibilidad de instalar fuentes de energía
                        renovable
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
                      <p>
                        Optimizar la cadena de suministro para reducir emisiones
                        indirectas
                      </p>
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
