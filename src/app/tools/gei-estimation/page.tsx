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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ArrowRight, Save, FileText } from 'lucide-react';
import Link from 'next/link';
import { ContentLayout } from '@/components/panel/content-layout';

export default function GEIEstimationPage() {
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
    <ContentLayout title='Estimation GEI' className='px-8 py-2'>
      <div className='container mx-auto py-10'>
        <div className='flex flex-col items-start mb-6'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Estimación de GEI
          </h1>
          <p className='text-muted-foreground'>
            Calcula las emisiones de Gases de Efecto Invernadero según
            estándares internacionales
          </p>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
              <CardDescription>
                Configura los parámetros para la estimación de GEI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='standard'>Estándar</Label>
                    <Select defaultValue='ghg-protocol'>
                      <SelectTrigger id='standard'>
                        <SelectValue placeholder='Seleccionar estándar' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='ghg-protocol'>
                          GHG Protocol
                        </SelectItem>
                        <SelectItem value='iso-14064'>ISO 14064</SelectItem>
                        <SelectItem value='ipcc'>IPCC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='year'>Año de Reporte</Label>
                    <Select defaultValue='2023'>
                      <SelectTrigger id='year'>
                        <SelectValue placeholder='Seleccionar año' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='2024'>2024</SelectItem>
                        <SelectItem value='2023'>2023</SelectItem>
                        <SelectItem value='2022'>2022</SelectItem>
                        <SelectItem value='2021'>2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='organization-type'>
                      Tipo de Organización
                    </Label>
                    <Select defaultValue='company'>
                      <SelectTrigger id='organization-type'>
                        <SelectValue placeholder='Seleccionar tipo' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='company'>Empresa</SelectItem>
                        <SelectItem value='institution'>Institución</SelectItem>
                        <SelectItem value='ngo'>ONG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='sector'>Sector</Label>
                    <Select defaultValue='energy-mining'>
                      <SelectTrigger id='sector'>
                        <SelectValue placeholder='Seleccionar sector' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='energy-mining'>
                          Energía y Minería
                        </SelectItem>
                        <SelectItem value='manufacturing'>
                          Manufactura
                        </SelectItem>
                        <SelectItem value='services'>Servicios</SelectItem>
                        <SelectItem value='agriculture'>Agricultura</SelectItem>
                        <SelectItem value='transport'>Transporte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='scope'>Alcances a Incluir</Label>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        id='scope1'
                        defaultChecked
                        className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                      />
                      <Label htmlFor='scope1'>
                        Alcance 1 (Emisiones Directas)
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        id='scope2'
                        defaultChecked
                        className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                      />
                      <Label htmlFor='scope2'>
                        Alcance 2 (Energía Indirecta)
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        id='scope3'
                        defaultChecked
                        className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                      />
                      <Label htmlFor='scope3'>
                        Alcance 3 (Otras Indirectas)
                      </Label>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='operational-boundaries'>
                    Límites Operacionales
                  </Label>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        id='facilities'
                        defaultChecked
                        className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                      />
                      <Label htmlFor='facilities'>Instalaciones</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        id='vehicles'
                        defaultChecked
                        className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                      />
                      <Label htmlFor='vehicles'>Vehículos</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        id='equipment'
                        defaultChecked
                        className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                      />
                      <Label htmlFor='equipment'>Equipos</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        id='processes'
                        defaultChecked
                        className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                      />
                      <Label htmlFor='processes'>Procesos</Label>
                    </div>
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
              <CardTitle>Datos de Actividad</CardTitle>
              <CardDescription>
                Ingresa los datos de actividad para calcular las emisiones de
                GEI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue='scope1'>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='scope1'>Alcance 1</TabsTrigger>
                  <TabsTrigger value='scope2'>Alcance 2</TabsTrigger>
                  <TabsTrigger value='scope3'>Alcance 3</TabsTrigger>
                </TabsList>

                <TabsContent value='scope1' className='space-y-6 mt-6'>
                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>
                      Combustibles Fósiles
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='diesel'>Diésel (litros/año)</Label>
                        <Input id='diesel' type='number' placeholder='0' />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='gasoline'>Gasolina (litros/año)</Label>
                        <Input id='gasoline' type='number' placeholder='0' />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='natural-gas'>
                          Gas Natural (m³/año)
                        </Label>
                        <Input id='natural-gas' type='number' placeholder='0' />
                      </div>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Emisiones Fugitivas</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='refrigerants'>
                          Refrigerantes (kg/año)
                        </Label>
                        <Input
                          id='refrigerants'
                          type='number'
                          placeholder='0'
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='refrigerant-type'>
                          Tipo de Refrigerante
                        </Label>
                        <Select>
                          <SelectTrigger id='refrigerant-type'>
                            <SelectValue placeholder='Seleccionar tipo' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='r22'>R-22</SelectItem>
                            <SelectItem value='r134a'>R-134a</SelectItem>
                            <SelectItem value='r410a'>R-410A</SelectItem>
                            <SelectItem value='r404a'>R-404A</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>
                      Procesos Industriales
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='process-type'>Tipo de Proceso</Label>
                        <Select>
                          <SelectTrigger id='process-type'>
                            <SelectValue placeholder='Seleccionar proceso' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='combustion'>
                              Combustión
                            </SelectItem>
                            <SelectItem value='chemical'>
                              Reacción Química
                            </SelectItem>
                            <SelectItem value='mechanical'>Mecánico</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='process-emissions'>
                          Emisiones Estimadas (tCO₂e/año)
                        </Label>
                        <Input
                          id='process-emissions'
                          type='number'
                          placeholder='0'
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value='scope2' className='space-y-6 mt-6'>
                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Electricidad</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='electricity'>
                          Consumo de Electricidad (kWh/año)
                        </Label>
                        <Input id='electricity' type='number' placeholder='0' />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='electricity-source'>
                          Fuente de Electricidad
                        </Label>
                        <Select defaultValue='grid'>
                          <SelectTrigger id='electricity-source'>
                            <SelectValue placeholder='Seleccionar fuente' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='grid'>Red Eléctrica</SelectItem>
                            <SelectItem value='renewable'>Renovable</SelectItem>
                            <SelectItem value='mixed'>Mixta</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Calor y Vapor</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='heat'>Consumo de Calor (GJ/año)</Label>
                        <Input id='heat' type='number' placeholder='0' />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='steam'>Consumo de Vapor (GJ/año)</Label>
                        <Input id='steam' type='number' placeholder='0' />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value='scope3' className='space-y-6 mt-6'>
                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>
                      Transporte y Distribución
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='transport-type'>
                          Tipo de Transporte
                        </Label>
                        <Select>
                          <SelectTrigger id='transport-type'>
                            <SelectValue placeholder='Seleccionar tipo' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='road'>Terrestre</SelectItem>
                            <SelectItem value='air'>Aéreo</SelectItem>
                            <SelectItem value='sea'>Marítimo</SelectItem>
                            <SelectItem value='rail'>Ferroviario</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='transport-distance'>
                          Distancia (km/año)
                        </Label>
                        <Input
                          id='transport-distance'
                          type='number'
                          placeholder='0'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Viajes de Negocios</h3>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='air-travel'>
                          Viajes en Avión (km/año)
                        </Label>
                        <Input id='air-travel' type='number' placeholder='0' />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='car-travel'>
                          Viajes en Auto (km/año)
                        </Label>
                        <Input id='car-travel' type='number' placeholder='0' />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='hotel-stays'>
                          Noches de Hotel (noches/año)
                        </Label>
                        <Input id='hotel-stays' type='number' placeholder='0' />
                      </div>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Residuos</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='waste-type'>Tipo de Residuo</Label>
                        <Select>
                          <SelectTrigger id='waste-type'>
                            <SelectValue placeholder='Seleccionar tipo' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='landfill'>Vertedero</SelectItem>
                            <SelectItem value='recycling'>Reciclaje</SelectItem>
                            <SelectItem value='compost'>Compostaje</SelectItem>
                            <SelectItem value='incineration'>
                              Incineración
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='waste-amount'>
                          Cantidad (toneladas/año)
                        </Label>
                        <Input
                          id='waste-amount'
                          type='number'
                          placeholder='0'
                        />
                      </div>
                    </div>
                  </div>
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
              <CardTitle>Resultados</CardTitle>
              <CardDescription>
                Resultados de la estimación de GEI
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
                    Desglose por Categoría
                  </h3>
                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <div className='h-3 w-3 rounded-full bg-green-500' />
                          <span className='text-sm'>Combustibles Fósiles</span>
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
                          <div className='h-3 w-3 rounded-full bg-green-300' />
                          <span className='text-sm'>Emisiones Fugitivas</span>
                        </div>
                        <span className='text-sm font-medium'>7.2 tCO₂e</span>
                      </div>
                      <div className='h-2 w-full rounded-full bg-muted'>
                        <div
                          className='h-2 rounded-full bg-green-300'
                          style={{ width: '8%' }}
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
                          <span className='text-sm'>
                            Transporte y Distribución
                          </span>
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
                          <div className='h-3 w-3 rounded-full bg-purple-300' />
                          <span className='text-sm'>Viajes de Negocios</span>
                        </div>
                        <span className='text-sm font-medium'>12.4 tCO₂e</span>
                      </div>
                      <div className='h-2 w-full rounded-full bg-muted'>
                        <div
                          className='h-2 rounded-full bg-purple-300'
                          style={{ width: '14%' }}
                        />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <div className='h-3 w-3 rounded-full bg-purple-200' />
                          <span className='text-sm'>Residuos</span>
                        </div>
                        <span className='text-sm font-medium'>8.7 tCO₂e</span>
                      </div>
                      <div className='h-2 w-full rounded-full bg-muted'>
                        <div
                          className='h-2 rounded-full bg-purple-200'
                          style={{ width: '10%' }}
                        />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <div className='h-3 w-3 rounded-full bg-gray-400' />
                          <span className='text-sm'>Otros</span>
                        </div>
                        <span className='text-sm font-medium'>5.4 tCO₂e</span>
                      </div>
                      <div className='h-2 w-full rounded-full bg-muted'>
                        <div
                          className='h-2 rounded-full bg-gray-400'
                          style={{ width: '6%' }}
                        />
                      </div>
                    </div>
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
                        Implementar medidas de eficiencia energética para
                        reducir el consumo de electricidad
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
                        Optimizar rutas de transporte y distribución para
                        reducir emisiones
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
                        Implementar un programa de gestión de residuos para
                        reducir emisiones asociadas
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
