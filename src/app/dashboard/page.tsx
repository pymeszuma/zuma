'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { BarChart3, PieChart, LineChart, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentLayout } from '@/components/panel/content-layout';
import { DynamicBreadcrumb } from '@/components/common/dynamic-breadcrumb';

export default function DashboardPage() {
  const [period, setPeriod] = useState('2023');

  return (
    <ContentLayout title='Inicio' className='px-8 py-2'>
      <div className='my-5'>
        <DynamicBreadcrumb />
      </div>
      <div className='container mx-auto py-10'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
            <p className='text-muted-foreground mt-1'>
              Visualiza y analiza tu huella de carbono
            </p>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Seleccionar período' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='2024'>2024</SelectItem>
                <SelectItem value='2023'>2023</SelectItem>
                <SelectItem value='2022'>2022</SelectItem>
              </SelectContent>
            </Select>
            <div className='flex gap-2'>
              <Button variant='outline' size='icon'>
                <Download className='h-4 w-4' />
              </Button>
              <Button variant='outline' size='icon'>
                <Share2 className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Emisiones Totales
              </CardTitle>
              <BarChart3 className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>86.4 tCO₂e</div>
              <p className='text-xs text-muted-foreground'>
                +2.5% respecto al período anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Alcance 1</CardTitle>
              <div className='h-4 w-4 rounded-full bg-green-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>25.4 tCO₂e</div>
              <p className='text-xs text-muted-foreground'>29.4% del total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Alcance 2</CardTitle>
              <div className='h-4 w-4 rounded-full bg-blue-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>18.7 tCO₂e</div>
              <p className='text-xs text-muted-foreground'>21.6% del total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Alcance 3</CardTitle>
              <div className='h-4 w-4 rounded-full bg-purple-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>42.3 tCO₂e</div>
              <p className='text-xs text-muted-foreground'>49.0% del total</p>
            </CardContent>
          </Card>
        </div>

        <div className='grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-7'>
          <Card className='md:col-span-4'>
            <CardHeader>
              <CardTitle>Emisiones por Alcance</CardTitle>
              <CardDescription>
                Distribución de emisiones por alcance y categoría
              </CardDescription>
            </CardHeader>
            <CardContent className='pl-2'>
              <div className='h-[300px] bg-gray-100 rounded-lg flex items-center justify-center'>
                <PieChart className='h-8 w-8 text-muted-foreground' />
              </div>
            </CardContent>
          </Card>
          <Card className='md:col-span-3'>
            <CardHeader>
              <CardTitle>Principales Fuentes</CardTitle>
              <CardDescription>
                Fuentes de emisión más significativas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <div className='h-3 w-3 rounded-full bg-green-500' />
                      <span className='text-sm'>Consumo de Combustibles</span>
                    </div>
                    <span className='text-sm font-medium'>18.2 tCO₂e</span>
                  </div>
                  <div className='h-2 w-full rounded-full bg-muted'>
                    <div
                      className='h-2 rounded-full bg-green-500'
                      style={{ width: '21%' }}
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <div className='h-3 w-3 rounded-full bg-blue-500' />
                      <span className='text-sm'>Electricidad</span>
                    </div>
                    <span className='text-sm font-medium'>18.7 tCO₂e</span>
                  </div>
                  <div className='h-2 w-full rounded-full bg-muted'>
                    <div
                      className='h-2 rounded-full bg-blue-500'
                      style={{ width: '22%' }}
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <div className='h-3 w-3 rounded-full bg-purple-500' />
                      <span className='text-sm'>Transporte de Empleados</span>
                    </div>
                    <span className='text-sm font-medium'>15.8 tCO₂e</span>
                  </div>
                  <div className='h-2 w-full rounded-full bg-muted'>
                    <div
                      className='h-2 rounded-full bg-purple-500'
                      style={{ width: '18%' }}
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <div className='h-3 w-3 rounded-full bg-yellow-500' />
                      <span className='text-sm'>Viajes de Negocios</span>
                    </div>
                    <span className='text-sm font-medium'>12.4 tCO₂e</span>
                  </div>
                  <div className='h-2 w-full rounded-full bg-muted'>
                    <div
                      className='h-2 rounded-full bg-yellow-500'
                      style={{ width: '14%' }}
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <div className='h-3 w-3 rounded-full bg-red-500' />
                      <span className='text-sm'>Residuos</span>
                    </div>
                    <span className='text-sm font-medium'>8.7 tCO₂e</span>
                  </div>
                  <div className='h-2 w-full rounded-full bg-muted'>
                    <div
                      className='h-2 rounded-full bg-red-500'
                      style={{ width: '10%' }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Evolución Temporal</CardTitle>
              <CardDescription>
                Evolución de las emisiones a lo largo del tiempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue='quarterly'>
                <div className='flex justify-between items-center'>
                  <TabsList>
                    <TabsTrigger value='monthly'>Mensual</TabsTrigger>
                    <TabsTrigger value='quarterly'>Trimestral</TabsTrigger>
                    <TabsTrigger value='yearly'>Anual</TabsTrigger>
                  </TabsList>
                </div>
                <div className='h-[300px] mt-4 bg-gray-100 rounded-lg flex items-center justify-center'>
                  <LineChart className='h-8 w-8 text-muted-foreground' />
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className='grid gap-6 mt-6 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Comparativa Sectorial</CardTitle>
              <CardDescription>
                Comparación con otras empresas del sector
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-8'>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Emisiones por Empleado</span>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>4.3 tCO₂e</span>
                      <span className='text-xs text-green-600'>
                        -12% vs promedio
                      </span>
                    </div>
                  </div>
                  <div className='h-2 w-full rounded-full bg-muted'>
                    <div
                      className='h-2 rounded-full bg-green-500'
                      style={{ width: '65%' }}
                    />
                  </div>
                  <div className='flex justify-between text-xs text-muted-foreground'>
                    <span>0 tCO₂e</span>
                    <span>Promedio: 4.9 tCO₂e</span>
                    <span>10 tCO₂e</span>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Emisiones por Ingresos</span>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>0.18 tCO₂e/MM$</span>
                      <span className='text-xs text-amber-600'>
                        +5% vs promedio
                      </span>
                    </div>
                  </div>
                  <div className='h-2 w-full rounded-full bg-muted'>
                    <div
                      className='h-2 rounded-full bg-amber-500'
                      style={{ width: '78%' }}
                    />
                  </div>
                  <div className='flex justify-between text-xs text-muted-foreground'>
                    <span>0 tCO₂e/MM$</span>
                    <span>Promedio: 0.17 tCO₂e/MM$</span>
                    <span>0.3 tCO₂e/MM$</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recomendaciones</CardTitle>
              <CardDescription>
                Acciones recomendadas para reducir tu huella de carbono
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-start gap-3 p-3 rounded-lg border bg-card'>
                  <div className='rounded-full bg-green-100 p-1.5 mt-0.5'>
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
                      <path d='M12 2v8'></path>
                      <path d='m4.93 10.93 1.41 1.41'></path>
                      <path d='M2 18h2'></path>
                      <path d='M20 18h2'></path>
                      <path d='m19.07 10.93-1.41 1.41'></path>
                      <path d='M22 22H2'></path>
                      <path d='m8 6 4-4 4 4'></path>
                      <path d='M16 18a4 4 0 0 0-8 0'></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium'>
                      Instalar Paneles Solares
                    </h4>
                    <p className='text-xs text-muted-foreground mt-1'>
                      Potencial de reducción: 15.2 tCO₂e/año
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3 p-3 rounded-lg border bg-card'>
                  <div className='rounded-full bg-blue-100 p-1.5 mt-0.5'>
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
                      className='text-blue-600'
                    >
                      <path d='M2 12h8'></path>
                      <path d='M6 16V8'></path>
                      <path d='M14 12h8'></path>
                      <path d='M18 16V8'></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium'>
                      Implementar Programa de Eficiencia Energética
                    </h4>
                    <p className='text-xs text-muted-foreground mt-1'>
                      Potencial de reducción: 8.7 tCO₂e/año
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3 p-3 rounded-lg border bg-card'>
                  <div className='rounded-full bg-purple-100 p-1.5 mt-0.5'>
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
                      className='text-purple-600'
                    >
                      <circle cx='12' cy='12' r='10'></circle>
                      <path d='m4.93 4.93 4.24 4.24'></path>
                      <path d='m14.83 9.17 4.24-4.24'></path>
                      <path d='m14.83 14.83 4.24 4.24'></path>
                      <path d='m9.17 14.83-4.24 4.24'></path>
                      <circle cx='12' cy='12' r='4'></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium'>
                      Programa de Teletrabajo
                    </h4>
                    <p className='text-xs text-muted-foreground mt-1'>
                      Potencial de reducción: 7.9 tCO₂e/año
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3 p-3 rounded-lg border bg-card'>
                  <div className='rounded-full bg-yellow-100 p-1.5 mt-0.5'>
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
                      className='text-yellow-600'
                    >
                      <path d='M4 11a9 9 0 0 1 9 9'></path>
                      <path d='M4 4a16 16 0 0 1 16 16'></path>
                      <circle cx='5' cy='19' r='1'></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium'>
                      Optimizar Cadena de Suministro
                    </h4>
                    <p className='text-xs text-muted-foreground mt-1'>
                      Potencial de reducción: 5.3 tCO₂e/año
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ContentLayout>
  );
}
