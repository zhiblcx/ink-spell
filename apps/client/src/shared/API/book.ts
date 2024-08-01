import request from './request'

export const getBookByBookIdAPI = (bookID: string) => request.get(`/book/${bookID}`)
