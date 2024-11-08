import { iconDarkImg, iconLightImg, logoDarkImg, logoLightImg } from '@/assets/images'
import { selectMyBookShelfQuery } from '@/features/bookshelf'
import { ALL_BOOK, CHAR_ROOM, MY_FRIEND } from '@/shared/constants'
import { useMenuStore, useThemeStore } from '@/shared/store'
import { BookShelfType } from '@/shared/types'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { BookHeart, BookText, Bot, ChevronDown, ChevronRight, Move, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function Sidebar() {
  const { t } = useTranslation(['COMMON'])
  const { theme } = useThemeStore()
  const { menu } = useMenuStore()
  const [arrow, setArrow] = useState(true)
  const [bookShelfMenu, setBookShelfMenu] = useState([] as BookShelfType[])
  const { data: query, isSuccess } = selectMyBookShelfQuery()

  const menuList = [
    {
      label: ALL_BOOK.URL,
      value: t('COMMON:all_book'),
      Icon: BookText
    },
    {
      label: MY_FRIEND.URL,
      value: t('COMMON:my_friend'),
      Icon: Users
    },
    {
      label: CHAR_ROOM.URL,
      value: t('COMMON:char_room'),
      Icon: Bot
    }
  ]

  useEffect(() => {
    if (isSuccess) {
      setBookShelfMenu(query?.data)
    }
  }, [query])

  function Icon() {
    return (
      <>
        {menu === MenuEnum.EXTEND ? (
          <img
            src={theme === ThemeEnum.DARK ? iconLightImg : iconDarkImg}
            className="w-[52px] scale-75"
          />
        ) : (
          <img
            src={theme === ThemeEnum.DARK ? logoLightImg : logoDarkImg}
            className="mt-3 w-[200px]"
          />
        )}
      </>
    )
  }

  return (
    <div
      className={clsx(
        'mr-2 p-2 transition-all',
        menu === MenuEnum.EXTEND ? 'min-[375px]:w-0 md:w-[60px]' : 'w-[220px]'
      )}
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
          className={clsx(
            menu == MenuEnum.EXTEND ? 'hidden' : '',
            'relative mb-1 flex w-[220px] items-center px-3 py-2'
          )}
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
                  {bookShelfMenu.map(
                    (menu: { id: number; label: string; allFlag: boolean; position: number }) =>
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
