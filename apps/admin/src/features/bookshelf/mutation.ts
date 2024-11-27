import { useMutation } from "@tanstack/vue-query";
import { handleAxiosError } from "../utils";
import { useMessage } from "naive-ui";
import { httpRequest } from "@/shared/API";

export const deleteBookShelfByIdMutation = () =>
  useMutation({
    mutationFn: (bookShelfId: number) => httpRequest.delete(`/bookshelf/${bookShelfId}`),
    onSuccess: () => {
      const message = useMessage()
      message.success("删除成功")
    },
    onError: handleAxiosError
  })
