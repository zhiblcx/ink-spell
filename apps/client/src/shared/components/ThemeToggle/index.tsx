import { Theme } from '@/shared/enums/Theme'
import { useThemeStore } from '@/shared/store'
import { Sun, MoonStar } from 'lucide-react'

function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()

  function toggleTheme() {
    const currentTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    setTheme(currentTheme)
  }

  return <div onClick={toggleTheme}>{theme === Theme.DARK ? <Sun /> : <MoonStar />}</div>
}

export default ThemeToggle
