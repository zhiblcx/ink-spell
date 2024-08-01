import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { motion } from 'framer-motion'

interface SidebarActiveType {
  currentChapter: number
  allChapter: Array<string>
  showDirectoryFlag?: boolean
}

export default function BookDirectory({
  currentChapter,
  allChapter = [],
  showDirectoryFlag = true
}: SidebarActiveType) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="scroll min-w-[220px] max-w-[220px] min-[375px]:overflow-y-auto md:overflow-y-hidden md:hover:overflow-y-auto"
    >
      {showDirectoryFlag ? <div className="my-3 text-center text-xl">目录</div> : ''}
      <ul className="ml-2 flex flex-col space-y-1">
        {allChapter.map((item, index) => (
          <li
            className={clsx(
              currentChapter == index ? 'bg-[#474c50] text-white dark:bg-[#4b4b4b]' : '',
              'truncate rounded-md px-4 py-1 hover:bg-[#4b4b4b] hover:text-white dark:hover:bg-[#474c50]'
            )}
            key={index}
          >
            <Link search={{ chapter: index + 1 }}> {item}</Link>
          </li>
        ))}
      </ul>
      <div className="h-[10px]" />
    </motion.div>
  )
}
