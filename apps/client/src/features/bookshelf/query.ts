import { request } from '@/shared/API'
import { QueryKeys } from '@/shared/enums'
import { useQuery } from '@tanstack/react-query'

export const selectMyBookShelfQuery = () =>
  useQuery({
    queryKey: [QueryKeys.BOOKSHELF_KEY],
    queryFn: () => request.get('/bookshelf')
  })

export const selectBookByBookShelfIdQuery = (bookShelfId: string) =>
  useQuery({
    queryKey: [QueryKeys.BOOKSHELF_BOOK_KEY, bookShelfId],
    queryFn: () => request.get(`/bookshelf/${bookShelfId}`)
  })

export const selectUserCollectBookShelfQuery = () =>
  useQuery({
    queryKey: [QueryKeys.USER_COLLECT_KEY],
    queryFn: () => request.get('/collect/bookshelf')
  })

export const selectUserCollectBookShelfByUserIdQuery = (userId: string) =>
  useQuery({
    queryKey: [QueryKeys.USER_BOOKSHELF_KEY, userId],
    queryFn: () => request.get(`/user/bookshelf/${userId}`)
  })
