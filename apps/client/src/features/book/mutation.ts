import { request } from '@/shared/API'
import { Book, BookMark, Ink } from '@/shared/types'
import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { handleAxiosError } from '../utils'

export const deleteBookByBookIdMutation = (queryClient: () => Promise<void>) =>
  useMutation({
    mutationFn: (bookId: number) => request.delete(`/book/${bookId}`),
    onSuccess: async (data) => {
      message.success(data.data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })

export const collectBookByBookIdMutation = (queryClient: () => Promise<void>) =>
  useMutation({
    mutationFn: (bookId: number) => request.post(`/book/${bookId}`),
    onSuccess: async (data) => {
      message.success(data.data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })

export const updateBookByBookIdMutation = (setBook: (value: React.SetStateAction<Ink>) => void) =>
  useMutation({
    mutationFn: (book: Book) => request.put(`/book/${book.id}`, book),
    onSuccess: (result) => {
      setBook({ ...result.data.data })
      message.success('修改成功')
    },
    onError: handleAxiosError
  })

export const insertBookMarkMutation = (queryClient: () => Promise<void>) =>
  useMutation({
    mutationFn: (bookMark: BookMark) => request.post(`/bookmark`, bookMark),
    onSuccess: async (data) => {
      message.success(data.data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })

export const deleteBookMarkMutation = (queryClient: () => Promise<void>) =>
  useMutation({
    mutationFn: (bookMark: BookMark) => request.put('/bookmark', bookMark),
    onSuccess: async (data) => {
      message.success(data.data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })
