import { Theme } from '@/shared/enums/Theme'
import { useThemeStore } from '@/shared/store'
import { MoonStar, Sun } from 'lucide-react'

function ThemeToggle({ size = 24 }) {
  const { theme, setTheme } = useThemeStore()

  // 如果当前页面是暗色，则切换为亮色；如果当前页面是亮色，则切换为暗色
  const willDark = theme === Theme.LIGHT

  function toggleTheme(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const currentTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    if (!document.startViewTransition) {
      setTheme(currentTheme)
    } else {
      const transition = document.startViewTransition(() => {
        setTheme(currentTheme)
      })
      // 传入点击事件，从点击处开始扩散。否则，从右上角开始扩散
      const x = event?.clientX ?? window.innerWidth
      const y = event?.clientY ?? 0
      const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
      void transition.ready.then(() => {
        const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
        document.documentElement.animate(
          {
            clipPath: willDark ? clipPath : [...clipPath].reverse()
          },
          {
            duration: 500,
            easing: 'ease-in',
            pseudoElement: willDark ? '::view-transition-new(root)' : '::view-transition-old(root)'
          }
        )
      })
    }
  }

  return (
    <div onClick={(event) => toggleTheme(event)}>
      {theme === Theme.DARK ? <Sun size={size} /> : <MoonStar size={size} />}
    </div>
  )
}

export default ThemeToggle
