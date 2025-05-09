'use client';

import { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileDown } from 'lucide-react';
import { Scope1Form } from './scope-1-form';
import { Scope2Form } from './scope-2-form';
import { Scope3Form } from './scope-3-form';
import { EmissionsResults } from './emission-result';
import { EmissionsChart } from './emission-chart';

export type EmissionItem = {
  id: string;
  sede: string;
  valor: number;
  [key: string]: any;
};

export type EmissionData = {
  scope1: {
    combustionFija: EmissionItem[];
    gasesRefrigerantes: EmissionItem[];
    total: number;
  };
  scope2: {
    electricidad: EmissionItem[];
    total: number;
  };
  scope3: {
    transporte: EmissionItem[];
    residuos: EmissionItem[];
    viajesNegocios: EmissionItem[];
    total: number;
  };
  total: number;
};

export function EmissionCalculator() {
  const [emissionData, setEmissionData] = useState<EmissionData>({
    scope1: {
      combustionFija: [],
      gasesRefrigerantes: [],
      total: 0
    },
    scope2: {
      electricidad: [],
      total: 0
    },
    scope3: {
      transporte: [],
      residuos: [],
      viajesNegocios: [],
      total: 0
    },
    total: 0
  });

  const updateScope1 = useCallback(
    (combustionFija: EmissionItem[], gasesRefrigerantes: EmissionItem[]) => {
      const combustionTotal = combustionFija.reduce(
        (sum, item) => sum + item.valor,
        0
      );
      const refrigerantesTotal = gasesRefrigerantes.reduce(
        (sum, item) => sum + item.valor,
        0
      );
      const total = combustionTotal + refrigerantesTotal;

      setEmissionData((prev) => {
        const newData = {
          ...prev,
          scope1: {
            combustionFija,
            gasesRefrigerantes,
            total
          }
        };
        newData.total =
          newData.scope1.total + newData.scope2.total + newData.scope3.total;
        return newData;
      });
    },
    []
  );

  const updateScope2 = useCallback((electricidad: EmissionItem[]) => {
    const total = electricidad.reduce((sum, item) => sum + item.valor, 0);

    setEmissionData((prev) => {
      const newData = {
        ...prev,
        scope2: {
          electricidad,
          total
        }
      };
      newData.total =
        newData.scope1.total + newData.scope2.total + newData.scope3.total;
      return newData;
    });
  }, []);

  const updateScope3 = useCallback(
    (
      transporte: EmissionItem[],
      residuos: EmissionItem[],
      viajesNegocios: EmissionItem[]
    ) => {
      const transporteTotal = transporte.reduce(
        (sum, item) => sum + item.valor,
        0
      );
      const residuosTotal = residuos.reduce((sum, item) => sum + item.valor, 0);
      const viajesTotal = viajesNegocios.reduce(
        (sum, item) => sum + item.valor,
        0
      );
      const total = transporteTotal + residuosTotal + viajesTotal;

      setEmissionData((prev) => {
        const newData = {
          ...prev,
          scope3: {
            transporte,
            residuos,
            viajesNegocios,
            total
          }
        };
        newData.total =
          newData.scope1.total + newData.scope2.total + newData.scope3.total;
        return newData;
      });
    },
    []
  );

  const handleExport = () => {
    const dataStr = JSON.stringify(emissionData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

    const exportFileDefaultName = `huella-carbono-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleExportCSV = () => {
    // Crear cabeceras para el CSV
    let csvContent = 'Alcance,Categoría,Sede,Detalles,Emisiones (tonCO₂e)\n';

    // Agregar datos de Alcance 1
    emissionData.scope1.combustionFija.forEach((item) => {
      csvContent += `Alcance 1,Combustión Fija,${item.sede},"${item.equipo} - ${item.combustible}",${item.valor.toFixed(4)}\n`;
    });

    emissionData.scope1.gasesRefrigerantes.forEach((item) => {
      csvContent += `Alcance 1,Gases Refrigerantes,${item.sede},"${item.tipo}",${item.valor.toFixed(4)}\n`;
    });

    // Agregar datos de Alcance 2
    emissionData.scope2.electricidad.forEach((item) => {
      csvContent += `Alcance 2,Electricidad,${item.sede},"${item.consumo} MWh",${item.valor.toFixed(4)}\n`;
    });

    // Agregar datos de Alcance 3
    emissionData.scope3.transporte.forEach((item) => {
      csvContent += `Alcance 3,Transporte,${item.sede},"${item.tipo} - ${item.distancia} km",${item.valor.toFixed(4)}\n`;
    });

    emissionData.scope3.residuos.forEach((item) => {
      csvContent += `Alcance 3,Residuos,${item.sede},"${item.tipo} - ${item.cantidad} ton",${item.valor.toFixed(4)}\n`;
    });

    emissionData.scope3.viajesNegocios.forEach((item) => {
      csvContent += `Alcance 3,Viajes de Negocios,${item.sede},"${item.tipo} - ${item.distancia} km",${item.valor.toFixed(4)}\n`;
    });

    // Agregar totales
    csvContent += `\nTotales,,,\n`;
    csvContent += `Alcance 1,,,${emissionData.scope1.total.toFixed(4)}\n`;
    csvContent += `Alcance 2,,,${emissionData.scope2.total.toFixed(4)}\n`;
    csvContent += `Alcance 3,,,${emissionData.scope3.total.toFixed(4)}\n`;
    csvContent += `TOTAL,,,${emissionData.total.toFixed(4)}\n`;

    const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `huella-carbono-${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='grid gap-8 pb-12'>
      <Tabs defaultValue='scope1' className='w-full max-w-4xl mx-auto'>
        <TabsList className='grid w-full grid-cols-3 mb-4'>
          <TabsTrigger className='cursor-pointer' value='scope1'>
            Alcance 1
          </TabsTrigger>
          <TabsTrigger className='cursor-pointer' value='scope2'>
            Alcance 2
          </TabsTrigger>
          <TabsTrigger className='cursor-pointer' value='scope3'>
            Alcance 3
          </TabsTrigger>
        </TabsList>
        <TabsContent value='scope1'>
          <Card>
            <CardHeader>
              <CardTitle>Alcance 1: Emisiones Directas</CardTitle>
              <CardDescription>
                Emisiones directas provenientes de fuentes que son propiedad o
                están controladas por la organización.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Scope1Form
                onUpdate={updateScope1}
                initialData={{
                  combustionFija: emissionData.scope1.combustionFija,
                  gasesRefrigerantes: emissionData.scope1.gasesRefrigerantes
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='scope2'>
          <Card>
            <CardHeader>
              <CardTitle>
                Alcance 2: Emisiones Indirectas por Consumo de Electricidad
              </CardTitle>
              <CardDescription>
                Emisiones indirectas asociadas a la generación de electricidad
                adquirida y consumida por la organización.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Scope2Form
                onUpdate={updateScope2}
                initialData={emissionData.scope2.electricidad}
              />
              {/* SCOPE 2 */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='scope3'>
          <Card>
            <CardHeader>
              <CardTitle>Alcance 3: Otras Emisiones Indirectas</CardTitle>
              <CardDescription>
                Otras emisiones indirectas que ocurren en la cadena de valor de
                la organización.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Scope3Form
                onUpdate={updateScope3}
                initialData={{
                  transporte: emissionData.scope3.transporte,
                  residuos: emissionData.scope3.residuos,
                  viajesNegocios: emissionData.scope3.viajesNegocios
                }}
              />
              {/* SCOPE 3 */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className='grid gap-8 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Resultados de Emisiones</CardTitle>
            <CardDescription>
              Resumen de emisiones de GEI por alcance (tonCO₂e)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmissionsResults data={emissionData} />
            <div className='mt-4 flex justify-end gap-2'>
              <Button onClick={handleExportCSV} variant='outline'>
                <FileDown className='mr-2 h-4 w-4' />
                Exportar CSV
              </Button>
              <Button onClick={handleExport} variant='outline'>
                <Download className='mr-2 h-4 w-4' />
                Exportar JSON
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Visualización de Emisiones</CardTitle>
            <CardDescription>
              Distribución de emisiones por alcance y categoría
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmissionsChart data={emissionData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
