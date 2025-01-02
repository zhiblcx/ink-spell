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

export const selectPublicBookShelfQuery = (
  page: number,
  limit: number,
  select?: string,
  selectValue?: string,
  bookshelfName?: string
) => {
  let path = `&${select}=${selectValue}&bookshelfName=${bookshelfName}`
  if (select === undefined && bookshelfName === undefined) {
    path = ''
  } else if (select === undefined) {
    path = `&bookshelfName=${bookshelfName}`
  } else if (bookshelfName === undefined) {
    path = `&${select}=${selectValue}`
  }
  return useQuery({
    queryKey: [QueryKeysEnum.BOOKSHELF_KEY, page, limit, select, selectValue, bookshelfName],
    queryFn: () => httpRequest.get(`/bookshelf/public?page=${page}&limit=${limit}${path}`)
  })
}
