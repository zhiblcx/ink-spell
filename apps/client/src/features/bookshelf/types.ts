export interface operateBookShelfType {
  operate: string
  bookShelfInfo: {
    [key: string]: string | undefined | boolean | number
  }
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
  [key: string]: string | number | Date | boolean | undefined
}

export interface BookShelfDao extends BookShelfType {
  bookShelfName?: string
}
