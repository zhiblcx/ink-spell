export interface operateBookShelfType {
  operate: string
  bookShelfInfo: object
  api: string
}

export interface BookShelfType {
  id: number
  label: string
  createTimer: Date
  allFlag: boolean
  position: number
  cover: string
  isPublic: boolean
  description: string
  userId: number
}

export interface BookShelfDao extends BookShelfType {
  bookShelfName?: string
}
