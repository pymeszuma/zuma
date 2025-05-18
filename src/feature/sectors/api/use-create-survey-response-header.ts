import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
  (typeof client.api)['survey-response-headers']['$post']
>;
type RequestType = InferRequestType<
  (typeof client.api)['survey-response-headers']['$post']
>['json'];

export const useCreateSurveyResponseHeader = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api['survey-response-headers']['$post']({
        json
      });
      const result = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveyResponseHeaders'] });
    },
    onError: (error) => {
      console.error('Error creating survey response header:', error);
      toast.error('Error al crear el encabezado de la encuesta');
    }
  });

  return mutation;
};
