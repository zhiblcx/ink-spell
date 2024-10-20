import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { BookHeart, ChevronDown, ChevronRight, Move } from 'lucide-react'

import iconDark from '@/assets/images/icon-dark.png'
import iconLight from '@/assets/images/icon-light.png'
import logoDark from '@/assets/images/logo-dark.png'
import logoLight from '@/assets/images/logo-light.png'
import { selectMyBookShelfQuery } from '@/features/bookshelf'
import { menuList } from '@/mock'
import Navigation from '@/shared/components/Navigation'
import Sortable, { SortableItem } from '@/shared/components/Sortable'
import { Menu, Theme } from '@/shared/enums'
import { useMenuStore, useThemeStore } from '@/shared/store'
import { BookShelfType } from '@/shared/types'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { useTranslation } from 'react-i18next'

function Sidebar() {
  const { t } = useTranslation(['COMMON'])
  const { theme } = useThemeStore()
  const { menu } = useMenuStore()
  const [arrow, setArrow] = useState(true)
  const [bookShelfMenu, setBookShelfMenu] = useState([] as BookShelfType[])
  const { data: query, isSuccess } = selectMyBookShelfQuery()

  useEffect(() => {
    if (isSuccess) {
      setBookShelfMenu(query?.data.data)
    }
  }, [query])

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
          <div className="text-lg font-bold">{t('COMMON:my_bookshelf')}</div>
          <div
            className="absolute right-6"
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
              <Sortable
                originItems={bookShelfMenu}
                setOriginItems={setBookShelfMenu}
              >
                <ul className="mb-6 mt-2 space-y-2 overflow-hidden whitespace-nowrap transition-all">
                  {bookShelfMenu.map((menu: { id: number; label: string; allFlag: boolean; position: number }) =>
                    !menu.allFlag ? (
                      <SortableItem
                        item={menu}
                        id={menu.id}
                        key={menu.id}
                        MoveItem={(props) => (
                          <Navigation
                            value={menu.label}
                            label={`/bookshelf/${UrlUtils.encodeUrlById(menu.id.toString())}`}
                            Icon={BookHeart}
                            Move={Move}
                            move={props.move}
                          />
                        )}
                      ></SortableItem>
                    ) : null
                  )}
                </ul>
              </Sortable>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Sidebar
