import { useActionBookStore } from '@/shared/store'
import { Link, useLocation } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import useSmoothScroll from 'react-smooth-scroll-hook'

interface ContentActiveType {
  currentChapter: string
  currentContent: Array<string>
  allChapterTotal: number
}

interface SearchType {
  chapter: number
}

interface ChapterLinkProps {
  content: string
  chapter: number
  chapterFlag: boolean
  noContentText?: string
  scrollToHeight: () => void
}

function ChapterLink({ noContentText = '没有了', content, chapter, chapterFlag, scrollToHeight }: ChapterLinkProps) {
  return (
    <>
      {chapterFlag ? (
        <div>{noContentText}</div>
      ) : (
        <Link
          search={{ chapter: chapter }}
          onClick={() => {
            scrollToHeight()
          }}
        >
          {content}
        </Link>
      )}
    </>
  )
}

function Content({ currentContent = [], currentChapter, allChapterTotal }: ContentActiveType) {
  const location = useLocation()
  const ref = useRef(null)
  const { showDirectoryFlag, updateShowDirectoryFlag } = useActionBookStore()
  const { chapter } = location.search as SearchType
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
          <ChapterLink
            content="上一章"
            chapter={chapter - 1}
            chapterFlag={chapter == 1}
            scrollToHeight={() => {
              scrollTo(-Infinity)
            }}
          />
        </li>
        <li
          className="cursor-pointer"
          onClick={() => {
            updateShowDirectoryFlag(!showDirectoryFlag)
          }}
        >
          目录
        </li>
        <li>
          <ChapterLink
            content="下一章"
            chapter={chapter + 1}
            chapterFlag={chapter == allChapterTotal}
            scrollToHeight={() => {
              scrollTo(-Infinity)
            }}
          />
        </li>
      </ul>
    </motion.div>
  )
}

export default Content
