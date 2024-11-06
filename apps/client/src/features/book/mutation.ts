import { httpRequest } from '@/shared/API'
import { Book, BookMark, Ink } from '@/shared/types'
import { message } from 'antd'
import { handleAxiosError } from '../utils'

export const deleteBookByBookIdMutation = (queryClient: () => Promise<void>) =>
  useMutation({
    mutationFn: (bookId: number) => httpRequest.delete(`/book/${bookId}`),
    onSuccess: async (data) => {
      message.success(data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })

export const collectBookByBookIdMutation = (queryClient: () => Promise<void>) =>
  useMutation({
    mutationFn: (bookId: number) => httpRequest.post(`/book/${bookId}`),
    onSuccess: async (data) => {
      message.success(data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })

// TODO: 利用 key 去掉 setBook
export const updateBookByBookIdMutation = (setBook: (value: React.SetStateAction<Ink>) => void) =>
  useMutation({
    mutationFn: (book: Book) => httpRequest.put(`/book/${book.id}`, book),
    onSuccess: (result) => {
      setBook({ ...result.data })
      message.success('修改成功')
    },
    onError: handleAxiosError
  })

export const insertBookMarkMutation = (queryClient: () => Promise<void>) =>
  useMutation({
    mutationFn: (bookMark: BookMark) => httpRequest.post(`/bookmark`, bookMark),
    onSuccess: async (data) => {
      message.success(data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })

export const deleteBookMarkMutation = (queryClient: () => Promise<void>) =>
  useMutation({
    mutationFn: (bookMark: BookMark) => httpRequest.put('/bookmark', bookMark),
    onSuccess: async (data) => {
      message.success(data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })
