import { toast } from 'sonner';
import { InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
  (typeof client.api)['companies-info'][':id']['$delete']
>;

export const useDeleteCompaniesInfo = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api['companies-info'][':id']['$delete']({
        param: { id }
      });

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      toast.success('Empresa eliminada exitosamente');
      queryClient.invalidateQueries({
        queryKey: ['companiesInfo']
      });
      queryClient.invalidateQueries({
        queryKey: ['companiesInfoById']
      });
    },
    onError: () => {
      toast.error('Error al eliminar la empresa');
    }
  });

  return mutation;
};
