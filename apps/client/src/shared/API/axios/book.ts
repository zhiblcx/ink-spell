import { Book, BookMark } from '@/shared/types'
import { httpRequest } from '../HttpRequest'

export const deleteBookByBookIdApi = (bookId: number) =>
  httpRequest.delete(`/book/${bookId}`)

export const collectBookByBookIdApi = (bookId: number) =>
  httpRequest.post(`/book/${bookId}`)

export const updateBookByBookIdApi = (book: Book) =>
  httpRequest.put(`/book/${book.id}`, book)

export const insertBookMarkApi = (bookMark: BookMark) =>
  httpRequest.post(`/bookmark`, bookMark)

export const deleteBookMarkApi = (bookMark: BookMark) =>
  httpRequest.put('/bookmark', bookMark)
