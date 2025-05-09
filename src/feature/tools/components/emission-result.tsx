'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import type { EmissionData } from './emission-calculator';

interface EmissionsResultsProps {
  data: EmissionData;
}

export function EmissionsResults({ data }: EmissionsResultsProps) {
  const totalEmissions = data.total || 0.001; // Evitar división por cero

  const getPercentage = (value: number) => {
    return (value / totalEmissions) * 100;
  };

  // Calcular totales por sede para cada alcance
  const sedeData: Record<
    string,
    { scope1: number; scope2: number; scope3: number; total: number }
  > = {};

  // Procesar Alcance 1
  data.scope1.combustionFija.forEach((item) => {
    if (!sedeData[item.sede]) {
      sedeData[item.sede] = { scope1: 0, scope2: 0, scope3: 0, total: 0 };
    }
    sedeData[item.sede].scope1 += item.valor;
    sedeData[item.sede].total += item.valor;
  });

  data.scope1.gasesRefrigerantes.forEach((item) => {
    if (!sedeData[item.sede]) {
      sedeData[item.sede] = { scope1: 0, scope2: 0, scope3: 0, total: 0 };
    }
    sedeData[item.sede].scope1 += item.valor;
    sedeData[item.sede].total += item.valor;
  });

  // Procesar Alcance 2
  data.scope2.electricidad.forEach((item) => {
    if (!sedeData[item.sede]) {
      sedeData[item.sede] = { scope1: 0, scope2: 0, scope3: 0, total: 0 };
    }
    sedeData[item.sede].scope2 += item.valor;
    sedeData[item.sede].total += item.valor;
  });

  // Procesar Alcance 3
  data.scope3.transporte.forEach((item) => {
    if (!sedeData[item.sede]) {
      sedeData[item.sede] = { scope1: 0, scope2: 0, scope3: 0, total: 0 };
    }
    sedeData[item.sede].scope3 += item.valor;
    sedeData[item.sede].total += item.valor;
  });

  data.scope3.residuos.forEach((item) => {
    if (!sedeData[item.sede]) {
      sedeData[item.sede] = { scope1: 0, scope2: 0, scope3: 0, total: 0 };
    }
    sedeData[item.sede].scope3 += item.valor;
    sedeData[item.sede].total += item.valor;
  });

  data.scope3.viajesNegocios.forEach((item) => {
    if (!sedeData[item.sede]) {
      sedeData[item.sede] = { scope1: 0, scope2: 0, scope3: 0, total: 0 };
    }
    sedeData[item.sede].scope3 += item.valor;
    sedeData[item.sede].total += item.valor;
  });

  return (
    <div className='space-y-6'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[250px]'>Categoría</TableHead>
            <TableHead className='text-right'>Emisiones (tonCO₂e)</TableHead>
            <TableHead className='text-right'>Porcentaje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className='font-medium'>
              Alcance 1: Emisiones Directas
            </TableCell>
            <TableCell className='text-right'>
              {data.scope1.total.toFixed(4)}
            </TableCell>
            <TableCell className='text-right'>
              {getPercentage(data.scope1.total).toFixed(1)}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='pl-8'>Combustión Fija</TableCell>
            <TableCell className='text-right'>
              {data.scope1.combustionFija
                .reduce((sum, item) => sum + item.valor, 0)
                .toFixed(4)}
            </TableCell>
            <TableCell className='text-right'>
              {getPercentage(
                data.scope1.combustionFija.reduce(
                  (sum, item) => sum + item.valor,
                  0
                )
              ).toFixed(1)}
              %
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='pl-8'>Gases Refrigerantes</TableCell>
            <TableCell className='text-right'>
              {data.scope1.gasesRefrigerantes
                .reduce((sum, item) => sum + item.valor, 0)
                .toFixed(4)}
            </TableCell>
            <TableCell className='text-right'>
              {getPercentage(
                data.scope1.gasesRefrigerantes.reduce(
                  (sum, item) => sum + item.valor,
                  0
                )
              ).toFixed(1)}
              %
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-medium'>
              Alcance 2: Electricidad
            </TableCell>
            <TableCell className='text-right'>
              {data.scope2.total.toFixed(4)}
            </TableCell>
            <TableCell className='text-right'>
              {getPercentage(data.scope2.total).toFixed(1)}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-medium'>
              Alcance 3: Otras Indirectas
            </TableCell>
            <TableCell className='text-right'>
              {data.scope3.total.toFixed(4)}
            </TableCell>
            <TableCell className='text-right'>
              {getPercentage(data.scope3.total).toFixed(1)}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='pl-8'>Transporte</TableCell>
            <TableCell className='text-right'>
              {data.scope3.transporte
                .reduce((sum, item) => sum + item.valor, 0)
                .toFixed(4)}
            </TableCell>
            <TableCell className='text-right'>
              {getPercentage(
                data.scope3.transporte.reduce(
                  (sum, item) => sum + item.valor,
                  0
                )
              ).toFixed(1)}
              %
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='pl-8'>Residuos</TableCell>
            <TableCell className='text-right'>
              {data.scope3.residuos
                .reduce((sum, item) => sum + item.valor, 0)
                .toFixed(4)}
            </TableCell>
            <TableCell className='text-right'>
              {getPercentage(
                data.scope3.residuos.reduce((sum, item) => sum + item.valor, 0)
              ).toFixed(1)}
              %
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='pl-8'>Viajes de Negocios</TableCell>
            <TableCell className='text-right'>
              {data.scope3.viajesNegocios
                .reduce((sum, item) => sum + item.valor, 0)
                .toFixed(4)}
            </TableCell>
            <TableCell className='text-right'>
              {getPercentage(
                data.scope3.viajesNegocios.reduce(
                  (sum, item) => sum + item.valor,
                  0
                )
              ).toFixed(1)}
              %
            </TableCell>
          </TableRow>
          <TableRow className='font-bold'>
            <TableCell>TOTAL</TableCell>
            <TableCell className='text-right'>
              {data.total.toFixed(4)}
            </TableCell>
            <TableCell className='text-right'>100%</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className='space-y-2'>
        <div className='space-y-1'>
          <div className='flex justify-between text-sm'>
            <span>Alcance 1</span>
            <span>{getPercentage(data.scope1.total).toFixed(1)}%</span>
          </div>
          <Progress
            value={getPercentage(data.scope1.total)}
            className='h-2 bg-slate-200'
            style={{ backgroundColor: 'bg-emerald-500' }}
          />
        </div>
        <div className='space-y-1'>
          <div className='flex justify-between text-sm'>
            <span>Alcance 2</span>
            <span>{getPercentage(data.scope2.total).toFixed(1)}%</span>
          </div>
          <Progress
            value={getPercentage(data.scope2.total)}
            className='h-2 bg-slate-200'
            style={{ backgroundColor: 'bg-cyan-500' }}
          />
        </div>
        <div className='space-y-1'>
          <div className='flex justify-between text-sm'>
            <span>Alcance 3</span>
            <span>{getPercentage(data.scope3.total).toFixed(1)}%</span>
          </div>
          <Progress
            value={getPercentage(data.scope3.total)}
            className='h-2 bg-slate-200'
            style={{ backgroundColor: 'bg-purple-500' }}
          />
        </div>
      </div>

      {/* Tabla de emisiones por sede */}
      {Object.keys(sedeData).length > 0 && (
        <Card className='mt-4'>
          <CardContent className='pt-6'>
            <h4 className='font-medium mb-4'>Emisiones por Sede/Activo</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sede/Activo</TableHead>
                  <TableHead className='text-right'>Alcance 1</TableHead>
                  <TableHead className='text-right'>Alcance 2</TableHead>
                  <TableHead className='text-right'>Alcance 3</TableHead>
                  <TableHead className='text-right'>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(sedeData).map(([sede, data]) => (
                  <TableRow key={sede}>
                    <TableCell>{sede}</TableCell>
                    <TableCell className='text-right'>
                      {data.scope1.toFixed(4)}
                    </TableCell>
                    <TableCell className='text-right'>
                      {data.scope2.toFixed(4)}
                    </TableCell>
                    <TableCell className='text-right'>
                      {data.scope3.toFixed(4)}
                    </TableCell>
                    <TableCell className='text-right font-medium'>
                      {data.total.toFixed(4)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
