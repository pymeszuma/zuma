import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';

export const useGetAllCompaniesInfo = () => {
  const query = useQuery({
    queryKey: ['companiesInfo'],
    queryFn: async () => {
      const response = await client.api['companies-info'].$get();

      if (!response.ok) {
        throw new Error('Error al obtener las empresas');
      }

      const { data } = await response.json();

      return data;
    }
  });

  return query;
};
