import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Drawer } from 'antd'

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
              className="dark:bg-black min-w-[220px] scroll bg-white md:hover:overflow-y-auto md:overflow-y-hidden min-[375px]:overflow-y-auto"
            >
              <div className="text-center text-xl my-3">目录</div>
              <ul className="flex flex-col ml-2 space-y-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item, index) => (
                  <li
                    className={clsx(
                      currentChapter == index ? 'dark:bg-[#4b4b4b] text-white bg-[#474c50]' : '',
                      'px-4 py-1 truncate rounded-md dark:hover:bg-[#474c50] hover:bg-[#4b4b4b] hover:text-white'
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
          <div className="dark:bg-black scroll bg-white md:hover:overflow-y-auto md:overflow-y-hidden min-[375px]:overflow-y-auto">
            <ul className="flex flex-col ml-2 space-y-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item, index) => (
                <li
                  className={clsx('truncate rounded-md dark:hover:bg-[#474c50] hover:bg-[#4b4b4b] hover:text-white')}
                  key={index}
                >
                  <Link
                    search={{ chapter: index }}
                    className={clsx(
                      currentChapter == index ? 'dark:bg-[#4b4b4b] text-white bg-[#474c50]' : '',
                      'px-4 py-1 block'
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
