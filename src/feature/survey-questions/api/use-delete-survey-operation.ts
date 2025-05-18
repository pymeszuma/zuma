import { toast } from 'sonner';
import { InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
  (typeof client.api)['survey-questions'][':id']['$delete']
>;

export const useDeleteSurveyQuestion = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api['survey-questions'][':id']['$delete']({
        param: { id }
      });

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      toast.success('Pregunta de encuesta eliminada exitosamente');
      queryClient.invalidateQueries({
        queryKey: ['surveyQuestions']
      });
      queryClient.invalidateQueries({
        queryKey: ['surveyQuestionById']
      });
    },
    onError: () => {
      toast.error('Error al eliminar la pregunta de la encuesta');
    }
  });

  return mutation;
};
