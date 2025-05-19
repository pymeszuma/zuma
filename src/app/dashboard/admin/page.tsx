'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  PieChart,
  Download,
  Share2,
  Users,
  CheckCircle,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentLayout } from '@/components/panel/content-layout';
import {
  useGetDashboardStats,
  DashboardStats,
} from '@/feature/dashboard/api/use-get-dashboard-stats';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar
} from 'recharts';

export default function AdminDashboardPage() {
  const { data: rawStats, isLoading, error } = useGetDashboardStats();
  const stats = rawStats as DashboardStats | undefined;

  const sectorChartData = stats?.sectorDistribution.map((item) => ({
    name: item.sector || 'Sin Especificar',
    value: item.count
  }));

  const handleDownloadCompanyData = (companyId: string) => {
    const downloadUrl = `/api/download-company-csv/${companyId}`;
    window.open(downloadUrl, '_blank');
    console.log(`Descargando datos para empresa ID: ${companyId}`);
  };

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
              <Users className='h-4 w-4 text-muted-foreground' />
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
              <CheckCircle className='h-4 w-4 text-muted-foreground' />
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
              <ShieldCheck className='h-4 w-4 text-muted-foreground' />
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
              <Zap className='h-4 w-4 text-muted-foreground' />
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
              ) : sectorChartData && sectorChartData.length > 0 ? (
                <ResponsiveContainer width='100%' height={350}>
                  <BarChart data={sectorChartData}>
                    <XAxis
                      dataKey='name'
                      stroke='#888888'
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke='#888888'
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip />
                    <Bar dataKey='value' fill='#2563eb' radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className='h-[300px] bg-gray-100 rounded-lg flex flex-col items-center justify-center text-muted-foreground'>
                  <PieChart className='h-8 w-8 mb-4' />
                  <p>No hay datos de sectores disponibles</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className='mt-6'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <div>
                <CardTitle>Empresas Registradas</CardTitle>
                <CardDescription>
                  Lista de todas las empresas registradas en la plataforma.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {stats &&
              stats.companiesList &&
              stats.companiesList.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre de la Empresa</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead>Email de Contacto</TableHead>
                      <TableHead>Fecha de Registro</TableHead>
                      <TableHead className='text-right'>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.companiesList.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell>{company.companyName}</TableCell>
                        <TableCell>{company.sector}</TableCell>
                        <TableCell>{company.userEmail}</TableCell>
                        <TableCell>
                          {new Date(company.createdAt).toLocaleDateString(
                            'es-ES',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }
                          )}
                        </TableCell>
                        <TableCell className='text-right'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() =>
                              handleDownloadCompanyData(company.id)
                            }
                          >
                            <Download className='mr-2 h-4 w-4' />
                            Descargar CSV
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No hay empresas registradas para mostrar.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ContentLayout>
  );
}
