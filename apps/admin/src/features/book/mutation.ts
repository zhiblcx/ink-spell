import { httpRequest } from "@/shared/API";
import { useMutation } from "@tanstack/vue-query";
import { handleAxiosError } from "../utils";
import { useMessage } from "naive-ui";

export const deleteBookByIdMutation = () =>
  useMutation({
    mutationFn: (bookID: number) => httpRequest.delete(`/book/${bookID}`),
    onSuccess: () => {
      const message = useMessage()
      message.success('Book deleted successfully')
    },
    onError: handleAxiosError
  })
