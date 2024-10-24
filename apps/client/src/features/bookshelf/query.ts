import { axiosInstance } from '@/shared/API'
import { QueryKeys } from '@/shared/enums'
import { useQuery } from '@tanstack/react-query'

export const selectMyBookShelfQuery = () =>
  useQuery({
    queryKey: [QueryKeys.BOOKSHELF_KEY],
    queryFn: () => axiosInstance.get('/bookshelf')
  })

export const selectBookByBookShelfIdQuery = (bookShelfId: string) =>
  useQuery({
    queryKey: [QueryKeys.BOOKSHELF_BOOK_KEY, bookShelfId],
    queryFn: () => axiosInstance.get(`/bookshelf/${bookShelfId}`)
  })

export const selectUserCollectBookShelfQuery = () =>
  useQuery({
    queryKey: [QueryKeys.USER_COLLECT_KEY],
    queryFn: () => axiosInstance.get('/collect/bookshelf')
  })

export const selectUserCollectBookShelfByUserIdQuery = (userId: string) =>
  useQuery({
    queryKey: [QueryKeys.USER_BOOKSHELF_KEY, userId],
    queryFn: () => axiosInstance.get(`/user/bookshelf/${userId}`)
  })
