export interface DataType {
  key: number
  username: string
  userId: number
  bookshelf_name: string
  bookshelf_description: string
  tags: string[]
  cover: string
}

export interface tableParamsType {
  pagination: {
    page: number
    limit: number
    select: string | undefined
    value: Array<string> | undefined
    bookshelfName: string | undefined
  }
}

export type DataIndex = keyof DataType
