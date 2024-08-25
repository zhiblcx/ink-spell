import { request } from '@/shared/API'
import { useQuery } from '@tanstack/react-query'

export const selectBookByBookIdQuery = (bookID: string) => {
  return useQuery({
    queryKey: ['book', bookID],
    queryFn: () => request.get(`/book/${bookID}`)
  })
}
