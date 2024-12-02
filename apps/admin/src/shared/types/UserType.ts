export type UserType = {
  id: number
  username: string
  account: string
  email: string
  avatar: string
  oauth: string
  books?: number
  followers?: number
  following?: number,
  offlineTime?: string,
  readTime: number
}
