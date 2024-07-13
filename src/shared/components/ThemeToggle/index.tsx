import { Switch } from 'antd'
import { Theme } from '@/shared/enums/Theme'
import { useThemeStore } from '@/shared/store'

function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()

  function toggleTheme() {
    const currentTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    setTheme(currentTheme)
  }

  return (
    <Switch
      onChange={toggleTheme}
      checked={theme === Theme.DARK}
    />
  )
}

export default ThemeToggle
