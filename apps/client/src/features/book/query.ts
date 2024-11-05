import { axiosInstance } from '@/shared/API'
import { QueryKeys } from '@/shared/enums'

export const selectBookByBookIdQuery = (bookID: number) =>
  useQuery({
    queryKey: [QueryKeys.BOOK_KEY, bookID],
    queryFn: () => axiosInstance.get(`/book/${bookID}`)
  })

export const showBookMarkQuery = (bookID: number) =>
  useQuery({
    queryKey: [QueryKeys.BOOK_MARK_KEY, bookID],
    queryFn: () => axiosInstance.get(`/bookmark/${bookID}`)
  })
