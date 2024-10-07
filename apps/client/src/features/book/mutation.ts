import { request } from '@/shared/API'
import { Book, BookMark, Ink } from '@/shared/types'
import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { handleAxiosError } from '../utils'

export const deleteBookByBookIdMutation = (queryClient: () => Promise<void>) => {
  return useMutation({
    mutationFn: (bookId: number) => request.delete(`/book/${bookId}`),
    onSuccess: async (data) => {
      message.success(data.data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })
}

export const collectBookByBookIdMutation = (queryClient: () => Promise<void>) => {
  return useMutation({
    mutationFn: (bookId: number) => request.post(`/book/${bookId}`),
    onSuccess: async (data) => {
      message.success(data.data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })
}

export const updateBookByBookIdMutation = (setBook: (value: React.SetStateAction<Ink>) => void) => {
  return useMutation({
    mutationFn: (book: Book) => request.put(`/book/${book.id}`, book),
    onSuccess: (result) => {
      setBook({ ...result.data.data })
      message.success('修改成功')
    },
    onError: handleAxiosError
  })
}

export const insertBookMarkMutation = () =>
  useMutation({
    mutationFn: (bookMark: BookMark) => request.post(`/book/bookmark`, bookMark),
    onSuccess: async (data) => {
      message.success(data.data.message)
    },
    onError: handleAxiosError
  })

export const deleteBookMarkMutation = () =>
  useMutation({
    mutationFn: (bookMark: BookMark) => request.put('/book/bookmark', bookMark),
    onSuccess: async (data) => {
      message.success(data.data.message)
    },
    onError: handleAxiosError
  })
