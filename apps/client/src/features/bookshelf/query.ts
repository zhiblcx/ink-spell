import { request } from '@/shared/API'
import { useQuery } from '@tanstack/react-query'

export const selectMyBookShelfQuery = () => {
  return useQuery({
    queryKey: ['bookshelf'],
    queryFn: () => request.get('/bookshelf')
  })
}

export const selectBookByBookShelfIdQuery = (bookShelfId: string) => {
  return useQuery({
    queryKey: ['bookshelf_book', bookShelfId],
    queryFn: () => request.get(`/bookshelf/${bookShelfId}`)
  })
}

export const selectUserCollectBookShelfQuery = () => {
  return useQuery({
    queryKey: ['user-collect'],
    queryFn: () => request.get('/collect/bookshelf')
  })
}

export const selectUserCollectBookShelfByUserIdQuery = (userId: string) => {
  return useQuery({
    queryKey: ['user-bookshelf'],
    queryFn: () => request.get(`/user/bookshelf/${userId}`)
  })
}
