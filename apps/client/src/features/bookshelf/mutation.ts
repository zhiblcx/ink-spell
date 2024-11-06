import { httpRequest } from '@/shared/API'
import { BookShelfType } from '@/shared/types'
import { message } from 'antd'
import { AxiosResponse } from 'axios'
import { handleAxiosError } from '../utils'
import { BookShelfDao, operateBookShelfType } from './types'

export const deleteBookShelfMutation = (deleteId: string, queryClient: () => Promise<void>) => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: () => httpRequest.delete(`/bookshelf/${deleteId}`),
    onSuccess: async (data) => {
      message.success(data.message)
      navigate({ to: '/', replace: true })
      await queryClient()
    },
    onError: handleAxiosError
  })
}

export const updateBookShelfPositionMutation = (showMessage: (data: AxiosResponse) => void) => {
  return useMutation({
    mutationFn: (data: BookShelfDao) => httpRequest.put<AxiosResponse>(`bookshelf/${data.id}`, data, { expectData: true }),
    onSuccess: (data: AxiosResponse) => {
      showMessage(data)
    },
    onError: handleAxiosError
  })
}

export const updateBookShelfDetailMutation = (queryClient: () => Promise<void>) => {
  return useMutation({
    mutationFn: (bookShelfData: BookShelfType) => httpRequest.put(`/bookshelf/${bookShelfData.id}`, bookShelfData),
    onSuccess: async (data) => {
      message.success(data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })
}

// 添加书架或者给书架添加书籍
export const operateBookShelfMutation = (
  handlerUpdateBookShelf: (id: number) => void,
  bookShelfQueryClient: () => Promise<void>,
  bookShelfBookQueryClient: () => Promise<void>
) => {
  return useMutation({
    mutationFn: (result: operateBookShelfType) => {
      if (result.operate === 'add') {
        return httpRequest.post(result.api, result.bookShelfInfo)
      } else {
        return httpRequest.put(result.api, result.bookShelfInfo)
      }
    },
    onSuccess: async (data) => {
      if (data.data === undefined) {
        return message.error(data.message)
      }
      // 新增书架
      if (data.data.md5 === undefined) {
        handlerUpdateBookShelf(data.data.id)
        message.success(data.message)
        await bookShelfQueryClient()
      } else {
        // 添加书籍
        message.success(data.message)
        await bookShelfBookQueryClient()
      }
    },
    onError: handleAxiosError
  })
}

export const cancelCollectBookShelfMutation = (queryClient: () => Promise<void>) => {
  return useMutation({
    mutationFn: (bookShelfId: number) => httpRequest.delete(`/collect/bookshelf/${bookShelfId}`),
    onSuccess: async (data) => {
      message.success(data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })
}

export const collectBookShelfMutation = (queryClient: () => Promise<void>) => {
  return useMutation({
    mutationFn: (bookShelfId: number) => httpRequest.post(`/collect/bookshelf/${bookShelfId}`),
    onSuccess: async (data) => {
      message.success(data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })
}

export const downloadBookShelfNotesMutation = () => {
  return useMutation({
    mutationFn: (bookShelfId: number) => httpRequest.get<AxiosResponse>(`/bookshelf/download/${bookShelfId}`, {}, { expectData: true }),
    onSuccess: (data) => {
      const fileName = data.headers['content-disposition'].split('"')[1]
      const url = window.URL.createObjectURL(new Blob([data.data]))
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    }
  })
}
