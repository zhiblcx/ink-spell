import { defineStore } from 'pinia'
import { ThemeUtils } from '../utils/ThemeUtils'
import { ThemeEnum } from '../enums/ThemeEnum'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ThemeEnum>(ThemeUtils.getTheme() as ThemeEnum ?? ThemeEnum.LIGHT)

  function changeTheme(state: ThemeEnum) {
    ThemeUtils.changeTheme(state)
    theme.value = state
  }

  changeTheme(theme.value)

  return { theme, changeTheme }
})


