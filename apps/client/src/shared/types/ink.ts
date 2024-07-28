export type Ink = {
  id: number
  name?: string
  ink_img: string
  protagonist?: Array<string>
  description?: string
  book_file?: string
  bookshlef_id?: number
  author?: string
  md5?: string
  checked?: boolean
}

export type User = {
  id: number
  username: string
  account: string
  password: string
  email: string
  sex: string
  avatar: string
}
