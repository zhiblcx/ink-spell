import { request } from '@/shared/API'
import { Ink } from '@/shared/types'
import { Book } from '@/shared/types/book'
import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { handleAxiosError } from '../utils'

export const deleteBookByBookIdMutation = (queryClient: () => Promise<void>) => {
  return useMutation({
    mutationFn: (bookId: number) => request.delete(`/book/${bookId}`),
    onSuccess: async (data) => {
      message.success(data.data.data.message)
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
    }
  })
}
