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

interface Scope3FormProps {
  onUpdate: (
    transporte: EmissionItem[],
    residuos: EmissionItem[],
    viajesNegocios: EmissionItem[]
  ) => void;
  initialData: {
    transporte: EmissionItem[];
    residuos: EmissionItem[];
    viajesNegocios: EmissionItem[];
  };
}

export function Scope3Form({ onUpdate, initialData }: Scope3FormProps) {
  // Transporte
  const [transporteItems, setTransporteItems] = useState<EmissionItem[]>(
    initialData.transporte || []
  );
  const [editingTransporte, setEditingTransporte] = useState<string | null>(
    null
  );

  // Formulario de transporte
  const [transporteSede, setTransporteSede] = useState('');
  const [transporteTipo, setTransporteTipo] = useState('automovil');
  const [transporteDistancia, setTransporteDistancia] = useState<number>(0);
  const [transporteEmisiones, setTransporteEmisiones] = useState<number>(0);

  // Residuos
  const [residuosItems, setResiduosItems] = useState<EmissionItem[]>(
    initialData.residuos || []
  );
  const [editingResiduos, setEditingResiduos] = useState<string | null>(null);

  // Formulario de residuos
  const [residuosSede, setResiduosSede] = useState('');
  const [residuosTipo, setResiduosTipo] = useState('relleno');
  const [residuosCantidad, setResiduosCantidad] = useState<number>(0);
  const [residuosEmisiones, setResiduosEmisiones] = useState<number>(0);

  // Viajes de negocios
  const [viajesItems, setViajesItems] = useState<EmissionItem[]>(
    initialData.viajesNegocios || []
  );
  const [editingViajes, setEditingViajes] = useState<string | null>(null);

  // Formulario de viajes de negocios
  const [viajesSede, setViajesSede] = useState('');
  const [viajesTipo, setViajesTipo] = useState('aereo');
  const [viajesDistancia, setViajesDistancia] = useState<number>(0);
  const [viajesEmisiones, setViajesEmisiones] = useState<number>(0);

  // Factores de emisión para transporte (kgCO2e/km)
  const factoresTransporte = {
    automovil: 0.189,
    taxi: 0.149,
    moto: 0.025,
    bus: 0.035,
    microbus: 0.022,
    metroplus: 0.011,
    van: 0.209
  };

  // Factores de emisión para residuos (kgCO2e/ton)
  const factoresResiduos = {
    relleno: 616, // Relleno sanitario (kgCO2e/ton)
    celda: 198, // Celda de seguridad (kgCO2e/ton)
    compostaje: 10, // Compostaje (kgCO2e/ton)
    reciclaje: -1150 // Reciclaje de cartón (kgCO2e/ton) - valor negativo por evitar emisiones
  };

  // Factores de emisión para viajes de negocios (kgCO2e/km)
  const factoresViajes = {
    aereo: 0.255, // Vuelo corto (<500km) (kgCO2e/km)
    aereoLargo: 0.15, // Vuelo largo (>500km) (kgCO2e/km)
    tren: 0.041, // Tren (kgCO2e/km)
    autobus: 0.027 // Autobús interurbano (kgCO2e/km)
  };

  // Calcular emisiones de transporte
  useEffect(() => {
    const factorTransporte =
      factoresTransporte[transporteTipo as keyof typeof factoresTransporte];
    const emisiones = (transporteDistancia * factorTransporte) / 1000; // Convertir a tonCO2e
    setTransporteEmisiones(emisiones);
  }, [transporteTipo, transporteDistancia]);

  // Calcular emisiones de residuos
  useEffect(() => {
    const factorResiduos =
      factoresResiduos[residuosTipo as keyof typeof factoresResiduos];
    const emisiones = (residuosCantidad * factorResiduos) / 1000; // Convertir a tonCO2e
    setResiduosEmisiones(emisiones);
  }, [residuosTipo, residuosCantidad]);

  // Calcular emisiones de viajes de negocios
  useEffect(() => {
    const factorViajes =
      factoresViajes[viajesTipo as keyof typeof factoresViajes];
    const emisiones = (viajesDistancia * factorViajes) / 1000; // Convertir a tonCO2e
    setViajesEmisiones(emisiones);
  }, [viajesTipo, viajesDistancia]);

  // Actualizar datos cuando cambian los items
  useEffect(() => {
    onUpdate(transporteItems, residuosItems, viajesItems);
  }, [transporteItems, residuosItems, viajesItems, onUpdate]);

  // Agregar o actualizar item de transporte
  const handleSaveTransporte = () => {
    if (!transporteSede) {
      toast.error('Por favor ingrese la sede/activo');
      return;
    }

    if (editingTransporte) {
      // Actualizar item existente
      setTransporteItems((prev) =>
        prev.map((item) =>
          item.id === editingTransporte
            ? {
                id: item.id,
                sede: transporteSede,
                tipo: transporteTipo,
                distancia: transporteDistancia,
                factor:
                  factoresTransporte[
                    transporteTipo as keyof typeof factoresTransporte
                  ],
                valor: transporteEmisiones
              }
            : item
        )
      );
      setEditingTransporte(null);
    } else {
      // Agregar nuevo item
      setTransporteItems((prev) => [
        ...prev,
        {
          id: uuidv4(),
          sede: transporteSede,
          tipo: transporteTipo,
          distancia: transporteDistancia,
          factor:
            factoresTransporte[
              transporteTipo as keyof typeof factoresTransporte
            ],
          valor: transporteEmisiones
        }
      ]);
    }

    // Limpiar formulario
    setTransporteSede('');
    setTransporteTipo('automovil');
    setTransporteDistancia(0);
  };

  // Agregar o actualizar item de residuos
  const handleSaveResiduos = () => {
    if (!residuosSede) {
      toast.error('Por favor ingrese la sede/activo');
      return;
    }

    if (editingResiduos) {
      // Actualizar item existente
      setResiduosItems((prev) =>
        prev.map((item) =>
          item.id === editingResiduos
            ? {
                id: item.id,
                sede: residuosSede,
                tipo: residuosTipo,
                cantidad: residuosCantidad,
                factor:
                  factoresResiduos[
                    residuosTipo as keyof typeof factoresResiduos
                  ],
                valor: residuosEmisiones
              }
            : item
        )
      );
      setEditingResiduos(null);
    } else {
      // Agregar nuevo item
      setResiduosItems((prev) => [
        ...prev,
        {
          id: uuidv4(),
          sede: residuosSede,
          tipo: residuosTipo,
          cantidad: residuosCantidad,
          factor:
            factoresResiduos[residuosTipo as keyof typeof factoresResiduos],
          valor: residuosEmisiones
        }
      ]);
    }

    // Limpiar formulario
    setResiduosSede('');
    setResiduosTipo('relleno');
    setResiduosCantidad(0);
  };

  // Agregar o actualizar item de viajes
  const handleSaveViajes = () => {
    if (!viajesSede) {
      toast.error('Por favor ingrese la sede/activo');
      return;
    }

    if (editingViajes) {
      // Actualizar item existente
      setViajesItems((prev) =>
        prev.map((item) =>
          item.id === editingViajes
            ? {
                id: item.id,
                sede: viajesSede,
                tipo: viajesTipo,
                distancia: viajesDistancia,
                factor:
                  factoresViajes[viajesTipo as keyof typeof factoresViajes],
                valor: viajesEmisiones
              }
            : item
        )
      );
      setEditingViajes(null);
    } else {
      // Agregar nuevo item
      setViajesItems((prev) => [
        ...prev,
        {
          id: uuidv4(),
          sede: viajesSede,
          tipo: viajesTipo,
          distancia: viajesDistancia,
          factor: factoresViajes[viajesTipo as keyof typeof factoresViajes],
          valor: viajesEmisiones
        }
      ]);
    }

    // Limpiar formulario
    setViajesSede('');
    setViajesTipo('aereo');
    setViajesDistancia(0);
  };

  // Editar items
  const handleEditTransporte = (id: string) => {
    const item = transporteItems.find((item) => item.id === id);
    if (item) {
      setTransporteSede(item.sede);
      setTransporteTipo(item.tipo);
      setTransporteDistancia(item.distancia);
      setEditingTransporte(id);
    }
  };

  const handleEditResiduos = (id: string) => {
    const item = residuosItems.find((item) => item.id === id);
    if (item) {
      setResiduosSede(item.sede);
      setResiduosTipo(item.tipo);
      setResiduosCantidad(item.cantidad);
      setEditingResiduos(id);
    }
  };

  const handleEditViajes = (id: string) => {
    const item = viajesItems.find((item) => item.id === id);
    if (item) {
      setViajesSede(item.sede);
      setViajesTipo(item.tipo);
      setViajesDistancia(item.distancia);
      setEditingViajes(id);
    }
  };

  // Eliminar items
  const handleDeleteTransporte = (id: string) => {
    setTransporteItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteResiduos = (id: string) => {
    setResiduosItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteViajes = (id: string) => {
    setViajesItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Cancelar edición
  const handleCancelTransporte = () => {
    setEditingTransporte(null);
    setTransporteSede('');
    setTransporteTipo('automovil');
    setTransporteDistancia(0);
  };

  const handleCancelResiduos = () => {
    setEditingResiduos(null);
    setResiduosSede('');
    setResiduosTipo('relleno');
    setResiduosCantidad(0);
  };

  const handleCancelViajes = () => {
    setEditingViajes(null);
    setViajesSede('');
    setViajesTipo('aereo');
    setViajesDistancia(0);
  };

  return (
    <div className='space-y-6'>
      <Tabs defaultValue='transporte' className='w-full max-w-4xl mx-auto'>
        <TabsList className='grid w-full grid-cols-3 mb-4'>
          <TabsTrigger value='transporte'>Transporte</TabsTrigger>
          <TabsTrigger value='residuos'>Residuos</TabsTrigger>
          <TabsTrigger value='viajes'>Viajes de Negocios</TabsTrigger>
        </TabsList>

        {/* Pestaña de Transporte */}
        <TabsContent value='transporte'>
          <div className='space-y-6'>
            <Card>
              <CardContent className='pt-6'>
                <div className='flex justify-between items-center mb-4'>
                  <h3 className='text-lg font-medium'>
                    Transporte y Distribución
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Emisiones por transporte de materiales, productos y residuos
                  </p>
                </div>

                {/* Formulario para agregar/editar */}
                <div className='grid gap-4 p-4 border rounded-md bg-slate-50'>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='transporte-sede'>Activo/Sede</Label>
                      <Input
                        id='transporte-sede'
                        placeholder='Ej: Sede Principal'
                        value={transporteSede}
                        onChange={(e) => setTransporteSede(e.target.value)}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='transporte-tipo'>
                        Tipo de Transporte
                      </Label>
                      <Select
                        value={transporteTipo}
                        onValueChange={setTransporteTipo}
                      >
                        <SelectTrigger id='transporte-tipo'>
                          <SelectValue placeholder='Seleccionar tipo' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='automovil'>Automóvil</SelectItem>
                          <SelectItem value='taxi'>Taxi</SelectItem>
                          <SelectItem value='moto'>Moto</SelectItem>
                          <SelectItem value='bus'>Bus</SelectItem>
                          <SelectItem value='microbus'>Microbús</SelectItem>
                          <SelectItem value='metroplus'>Metroplús</SelectItem>
                          <SelectItem value='van'>Van</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='transporte-distancia'>
                        Distancia Anual (km/año)
                      </Label>
                      <Input
                        id='transporte-distancia'
                        type='number'
                        min='0'
                        step='1'
                        value={transporteDistancia || ''}
                        onChange={(e) =>
                          setTransporteDistancia(
                            Number.parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 gap-4 mt-2'>
                    <div className='space-y-1'>
                      <Label className='text-xs'>
                        Emisiones Totales (tonCO₂e)
                      </Label>
                      <div className='p-2 bg-white border rounded text-sm font-medium'>
                        {transporteEmisiones.toFixed(4)}
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-end gap-2 mt-2'>
                    {editingTransporte && (
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={handleCancelTransporte}
                      >
                        <X className='mr-1 h-4 w-4' /> Cancelar
                      </Button>
                    )}
                    <Button onClick={handleSaveTransporte}>
                      {editingTransporte ? (
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
                {transporteItems.length > 0 && (
                  <div className='mt-6'>
                    <h4 className='font-medium mb-2'>
                      Transportes registrados
                    </h4>
                    <div className='border rounded-md overflow-hidden'>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Activo/Sede</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead className='text-right'>
                              Distancia (km/año)
                            </TableHead>
                            <TableHead className='text-right'>
                              Factor (kgCO₂e/km)
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
                          {transporteItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.sede}</TableCell>
                              <TableCell>{item.tipo}</TableCell>
                              <TableCell className='text-right'>
                                {item.distancia}
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
                                    onClick={() =>
                                      handleEditTransporte(item.id)
                                    }
                                  >
                                    <Edit className='h-4 w-4' />
                                  </Button>
                                  <Button
                                    variant='ghost'
                                    size='icon'
                                    onClick={() =>
                                      handleDeleteTransporte(item.id)
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

                    <div className='mt-4 flex justify-between items-center'>
                      <div className='text-sm text-muted-foreground'>
                        Total de registros: {transporteItems.length}
                      </div>
                      <div className='font-medium'>
                        Total emisiones:{' '}
                        {transporteItems
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

        {/* Pestaña de Residuos */}
        <TabsContent value='residuos'>
          <div className='space-y-6'>
            <Card>
              <CardContent className='pt-6'>
                <div className='flex justify-between items-center mb-4'>
                  <h3 className='text-lg font-medium'>Gestión de Residuos</h3>
                  <p className='text-sm text-muted-foreground'>
                    Emisiones por tratamiento y disposición de residuos
                  </p>
                </div>

                {/* Formulario para agregar/editar */}
                <div className='grid gap-4 p-4 border rounded-md bg-slate-50'>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='residuos-sede'>Activo/Sede</Label>
                      <Input
                        id='residuos-sede'
                        placeholder='Ej: Sede Principal'
                        value={residuosSede}
                        onChange={(e) => setResiduosSede(e.target.value)}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='residuos-tipo'>Tipo de Disposición</Label>
                      <Select
                        value={residuosTipo}
                        onValueChange={setResiduosTipo}
                      >
                        <SelectTrigger id='residuos-tipo'>
                          <SelectValue placeholder='Seleccionar tipo' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='relleno'>
                            Relleno Sanitario
                          </SelectItem>
                          <SelectItem value='celda'>
                            Celda de Seguridad
                          </SelectItem>
                          <SelectItem value='compostaje'>Compostaje</SelectItem>
                          <SelectItem value='reciclaje'>Reciclaje</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='residuos-cantidad'>
                        Cantidad Anual (ton/año)
                      </Label>
                      <Input
                        id='residuos-cantidad'
                        type='number'
                        min='0'
                        step='0.01'
                        value={residuosCantidad || ''}
                        onChange={(e) =>
                          setResiduosCantidad(
                            Number.parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 gap-4 mt-2'>
                    <div className='space-y-1'>
                      <Label className='text-xs'>
                        Emisiones Totales (tonCO₂e)
                      </Label>
                      <div className='p-2 bg-white border rounded text-sm font-medium'>
                        {residuosEmisiones.toFixed(4)}
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-end gap-2 mt-2'>
                    {editingResiduos && (
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={handleCancelResiduos}
                      >
                        <X className='mr-1 h-4 w-4' /> Cancelar
                      </Button>
                    )}
                    <Button onClick={handleSaveResiduos}>
                      {editingResiduos ? (
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
                {residuosItems.length > 0 && (
                  <div className='mt-6'>
                    <h4 className='font-medium mb-2'>Residuos registrados</h4>
                    <div className='border rounded-md overflow-hidden'>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Activo/Sede</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead className='text-right'>
                              Cantidad (ton/año)
                            </TableHead>
                            <TableHead className='text-right'>
                              Factor (kgCO₂e/ton)
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
                          {residuosItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.sede}</TableCell>
                              <TableCell>{item.tipo}</TableCell>
                              <TableCell className='text-right'>
                                {item.cantidad}
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
                                    onClick={() => handleEditResiduos(item.id)}
                                  >
                                    <Edit className='h-4 w-4' />
                                  </Button>
                                  <Button
                                    variant='ghost'
                                    size='icon'
                                    onClick={() =>
                                      handleDeleteResiduos(item.id)
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

                    <div className='mt-4 flex justify-between items-center'>
                      <div className='text-sm text-muted-foreground'>
                        Total de registros: {residuosItems.length}
                      </div>
                      <div className='font-medium'>
                        Total emisiones:{' '}
                        {residuosItems
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

        {/* Pestaña de Viajes de Negocios */}
        <TabsContent value='viajes'>
          <div className='space-y-6'>
            <Card>
              <CardContent className='pt-6'>
                <div className='flex justify-between items-center mb-4'>
                  <h3 className='text-lg font-medium'>Viajes de Negocios</h3>
                  <p className='text-sm text-muted-foreground'>
                    Emisiones por viajes de empleados por motivos de trabajo
                  </p>
                </div>

                {/* Formulario para agregar/editar */}
                <div className='grid gap-4 p-4 border rounded-md bg-slate-50'>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='viajes-sede'>Activo/Sede</Label>
                      <Input
                        id='viajes-sede'
                        placeholder='Ej: Sede Principal'
                        value={viajesSede}
                        onChange={(e) => setViajesSede(e.target.value)}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='viajes-tipo'>Tipo de Viaje</Label>
                      <Select value={viajesTipo} onValueChange={setViajesTipo}>
                        <SelectTrigger id='viajes-tipo'>
                          <SelectValue placeholder='Seleccionar tipo' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='aereo'>Aéreo (corto)</SelectItem>
                          <SelectItem value='aereoLargo'>
                            Aéreo (largo)
                          </SelectItem>
                          <SelectItem value='tren'>Tren</SelectItem>
                          <SelectItem value='autobus'>Autobús</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='viajes-distancia'>
                        Distancia Anual (km/año)
                      </Label>
                      <Input
                        id='viajes-distancia'
                        type='number'
                        min='0'
                        step='1'
                        value={viajesDistancia || ''}
                        onChange={(e) =>
                          setViajesDistancia(
                            Number.parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 gap-4 mt-2'>
                    <div className='space-y-1'>
                      <Label className='text-xs'>
                        Emisiones Totales (tonCO₂e)
                      </Label>
                      <div className='p-2 bg-white border rounded text-sm font-medium'>
                        {viajesEmisiones.toFixed(4)}
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-end gap-2 mt-2'>
                    {editingViajes && (
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={handleCancelViajes}
                      >
                        <X className='mr-1 h-4 w-4' /> Cancelar
                      </Button>
                    )}
                    <Button onClick={handleSaveViajes}>
                      {editingViajes ? (
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
                {viajesItems.length > 0 && (
                  <div className='mt-6'>
                    <h4 className='font-medium mb-2'>Viajes registrados</h4>
                    <div className='border rounded-md overflow-hidden'>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Activo/Sede</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead className='text-right'>
                              Distancia (km/año)
                            </TableHead>
                            <TableHead className='text-right'>
                              Factor (kgCO₂e/km)
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
                          {viajesItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.sede}</TableCell>
                              <TableCell>{item.tipo}</TableCell>
                              <TableCell className='text-right'>
                                {item.distancia}
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
                                    onClick={() => handleEditViajes(item.id)}
                                  >
                                    <Edit className='h-4 w-4' />
                                  </Button>
                                  <Button
                                    variant='ghost'
                                    size='icon'
                                    onClick={() => handleDeleteViajes(item.id)}
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
                        Total de registros: {viajesItems.length}
                      </div>
                      <div className='font-medium'>
                        Total emisiones:{' '}
                        {viajesItems
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

      <div className='flex justify-between items-center pt-2'>
        <h3 className='text-lg font-medium'>Total Alcance 3</h3>
        <span className='text-xl font-bold'>
          {(
            transporteItems.reduce((sum, item) => sum + item.valor, 0) +
            residuosItems.reduce((sum, item) => sum + item.valor, 0) +
            viajesItems.reduce((sum, item) => sum + item.valor, 0)
          ).toFixed(4)}{' '}
          tonCO₂e
        </span>
      </div>
    </div>
  );
}
