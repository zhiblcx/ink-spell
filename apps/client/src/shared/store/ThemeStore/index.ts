import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { ThemeUtils } from '@/shared/utils'
import { ThemeEnum } from '@/shared/enums'

type ThemeStore = {
  theme: ThemeEnum
  setTheme: (theme: ThemeEnum) => void
}

export const useThemeStore = create<ThemeStore>()(
  subscribeWithSelector((set) => ({
    theme: ThemeUtils.getTheme() as ThemeEnum,
    setTheme: (theme: ThemeEnum) => {
      set({ theme })
      ThemeUtils.changeTheme(theme)
    }
  }))
)

useThemeStore.subscribe(
  (state) => state.theme,
  (theme) => {
    useThemeStore.getState().setTheme(theme)
  },
  {
    fireImmediately: true
  }
)
