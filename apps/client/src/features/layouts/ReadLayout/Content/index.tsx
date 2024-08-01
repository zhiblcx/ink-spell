import { useActionBookStore } from '@/shared/store'
import { Link, useLocation } from '@tanstack/react-router'
import { motion } from 'framer-motion'

interface ContentActiveType {
  currentContent: Array<string>
}

interface SearchType {
  chapter: number
}

function Content({ currentContent }: ContentActiveType) {
  const { showDirectoryFlag, updateShowDirectoryFlag } = useActionBookStore()
  const location = useLocation()
  const { chapter } = location.search as SearchType

  console.log(currentContent)

  return (
    <motion.div
      layout
      className="scroll grow overflow-y-auto px-3 dark:bg-black"
    >
      <div className="my-3 text-center text-3xl font-bold">第001章 恭喜您</div>
      <ul className="text-xl leading-10">
        {currentContent.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ul className="my-5 flex justify-around text-xl font-bold">
        <li>
          <Link search={{ chapter: chapter - 1 }}>上一章</Link>
        </li>
        <li
          onClick={() => {
            updateShowDirectoryFlag(!showDirectoryFlag)
          }}
        >
          目录
        </li>
        <li>
          <Link search={{ chapter: chapter + 1 }}>下一章</Link>
        </li>
      </ul>
    </motion.div>
  )
}
export default Content
