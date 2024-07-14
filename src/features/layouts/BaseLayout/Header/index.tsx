import ThemeToggle from '@/shared/components/ThemeToggle'
import { Input } from 'antd'
import logoDark from '@/assets/images/logo_dark.png'
import logoLight from '@/assets/images/logo_light.png'
import { Theme } from '@/shared/enums'
import { useThemeStore } from '@/shared/store/ThemeStore'

function Header() {
  const { Search } = Input
  const { theme } = useThemeStore()
  return (
    <div className="dark:bg-black flex justify-between items-center py-4">
      <div className="flex">
        <img
          src={theme === Theme.DARK ? logoLight : logoDark}
          className="min-[375px]:w-[0] md:w-[200px] mr-3"
        />
        <Search
          className="flex justify-center items-center mx-2 min-[375px]:mx-0"
          placeholder="请输入要搜索的书籍"
          style={{ width: 200 }}
        />
      </div>
      <div className="min-[375px]:m-2 md:mr-10">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Header
