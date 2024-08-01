import { useActionBookStore } from '@/shared/store'
import { Link, useLocation } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import useSmoothScroll from 'react-smooth-scroll-hook'

interface ContentActiveType {
  currentChapter: string
  currentContent: Array<string>
}

interface SearchType {
  chapter: number
}

function Content({ currentContent = [], currentChapter }: ContentActiveType) {
  const { showDirectoryFlag, updateShowDirectoryFlag } = useActionBookStore()
  const location = useLocation()
  const { chapter } = location.search as SearchType
  const ref = useRef(null)
  const { scrollTo } = useSmoothScroll({
    ref,
    speed: Infinity,
    direction: 'y'
  })

  useEffect(() => {
    if (ref !== null) {
      scrollTo(-Infinity)
    }
  }, [currentContent])

  return (
    <motion.div
      layout
      ref={ref}
      className="scroll grow overflow-y-auto px-3"
    >
      <div className="my-3 text-center text-3xl font-bold">{currentChapter}</div>
      <ul className="text-xl leading-10">
        {currentContent.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ul className="my-5 flex justify-around text-xl font-bold">
        <li>
          <Link
            search={{ chapter: chapter - 1 }}
            onClick={() => {
              scrollTo(-Infinity)
            }}
          >
            上一章
          </Link>
        </li>
        <li
          onClick={() => {
            updateShowDirectoryFlag(!showDirectoryFlag)
          }}
        >
          目录
        </li>
        <li
          onClick={() => {
            scrollTo(-Infinity)
          }}
        >
          <Link search={{ chapter: chapter + 1 }}>下一章</Link>
        </li>
      </ul>
    </motion.div>
  )
}

export default Content
