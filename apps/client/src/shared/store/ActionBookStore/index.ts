import { AllSelectBookEnum } from '@/shared/enums'
import { SetUp } from '@/shared/types'
import { BookUtils } from '@/shared/utils'
import { create } from 'zustand'

type ActionBookStore = {
  bookToBookShelfFlag: boolean
  deleteBookFlag: boolean
  allSelectBookFlag: AllSelectBookEnum
  addShelfFlag: boolean
  cancelFlag: boolean
  showShelfFlag: boolean
  deleteShelfFlag: boolean
  showDirectoryFlag: boolean
  uploadFileFlag: boolean
  searchBookName: string
  modifyBookShelfFlag: boolean
  isOtherBookShelfFlag: boolean
  showSetUpFlag: boolean

  updateDeleteBookFlag: (flag: boolean) => void
  updateAllSelectFlag: (flag: AllSelectBookEnum) => void
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
  updateShowSetUpFlag: (flag: boolean) => void
}

export const useActionBookStore = create<ActionBookStore>()((set) => ({
  deleteBookFlag: false,
  allSelectBookFlag: AllSelectBookEnum.NOT_ALL_SELECT_FLAG,
  addShelfFlag: false,
  cancelFlag: true,
  showShelfFlag: false,
  deleteShelfFlag: false,
  showDirectoryFlag: (JSON.parse(BookUtils.getSetup() ?? '[]') as SetUp).openDirectory || false,
  uploadFileFlag: false,
  bookToBookShelfFlag: false,
  searchBookName: '',
  modifyBookShelfFlag: false,
  isOtherBookShelfFlag: false,
  showSetUpFlag: false,

  updateDeleteBookFlag: (flag: boolean) => {
    set({ deleteBookFlag: flag })
  },

  updateAllSelectFlag: (flag: AllSelectBookEnum) => {
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
  },

  updateShowSetUpFlag: (flag: boolean) => {
    set({ showSetUpFlag: flag })
  }
}))
