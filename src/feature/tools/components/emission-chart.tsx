'use client';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import type { EmissionData } from './emission-calculator';

interface EmissionsChartProps {
  data: EmissionData;
}

export function EmissionsChart({ data }: EmissionsChartProps) {
  // Preparar datos para el gráfico de pastel por alcance
  const pieData = [
    { name: 'Alcance 1', value: data.scope1.total },
    { name: 'Alcance 2', value: data.scope2.total },
    { name: 'Alcance 3', value: data.scope3.total }
  ].filter((item) => item.value > 0);

  // Preparar datos para el gráfico de barras por categoría
  const barData = [
    {
      name: 'Combustión Fija',
      value: data.scope1.combustionFija.reduce(
        (sum, item) => sum + item.valor,
        0
      ),
      scope: 'Alcance 1'
    },
    {
      name: 'Gases Refrigerantes',
      value: data.scope1.gasesRefrigerantes.reduce(
        (sum, item) => sum + item.valor,
        0
      ),
      scope: 'Alcance 1'
    },
    {
      name: 'Electricidad',
      value: data.scope2.electricidad.reduce(
        (sum, item) => sum + item.valor,
        0
      ),
      scope: 'Alcance 2'
    },
    {
      name: 'Transporte',
      value: data.scope3.transporte.reduce((sum, item) => sum + item.valor, 0),
      scope: 'Alcance 3'
    },
    {
      name: 'Residuos',
      value: data.scope3.residuos.reduce((sum, item) => sum + item.valor, 0),
      scope: 'Alcance 3'
    },
    {
      name: 'Viajes de Negocios',
      value: data.scope3.viajesNegocios.reduce(
        (sum, item) => sum + item.valor,
        0
      ),
      scope: 'Alcance 3'
    }
  ].filter((item) => item.value > 0);

  // Preparar datos para el gráfico de área por sede
  const sedeMap: Record<
    string,
    {
      sede: string;
      scope1: number;
      scope2: number;
      scope3: number;
      total: number;
    }
  > = {};

  // Procesar Alcance 1
  data.scope1.combustionFija.forEach((item) => {
    if (!sedeMap[item.sede]) {
      sedeMap[item.sede] = {
        sede: item.sede,
        scope1: 0,
        scope2: 0,
        scope3: 0,
        total: 0
      };
    }
    sedeMap[item.sede].scope1 += item.valor;
    sedeMap[item.sede].total += item.valor;
  });

  data.scope1.gasesRefrigerantes.forEach((item) => {
    if (!sedeMap[item.sede]) {
      sedeMap[item.sede] = {
        sede: item.sede,
        scope1: 0,
        scope2: 0,
        scope3: 0,
        total: 0
      };
    }
    sedeMap[item.sede].scope1 += item.valor;
    sedeMap[item.sede].total += item.valor;
  });

  // Procesar Alcance 2
  data.scope2.electricidad.forEach((item) => {
    if (!sedeMap[item.sede]) {
      sedeMap[item.sede] = {
        sede: item.sede,
        scope1: 0,
        scope2: 0,
        scope3: 0,
        total: 0
      };
    }
    sedeMap[item.sede].scope2 += item.valor;
    sedeMap[item.sede].total += item.valor;
  });

  // Procesar Alcance 3
  const processScope3 = (items: any[]) => {
    items.forEach((item) => {
      if (!sedeMap[item.sede]) {
        sedeMap[item.sede] = {
          sede: item.sede,
          scope1: 0,
          scope2: 0,
          scope3: 0,
          total: 0
        };
      }
      sedeMap[item.sede].scope3 += item.valor;
      sedeMap[item.sede].total += item.valor;
    });
  };

  processScope3(data.scope3.transporte);
  processScope3(data.scope3.residuos);
  processScope3(data.scope3.viajesNegocios);

  const areaData = Object.values(sedeMap).sort((a, b) => b.total - a.total);

  // Colores para los gráficos
  const COLORS = ['#10b981', '#06b6d4', '#a855f7'];
  const CATEGORY_COLORS = {
    'Alcance 1': '#10b981',
    'Alcance 2': '#06b6d4',
    'Alcance 3': '#a855f7'
  };

  return (
    <Tabs defaultValue='pie' className='w-full max-w-4xl mx-auto'>
      <TabsList className='grid w-full grid-cols-3 mb-4'>
        <TabsTrigger value='pie'>Por Alcance</TabsTrigger>
        <TabsTrigger value='bar'>Por Categoría</TabsTrigger>
        <TabsTrigger value='area'>Por Sede</TabsTrigger>
      </TabsList>
      <TabsContent value='pie' className='h-[300px]'>
        {pieData.length > 0 ? (
          <ChartContainer
            config={{
              scope1: {
                label: 'Alcance 1',
                color: 'hsl(160, 84%, 39%)'
              },
              scope2: {
                label: 'Alcance 2',
                color: 'hsl(187, 96%, 42%)'
              },
              scope3: {
                label: 'Alcance 3',
                color: 'hsl(270, 91%, 65%)'
              }
            }}
            className='h-full'
          >
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={pieData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                  nameKey='name'
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(1)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                    `${value.toFixed(4)} tonCO₂e`,
                    ''
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className='flex items-center justify-center h-full text-gray-500'>
            No hay datos suficientes para mostrar el gráfico
          </div>
        )}
      </TabsContent>
      <TabsContent value='bar' className='h-[300px]'>
        {barData.length > 0 ? (
          <ChartContainer
            config={{
              value: {
                label: 'Emisiones (tonCO₂e)',
                color: 'hsl(var(--chart-1))'
              }
            }}
            className='h-full'
          >
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' tick={{ fontSize: 10 }} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey='value' fill='var(--color-value)'>
                  {barData.map((entry, index) => {
                    const colorKey =
                      entry.scope as keyof typeof CATEGORY_COLORS;
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={CATEGORY_COLORS[colorKey]}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className='flex items-center justify-center h-full text-gray-500'>
            No hay datos suficientes para mostrar el gráfico
          </div>
        )}
      </TabsContent>
      <TabsContent value='area' className='h-[300px]'>
        {areaData.length > 0 ? (
          <ChartContainer
            config={{
              scope1: {
                label: 'Alcance 1',
                color: 'hsl(160, 84%, 39%)'
              },
              scope2: {
                label: 'Alcance 2',
                color: 'hsl(187, 96%, 42%)'
              },
              scope3: {
                label: 'Alcance 3',
                color: 'hsl(270, 91%, 65%)'
              }
            }}
            className='h-full'
          >
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={areaData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='sede' />
                <YAxis />
                <ChartTooltip />
                <Legend />
                <Bar
                  dataKey='scope1'
                  stackId='a'
                  name='Alcance 1'
                  fill='var(--color-scope1)'
                />
                <Bar
                  dataKey='scope2'
                  stackId='a'
                  name='Alcance 2'
                  fill='var(--color-scope2)'
                />
                <Bar
                  dataKey='scope3'
                  stackId='a'
                  name='Alcance 3'
                  fill='var(--color-scope3)'
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className='flex items-center justify-center h-full text-gray-500'>
            No hay datos suficientes para mostrar el gráfico
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
