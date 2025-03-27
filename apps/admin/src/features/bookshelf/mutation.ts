import { httpRequest } from '@/shared/API'
import { QueryKeysEnum } from '@/shared/enums/QueryKeysEnum'
import { ReviewStatus } from '@/shared/types/ReviewStatus'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { handleAxiosError } from '../utils'

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

export const operateBookShelfByIdMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ bookShelfId, review }: { bookShelfId: number; review: ReviewStatus }) =>
      httpRequest.put(`/bookshelf/review/${bookShelfId}`, { review }),
    onSuccess: (data) => {
      window.$message.success(data.message as string)
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.ALL_BOOKSHELF_KEY] })
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.REVIEW_BOOKSHELF_KEY] })
    },
    onError: handleAxiosError
  })
}
