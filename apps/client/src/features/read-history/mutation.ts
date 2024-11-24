import { httpRequest } from "@ink-spell/axios";
import { handleAxiosError } from "../utils";

export const updateReadHistoryMutation = () => useMutation({
  mutationFn: (bookId: number) => httpRequest.put(`read-history/${bookId}`),
  onError: handleAxiosError
})

export const insertReadHistoryMutation = () => useMutation({
  mutationFn: (bookId: number) => httpRequest.post(`read-history/${bookId}`),
  onError: handleAxiosError
})
