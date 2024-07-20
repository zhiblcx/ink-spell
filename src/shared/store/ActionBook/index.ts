import { create } from 'zustand'
import { AllSelectFlag } from '@/shared/enums'

type ActionBook = {
  deleteFlag: boolean
  allSelectFlag: AllSelectFlag
  addSheftFlag: boolean
  cancelFlag: boolean
  updateDeleteFlag: (flag: boolean) => void
  updateAllSelectFlag: (flag: AllSelectFlag) => void
  updateAddSheftFlag: (flag: boolean) => void
  updateCancelFlag: (flag: boolean) => void
}

export const useActionBook = create<ActionBook>()((set) => ({
  deleteFlag: false,
  allSelectFlag: AllSelectFlag.NOT_ALL_SELECT_FLAG,
  addSheftFlag: false,
  cancelFlag: true,

  updateDeleteFlag: (flag: boolean) => {
    set({ deleteFlag: flag })
  },

  updateAllSelectFlag: (flag: AllSelectFlag) => {
    set({ allSelectFlag: flag })
  },

  updateAddSheftFlag: (flag: boolean) => {
    set({ addSheftFlag: flag })
  },

  updateCancelFlag: (flag: boolean) => {
    set({ cancelFlag: flag })
  }
}))
