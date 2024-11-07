import { EditBookShelfOpenFlag } from '@/shared/enums/EditBookShelfOpenFlag'
import { BookShelfType, Ink } from '@/shared/types'
import { UploadFile } from 'antd'

export type OperateBookShelfModalProps = {
  books: Ink[]
  setBooks: React.Dispatch<React.SetStateAction<Ink[]>>
  currentBookShelf: BookShelfType
  editBookShelfOpenFlag: EditBookShelfOpenFlag
  setEditBookShelfOpenFlag: React.Dispatch<React.SetStateAction<EditBookShelfOpenFlag>>
  cover: UploadFile<any>[]
  setCover: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
  selectBookShelfValue: string
  setSelectBookShelfValue: React.Dispatch<React.SetStateAction<string>>
  selectOptions: {
    value: string
    label: string
  }[]
}