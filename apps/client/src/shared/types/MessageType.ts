import { User } from "./user"

export type MessageType = {
  id: number
  userId: number
  text: string
  user?: User
  type: string
  createTimer: string
}
