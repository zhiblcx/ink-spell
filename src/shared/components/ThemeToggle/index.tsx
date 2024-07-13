import { Switch } from 'antd'
import { ThemeUtils } from '@/shared/utils'
import { Theme } from '@/shared/enums/Theme'
import { useState } from 'react'

function ThemeToggle() {
  const [theme, setTheme] = useState(Theme.LIGHT)

  function changeTheme(checked: boolean) {
    const currentTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    setTheme(currentTheme)
    ThemeUtils.changeTheme(currentTheme)
  }

  return <Switch onChange={changeTheme} />
}

export default ThemeToggle
