'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Share2,
  Building2,
  ClipboardList,
  CloudRain,
  Factory
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentLayout } from '@/components/panel/content-layout';
import {
  useGetDashboardStats,
  DashboardStats,
  SectorDistribution,
  MonthlyData
} from '@/feature/dashboard/api/use-get-dashboard-stats';

export default function AdminDashboardPage() {
  const { data: rawStats, isLoading, error } = useGetDashboardStats();
  const stats = rawStats as DashboardStats | undefined;

  return (
    <ContentLayout title='Dashboard' className='px-8 py-2'>
      <div className='container mx-auto py-10'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              Dashboard Administrativo
            </h1>
            <p className='text-muted-foreground mt-1'>
              Estadísticas y métricas de la plataforma
            </p>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' size='icon' title='Exportar datos'>
              <Download className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon' title='Compartir dashboard'>
              <Share2 className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Empresas Registradas
              </CardTitle>
              <Building2 className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {isLoading ? (
                  <span className='animate-pulse'>Cargando...</span>
                ) : error ? (
                  <span className='text-red-500'>Error</span>
                ) : (
                  stats?.companiesCount || 0
                )}
              </div>
              <p className='text-xs text-muted-foreground'>
                Empresas registradas en la plataforma
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Encuestas Completadas
              </CardTitle>
              <ClipboardList className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {isLoading ? (
                  <span className='animate-pulse'>Cargando...</span>
                ) : error ? (
                  <span className='text-red-500'>Error</span>
                ) : (
                  stats?.submittedSurveysCount || 0
                )}
              </div>
              <p className='text-xs text-muted-foreground'>
                Encuestas completadas y enviadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Encuestas de Adaptación
              </CardTitle>
              <CloudRain className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {isLoading ? (
                  <span className='animate-pulse'>Cargando...</span>
                ) : error ? (
                  <span className='text-red-500'>Error</span>
                ) : (
                  stats?.adaptationSurveysCount || 0
                )}
              </div>
              <p className='text-xs text-muted-foreground'>
                Encuestas de adaptación al cambio climático
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Encuestas de Mitigación
              </CardTitle>
              <Factory className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {isLoading ? (
                  <span className='animate-pulse'>Cargando...</span>
                ) : error ? (
                  <span className='text-red-500'>Error</span>
                ) : (
                  stats?.mitigationSurveysCount || 0
                )}
              </div>
              <p className='text-xs text-muted-foreground'>
                Encuestas de mitigación del cambio climático
              </p>
            </CardContent>
          </Card>
        </div>

        <div className='grid gap-6 mt-6 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Sector</CardTitle>
              <CardDescription>
                Distribución de empresas por sector económico
              </CardDescription>
            </CardHeader>
            <CardContent className='pl-2'>
              {isLoading ? (
                <div className='h-[300px] bg-gray-100 rounded-lg flex items-center justify-center'>
                  <p className='text-muted-foreground animate-pulse'>
                    Cargando datos...
                  </p>
                </div>
              ) : error ? (
                <div className='h-[300px] bg-gray-100 rounded-lg flex items-center justify-center'>
                  <p className='text-red-500'>Error al cargar los datos</p>
                </div>
              ) : stats?.sectorDistribution &&
                stats.sectorDistribution.length > 0 ? (
                <div className='h-[300px]'>
                  <div className='h-full flex flex-col justify-center'>
                    {stats.sectorDistribution.map(
                      (item: SectorDistribution, index: number) => (
                        <div key={index} className='mb-4'>
                          <div className='flex items-center justify-between mb-1'>
                            <span className='text-sm font-medium'>
                              {item.sector || 'Sin especificar'}
                            </span>
                            <span className='text-sm text-muted-foreground'>
                              {item.count} empresas
                            </span>
                          </div>
                          <div className='h-2 w-full rounded-full bg-muted'>
                            <div
                              className='h-2 rounded-full bg-primary'
                              style={{
                                width: `${(item.count / stats.companiesCount) * 100}%`,
                                minWidth: '5%'
                              }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className='h-[300px] bg-gray-100 rounded-lg flex flex-col items-center justify-center text-muted-foreground'>
                  <PieChart className='h-8 w-8 mb-4' />
                  <p>No hay datos de sectores disponibles</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estadísticas de Encuestas</CardTitle>
              <CardDescription>Progreso de encuestas por mes</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className='h-[300px] bg-gray-100 rounded-lg flex items-center justify-center'>
                  <p className='text-muted-foreground animate-pulse'>
                    Cargando datos...
                  </p>
                </div>
              ) : error ? (
                <div className='h-[300px] bg-gray-100 rounded-lg flex items-center justify-center'>
                  <p className='text-red-500'>Error al cargar los datos</p>
                </div>
              ) : stats?.monthlySurveyData &&
                stats.monthlySurveyData.length > 0 ? (
                <div className='h-[300px]'>
                  <div className='h-full flex flex-col justify-end space-y-6'>
                    <div className='grid grid-cols-12 gap-2 items-end h-[220px]'>
                      {stats.monthlySurveyData.map(
                        (item: MonthlyData, index: number) => {
                          // Calculate height percentage based on max count in the dataset
                          const maxCount = Math.max(
                            ...stats.monthlySurveyData.map(
                              (d: MonthlyData) => d.count
                            )
                          );
                          const heightPercentage =
                            maxCount > 0 ? (item.count / maxCount) * 100 : 0;

                          return (
                            <div
                              key={index}
                              className='flex flex-col items-center h-full'
                            >
                              <div
                                className='w-full bg-primary rounded-t-md'
                                style={{
                                  height: `${Math.max(heightPercentage, 5)}%`,
                                  minHeight: '20px'
                                }}
                              ></div>
                              <span className='text-xs text-muted-foreground mt-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-full'>
                                {item.month}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-xs text-muted-foreground'>
                        Todas las encuestas
                      </span>
                      <span className='text-xs text-muted-foreground'>
                        Total: {stats.submittedSurveysCount}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='h-[300px] bg-gray-100 rounded-lg flex flex-col items-center justify-center text-muted-foreground'>
                  <BarChart3 className='h-8 w-8 mb-4' />
                  <p>No hay datos mensuales disponibles</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Registro</CardTitle>
              <CardDescription>
                Tendencia de registro de empresas a lo largo del tiempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className='h-[300px] mt-4 bg-gray-100 rounded-lg flex items-center justify-center'>
                  <p className='text-muted-foreground animate-pulse'>
                    Cargando datos...
                  </p>
                </div>
              ) : error ? (
                <div className='h-[300px] mt-4 bg-gray-100 rounded-lg flex items-center justify-center'>
                  <p className='text-red-500'>Error al cargar los datos</p>
                </div>
              ) : stats?.registrationTrends &&
                stats.registrationTrends.length > 0 ? (
                <div className='h-[300px] mt-4 relative'>
                  <div className='absolute inset-0 flex items-end pb-12'>
                    <div className='w-full h-full flex flex-col'>
                      <div className='flex-1 flex items-end'>
                        <div className='w-full flex items-end space-x-2'>
                          {stats.registrationTrends.map(
                            (item: MonthlyData, i: number) => {
                              // Calculate height percentage based on max count
                              const maxCount = Math.max(
                                ...stats.registrationTrends.map(
                                  (d: MonthlyData) => d.count
                                )
                              );
                              const heightPercentage =
                                maxCount > 0
                                  ? (item.count / maxCount) * 100
                                  : 0;

                              return (
                                <div
                                  key={i}
                                  className='flex-1 flex flex-col items-center h-full'
                                >
                                  <div className='w-full flex flex-col items-center justify-end h-full'>
                                    <div
                                      className='w-full rounded-md bg-sky-500 relative group'
                                      style={{
                                        height: `${Math.max(heightPercentage, 5)}%`,
                                        minHeight: '20px'
                                      }}
                                    >
                                      <div className='opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 transition-opacity duration-300'>
                                        {item.count} empresas
                                      </div>
                                    </div>
                                  </div>
                                  <span
                                    className='text-xs text-muted-foreground mt-2 whitespace-nowrap overflow-hidden text-ellipsis'
                                    style={{ maxWidth: '60px' }}
                                  >
                                    {item.month}
                                  </span>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                      <div className='h-12 w-full flex items-center border-t border-gray-200 mt-2'>
                        <div className='w-full flex justify-between'>
                          <span className='text-xs text-muted-foreground'>
                            Todos los registros
                          </span>
                          <span className='text-xs text-muted-foreground'>
                            Total: {stats.companiesCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='h-[300px] mt-4 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-muted-foreground'>
                  <LineChart className='h-8 w-8 mb-4' />
                  <p>No hay datos de tendencia disponibles</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ContentLayout>
  );
}
