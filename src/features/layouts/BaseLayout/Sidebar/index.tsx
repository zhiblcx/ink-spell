import { House, Users, Bot } from 'lucide-react'
import clsx from 'clsx'

import logoDark from '@/assets/images/logo-dark.png'
import logoLight from '@/assets/images/logo-light.png'
import iconDark from '@/assets/images/icon-dark.png'
import iconLight from '@/assets/images/icon-light.png'
import { Theme, Menu } from '@/shared/enums'
import { useThemeStore, useMenuStore } from '@/shared/store'

function Sidebar() {
  const { theme } = useThemeStore()
  const { menu } = useMenuStore()

  function Icon() {
    return (
      <>
        {menu === Menu.EXTEND ? (
          <img
            src={theme === Theme.DARK ? iconDark : iconLight}
            className="min-[375px]:w-[76px] scale-75"
          />
        ) : (
          <img
            src={theme === Theme.DARK ? logoLight : logoDark}
            className="min-[375px]:w-[0] md:w-[220px]"
          />
        )}
      </>
    )
  }
  return (
    <div
      className={clsx(
        menu === Menu.EXTEND ? 'md:w-[76px]' : '',
        'dark:bg-black md:w-[220px] min-[375px]:w-[76px] px-4 mr-1 pt-6 transition-all'
      )}
    >
      <Icon />
      <ul>
        <li className="relative flex items-center cursor-pointer hover:bg-slate-300 rounded-xl px-2 py-1 my-2 whitespace-nowrap overflow-hidden">
          <House className="absolute mx-[3px]" />
          <div className="relative left-9">我的书架</div>
        </li>
        <li className="relative flex items-center cursor-pointer hover:bg-slate-300 rounded-xl px-2 py-1 my-2 whitespace-nowrap overflow-hidden">
          <Users className="absolute mx-[3px]" />
          <div className="relative left-9">我的好友我的好友</div>
        </li>
        <li className="relative flex items-center cursor-pointer hover:bg-slate-300 rounded-xl px-2 py-1 my-2 whitespace-nowrap overflow-hidden">
          <Bot className="absolute mx-[3px]" />
          <div className="relative left-9">聊天室</div>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
