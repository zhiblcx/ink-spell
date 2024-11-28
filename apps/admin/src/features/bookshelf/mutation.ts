import { useMutation } from "@tanstack/vue-query";
import { handleAxiosError } from "../utils";
import { httpRequest } from "@/shared/API";

export const deleteBookShelfByIdMutation = () =>
  useMutation({
    mutationFn: (bookShelfId: number) => httpRequest.delete(`/bookshelf/${bookShelfId}`),
    onSuccess: () => {
      window.$message.success("删除成功")
    },
    onError: handleAxiosError
  })
