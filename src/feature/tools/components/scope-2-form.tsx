'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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

interface Scope2FormProps {
  onUpdate: (electricidad: EmissionItem[]) => void;
  initialData: EmissionItem[];
}

export function Scope2Form({ onUpdate, initialData }: Scope2FormProps) {
  const [electricidadItems, setElectricidadItems] = useState<EmissionItem[]>(
    initialData || []
  );
  const [editingElectricidad, setEditingElectricidad] = useState<string | null>(
    null
  );

  // Formulario de electricidad
  const [electricidadSede, setElectricidadSede] = useState('');
  const [consumoElectricidad, setConsumoElectricidad] = useState<number>(0);
  const [emisionesElectricidad, setEmisionesElectricidad] = useState<number>(0);

  // Factor de emisión de la red eléctrica de Colombia (SIN)
  const factorEmisionElectricidad = 0.112; // tonCO2e/MWh

  useEffect(() => {
    // Calcular emisiones por consumo de electricidad
    const emisiones = consumoElectricidad * factorEmisionElectricidad;
    setEmisionesElectricidad(emisiones);
  }, [consumoElectricidad, factorEmisionElectricidad]);

  // Actualizar datos cuando cambian los items
  useEffect(() => {
    onUpdate(electricidadItems);
  }, [electricidadItems, onUpdate]);

  // Agregar o actualizar item de electricidad
  const handleSaveElectricidad = () => {
    if (!electricidadSede) {
      toast.error('Por favor ingrese la sede/activo');
      return;
    }

    if (editingElectricidad) {
      // Actualizar item existente
      setElectricidadItems((prev) =>
        prev.map((item) =>
          item.id === editingElectricidad
            ? {
                id: item.id,
                sede: electricidadSede,
                consumo: consumoElectricidad,
                factor: factorEmisionElectricidad,
                valor: emisionesElectricidad
              }
            : item
        )
      );
      setEditingElectricidad(null);
    } else {
      // Agregar nuevo item
      setElectricidadItems((prev) => [
        ...prev,
        {
          id: uuidv4(),
          sede: electricidadSede,
          consumo: consumoElectricidad,
          factor: factorEmisionElectricidad,
          valor: emisionesElectricidad
        }
      ]);
    }

    // Limpiar formulario
    setElectricidadSede('');
    setConsumoElectricidad(0);
  };

  // Editar item de electricidad
  const handleEditElectricidad = (id: string) => {
    const item = electricidadItems.find((item) => item.id === id);
    if (item) {
      setElectricidadSede(item.sede);
      setConsumoElectricidad(item.consumo);
      setEditingElectricidad(id);
    }
  };

  // Eliminar item de electricidad
  const handleDeleteElectricidad = (id: string) => {
    setElectricidadItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Cancelar edición
  const handleCancelElectricidad = () => {
    setEditingElectricidad(null);
    setElectricidadSede('');
    setConsumoElectricidad(0);
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardContent className='pt-6'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-lg font-medium'>
              Consumo de Energía Eléctrica
            </h3>
            <p className='text-sm text-muted-foreground'>
              Emisiones indirectas por consumo de electricidad
            </p>
          </div>

          {/* Formulario para agregar/editar */}
          <div className='grid gap-4 p-4 border rounded-md bg-slate-50'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='electricidad-sede'>Activo/Sede</Label>
                <Input
                  id='electricidad-sede'
                  placeholder='Ej: Sede Principal'
                  value={electricidadSede}
                  onChange={(e) => setElectricidadSede(e.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='electricidad-consumo'>
                  Consumo Anual (MWh/año)
                </Label>
                <Input
                  id='electricidad-consumo'
                  type='number'
                  min='0'
                  step='0.01'
                  value={consumoElectricidad || ''}
                  onChange={(e) =>
                    setConsumoElectricidad(
                      Number.parseFloat(e.target.value) || 0
                    )
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='electricidad-factor'>
                  Factor de Emisión (tonCO₂e/MWh)
                </Label>
                <Input
                  id='electricidad-factor'
                  type='number'
                  value={factorEmisionElectricidad}
                  disabled
                />
              </div>
            </div>

            <div className='grid grid-cols-1 gap-4 mt-2'>
              <div className='space-y-1'>
                <Label className='text-xs'>Emisiones Totales (tonCO₂e)</Label>
                <div className='p-2 bg-white border rounded text-sm font-medium'>
                  {emisionesElectricidad.toFixed(4)}
                </div>
              </div>
            </div>

            <div className='flex justify-end gap-2 mt-2'>
              {editingElectricidad && (
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleCancelElectricidad}
                >
                  <X className='mr-1 h-4 w-4' /> Cancelar
                </Button>
              )}
              <Button onClick={handleSaveElectricidad}>
                {editingElectricidad ? (
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

          {/* Tabla de items agregados */}
          {electricidadItems.length > 0 && (
            <div className='mt-6'>
              <h4 className='font-medium mb-2'>
                Consumos de electricidad registrados
              </h4>
              <div className='border rounded-md overflow-hidden'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Activo/Sede</TableHead>
                      <TableHead className='text-right'>
                        Consumo (MWh/año)
                      </TableHead>
                      <TableHead className='text-right'>
                        Factor (tonCO₂e/MWh)
                      </TableHead>
                      <TableHead className='text-right'>
                        Emisiones (tonCO₂e)
                      </TableHead>
                      <TableHead className='text-right'>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {electricidadItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.sede}</TableCell>
                        <TableCell className='text-right'>
                          {item.consumo}
                        </TableCell>
                        <TableCell className='text-right'>
                          {item.factor}
                        </TableCell>
                        <TableCell className='text-right'>
                          {item.valor.toFixed(4)}
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex justify-end gap-2'>
                            <Button
                              variant='ghost'
                              size='icon'
                              onClick={() => handleEditElectricidad(item.id)}
                            >
                              <Edit className='h-4 w-4' />
                            </Button>
                            <Button
                              variant='ghost'
                              size='icon'
                              onClick={() => handleDeleteElectricidad(item.id)}
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

              <div className='mt-4 flex justify-between items-center'>
                <div className='text-sm text-muted-foreground'>
                  Total de registros: {electricidadItems.length}
                </div>
                <div className='font-medium'>
                  Total emisiones:{' '}
                  {electricidadItems
                    .reduce((sum, item) => sum + item.valor, 0)
                    .toFixed(4)}{' '}
                  tonCO₂e
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      <div className='flex justify-between items-center pt-2'>
        <h3 className='text-lg font-medium'>Total Alcance 2</h3>
        <span className='text-xl font-bold'>
          {electricidadItems
            .reduce((sum, item) => sum + item.valor, 0)
            .toFixed(4)}{' '}
          tonCO₂e
        </span>
      </div>
    </div>
  );
}
