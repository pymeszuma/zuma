import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
  (typeof client.api)['companies-info']['$post']
>;
type RequestType = InferRequestType<
  (typeof client.api)['companies-info']['$post']
>['json'];

export const useCreateCompaniesInfo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api['companies-info']['$post']({ json });
      return response.json();
    },
    onSuccess: () => {
      toast.success('Empresa creada exitosamente');
      queryClient.invalidateQueries({ queryKey: ['companiesInfo'] });
    },
    onError: () => {
      toast.error('Error al crear la empresa');
    }
  });

  return mutation;
};
