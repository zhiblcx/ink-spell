import { create } from 'zustand'

type ActionBook = {
  deleteFlag: boolean
  allSelectFlag: number
  addSheftFlag: boolean
  cancelFlag: boolean
  updateDeleteFlag: (flag: boolean) => void
  updateAllSelectFlag: (flag: number) => void
  updateAddSheftFlag: (flag: boolean) => void
  updateCancelFlag: (flag: boolean) => void
}

export const useActionBook = create<ActionBook>()((set) => ({
  deleteFlag: false,
  // -1 未选，0 全选 1 全不选
  allSelectFlag: -1,
  addSheftFlag: false,
  cancelFlag: true,

  updateDeleteFlag: (flag: boolean) => {
    set({ deleteFlag: flag })
  },

  updateAllSelectFlag: (flag: number) => {
    set({ allSelectFlag: flag })
  },

  updateAddSheftFlag: (flag: boolean) => {
    set({ addSheftFlag: flag })
  },

  updateCancelFlag: (flag: boolean) => {
    set({ cancelFlag: flag })
  }
}))
