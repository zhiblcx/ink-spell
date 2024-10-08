import BookDirectory from '@/shared/components/BookDirectory'
import { useActionBookStore } from '@/shared/store'
import { BookUtils } from '@/shared/utils'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { useRouter } from '@tanstack/react-router'
import { AnimatePresence } from 'framer-motion'

interface SidebarActiveType {
  bookName: string
  currentChapter: number
  allChapter: Array<string>
  bookMark: Array<number>
}

function Sidebar({ bookName, currentChapter, allChapter = [], bookMark = [] }: SidebarActiveType) {
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
      // 如果一本书都没存
      try {
        if (localBooks.length === 0) {
          const localBook = new Map()
          localBook.set(match[0], { currentChapter: currentChapter + 1, allChapter: allChapter.length })
          BookUtils.setBooks(JSON.stringify(Array.from(localBook)))
        } else {
          // 存了书
          const lastChapterIndex = localBooks.findIndex((item: Array<string>) => item[0] === match[0])
          if (lastChapterIndex >= 0) {
            // 存了当前阅读的书
            localBooks[lastChapterIndex][1].currentChapter = currentChapter + 1
            BookUtils.setBooks(JSON.stringify(localBooks))
          } else {
            // 没存当前阅读的书
            const localBook = new Map()
            localBook.set(match[0], { currentChapter: currentChapter + 1, allChapter: allChapter.length })
            localBooks.push(...Array.from(localBook))
            BookUtils.setBooks(JSON.stringify(localBooks))
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
