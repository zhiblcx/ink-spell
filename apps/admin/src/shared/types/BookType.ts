export type BookType = {
  id: number
  name?: string
  cover?: string
  author?: string
  protagonist?: string
  description?: string
  bookFile: string
  bookShelfId: number
  md5: string
  encoding: string
  isDelete: boolean,
  createTimer?: Date
}
