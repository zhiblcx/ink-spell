import { httpRequest } from '@/shared/API'
import { QueryKeys } from '@/shared/enums'

export const selectBookByBookIdQuery = (bookID: number) =>
  useQuery({
    queryKey: [QueryKeys.BOOK_KEY, bookID],
    queryFn: () => httpRequest.get(`/book/${bookID}`)
  })

export const showBookMarkQuery = (bookID: number) =>
  useQuery({
    queryKey: [QueryKeys.BOOK_MARK_KEY, bookID],
    queryFn: () => httpRequest.get(`/bookmark/${bookID}`)
  })
