import { request } from '@/shared/API'
import { useQuery } from '@tanstack/react-query'

export const selectBookByBookIdQuery = (bookID: number) =>
  useQuery({
    queryKey: ['book', bookID],
    queryFn: () => request.get(`/book/${bookID}`)
  })

export const showBookMarkQuery = (bookID: number) =>
  useQuery({
    queryKey: ['bookMark', bookID],
    queryFn: () => request.get(`/bookmark/${bookID}`)
  })
