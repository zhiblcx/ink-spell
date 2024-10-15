import { request } from '@/shared/API'
import { QueryKeys } from '@/shared/enums'
import { useQuery } from '@tanstack/react-query'

export const selectBookByBookIdQuery = (bookID: number) =>
  useQuery({
    queryKey: [QueryKeys.BOOK_KEY, bookID],
    queryFn: () => request.get(`/book/${bookID}`)
  })

export const showBookMarkQuery = (bookID: number) =>
  useQuery({
    queryKey: [QueryKeys.BOOK_MARK_KEY, bookID],
    queryFn: () => request.get(`/bookmark/${bookID}`)
  })
