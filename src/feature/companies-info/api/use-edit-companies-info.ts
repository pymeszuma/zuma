import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
  (typeof client.api)['companies-info'][':id']['$patch']
>;
type RequestType = InferRequestType<
  (typeof client.api)['companies-info'][':id']['$patch']
>['json'];

export const useEditCompaniesInfo = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api['companies-info'][':id']['$patch']({
        param: { id },
        json
      });
      return response.json();
    },
    onSuccess: () => {
      toast.success('Empresa editada exitosamente');
      queryClient.invalidateQueries({ queryKey: ['companiesInfo'] });
    },
    onError: () => {
      toast.error('Error al editar la empresa');
    }
  });

  return mutation;
};
