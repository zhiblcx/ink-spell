import { defineStore } from 'pinia'
import { ThemeUtils } from '../utils/ThemeUtils'
import { ThemeEnum } from '../enums/ThemeEnum'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(ThemeUtils.getTheme() ?? ThemeEnum.LIGHT)

  function changeTheme(state: ThemeEnum) {
    ThemeUtils.setTheme(state)
    theme.value = state
  }

  return { theme, changeTheme }
})

