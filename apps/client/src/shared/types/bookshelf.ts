import { TagType } from "./tag"

export type BookShelfType = {
  id: number
  label: string
  createTimer: Date
  allFlag: boolean
  position: number
  cover: string
  isPublic: boolean
  description: string
  userId: number,
  tags?: Array<TagType> | Array<number>
}

export type UserCollectType = {
  id: number
  userId: number
  bookShelfId: number
}
