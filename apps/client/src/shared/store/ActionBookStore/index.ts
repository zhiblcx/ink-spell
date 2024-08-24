import { AllSelectBookFlag } from '@/shared/enums'
import { create } from 'zustand'

type ActionBookStore = {
  bookToBookShelfFlag: boolean
  deleteBookFlag: boolean
  allSelectBookFlag: AllSelectBookFlag
  addShelfFlag: boolean
  cancelFlag: boolean
  showShelfFlag: boolean
  deleteShelfFlag: boolean
  showDirectoryFlag: boolean
  uploadFileFlag: boolean
  searchBookName: string
  modifyBookShelfFlag: boolean
  isOtherBookShelfFlag: boolean

  updateDeleteFlag: (flag: boolean) => void
  updateAllSelectFlag: (flag: AllSelectBookFlag) => void
  updateAddShelfFlag: (flag: boolean) => void
  updateCancelFlag: (flag: boolean) => void
  updateShowShelfFlag: (flag: boolean) => void
  updateDeleteShelfFlag: (flag: boolean) => void
  updateShowDirectoryFlag: (flag: boolean) => void
  updateUploadFileFlag: (flag: boolean) => void
  updateBookToBookShelfFlag: (flag: boolean) => void
  updateSearchBookName: (name: string) => void
  updateModifyBookShelfFlag: (flag: boolean) => void
  updateIsOtherBookShelfFlag: (flag: boolean) => void
}

export const useActionBookStore = create<ActionBookStore>()((set) => ({
  deleteBookFlag: false,
  allSelectBookFlag: AllSelectBookFlag.NOT_ALL_SELECT_FLAG,
  addShelfFlag: false,
  cancelFlag: true,
  showShelfFlag: false,
  deleteShelfFlag: false,
  showDirectoryFlag: true,
  uploadFileFlag: false,
  bookToBookShelfFlag: false,
  searchBookName: '',
  modifyBookShelfFlag: false,
  isOtherBookShelfFlag: false,

  updateDeleteFlag: (flag: boolean) => {
    set({ deleteBookFlag: flag })
  },

  updateAllSelectFlag: (flag: AllSelectBookFlag) => {
    set({ allSelectBookFlag: flag })
  },

  updateAddShelfFlag: (flag: boolean) => {
    set({ addShelfFlag: flag })
  },

  updateCancelFlag: (flag: boolean) => {
    set({ cancelFlag: flag })
  },

  updateShowShelfFlag: (flag: boolean) => {
    set({ showShelfFlag: flag })
  },

  updateDeleteShelfFlag: (flag: boolean) => {
    set({ deleteShelfFlag: flag })
  },

  updateShowDirectoryFlag: (flag: boolean) => {
    set({ showDirectoryFlag: flag })
  },

  updateUploadFileFlag: (flag: boolean) => {
    set({ uploadFileFlag: flag })
  },

  updateBookToBookShelfFlag: (flag: boolean) => {
    set({ bookToBookShelfFlag: flag })
  },

  updateSearchBookName: (name: string) => {
    set({ searchBookName: name })
  },

  updateModifyBookShelfFlag: (flag: boolean) => {
    set({ modifyBookShelfFlag: flag })
  },
  updateIsOtherBookShelfFlag: (flag: boolean) => {
    set({ isOtherBookShelfFlag: flag })
  }
}))
