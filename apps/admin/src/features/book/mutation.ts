import { httpRequest } from "@/shared/API";
import { useMutation } from "@tanstack/vue-query";
import { handleAxiosError } from "../utils";

export const deleteBookByIdMutation = () =>
  useMutation({
    mutationFn: (bookID: number) => httpRequest.delete(`/book/${bookID}`),
    onSuccess: () => {
      window.$message.success('Book deleted successfully')
    },
    onError: handleAxiosError
  })
