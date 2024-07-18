import clsx from 'clsx'
import { House, Users, Bot } from 'lucide-react'
import { motion } from 'framer-motion'

import logoDark from '@/assets/images/logo-dark.png'
import logoLight from '@/assets/images/logo-light.png'
import iconDark from '@/assets/images/icon-dark.png'
import iconLight from '@/assets/images/icon-light.png'
import Navigation from '@/shared/components/Navigation'
import { Theme, Menu } from '@/shared/enums'
import { useThemeStore, useMenuStore } from '@/shared/store'

function Sidebar() {
  const { theme } = useThemeStore()
  const { menu } = useMenuStore()

  const menuList = [
    {
      label: '/',
      value: '我的书架',
      Icon: House
    },
    {
      label: '/myfriend',
      value: '我的好友',
      Icon: Users
    },
    {
      label: '/chatroom',
      value: '聊天室',
      Icon: Bot
    }
  ]

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
      transition={{
        layout: { duration: 0.2 }
      }}
      className={clsx(
        'bg-white dark:bg-black p-2 mr-2 transition-all',
        menu === Menu.EXTEND ? 'md:w-[59px] min-[375px]:w-0' : 'min-w-[220px]'
      )}
    >
      <Icon />
      <ul className="whitespace-nowrap overflow-hidden space-y-2 mt-4">
        {menuList.map((item, index) => (
          <li key={index}>
            <Navigation
              value={item.value}
              label={item.label}
              Icon={item.Icon}
            />
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default Sidebar
