import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';

export type SectorDistribution = {
  sector: string;
  count: number;
};

export type MonthlyData = {
  month: string;
  count: number;
};

export type DashboardStats = {
  companiesCount: number;
  submittedSurveysCount: number;
  adaptationSurveysCount: number;
  mitigationSurveysCount: number;
  sectorDistribution: SectorDistribution[];
  monthlySurveyData: MonthlyData[];
  registrationTrends: MonthlyData[];
};

export const useGetDashboardStats = () => {
  const query = useQuery<DashboardStats>({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const response = await client.api['dashboard-stats'].$get();

      if (!response.ok) {
        throw new Error('Error al obtener las estadísticas del dashboard');
      }

      const { data } = await response.json();
      return data;
    }
  });

  return query;
};
