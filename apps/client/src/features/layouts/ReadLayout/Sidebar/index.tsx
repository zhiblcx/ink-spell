import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'

import { useActionBookStore } from '@/shared/store'

interface SidebarActiveType {
  currentChapter: number
}

function Sidebar({ currentChapter }: SidebarActiveType) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [open, setOpen] = useState(false)
  const { showDirectoryFlag } = useActionBookStore()

  const onClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (showDirectoryFlag) {
      setOpen(true)
    }
  }, [showDirectoryFlag])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <AnimatePresence initial={false}>
      {windowWidth > 375 ? (
        <>
          {showDirectoryFlag ? (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="scroll min-w-[220px] bg-white dark:bg-black min-[375px]:overflow-y-auto md:overflow-y-hidden md:hover:overflow-y-auto"
            >
              <div className="my-3 text-center text-xl">目录</div>
              <ul className="ml-2 flex flex-col space-y-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item, index) => (
                  <li
                    className={clsx(
                      currentChapter == index ? 'bg-[#474c50] text-white dark:bg-[#4b4b4b]' : '',
                      'truncate rounded-md px-4 py-1 hover:bg-[#4b4b4b] hover:text-white dark:hover:bg-[#474c50]'
                    )}
                    key={index}
                  >
                    <Link search={{ chapter: index }}> 第{item}章：你好22</Link>
                  </li>
                ))}
              </ul>
              <div className="h-[10px]" />
            </motion.div>
          ) : (
            ''
          )}
        </>
      ) : showDirectoryFlag ? (
        <Drawer
          title={<div className="text-center text-xl">目录</div>}
          onClose={onClose}
          open={open}
          placement="left"
          width="220px"
          closeIcon={false}
        >
          <div className="scroll bg-white dark:bg-black min-[375px]:overflow-y-auto md:overflow-y-hidden md:hover:overflow-y-auto">
            <ul className="ml-2 flex flex-col space-y-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item, index) => (
                <li
                  className={clsx('truncate rounded-md hover:bg-[#4b4b4b] hover:text-white dark:hover:bg-[#474c50]')}
                  key={index}
                >
                  <Link
                    search={{ chapter: index }}
                    className={clsx(
                      currentChapter == index ? 'bg-[#474c50] text-white dark:bg-[#4b4b4b]' : '',
                      'block px-4 py-1'
                    )}
                  >
                    第{item}章：你好22
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Drawer>
      ) : (
        ''
      )}
    </AnimatePresence>
  )
}

export default Sidebar
