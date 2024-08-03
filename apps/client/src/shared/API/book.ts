import { request } from './request'

export const getBookByBookIdAPI = (bookID: string) => request.get(`/book/${bookID}`)
export const deleteBookByBookIdAPI = (bookID: number) => request.delete(`/book/${bookID}`)
