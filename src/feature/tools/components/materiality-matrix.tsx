'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  Label,
  Rectangle,
  ReferenceArea
} from 'recharts';
import {
  ExternalLink,
  Info,
  Filter,
  Download,
  ChevronDown
} from 'lucide-react';
import type { MaterialityData } from '@/feature/tools/types';
import {
  materialitySurveyData,
  materialitySurveyReferences
} from '@/feature/tools/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';

interface MaterialityMatrixProps {
  data: MaterialityData;
  selectedSector: string;
}

interface DataPoint {
  x: number;
  y: number;
  name: string;
  categoria: string;
  index: number;
  quadrant: number;
}

const CATEGORY_COLORS = {
  ambiental: '#10b981',
  sociales: '#3b82f6',
  'económico y de gobernanza': '#f59e0b'
};

const CATEGORY_LABELS = {
  ambiental: 'Ambiental',
  sociales: 'Social',
  'económico y de gobernanza': 'Económico y Gobernanza'
};

const QUADRANT_LABELS = [
  'Cuadrante III (Baja prioridad)',
  'Cuadrante II (Prioridad para grupos de interés)',
  'Cuadrante IV (Prioridad para la empresa)',
  'Cuadrante I (Alta prioridad)'
];

const QUADRANT_DESCRIPTIONS = [
  'Temas de baja importancia tanto para la empresa como para los grupos de interés.',
  'Temas de alta importancia para los grupos de interés pero menor para la empresa.',
  'Temas de alta importancia para la empresa pero menor para los grupos de interés.',
  'Temas de alta importancia tanto para la empresa como para los grupos de interés.'
];

const QUADRANT_COLORS = [
  'rgba(203, 213, 225, 0.1)',
  'rgba(96, 165, 250, 0.1)',
  'rgba(251, 146, 60, 0.1)',
  'rgba(34, 197, 94, 0.1)'
];

export default function MaterialityMatrix({
  data,
  selectedSector
}: MaterialityMatrixProps) {
  const [activeCategories, setActiveCategories] = useState<string[]>([
    'ambiental',
    'sociales',
    'económico y de gobernanza'
  ]);
  const [activeQuadrants, setActiveQuadrants] = useState<number[]>([
    0, 1, 2, 3
  ]);
  const [highlightedPoint, setHighlightedPoint] = useState<number | null>(null);

  // Get theme colors
  const getThemeColors = () => {
    if (typeof window === 'undefined') {
      return {
        background: '#ffffff',
        foreground: '#000000',
        muted: '#f1f5f9',
        mutedForeground: '#64748b',
        border: '#e2e8f0',
        primary: '#3b82f6'
      };
    }

    const computedStyle = getComputedStyle(document.documentElement);
    const isDark = document.documentElement.classList.contains('dark');

    return {
      background: computedStyle.getPropertyValue('--background') || '#ffffff',
      foreground: computedStyle.getPropertyValue('--foreground') || '#000000',
      muted: computedStyle.getPropertyValue('--muted') || '#f1f5f9',
      mutedForeground:
        computedStyle.getPropertyValue('--muted-foreground') || '#64748b',
      border: computedStyle.getPropertyValue('--border') || '#e2e8f0',
      primary: computedStyle.getPropertyValue('--primary') || '#3b82f6',
      isDark
    };
  };

  const [themeColors, setThemeColors] = useState(getThemeColors());

  // Update theme colors when theme changes
  useEffect(() => {
    const updateThemeColors = () => {
      setThemeColors(getThemeColors());
    };

    // Update on initial render
    updateThemeColors();

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          updateThemeColors();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Clean up
    return () => observer.disconnect();
  }, []);

  const chartData = useMemo(() => {
    const chartData: DataPoint[] = [];

    const sectorData = data[selectedSector];
    if (!sectorData) return chartData;

    Object.entries(sectorData).forEach(([tema, ratings], index) => {
      const temaInfo = materialitySurveyData[
        selectedSector as keyof typeof materialitySurveyData
      ].find((t) => t.tema === tema);
      if (!temaInfo) return;

      const quadrant =
        (ratings.interesRating > 2.5 ? 1 : 0) +
        (ratings.empresaRating > 2.5 ? 2 : 0);

      chartData.push({
        x: ratings.empresaRating,
        y: ratings.interesRating,
        name: tema,
        categoria: temaInfo.categoria,
        index: index + 1,
        quadrant
      });
    });

    return chartData;
  }, [data, selectedSector]);

  // Filter data based on active categories and quadrants
  const filteredChartData = useMemo(() => {
    return chartData.filter(
      (point) =>
        activeCategories.includes(point.categoria) &&
        activeQuadrants.includes(point.quadrant)
    );
  }, [chartData, activeCategories, activeQuadrants]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const stats = {
      totalPoints: chartData.length,
      byCategory: {} as Record<string, number>,
      byQuadrant: [0, 0, 0, 0]
    };

    chartData.forEach((point) => {
      // Count by category
      if (!stats.byCategory[point.categoria]) {
        stats.byCategory[point.categoria] = 0;
      }
      stats.byCategory[point.categoria]++;

      // Count by quadrant
      stats.byQuadrant[point.quadrant]++;
    });

    return stats;
  }, [chartData]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const quadrantIndex = data.quadrant;

      return (
        <div className='bg-background p-4 border rounded-lg shadow-lg max-w-xs'>
          <div className='flex items-center gap-2 mb-2'>
            <div
              className='w-3 h-3 rounded-full'
              style={{
                backgroundColor:
                  CATEGORY_COLORS[
                    data.categoria as keyof typeof CATEGORY_COLORS
                  ]
              }}
            ></div>
            <Badge variant='outline' className='font-normal'>
              {CATEGORY_LABELS[data.categoria as keyof typeof CATEGORY_LABELS]}
            </Badge>
          </div>
          <p className='font-bold text-base mb-1'>
            {data.index}. {data.name}
          </p>
          <div className='space-y-1 mt-3 text-sm'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>
                Importancia empresa:
              </span>
              <span className='font-medium'>{data.x.toFixed(1)}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Importancia grupos:</span>
              <span className='font-medium'>{data.y.toFixed(1)}</span>
            </div>
          </div>
          <Separator className='my-3' />
          <div className='text-xs'>
            <p className='font-medium'>{QUADRANT_LABELS[quadrantIndex]}</p>
            <p className='text-muted-foreground mt-1'>
              {QUADRANT_DESCRIPTIONS[quadrantIndex]}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const QuadrantBackground = ({ x, y, width, height, fill }: any) => {
    return (
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        fillOpacity={0.4}
      />
    );
  };

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleQuadrant = (quadrant: number) => {
    setActiveQuadrants((prev) =>
      prev.includes(quadrant)
        ? prev.filter((q) => q !== quadrant)
        : [...prev, quadrant]
    );
  };

  const resetFilters = () => {
    setActiveCategories(['ambiental', 'sociales', 'económico y de gobernanza']);
    setActiveQuadrants([0, 1, 2, 3]);
    setHighlightedPoint(null);
  };

  const downloadCSV = () => {
    // Create CSV content
    let csvContent =
      'Tema,Categoría,Importancia Empresa,Importancia Grupos de Interés,Cuadrante\n';

    chartData.forEach((point) => {
      csvContent += `"${point.name}","${point.categoria}",${point.x},${point.y},"${QUADRANT_LABELS[point.quadrant]}"\n`;
    });

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `matriz-materialidad-${selectedSector}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='space-y-6'>
      {/* Chart Header with Controls */}
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div className='flex items-center gap-2'>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button variant='outline' size='icon' onClick={resetFilters}>
                  <Filter className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Restablecer filtros</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='gap-1'>
                Filtrar <ChevronDown className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>Categorías</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <DropdownMenuItem
                    key={key}
                    className='flex items-center gap-2 cursor-pointer'
                    onClick={() => toggleCategory(key)}
                  >
                    <div className='flex items-center gap-2 flex-1'>
                      <div
                        className='w-3 h-3 rounded-full'
                        style={{
                          backgroundColor:
                            CATEGORY_COLORS[key as keyof typeof CATEGORY_COLORS]
                        }}
                      ></div>
                      <span>{label}</span>
                    </div>
                    <div className='w-4 h-4 rounded-sm border flex items-center justify-center'>
                      {activeCategories.includes(key) && (
                        <div className='w-2 h-2 bg-primary rounded-sm'></div>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Cuadrantes</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {QUADRANT_LABELS.map((label, index) => (
                  <DropdownMenuItem
                    key={index}
                    className='flex items-center gap-2 cursor-pointer'
                    onClick={() => toggleQuadrant(index)}
                  >
                    <div className='flex items-center gap-2 flex-1'>
                      <div
                        className='w-3 h-3 rounded-sm'
                        style={{ backgroundColor: QUADRANT_COLORS[index] }}
                      ></div>
                      <span>
                        {label.split(' ')[0]} {label.split(' ')[1]}
                      </span>
                    </div>
                    <div className='w-4 h-4 rounded-sm border flex items-center justify-center'>
                      {activeQuadrants.includes(index) && (
                        <div className='w-2 h-2 bg-primary rounded-sm'></div>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button variant='outline' size='icon' onClick={downloadCSV}>
                  <Download className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Descargar datos (CSV)</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>

        <div className='flex items-center gap-2'>
          <div className='text-sm text-muted-foreground'>
            {filteredChartData.length} de {chartData.length} temas visibles
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className='bg-card rounded-lg border p-4'>
        <div className='h-[500px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
              {/* Quadrant backgrounds */}
              <QuadrantBackground
                x={0}
                y={0}
                width={2.5}
                height={2.5}
                fill={QUADRANT_COLORS[0]}
              />
              <QuadrantBackground
                x={0}
                y={2.5}
                width={2.5}
                height={2.5}
                fill={QUADRANT_COLORS[1]}
              />
              <QuadrantBackground
                x={2.5}
                y={0}
                width={2.5}
                height={2.5}
                fill={QUADRANT_COLORS[2]}
              />
              <QuadrantBackground
                x={2.5}
                y={2.5}
                width={2.5}
                height={2.5}
                fill={QUADRANT_COLORS[3]}
              />

              <CartesianGrid
                strokeDasharray='3 3'
                stroke={themeColors.border}
              />
              <XAxis
                type='number'
                dataKey='x'
                name='Importancia para la empresa'
                domain={[0, 5]}
                tickCount={6}
                stroke={themeColors.foreground}
              >
                <Label value='Importancia para la empresa' position='bottom' />
              </XAxis>
              <YAxis
                type='number'
                dataKey='y'
                name='Importancia Grupos de Interés'
                domain={[0, 5]}
                tickCount={6}
                stroke={themeColors.foreground}
                label={{
                  value: 'Importancia Grupos de Interés',
                  angle: -90,
                  position: 'insideBottomLeft'
                }}
              />
              <ZAxis range={[100, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                x={2.5}
                stroke={themeColors.mutedForeground}
                strokeDasharray='3 3'
              />
              <ReferenceLine
                y={2.5}
                stroke={themeColors.mutedForeground}
                strokeDasharray='3 3'
              />

              {/* Quadrant labels */}
              <ReferenceArea fillOpacity={0} x1={0} x2={2.5} y1={0} y2={2.5}>
                <Label
                  value='Cuadrante III'
                  position='center'
                  offset={10}
                  style={{ fill: themeColors.mutedForeground, fontSize: 12 }}
                />
              </ReferenceArea>
              <ReferenceArea fillOpacity={0} x1={0} x2={2.5} y1={2.5} y2={5}>
                <Label
                  value='Cuadrante II'
                  position='center'
                  offset={10}
                  style={{ fill: themeColors.mutedForeground, fontSize: 12 }}
                />
              </ReferenceArea>
              <ReferenceArea fillOpacity={0} x1={2.5} x2={5} y1={0} y2={2.5}>
                <Label
                  value='Cuadrante IV'
                  position='center'
                  offset={10}
                  style={{ fill: themeColors.mutedForeground, fontSize: 12 }}
                />
              </ReferenceArea>
              <ReferenceArea fillOpacity={0} x1={2.5} x2={5} y1={2.5} y2={5}>
                <Label
                  value='Cuadrante I'
                  position='center'
                  offset={10}
                  style={{ fill: themeColors.mutedForeground, fontSize: 12 }}
                />
              </ReferenceArea>

              {Object.entries(CATEGORY_COLORS).map(([categoria, color]) => {
                const filteredData = filteredChartData.filter(
                  (point) => point.categoria === categoria
                );

                if (filteredData.length === 0) return null;

                return (
                  <Scatter
                    key={categoria}
                    name={
                      CATEGORY_LABELS[categoria as keyof typeof CATEGORY_LABELS]
                    }
                    data={filteredData}
                    fill={color}
                    shape={(props: any) => {
                      const { cx, cy, fill } = props;
                      const isHighlighted =
                        highlightedPoint === props.payload.index;
                      const radius = isHighlighted ? 14 : 10;
                      const strokeWidth = isHighlighted ? 2 : 0;
                      const stroke = themeColors.background;

                      return (
                        <g>
                          <circle
                            cx={cx}
                            cy={cy}
                            r={radius}
                            fill={fill}
                            stroke={stroke}
                            strokeWidth={strokeWidth}
                            style={{
                              transition: 'r 0.2s, stroke-width 0.2s',
                              cursor: 'pointer'
                            }}
                            onClick={() => {
                              setHighlightedPoint(
                                highlightedPoint === props.payload.index
                                  ? null
                                  : props.payload.index
                              );
                            }}
                          />
                          <text
                            x={cx}
                            y={cy}
                            textAnchor='middle'
                            dominantBaseline='middle'
                            fill={themeColors.isDark ? '#000' : '#fff'}
                            fontSize={10}
                            fontWeight={isHighlighted ? 'bold' : 'normal'}
                            style={{ pointerEvents: 'none' }}
                          >
                            {props.payload.index}
                          </text>
                        </g>
                      );
                    }}
                  />
                );
              })}

              <Legend
                verticalAlign='top'
                height={36}
                wrapperStyle={{
                  color: themeColors.foreground
                }}
                onClick={(e) => {
                  const categoria = Object.entries(CATEGORY_LABELS).find(
                    ([, label]) => label === e.value
                  )?.[0];
                  if (categoria) {
                    toggleCategory(categoria);
                  }
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend of Topics */}
      <div className='mt-4'>
        <h3 className='font-bold text-lg mb-4'>Leyenda de temas</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm'>
          {chartData.map((point) => (
            <div
              key={point.name}
              className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                highlightedPoint === point.index
                  ? 'bg-muted'
                  : 'hover:bg-muted/50'
              }`}
              onClick={() =>
                setHighlightedPoint(
                  highlightedPoint === point.index ? null : point.index
                )
              }
            >
              <div
                className='w-4 h-4 rounded-full flex items-center justify-center'
                style={{
                  backgroundColor:
                    CATEGORY_COLORS[
                      point.categoria as keyof typeof CATEGORY_COLORS
                    ]
                }}
              >
                <span className='text-xs text-white font-medium'>
                  {point.index}
                </span>
              </div>
              <span
                className={
                  highlightedPoint === point.index ? 'font-medium' : ''
                }
              >
                {point.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Distribución por categoría</h3>
          <div className='space-y-3'>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
              const count = statistics.byCategory[key] || 0;
              const percentage = (count / statistics.totalPoints) * 100;

              return (
                <div key={key} className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <div
                        className='w-3 h-3 rounded-full'
                        style={{
                          backgroundColor:
                            CATEGORY_COLORS[key as keyof typeof CATEGORY_COLORS]
                        }}
                      ></div>
                      <span className='text-sm'>{label}</span>
                    </div>
                    <span className='text-sm font-medium'>
                      {count} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <Progress value={percentage} className='h-2' />
                </div>
              );
            })}
          </div>
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Distribución por cuadrante</h3>
          <div className='space-y-3'>
            {QUADRANT_LABELS.map((label, index) => {
              const count = statistics.byQuadrant[index];
              const percentage = (count / statistics.totalPoints) * 100;

              return (
                <div key={index} className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <div
                        className='w-3 h-3 rounded-sm'
                        style={{ backgroundColor: QUADRANT_COLORS[index] }}
                      ></div>
                      <span className='text-sm'>
                        {label.split(' ')[0]} {label.split(' ')[1]}
                      </span>
                    </div>
                    <span className='text-sm font-medium'>
                      {count} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <Progress value={percentage} className='h-2' />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Information Section */}
      <Card className='mt-8'>
        <CardContent className='p-6 space-y-6'>
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <Info className='h-5 w-5 text-primary' />
              <h3 className='text-lg font-semibold'>
                Acerca de la matriz de materialidad
              </h3>
            </div>

            <p className='text-muted-foreground'>
              La matriz de materialidad es una herramienta visual que ayuda a
              las organizaciones a identificar y priorizar los temas ESG
              (Ambientales, Sociales y de Gobernanza) más relevantes para su
              negocio y sus grupos de interés.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mt-6'>
              {[0, 1, 2, 3].map((quadrantIndex) => (
                <div
                  key={quadrantIndex}
                  className='p-4 rounded-md border'
                  style={{ backgroundColor: QUADRANT_COLORS[quadrantIndex] }}
                >
                  <h3 className='font-bold mb-2'>
                    {QUADRANT_LABELS[quadrantIndex]}
                  </h3>
                  <p>{QUADRANT_DESCRIPTIONS[quadrantIndex]}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Referencias y Recursos</h3>
            <div className='grid gap-6 md:grid-cols-2'>
              <div>
                <h4 className='text-base font-medium mb-3'>
                  Estándares y Marcos de Referencia
                </h4>
                <div className='space-y-3'>
                  {materialitySurveyReferences[
                    selectedSector as keyof typeof materialitySurveyReferences
                  ]?.map((ref, i) => (
                    <div key={i} className='flex items-start gap-2'>
                      {ref.url ? (
                        <a
                          href={
                            ref.url.startsWith('http')
                              ? ref.url
                              : `https://${ref.url}`
                          }
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center gap-2 text-primary hover:underline group'
                        >
                          <ExternalLink className='h-4 w-4 group-hover:translate-x-0.5 transition-transform' />
                          <span>{ref.name}</span>
                        </a>
                      ) : (
                        <div className='flex items-center gap-2 text-muted-foreground'>
                          <ExternalLink className='h-4 w-4' />
                          <span>{ref.name}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className='text-base font-medium mb-3'>Metodología</h4>
                <p className='text-sm text-muted-foreground'>
                  La evaluación de materialidad se realiza en cuatro pasos
                  principales:
                </p>
                <ol className='mt-3 space-y-2 text-sm'>
                  <li className='flex items-start gap-2'>
                    <span className='bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0'>
                      1
                    </span>
                    <span>
                      Identificación de temas relevantes para el sector
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0'>
                      2
                    </span>
                    <span>Evaluación de la importancia para la empresa</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0'>
                      3
                    </span>
                    <span>
                      Evaluación de la importancia para los grupos de interés
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0'>
                      4
                    </span>
                    <span>Visualización y análisis de resultados</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
