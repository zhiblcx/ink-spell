export type Ink = {
  id: number
  ink_name?: string
  ink_img: string
  protagonist?: Array<string>
  detail?: string
  book_file?: string
  bookshlef_id?: number
  md5?: string
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
