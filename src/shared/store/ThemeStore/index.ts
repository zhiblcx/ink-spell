import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import { Theme } from '@/shared/enums'
import { ThemeUtils } from '@/shared/utils'

type ThemeStore = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  subscribeWithSelector((set) => ({
    theme: ThemeUtils.getTheme() as Theme,
    setTheme: (theme: Theme) => {
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
