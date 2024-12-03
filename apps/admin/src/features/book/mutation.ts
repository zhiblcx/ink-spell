import { httpRequest } from "@/shared/API";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { handleAxiosError } from "../utils";
import { AxiosResponse } from "axios";
import { QueryKeysEnum } from "@/shared/enums/QueryKeysEnum";

const BASE_BOOK_API = '/book'
export const deleteBookByIdMutation = (page: number, limit: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (bookID: number) => httpRequest.delete(`${BASE_BOOK_API}/${bookID}`),
    onSuccess: (data) => {
      window.$message.success(data.message as string)
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.ALL_BOOK_KEY, page, limit] })
    },
    onError: handleAxiosError
  })
}

export const downloadBookByIdMutation = () =>
  useMutation({
    mutationFn: (bookID: number) => httpRequest.get<AxiosResponse>(`${BASE_BOOK_API}/download/${bookID}`, {}, { expectData: true }),
    onSuccess: (data) => {
      const fileName = data.headers['content-disposition'].split('"')[1]
      const url = window.URL.createObjectURL(new Blob([data.data]))
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    },
    onError: handleAxiosError
  })
