import { httpRequest } from '@/shared/API'
import { QueryKeys } from '@/shared/enums'

export const selectMyBookShelfQuery = () =>
  useQuery({
    queryKey: [QueryKeys.BOOKSHELF_KEY],
    queryFn: () => httpRequest.get('/bookshelf')
  })

export const selectBookByBookShelfIdQuery = (bookShelfId: string) =>
  useQuery({
    queryKey: [QueryKeys.BOOKSHELF_BOOK_KEY, bookShelfId],
    queryFn: () => httpRequest.get(`/bookshelf/${bookShelfId}`)
  })

export const selectUserCollectBookShelfQuery = () =>
  useQuery({
    queryKey: [QueryKeys.USER_COLLECT_KEY],
    queryFn: () => httpRequest.get('/collect/bookshelf')
  })

export const selectUserCollectBookShelfByUserIdQuery = (userId: string) =>
  useQuery({
    queryKey: [QueryKeys.USER_BOOKSHELF_KEY, userId],
    queryFn: () => httpRequest.get(`/user/bookshelf/${userId}`)
  })
