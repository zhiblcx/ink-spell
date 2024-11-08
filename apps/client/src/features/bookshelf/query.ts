import { httpRequest } from '@/shared/API'

export const selectMyBookShelfQuery = () =>
  useQuery({
    queryKey: [QueryKeysEnum.BOOKSHELF_KEY],
    queryFn: () => httpRequest.get('/bookshelf')
  })

export const selectBookByBookShelfIdQuery = (bookShelfId: string) =>
  useQuery({
    queryKey: [QueryKeysEnum.BOOKSHELF_BOOK_KEY, bookShelfId],
    queryFn: () => httpRequest.get(`/bookshelf/${bookShelfId}`)
  })

export const selectUserCollectBookShelfQuery = () =>
  useQuery({
    queryKey: [QueryKeysEnum.USER_COLLECT_KEY],
    queryFn: () => httpRequest.get('/collect/bookshelf')
  })

export const selectUserCollectBookShelfByUserIdQuery = (userId: string) =>
  useQuery({
    queryKey: [QueryKeysEnum.USER_BOOKSHELF_KEY, userId],
    queryFn: () => httpRequest.get(`/user/bookshelf/${userId}`)
  })
