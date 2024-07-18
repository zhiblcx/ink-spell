export type Ink = {
  id?: number
  ink_name?: string
  ink_img: string
  protagonist?: Array<string>
  detail?: string
  book_file?: string
  category_id?: number
  checked?: boolean
}

export type Category = {
  id: number
  icon: string
  name: string
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
