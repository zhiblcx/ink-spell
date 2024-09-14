import { Theme } from '@/shared/enums/Theme'
import { useThemeStore } from '@/shared/store'
import { MoonStar, Sun } from 'lucide-react'

function ThemeToggle({ size = 24 }) {
  const { theme, setTheme } = useThemeStore()

  function toggleTheme() {
    const currentTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    setTheme(currentTheme)
  }

  return <div onClick={toggleTheme}>{theme === Theme.DARK ? <Sun size={size} /> : <MoonStar size={size} />}</div>
}

export default ThemeToggle
