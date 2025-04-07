'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface EnergySurveyProps {
  onComplete: () => void;
}

export function EnergySurvey({ onComplete }: EnergySurveyProps) {
  const [activeTab, setActiveTab] = useState('alcance1');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className='space-y-6'>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className='w-full'
      >
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='alcance1'>Alcance 1</TabsTrigger>
          <TabsTrigger value='alcance2'>Alcance 2</TabsTrigger>
          <TabsTrigger value='alcance3'>Alcance 3</TabsTrigger>
        </TabsList>

        <TabsContent value='alcance1' className='space-y-4 mt-6'>
          <h3 className='text-lg font-medium'>
            Emisiones Directas (Alcance 1)
          </h3>
          <p className='text-sm text-muted-foreground mb-4'>
            Emisiones directas de fuentes que son propiedad o están controladas
            por la empresa
          </p>

          <Card>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='fuel-consumption'>
                    ¿Su empresa utiliza combustibles fósiles para sus
                    operaciones?
                  </Label>
                  <RadioGroup defaultValue='yes' className='mt-2'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='yes' id='fuel-yes' />
                      <Label htmlFor='fuel-yes'>Sí</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='no' id='fuel-no' />
                      <Label htmlFor='fuel-no'>No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='diesel-consumption'>
                      Consumo de Diésel (litros/año)
                    </Label>
                    <Input
                      id='diesel-consumption'
                      type='number'
                      placeholder='0'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='gasoline-consumption'>
                      Consumo de Gasolina (litros/año)
                    </Label>
                    <Input
                      id='gasoline-consumption'
                      type='number'
                      placeholder='0'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='natural-gas-consumption'>
                      Consumo de Gas Natural (m³/año)
                    </Label>
                    <Input
                      id='natural-gas-consumption'
                      type='number'
                      placeholder='0'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='lpg-consumption'>
                      Consumo de GLP (kg/año)
                    </Label>
                    <Input id='lpg-consumption' type='number' placeholder='0' />
                  </div>
                </div>

                <div>
                  <Label htmlFor='company-vehicles'>
                    ¿Su empresa posee vehículos propios?
                  </Label>
                  <RadioGroup defaultValue='yes' className='mt-2'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='yes' id='vehicles-yes' />
                      <Label htmlFor='vehicles-yes'>Sí</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='no' id='vehicles-no' />
                      <Label htmlFor='vehicles-no'>No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='vehicle-quantity'>
                      Cantidad de Vehículos
                    </Label>
                    <Input
                      id='vehicle-quantity'
                      type='number'
                      placeholder='0'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='vehicle-type'>Tipo de Vehículo</Label>
                    <Select>
                      <SelectTrigger id='vehicle-type'>
                        <SelectValue placeholder='Seleccionar tipo' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='car'>Automóvil</SelectItem>
                        <SelectItem value='truck'>Camión</SelectItem>
                        <SelectItem value='van'>Furgón</SelectItem>
                        <SelectItem value='machinery'>Maquinaria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='vehicle-km'>
                      Kilómetros Recorridos (km/año)
                    </Label>
                    <Input id='vehicle-km' type='number' placeholder='0' />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='alcance2' className='space-y-4 mt-6'>
          <h3 className='text-lg font-medium'>
            Emisiones Indirectas de Energía (Alcance 2)
          </h3>
          <p className='text-sm text-muted-foreground mb-4'>
            Emisiones indirectas de la generación de electricidad, calor o vapor
            comprados
          </p>

          <Card>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='electricity-consumption'>
                    ¿Su empresa consume electricidad de la red?
                  </Label>
                  <RadioGroup defaultValue='yes' className='mt-2'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='yes' id='electricity-yes' />
                      <Label htmlFor='electricity-yes'>Sí</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='no' id='electricity-no' />
                      <Label htmlFor='electricity-no'>No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='electricity-kwh'>
                      Consumo de Electricidad (kWh/año)
                    </Label>
                    <Input id='electricity-kwh' type='number' placeholder='0' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='electricity-provider'>
                      Proveedor de Electricidad
                    </Label>
                    <Select>
                      <SelectTrigger id='electricity-provider'>
                        <SelectValue placeholder='Seleccionar proveedor' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='enel'>Enel</SelectItem>
                        <SelectItem value='colbun'>Colbún</SelectItem>
                        <SelectItem value='aes'>AES Gener</SelectItem>
                        <SelectItem value='other'>Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor='renewable-energy'>
                    ¿Su empresa utiliza energías renovables?
                  </Label>
                  <RadioGroup defaultValue='no' className='mt-2'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='yes' id='renewable-yes' />
                      <Label htmlFor='renewable-yes'>Sí</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='no' id='renewable-no' />
                      <Label htmlFor='renewable-no'>No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='renewable-type'>
                      Tipo de Energía Renovable
                    </Label>
                    <Select>
                      <SelectTrigger id='renewable-type'>
                        <SelectValue placeholder='Seleccionar tipo' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='solar'>Solar</SelectItem>
                        <SelectItem value='wind'>Eólica</SelectItem>
                        <SelectItem value='hydro'>Hidroeléctrica</SelectItem>
                        <SelectItem value='biomass'>Biomasa</SelectItem>
                        <SelectItem value='other'>Otra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='renewable-percentage'>
                      Porcentaje del Consumo Total (%)
                    </Label>
                    <Input
                      id='renewable-percentage'
                      type='number'
                      placeholder='0'
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='alcance3' className='space-y-4 mt-6'>
          <h3 className='text-lg font-medium'>
            Otras Emisiones Indirectas (Alcance 3)
          </h3>
          <p className='text-sm text-muted-foreground mb-4'>
            Otras emisiones indirectas que ocurren en la cadena de valor de la
            empresa
          </p>

          <Card>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='business-travel'>
                    ¿Sus empleados realizan viajes de negocios?
                  </Label>
                  <RadioGroup defaultValue='yes' className='mt-2'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='yes' id='travel-yes' />
                      <Label htmlFor='travel-yes'>Sí</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='no' id='travel-no' />
                      <Label htmlFor='travel-no'>No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='air-travel'>Viajes en Avión (km/año)</Label>
                    <Input id='air-travel' type='number' placeholder='0' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='land-travel'>
                      Viajes Terrestres (km/año)
                    </Label>
                    <Input id='land-travel' type='number' placeholder='0' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='hotel-nights'>
                      Noches de Hotel (noches/año)
                    </Label>
                    <Input id='hotel-nights' type='number' placeholder='0' />
                  </div>
                </div>

                <div>
                  <Label htmlFor='employee-commuting'>
                    ¿Considera el transporte de empleados al trabajo?
                  </Label>
                  <RadioGroup defaultValue='no' className='mt-2'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='yes' id='commuting-yes' />
                      <Label htmlFor='commuting-yes'>Sí</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='no' id='commuting-no' />
                      <Label htmlFor='commuting-no'>No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='employee-count'>Número de Empleados</Label>
                    <Input id='employee-count' type='number' placeholder='0' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='commute-distance'>
                      Distancia Promedio (km/día)
                    </Label>
                    <Input
                      id='commute-distance'
                      type='number'
                      placeholder='0'
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor='waste-generation'>
                    ¿Su empresa genera residuos?
                  </Label>
                  <RadioGroup defaultValue='yes' className='mt-2'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='yes' id='waste-yes' />
                      <Label htmlFor='waste-yes'>Sí</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='no' id='waste-no' />
                      <Label htmlFor='waste-no'>No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='waste-type'>
                      Tipo de Residuo Principal
                    </Label>
                    <Select>
                      <SelectTrigger id='waste-type'>
                        <SelectValue placeholder='Seleccionar tipo' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='organic'>Orgánico</SelectItem>
                        <SelectItem value='paper'>Papel/Cartón</SelectItem>
                        <SelectItem value='plastic'>Plástico</SelectItem>
                        <SelectItem value='metal'>Metal</SelectItem>
                        <SelectItem value='electronic'>Electrónico</SelectItem>
                        <SelectItem value='hazardous'>Peligroso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='waste-quantity'>
                      Cantidad (toneladas/año)
                    </Label>
                    <Input id='waste-quantity' type='number' placeholder='0' />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='flex justify-end mt-6'>
            <Button onClick={handleComplete}>Completar Cuestionario</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
