import { House, Users, Bot } from 'lucide-react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

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
            src={theme === Theme.DARK ? iconLight : iconDark}
            className="w-[52px] scale-75"
          />
        ) : (
          <img
            src={theme === Theme.DARK ? logoLight : logoDark}
            className="w-[200px] mt-3"
          />
        )}
      </>
    )
  }
  return (
    <motion.div
      layout
      className={clsx(
        'bg-white dark:bg-black p-2 w-[220px] mr-2 transition-all',
        menu === Menu.EXTEND ? 'w-[59px]' : 'min-w-[150px]'
      )}
    >
      <Icon />
      <ul className="whitespace-nowrap overflow-hidden space-y-2 mt-4">
        <li className="dark:hover:bg-[#474c50] relative flex items-center cursor-pointer hover:bg-[#4b4b4b] hover:text-white rounded-xl px-2 py-2">
          <House className="absolute mx-[3px]" />
          <div className="relative left-9">我的书架</div>
        </li>
        <li className="dark:hover:bg-[#474c50] relative flex items-center cursor-pointer hover:bg-[#4b4b4b] hover:text-white rounded-xl px-2 py-2">
          <Users className="absolute mx-[3px]" />
          <div className="relative left-9">我的好友</div>
        </li>
        <li className="dark:hover:bg-[#474c50] relative flex items-center cursor-pointer hover:bg-[#4b4b4b] hover:text-white rounded-xl px-2 py-2">
          <Bot className="absolute mx-[3px]" />
          <div className="relative left-9">聊天室</div>
        </li>
      </ul>
    </motion.div>
  )
}

export default Sidebar
