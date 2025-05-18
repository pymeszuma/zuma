import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';

export const useGetCompaniesInfoById = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['companiesInfoById', { id }],
    queryFn: async () => {
      const response = await client.api['companies-info'][':id'].$get({
        param: {
          id
        }
      });

      if (!response.ok) {
        throw new Error('Empresa no encontrada');
      }

      const { data } = await response.json();

      return data;
    }
  });

  return query;
};
