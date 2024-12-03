import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { handleAxiosError } from "../utils";
import { httpRequest } from "@/shared/API";
import { QueryKeysEnum } from "@/shared/enums/QueryKeysEnum";

export const deleteBookShelfByIdMutation = (page: number, limit: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (bookShelfId: number) => httpRequest.delete(`/bookshelf/${bookShelfId}`),
    onSuccess: (data) => {
      window.$message.success(data.message as string)
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.ALL_BOOKSHELF_KEY, page, limit] })
    },
    onError: handleAxiosError
  })
}
