import BookContentSetUp from '@/shared/components/BookContentSetUp'
import { useActionBookStore } from '@/shared/store'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { useLocation, useRouter } from '@tanstack/react-router'
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
  const router = useRouter()
  return (
    <>
      {chapterFlag ? (
        <div>{noContentText}</div>
      ) : (
        <a
          style={{ cursor: 'pointer' }}
          onClick={() => {
            router.navigate({
              to: router.latestLocation.pathname,
              search: { chapter: UrlUtils.encodeUrlById(chapter.toString()) },
              replace: true
            })
            scrollToHeight()
          }}
        >
          {content}
        </a>
      )}
    </>
  )
}

function Content({ currentContent = [], currentChapter, allChapterTotal }: ContentActiveType) {
  const location = useLocation()
  const ref = useRef(null)
  const { showDirectoryFlag, updateShowDirectoryFlag, updateShowSetUpFlag, showSetUpFlag } = useActionBookStore()
  const { chapter } = location.search as SearchType
  const encodeChapter = parseInt(UrlUtils.decodeUrlById(chapter.toString()))
  const title = '目录'
  const schedule = ((encodeChapter / allChapterTotal) * 100).toFixed(1) + '%'

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
      className="scroll grow overflow-y-auto px-5 pr-2"
    >
      <div className="my-3 text-center text-3xl font-bold">{currentChapter}</div>
      <ul onClick={() => updateShowSetUpFlag(!showSetUpFlag)}>
        {currentContent.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ul className="my-5 flex justify-around text-xl font-bold">
        <li>
          <ChapterLink
            content="上一章"
            chapter={encodeChapter - 1}
            chapterFlag={encodeChapter == 1}
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
          {title}
        </li>
        <li>
          <ChapterLink
            content="下一章"
            chapter={encodeChapter + 1}
            chapterFlag={encodeChapter == allChapterTotal}
            scrollToHeight={() => {
              scrollTo(-Infinity)
            }}
          />
        </li>
      </ul>
      <BookContentSetUp
        encodeChapter={encodeChapter}
        currentChapter={currentChapter}
        allChapterTotal={allChapterTotal}
      />
      {
        <FloatButton
          type="primary"
          className="mr-2"
          description={schedule}
        />
      }
    </motion.div>
  )
}

export default Content
