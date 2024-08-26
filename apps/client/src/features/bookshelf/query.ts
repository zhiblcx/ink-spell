import { request } from '@/shared/API'
import { useQuery } from '@tanstack/react-query'

export const selectMyBookShelfQuery = () =>
  useQuery({
    queryKey: ['bookshelf'],
    queryFn: () => request.get('/bookshelf')
  })

export const selectBookByBookShelfIdQuery = (bookShelfId: string) =>
  useQuery({
    queryKey: ['bookshelf_book', bookShelfId],
    queryFn: () => request.get(`/bookshelf/${bookShelfId}`)
  })

export const selectUserCollectBookShelfQuery = () =>
  useQuery({
    queryKey: ['user-collect'],
    queryFn: () => request.get('/collect/bookshelf')
  })

export const selectUserCollectBookShelfByUserIdQuery = (userId: string) =>
  useQuery({
    queryKey: ['user-bookshelf'],
    queryFn: () => request.get(`/user/bookshelf/${userId}`)
  })
