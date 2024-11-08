import { httpRequest } from '@/shared/API'
import { QueryKeysEnum } from '@/shared/enums'

export const selectBookByBookIdQuery = (bookID: number) =>
  useQuery({
    queryKey: [QueryKeysEnum.BOOK_KEY, bookID],
    queryFn: () => httpRequest.get(`/book/${bookID}`)
  })

export const showBookMarkQuery = (bookID: number) =>
  useQuery({
    queryKey: [QueryKeysEnum.BOOK_MARK_KEY, bookID],
    queryFn: () => httpRequest.get(`/bookmark/${bookID}`)
  })
