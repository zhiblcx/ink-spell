import BookContentSetUp from '@/shared/components/BookContentSetUp'
import { useActionBookStore } from '@/shared/store'
import { useSetUpStore } from '@/shared/store/SetupStore'
import { BookUtils } from '@/shared/utils'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import useSmoothScroll from 'react-smooth-scroll-hook'
import { backgroundStyleFunc } from './backgroundStyle'

interface ContentActiveType {
  bookId: number
  bookMark: Array<number>
  currentChapter: string
  currentContent: Array<string>
  allChapterTotal: number
}

interface SearchType {
  chapter: number
}

interface ChapterLinkProps {
  bookId: number
  content: string
  chapter: number
  chapterFlag: boolean
  noContentText?: string
  scrollToHeight: () => void
}

function ChapterLink({
  bookId,
  noContentText = '没有了',
  content,
  chapter,
  chapterFlag,
  scrollToHeight
}: ChapterLinkProps) {
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
            BookUtils.updateBooksById(bookId, { page: null })
          }}
        >
          {content}
        </a>
      )}
    </>
  )
}

export default function Content({
  bookId,
  bookMark,
  currentContent = [],
  currentChapter,
  allChapterTotal
}: ContentActiveType) {
  const { t } = useTranslation(['COMMON'])
  const location = useLocation()
  const ref = useRef(null)
  const { showDirectoryFlag, updateShowDirectoryFlag, updateShowSetUpFlag, showSetUpFlag } =
    useActionBookStore()
  const { chapter } = location.search as SearchType
  const encodeChapter = parseInt(UrlUtils.decodeUrlById(chapter.toString()))
  const { setup } = useSetUpStore()
  const timerId = useRef<NodeJS.Timeout | null>(null)
  const bookTitle = {
    catalog: t('COMMON:catalog'),
    previous: t('COMMON:previous_chapter'),
    next: t('COMMON:next_chapter')
  }

  const { scrollTo } = useSmoothScroll({
    ref,
    speed: Infinity,
    direction: 'y'
  })

  useEffect(() => {
    timerId.current = setInterval(() => {
      const page = Math.floor(
        Number(ref.current && (ref.current as HTMLElement).scrollTop) /
          Number(ref.current && (ref.current as HTMLElement).offsetHeight)
      )
      BookUtils.updateBooksById(bookId, { page: page === 0 ? null : page.toString() })
    }, 3000)

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current)
      }
    }
  }, [])

  useEffect(() => {
    if (ref !== null && ref.current != null) {
      const localBooks = JSON.parse(BookUtils.getBooks() ?? '[]')
      const localBookIndex = localBooks.findIndex(
        (item: Array<string>) => parseInt(item[0]) === bookId
      )
      const page = localBooks[localBookIndex][1]['page']
      if (page != undefined) {
        const view = (ref.current as HTMLElement).offsetHeight
        scrollTo(view * page)
      } else {
        scrollTo(-Infinity)
      }
    }
  }, [currentChapter])

  return (
    <motion.div
      layout
      ref={ref}
      style={
        setup.readerBackground
          ? backgroundStyleFunc(
              setup.readerBackground?.background?.includes('data:image'),
              setup.readerBackground
            )
          : undefined
      }
      className="scroll grow overflow-y-auto px-5 pr-2"
    >
      <div
        className="my-3 text-center text-3xl font-bold"
        id={`item-0`}
      >
        {currentChapter}
      </div>
      <ul onClick={() => updateShowSetUpFlag(!showSetUpFlag)}>
        {currentContent.map((item, index) => (
          <li
            key={index}
            id={`item-${index + 1}`}
          >
            {item}
          </li>
        ))}
      </ul>
      <ul className="my-5 flex justify-around text-xl font-bold">
        <li>
          <ChapterLink
            bookId={bookId}
            noContentText={t('no_more_chapters')}
            content={bookTitle.previous}
            chapter={encodeChapter - 1}
            chapterFlag={encodeChapter == 1}
            scrollToHeight={() => scrollTo(-Infinity)}
          />
        </li>
        <li
          className="cursor-pointer"
          onClick={() => {
            updateShowDirectoryFlag(!showDirectoryFlag)
          }}
        >
          {bookTitle.catalog}
        </li>
        <li>
          <ChapterLink
            bookId={bookId}
            noContentText={t('no_more_chapters')}
            content={bookTitle.next}
            chapter={encodeChapter + 1}
            chapterFlag={encodeChapter == allChapterTotal}
            scrollToHeight={() => scrollTo(-Infinity)}
          />
        </li>
      </ul>
      <BookContentSetUp
        bookId={bookId}
        bookMark={bookMark}
        encodeChapter={encodeChapter}
        currentChapter={currentChapter}
        allChapterTotal={allChapterTotal}
      />
    </motion.div>
  )
}
