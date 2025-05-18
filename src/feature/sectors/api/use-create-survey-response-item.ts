import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
  (typeof client.api)['survey-response-items']['$post']
>;
type RequestType = InferRequestType<
  (typeof client.api)['survey-response-items']['$post']
>['json'];

export const useCreateSurveyResponseItem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api['survey-response-items']['$post']({
        json
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveyResponseItems'] });
    },
    onError: (error) => {
      console.error('Error creating survey response item:', error);
      toast.error('Error al guardar la respuesta de la encuesta');
    }
  });

  return mutation;
};
