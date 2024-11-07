import { BookShelfType, Ink } from '@/shared/types'

export type OperateBookShelfModalProps = {
  books: Ink[]
  setBooks: React.Dispatch<React.SetStateAction<Ink[]>>
  currentBookShelf: BookShelfType
  selectBookShelfValue: string
  setSelectBookShelfValue: React.Dispatch<React.SetStateAction<string>>
  selectOptions: {
    value: string
    label: string
  }[]
}