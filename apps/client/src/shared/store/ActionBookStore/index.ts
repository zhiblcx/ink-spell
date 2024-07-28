import { AllSelectBookFlag } from '@/shared/enums'
import { create } from 'zustand'

type ActionBookStore = {
  deleteBookFlag: boolean
  allSelectBookFlag: AllSelectBookFlag
  addSheftFlag: boolean
  cancelFlag: boolean
  showShelfFlag: boolean
  deleteShelfFlag: boolean
  showDirectoryFlag: boolean
  updateDeleteFlag: (flag: boolean) => void
  updateAllSelectFlag: (flag: AllSelectBookFlag) => void
  updateAddSheftFlag: (flag: boolean) => void
  updateCancelFlag: (flag: boolean) => void
  updateShowShelfFlag: (flag: boolean) => void
  updateDeleteShelfFlag: (flag: boolean) => void
  updateShowDirectoryFlag: (flag: boolean) => void
}

export const useActionBookStore = create<ActionBookStore>()((set) => ({
  deleteBookFlag: false,
  allSelectBookFlag: AllSelectBookFlag.NOT_ALL_SELECT_FLAG,
  addSheftFlag: false,
  cancelFlag: true,
  showShelfFlag: false,
  deleteShelfFlag: false,
  showDirectoryFlag: true,

  updateDeleteFlag: (flag: boolean) => {
    set({ deleteBookFlag: flag })
  },

  updateAllSelectFlag: (flag: AllSelectBookFlag) => {
    set({ allSelectBookFlag: flag })
  },

  updateAddSheftFlag: (flag: boolean) => {
    set({ addSheftFlag: flag })
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
  }
}))
