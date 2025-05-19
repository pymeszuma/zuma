import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { InferResponseType } from 'hono';

export interface SectorDistribution {
  sector: string | null;
  count: number;
}

export interface CompanyData {
  id: string;
  companyName: string;
  sector: string | null;
  userEmail: string;
  createdAt: string; // ISO date string
}

export interface DashboardStats {
  companiesCount: number;
  submittedSurveysCount: number;
  adaptationSurveysCount: number;
  mitigationSurveysCount: number;
  sectorDistribution: SectorDistribution[];
  companiesList: CompanyData[];
}

// Correctly infer the response type from the Hono client
// This assumes client.api['dashboard-stats'].$get is a valid typed Hono client route
type DashboardStatsResponse = InferResponseType<
  (typeof client.api)['dashboard-stats']['$get']
>;

export const useGetDashboardStats = () => {
  const query = useQuery<DashboardStatsResponse, Error, DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await client.api['dashboard-stats'].$get();
      if (!response.ok) {
        throw new Error(
          `Failed to fetch dashboard stats: ${response.statusText}`
        );
      }
      // Await the json() call as it returns a Promise
      const data = await response.json();
      return data;
    }
  });

  return query;
};
