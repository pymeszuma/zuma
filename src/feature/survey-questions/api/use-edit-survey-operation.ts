import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
  (typeof client.api)['survey-questions'][':id']['$patch']
>;
type RequestType = InferRequestType<
  (typeof client.api)['survey-questions'][':id']['$patch']
>['json'];

export const useEditSurveyQuestion = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api['survey-questions'][':id']['$patch']({
        param: { id },
        json
      });
      return response.json();
    },
    onSuccess: () => {
      toast.success('Pregunta de encuesta editada exitosamente');
      queryClient.invalidateQueries({ queryKey: ['surveyQuestions'] });
    },
    onError: () => {
      toast.error('Error al editar la pregunta de la encuesta');
    }
  });

  return mutation;
};
