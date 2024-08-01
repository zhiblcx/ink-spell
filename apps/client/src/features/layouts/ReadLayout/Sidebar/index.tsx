import BookDirectory from '@/shared/components/BookDirectory'
import { useActionBookStore } from '@/shared/store'
import { BookUtils } from '@/shared/utils'
import { useRouter } from '@tanstack/react-router'
import { AnimatePresence } from 'framer-motion'

interface SidebarActiveType {
  currentChapter: number
  allChapter: Array<string>
}

function Sidebar({ currentChapter, allChapter = [] }: SidebarActiveType) {
  const router = useRouter()
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
    const reg = /\d+/
    const match = router.latestLocation.href.match(reg)
    if (match) {
      const localBooks = JSON.parse(BookUtils.getBooks() ?? '[]')
      // 如果一本书都没存
      if (localBooks.length === 0) {
        const localBook = new Map()
        localBook.set(match[0], currentChapter + 1)
        BookUtils.setBooks(JSON.stringify(Array.from(localBook)))
      } else {
        // 存了书
        const lastChapterIndex = localBooks.findIndex((item: Array<string>) => {
          return item[0] === match[0]
        })
        if (lastChapterIndex >= 0) {
          // 存了当前阅读的书
          localBooks[lastChapterIndex][1] = currentChapter + 1
          BookUtils.setBooks(JSON.stringify(localBooks))
        } else {
          // 没存当前阅读的书
          const localBook = new Map()
          localBook.set(match[0], currentChapter + 1)
          localBooks.push(...Array.from(localBook))
          BookUtils.setBooks(JSON.stringify(localBooks))
        }
      }
    }
  }, [currentChapter])

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
      {windowWidth > 400 ? (
        <>
          {showDirectoryFlag ? (
            <BookDirectory
              currentChapter={currentChapter}
              allChapter={allChapter}
            />
          ) : (
            ''
          )}
        </>
      ) : showDirectoryFlag ? (
        <Drawer
          className="scroll dark:text-[#929493]"
          title={<div className="text-center text-xl">目录</div>}
          onClose={onClose}
          open={open}
          placement="left"
          width="248px"
          closeIcon={false}
          styles={{ body: { padding: '15px' } }}
        >
          <BookDirectory
            currentChapter={currentChapter}
            allChapter={allChapter}
            showDirectoryFlag={false}
          />
        </Drawer>
      ) : (
        ''
      )}
    </AnimatePresence>
  )
}

export default Sidebar
