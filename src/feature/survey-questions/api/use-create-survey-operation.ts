import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
  (typeof client.api)['survey-questions']['$post']
>;
type RequestType = InferRequestType<
  (typeof client.api)['survey-questions']['$post']
>['json'];

export const useCreateSurveyQuestion = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api['survey-questions']['$post']({ json });
      return response.json();
    },
    onSuccess: () => {
      toast.success('Pregunta de encuesta creada exitosamente');
      queryClient.invalidateQueries({ queryKey: ['surveyQuestions'] });
    },
    onError: () => {
      toast.error('Error al crear la pregunta de la encuesta');
    }
  });

  return mutation;
};
