'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Plus, Trash2, Save, Edit, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import type { EmissionItem } from './emission-calculator';
import { toast } from 'sonner';

interface Scope1FormProps {
  onUpdate: (
    combustionFija: EmissionItem[],
    gasesRefrigerantes: EmissionItem[]
  ) => void;
  initialData: {
    combustionFija: EmissionItem[];
    gasesRefrigerantes: EmissionItem[];
  };
}

export function Scope1Form({ onUpdate, initialData }: Scope1FormProps) {
  // Combustión fija
  const [combustionItems, setCombustionItems] = useState<EmissionItem[]>(
    initialData.combustionFija || []
  );
  const [editingCombustion, setEditingCombustion] = useState<string | null>(
    null
  );

  // Formulario de combustión fija
  const [combustionSede, setCombustionSede] = useState('');
  const [combustionEquipo, setCombustionEquipo] = useState('');
  const [combustibleTipo, setCombustibleTipo] = useState('diesel');
  const [combustibleConsumo, setCombustibleConsumo] = useState<number>(0);
  const [combustionEmisiones, setCombustionEmisiones] = useState({
    co2: 0,
    ch4: 0,
    n2o: 0,
    total: 0,
    totalTon: 0
  });

  // Gases refrigerantes
  const [refrigeranteItems, setRefrigeranteItems] = useState<EmissionItem[]>(
    initialData.gasesRefrigerantes || []
  );
  const [editingRefrigerante, setEditingRefrigerante] = useState<string | null>(
    null
  );

  // Formulario de gases refrigerantes
  const [refrigeranteSede, setRefrigeranteSede] = useState('');
  const [refrigeranteTipo, setRefrigeranteTipo] = useState('R410A');
  const [refrigeranteConsumo, setRefrigeranteConsumo] = useState<number>(0);
  const [refrigeranteEmisiones, setRefrigeranteEmisiones] = useState({
    total: 0,
    totalTon: 0
  });

  // Factores de emisión
  const factoresCombustibles = {
    diesel: {
      co2: 10.15, // kgCO2/gal
      ch4: 0.004, // kgCH4/gal
      n2o: 0.022 // kgN2O/gal
    },
    gasolina: {
      co2: 7.9, // kgCO2/gal
      ch4: 0.0096, // kgCH4/gal
      n2o: 0.097 // kgN2O/gal
    },
    gnv: {
      co2: 1.96, // kgCO2/m3
      ch4: 0.001, // kgCH4/m3
      n2o: 0.001 // kgN2O/m3
    }
  };

  const factoresRefrigerantes = {
    R410A: 2088, // kgCO2e/kg
    R134A: 1300, // kgCO2e/kg
    R404A: 3943, // kgCO2e/kg
    R507A: 3985, // kgCO2e/kg
    R422D: 2230, // kgCO2e/kg
    R417A: 2127, // kgCO2e/kg
    'HCFC-22': 1760 // kgCO2e/kg
  };

  // Calcular emisiones de combustión fija
  useEffect(() => {
    const factorCombustible =
      factoresCombustibles[
        combustibleTipo as keyof typeof factoresCombustibles
      ];

    const emisionesCO2 = combustibleConsumo * factorCombustible.co2;
    const emisionesCH4 = combustibleConsumo * factorCombustible.ch4 * 29.8; // Factor GWP para CH4
    const emisionesN2O = combustibleConsumo * factorCombustible.n2o * 273; // Factor GWP para N2O

    const emisionesTotal = emisionesCO2 + emisionesCH4 + emisionesN2O;
    const emisionesTotalTon = emisionesTotal / 1000; // Convertir a tonCO2e

    setCombustionEmisiones({
      co2: emisionesCO2,
      ch4: emisionesCH4,
      n2o: emisionesN2O,
      total: emisionesTotal,
      totalTon: emisionesTotalTon
    });
  }, [combustibleTipo, combustibleConsumo]);

  // Calcular emisiones de gases refrigerantes
  useEffect(() => {
    const factorRefrigerante =
      factoresRefrigerantes[
        refrigeranteTipo as keyof typeof factoresRefrigerantes
      ];
    const emisionesTotal = refrigeranteConsumo * factorRefrigerante;
    const emisionesTotalTon = emisionesTotal / 1000; // Convertir a tonCO2e

    setRefrigeranteEmisiones({
      total: emisionesTotal,
      totalTon: emisionesTotalTon
    });
  }, [refrigeranteTipo, refrigeranteConsumo]);

  // Actualizar datos cuando cambian los items
  useEffect(() => {
    onUpdate(combustionItems, refrigeranteItems);
  }, [combustionItems, refrigeranteItems, onUpdate]);

  // Agregar o actualizar item de combustión
  const handleSaveCombustion = () => {
    if (!combustionSede) {
      toast.error('Por favor ingrese la sede/activo');
      return;
    }

    if (editingCombustion) {
      // Actualizar item existente
      setCombustionItems((prev) =>
        prev.map((item) =>
          item.id === editingCombustion
            ? {
                id: item.id,
                sede: combustionSede,
                equipo: combustionEquipo,
                combustible: combustibleTipo,
                consumo: combustibleConsumo,
                emisionesCO2: combustionEmisiones.co2,
                emisionesCH4: combustionEmisiones.ch4,
                emisionesN2O: combustionEmisiones.n2o,
                emisionesTotal: combustionEmisiones.total,
                valor: combustionEmisiones.totalTon
              }
            : item
        )
      );
      setEditingCombustion(null);
    } else {
      // Agregar nuevo item
      setCombustionItems((prev) => [
        ...prev,
        {
          id: uuidv4(),
          sede: combustionSede,
          equipo: combustionEquipo,
          combustible: combustibleTipo,
          consumo: combustibleConsumo,
          emisionesCO2: combustionEmisiones.co2,
          emisionesCH4: combustionEmisiones.ch4,
          emisionesN2O: combustionEmisiones.n2o,
          emisionesTotal: combustionEmisiones.total,
          valor: combustionEmisiones.totalTon
        }
      ]);
    }

    // Limpiar formulario
    setCombustionSede('');
    setCombustionEquipo('');
    setCombustibleTipo('diesel');
    setCombustibleConsumo(0);
  };

  // Editar item de combustión
  const handleEditCombustion = (id: string) => {
    const item = combustionItems.find((item) => item.id === id);
    if (item) {
      setCombustionSede(item.sede);
      setCombustionEquipo(item.equipo);
      setCombustibleTipo(item.combustible);
      setCombustibleConsumo(item.consumo);
      setEditingCombustion(id);
    }
  };

  // Eliminar item de combustión
  const handleDeleteCombustion = (id: string) => {
    setCombustionItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Registro eliminado');
  };

  // Agregar o actualizar item de refrigerante
  const handleSaveRefrigerante = () => {
    if (!refrigeranteSede) {
      toast.error('Por favor ingrese la sede/activo');
      return;
    }

    if (editingRefrigerante) {
      // Actualizar item existente
      setRefrigeranteItems((prev) =>
        prev.map((item) =>
          item.id === editingRefrigerante
            ? {
                id: item.id,
                sede: refrigeranteSede,
                tipo: refrigeranteTipo,
                consumo: refrigeranteConsumo,
                emisionesTotal: refrigeranteEmisiones.total,
                valor: refrigeranteEmisiones.totalTon
              }
            : item
        )
      );
      setEditingRefrigerante(null);
    } else {
      // Agregar nuevo item
      setRefrigeranteItems((prev) => [
        ...prev,
        {
          id: uuidv4(),
          sede: refrigeranteSede,
          tipo: refrigeranteTipo,
          consumo: refrigeranteConsumo,
          emisionesTotal: refrigeranteEmisiones.total,
          valor: refrigeranteEmisiones.totalTon
        }
      ]);
    }

    // Limpiar formulario
    setRefrigeranteSede('');
    setRefrigeranteTipo('R410A');
    setRefrigeranteConsumo(0);
  };

  // Editar item de refrigerante
  const handleEditRefrigerante = (id: string) => {
    const item = refrigeranteItems.find((item) => item.id === id);
    if (item) {
      setRefrigeranteSede(item.sede);
      setRefrigeranteTipo(item.tipo);
      setRefrigeranteConsumo(item.consumo);
      setEditingRefrigerante(id);
    }
  };

  // Eliminar item de refrigerante
  const handleDeleteRefrigerante = (id: string) => {
    setRefrigeranteItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Cancelar edición
  const handleCancelCombustion = () => {
    setEditingCombustion(null);
    setCombustionSede('');
    setCombustionEquipo('');
    setCombustibleTipo('diesel');
    setCombustibleConsumo(0);
  };

  const handleCancelRefrigerante = () => {
    setEditingRefrigerante(null);
    setRefrigeranteSede('');
    setRefrigeranteTipo('R410A');
    setRefrigeranteConsumo(0);
  };

  return (
    <div className='space-y-6'>
      <Tabs defaultValue='combustion' className='w-full max-w-4xl mx-auto'>
        <TabsList className='grid w-full grid-cols-2 mb-4'>
          <TabsTrigger className='cursor-pointer' value='combustion'>
            Combustión de Fuentes Fijas
          </TabsTrigger>
          <TabsTrigger className='cursor-pointer' value='refrigerantes'>
            Gases Refrigerantes
          </TabsTrigger>
        </TabsList>

        {/* Pestaña de Combustión Fija */}
        <TabsContent value='combustion'>
          <div className='space-y-6'>
            <Card>
              <CardContent className='pt-6'>
                <div className='flex flex-col justify-between items-center mb-4 text-center'>
                  <h3 className='text-lg font-medium'>
                    A1.1 Combustión de Fuentes Fijas
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Emisiones por quema de combustibles fósiles en equipos
                    estacionarios
                  </p>
                </div>

                <div className='grid gap-4 p-4 border rounded-md'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='combustion-sede'>Activo/Sede</Label>
                      <Input
                        id='combustion-sede'
                        placeholder='Ej: Sede Principal'
                        value={combustionSede}
                        onChange={(e) => setCombustionSede(e.target.value)}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='combustion-equipo'>Tipo de Equipo</Label>
                      <Input
                        id='combustion-equipo'
                        placeholder='Ej: Generador, Caldera'
                        value={combustionEquipo}
                        onChange={(e) => setCombustionEquipo(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='combustible-tipo'>
                        Tipo de Combustible
                      </Label>
                      <Select
                        value={combustibleTipo}
                        onValueChange={setCombustibleTipo}
                      >
                        <SelectTrigger
                          id='combustible-tipo'
                          className='w-full cursor-pointer'
                        >
                          <SelectValue placeholder='Seleccionar combustible' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className='cursor-pointer' value='diesel'>
                            Diesel
                          </SelectItem>
                          <SelectItem
                            className='cursor-pointer'
                            value='gasolina'
                          >
                            Gasolina
                          </SelectItem>
                          <SelectItem className='cursor-pointer' value='gnv'>
                            Gas Natural
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='combustible-consumo'>
                        Consumo Anual (
                        {combustibleTipo === 'gnv' ? 'm³' : 'gal'}/año)
                      </Label>
                      <Input
                        id='combustible-consumo'
                        type='number'
                        min='0'
                        step='0.01'
                        value={combustibleConsumo || ''}
                        onChange={(e) =>
                          setCombustibleConsumo(
                            Number.parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2'>
                    <div className='space-y-1'>
                      <Label className='text-xs'>Emisiones CO₂ (kgCO₂)</Label>
                      <div className='p-2 bg-muted border rounded text-sm text-muted-foreground'>
                        {combustionEmisiones.co2.toFixed(2)}
                      </div>
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-xs'>Emisiones CH₄ (kgCO₂e)</Label>
                      <div className='p-2 bg-muted border rounded text-sm text-muted-foreground'>
                        {combustionEmisiones.ch4.toFixed(2)}
                      </div>
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-xs'>Emisiones N₂O (kgCO₂e)</Label>
                      <div className='p-2 bg-muted border rounded text-sm text-muted-foreground'>
                        {combustionEmisiones.n2o.toFixed(2)}
                      </div>
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-xs'>Total (tonCO₂e)</Label>
                      <div className='p-2 bg-muted border rounded text-sm font-medium text-muted-foreground'>
                        {combustionEmisiones.totalTon.toFixed(4)}
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col sm:flex-row justify-end gap-2 mt-2'>
                    {editingCombustion && (
                      <Button
                        variant='outline'
                        className='cursor-pointer'
                        onClick={handleCancelCombustion}
                      >
                        <X className='mr-1 h-4 w-4' /> Cancelar
                      </Button>
                    )}
                    <Button
                      className='cursor-pointer'
                      onClick={handleSaveCombustion}
                    >
                      {editingCombustion ? (
                        <>
                          <Save className='mr-1 h-4 w-4' /> Actualizar
                        </>
                      ) : (
                        <>
                          <Plus className='mr-1 h-4 w-4' /> Agregar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {combustionItems.length > 0 && (
              <div className='mt-6'>
                <h4 className='font-medium mb-2'>
                  Fuentes de combustión registradas
                </h4>

                <div className='w-full overflow-auto border border-gray-200 rounded-lg shadow dark:border-gray-800'>
                  <Table className='text-sm'>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Activo/Sede</TableHead>
                        <TableHead>Equipo</TableHead>
                        <TableHead>Combustible</TableHead>
                        <TableHead className='text-right'>Consumo</TableHead>
                        <TableHead className='text-right'>
                          Emisiones (tonCO₂e)
                        </TableHead>
                        <TableHead className='text-right'>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {combustionItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.sede}</TableCell>
                          <TableCell>{item.equipo}</TableCell>
                          <TableCell>{item.combustible}</TableCell>
                          <TableCell className='text-right'>
                            {item.consumo}{' '}
                            {item.combustible === 'gnv' ? 'm³' : 'gal'}
                          </TableCell>
                          <TableCell className='text-right'>
                            {item.valor.toFixed(4)}
                          </TableCell>
                          <TableCell className='text-right'>
                            <div className='flex justify-end gap-2'>
                              <Button
                                variant='ghost'
                                size='icon'
                                onClick={() => handleEditCombustion(item.id)}
                              >
                                <Edit className='h-4 w-4' />
                              </Button>
                              <Button
                                variant='ghost'
                                size='icon'
                                onClick={() => handleDeleteCombustion(item.id)}
                              >
                                <Trash2 className='h-4 w-4 text-red-500' />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className='mt-4 flex flex-col sm:flex-row justify-between items-center'>
                  <div className='text-sm text-muted-foreground'>
                    Total de registros: {combustionItems.length}
                  </div>
                  <div className='font-medium'>
                    Total emisiones:{' '}
                    {combustionItems
                      .reduce((sum, item) => sum + item.valor, 0)
                      .toFixed(4)}{' '}
                    tonCO₂e
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Pestaña de Gases Refrigerantes */}
        <TabsContent value='refrigerantes'>
          <div className='space-y-6'>
            <Card>
              <CardContent className='pt-6'>
                <div className='flex flex-col justify-between items-center mb-4'>
                  <h3 className='text-lg font-medium'>
                    A1.2 Emisión de Gases Refrigerantes
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Emisiones por consumo de gases refrigerantes
                  </p>
                </div>

                {/* Formulario para agregar/editar */}
                <div className='grid gap-4 p-4 border rounded-md'>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='refrigerante-sede'>Activo/Sede</Label>
                      <Input
                        id='refrigerante-sede'
                        placeholder='Ej: Sede Principal'
                        value={refrigeranteSede}
                        onChange={(e) => setRefrigeranteSede(e.target.value)}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='refrigerante-tipo'>
                        Tipo de Gas Refrigerante
                      </Label>
                      <Select
                        value={refrigeranteTipo}
                        onValueChange={setRefrigeranteTipo}
                      >
                        <SelectTrigger
                          id='refrigerante-tipo'
                          className='w-full cursor-pointer'
                        >
                          <SelectValue placeholder='Seleccionar refrigerante' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className='cursor-pointer' value='R410A'>
                            R-410A
                          </SelectItem>
                          <SelectItem className='cursor-pointer' value='R134A'>
                            R-134A
                          </SelectItem>
                          <SelectItem className='cursor-pointer' value='R404A'>
                            R-404A
                          </SelectItem>
                          <SelectItem className='cursor-pointer' value='R507A'>
                            R-507A
                          </SelectItem>
                          <SelectItem className='cursor-pointer' value='R422D'>
                            R-422D
                          </SelectItem>
                          <SelectItem className='cursor-pointer' value='R417A'>
                            R-417A
                          </SelectItem>
                          <SelectItem
                            className='cursor-pointer'
                            value='HCFC-22'
                          >
                            HCFC-22
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='refrigerante-consumo'>
                        Consumo Anual (kg/año)
                      </Label>
                      <Input
                        id='refrigerante-consumo'
                        type='number'
                        min='0'
                        step='0.01'
                        value={refrigeranteConsumo || ''}
                        onChange={(e) =>
                          setRefrigeranteConsumo(
                            Number.parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4 mt-2'>
                    <div className='space-y-1'>
                      <Label className='text-xs'>
                        Emisiones Totales (kgCO₂e)
                      </Label>
                      <div className='p-2 bg-muted border rounded text-sm text-muted-foreground'>
                        {refrigeranteEmisiones.total.toFixed(2)}
                      </div>
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-xs'>Total (tonCO₂e)</Label>
                      <div className='p-2 bg-muted border rounded text-sm font-medium text-muted-foreground'>
                        {refrigeranteEmisiones.totalTon.toFixed(4)}
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-end gap-2 mt-2'>
                    {editingRefrigerante && (
                      <Button
                        variant='outline'
                        className='cursor-pointer'
                        onClick={handleCancelRefrigerante}
                      >
                        <X className='mr-1 h-4 w-4' /> Cancelar
                      </Button>
                    )}
                    <Button
                      className='cursor-pointer'
                      onClick={handleSaveRefrigerante}
                    >
                      {editingRefrigerante ? (
                        <>
                          <Save className='mr-1 h-4 w-4' /> Actualizar
                        </>
                      ) : (
                        <>
                          <Plus className='mr-1 h-4 w-4' /> Agregar
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Tabla de gases refrigerantes */}
                {refrigeranteItems.length > 0 && (
                  <div className='mt-6'>
                    <h4 className='font-medium mb-2'>
                      Gases refrigerantes registrados
                    </h4>
                    {/* Responsive table wrapper */}
                    <div className='w-full overflow-x-auto border border-gray-200 rounded-lg shadow dark:border-gray-800'>
                      <Table className='min-w-[300px]'>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Activo/Sede</TableHead>
                            <TableHead>Tipo de Gas</TableHead>
                            <TableHead className='text-right'>
                              Consumo (kg/año)
                            </TableHead>
                            <TableHead className='text-right'>
                              Emisiones (kgCO₂e)
                            </TableHead>
                            <TableHead className='text-right'>
                              Emisiones (tonCO₂e)
                            </TableHead>
                            <TableHead className='text-right'>
                              Acciones
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {refrigeranteItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.sede}</TableCell>
                              <TableCell>{item.tipo}</TableCell>
                              <TableCell className='text-right'>
                                {item.consumo}
                              </TableCell>
                              <TableCell className='text-right'>
                                {item.emisionesTotal.toFixed(2)}
                              </TableCell>
                              <TableCell className='text-right'>
                                {item.valor.toFixed(4)}
                              </TableCell>
                              <TableCell className='text-right'>
                                <div className='flex justify-end gap-2'>
                                  <Button
                                    variant='ghost'
                                    size='icon'
                                    onClick={() =>
                                      handleEditRefrigerante(item.id)
                                    }
                                  >
                                    <Edit className='h-4 w-4' />
                                  </Button>
                                  <Button
                                    variant='ghost'
                                    size='icon'
                                    onClick={() =>
                                      handleDeleteRefrigerante(item.id)
                                    }
                                  >
                                    <Trash2 className='h-4 w-4 text-red-500' />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div className='mt-4 flex flex-col sm:flex-row justify-between items-center'>
                      <div className='text-sm text-muted-foreground'>
                        Total de registros: {refrigeranteItems.length}
                      </div>
                      <div className='font-medium'>
                        Total emisiones:{' '}
                        {refrigeranteItems
                          .reduce((sum, item) => sum + item.valor, 0)
                          .toFixed(4)}{' '}
                        tonCO₂e
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Separator />

      <div className='flex flex-col sm:flex-row justify-between items-center pt-2'>
        <h3 className='text-lg font-medium'>Total Alcance 1</h3>
        <span className='text-xl font-bold'>
          {(
            combustionItems.reduce((sum, item) => sum + item.valor, 0) +
            refrigeranteItems.reduce((sum, item) => sum + item.valor, 0)
          ).toFixed(4)}{' '}
          tonCO₂e
        </span>
      </div>
    </div>
  );
}
