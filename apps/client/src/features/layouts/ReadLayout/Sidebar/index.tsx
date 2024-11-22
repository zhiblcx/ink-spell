import { useActionBookStore } from '@/shared/store'
import { BookUtils, UrlUtils } from '@/shared/utils'
import { AnimatePresence } from 'framer-motion'

interface SidebarActiveType {
  bookId: number
  bookName: string
  currentChapter: number
  allChapter: Array<string>
  bookMark: Array<number>
}

function Sidebar({
  bookId,
  bookName,
  currentChapter,
  allChapter = [],
  bookMark = []
}: SidebarActiveType) {
  const router = useRouter()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const { showDirectoryFlag } = useActionBookStore()

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const reg = /\d+/
    const url = UrlUtils.decodeUrlById(router.latestLocation.href.split('/')[2].split('?')[0])
    const match = url.match(reg)
    if (match) {
      const localBooks = JSON.parse(BookUtils.getBooks() ?? '[]')
      try {
        // 如果一本书都没存
        if (localBooks.length === 0) {
          BookUtils.createBookById(parseInt(match[0]), {
            currentChapter: currentChapter + 1,
            allChapter: allChapter.length,
            page: null
          })
        } else {
          // 存了书
          const lastChapterIndex = localBooks.findIndex(
            (item: Array<string>) => item[0] === match[0]
          )
          if (lastChapterIndex >= 0) {
            // 存了当前阅读的书
            BookUtils.updateBooksById(lastChapterIndex, {
              currentChapter: (currentChapter + 1).toString()
            })
          } else {
            // 没存当前阅读的书
            BookUtils.createBookById(parseInt(match[0]), {
              currentChapter: currentChapter + 1,
              allChapter: allChapter.length,
              page: null
            })
          }
        }
      } catch (_) {
        BookUtils.clearBooks()
      }
    }
  }, [currentChapter])

  return (
    <AnimatePresence initial={false}>
      {windowWidth > 400 ? (
        <>
          {showDirectoryFlag && (
            <BookDirectory
              bookId={bookId}
              bookMark={bookMark}
              bookName={bookName}
              currentChapter={currentChapter}
              allChapter={allChapter}
            />
          )}
        </>
      ) : (
        showDirectoryFlag && (
          <BookDirectory
            bookId={bookId}
            bookMark={bookMark}
            bookName={bookName}
            currentChapter={currentChapter}
            allChapter={allChapter}
            showDirectoryFlag={false}
          />
        )
      )}
    </AnimatePresence>
  )
}

export default Sidebar
