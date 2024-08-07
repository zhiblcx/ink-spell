import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { BookHeart, ChevronDown, ChevronRight } from 'lucide-react'

import iconDark from '@/assets/images/icon-dark.png'
import iconLight from '@/assets/images/icon-light.png'
import logoDark from '@/assets/images/logo-dark.png'
import logoLight from '@/assets/images/logo-light.png'
import { menuList } from '@/mock'
import { request } from '@/shared/API'
import Navigation from '@/shared/components/Navigation'
import { Menu, Theme } from '@/shared/enums'
import { useMenuStore, useThemeStore } from '@/shared/store'
import { useQuery } from '@tanstack/react-query'

function Sidebar() {
  const { theme } = useThemeStore()
  const { menu } = useMenuStore()
  const [arrow, setArrow] = useState(true)

  const query = useQuery({ queryKey: ['bookshelf'], queryFn: () => request.get('bookshelf') })

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
            className="mt-3 w-[200px]"
          />
        )}
      </>
    )
  }

  return (
    <div
      className={clsx('mr-2 p-2 transition-all', menu === Menu.EXTEND ? 'min-[375px]:w-0 md:w-[60px]' : 'w-[220px]')}
    >
      <Icon />
      <div className="scroll h-full min-[375px]:overflow-y-auto md:overflow-y-hidden md:hover:overflow-y-auto">
        <ul className="mt-4 space-y-2 overflow-hidden whitespace-nowrap">
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
          className={clsx(menu == Menu.EXTEND ? 'hidden' : '', 'relative mb-1 flex w-[220px] items-center px-3 py-2')}
        >
          <div className="text-lg font-bold">我的书架</div>
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
              <ul className="mb-6 mt-2 space-y-2 overflow-hidden whitespace-nowrap transition-all">
                {query.data?.data.data.map((menu: { label: string; id: number; allFlag: boolean }) =>
                  !menu.allFlag ? (
                    <li key={menu.id}>
                      <Navigation
                        value={menu.label}
                        label={`/bookshelf/${menu.id}`}
                        Icon={BookHeart}
                      />
                    </li>
                  ) : (
                    ''
                  )
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Sidebar
