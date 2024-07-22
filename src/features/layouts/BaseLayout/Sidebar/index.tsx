import clsx from 'clsx'
import { useState } from 'react'
import { BookHeart, ChevronRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import logoDark from '@/assets/images/logo-dark.png'
import logoLight from '@/assets/images/logo-light.png'
import iconDark from '@/assets/images/icon-dark.png'
import iconLight from '@/assets/images/icon-light.png'
import Navigation from '@/shared/components/Navigation'
import { Theme, Menu } from '@/shared/enums'
import { useThemeStore, useMenuStore } from '@/shared/store'
import { menuList, user_mock, shelf_value_mock } from '@/mock'

function Sidebar() {
  const { theme } = useThemeStore()
  const { menu } = useMenuStore()
  const [arrow, setArrow] = useState(true)
  const [myMenuList] = useState(shelf_value_mock.filter((item) => item.dic_id == user_mock.dic_id))

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
    <div
      className={clsx(
        'bg-white dark:bg-black p-2 mr-2 transition-all',
        menu === Menu.EXTEND ? 'md:w-[60px] min-[375px]:w-0' : 'w-[220px]'
      )}
    >
      <Icon />

      <div className="md:hover:overflow-y-auto md:overflow-y-hidden min-[375px]:overflow-y-auto h-full scroll">
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

        <div
          className={clsx(menu == Menu.EXTEND ? 'hidden' : '', 'relative flex items-center px-3 py-2 mb-1 w-[220px]')}
        >
          <div className="font-bold text-lg">我的书架</div>
          <div
            className="absolute right-4"
            onClick={() => {
              setArrow(!arrow)
            }}
          >
            {arrow ? <ChevronDown /> : <ChevronRight />}
          </div>
        </div>
        <AnimatePresence initial={false}>
          {arrow && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ul className="whitespace-nowrap space-y-2 overflow-hidden mt-2 transition-all">
                {myMenuList.map((menu) => (
                  <li key={menu.id}>
                    <Navigation
                      value={menu.label}
                      label={`/bookshelf/${menu.id}`}
                      Icon={BookHeart}
                    />
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Sidebar
