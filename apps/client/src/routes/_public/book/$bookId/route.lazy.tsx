import { selectBookByBookIdQuery, showBookMarkQuery } from '@/features/book'
import { Content, Sidebar } from '@/features/layouts/ReadLayout'
import { updateReadHistoryMutation } from '@/features/read-history'
import { useSetUpStore } from '@/shared/store/SetupStore'
import { IndexedDBBookType } from '@/shared/types'
import { UrlUtils } from '@/shared/utils'
import { IndexedDB } from '@/shared/utils/IndexedDBUtils'

interface BookChapterType {
  chapter: number
}

export const Route = createLazyFileRoute('/_public/book/$bookId')({
  component: Page
})

function Page() {
  const { chapter } = Route.useSearch<BookChapterType>()
  const { setup } = useSetUpStore()
  const bookID = parseInt(UrlUtils.decodeUrlById(Route.useParams().bookId))
  const currentChapter = parseInt(UrlUtils.decodeUrlById(chapter.toString()))
  const [loading, setLoading] = useState<boolean>(true)
  const [selectBookData, setSelectBookData] = useState<IndexedDBBookType>({
    id: undefined,
    chapter: [],
    content: [],
    bookName: '',
    createTimer: 0
  })
  const { data: selectBookByBookIdData, refetch } = selectBookByBookIdQuery(bookID)
  const { data: showBookMarkData } = showBookMarkQuery(bookID)
  const { mutate: updateReadHistoryMutate } = updateReadHistoryMutation()

  useEffect(() => {
    initData()
  }, [])

  useEffect(() => {
    if (selectBookByBookIdData?.code === 200) {
      setSelectBookData(selectBookByBookIdData.data)
      setLoading(false)
      saveBookIndexedDB()
    }
  }, [selectBookByBookIdData])

  async function initData() {
    const data = await IndexedDB.read(bookID)
    if (data === undefined) {
      refetch()
    } else {
      saveBookIndexedDB()
      setSelectBookData(data)
      setLoading(false)
    }
  }

  async function saveBookIndexedDB() {
    // 判断 indexedDB 是否该书籍，没有该书籍，存储
    if ((await IndexedDB.read(bookID)) === undefined) {
      IndexedDB.add({
        id: bookID,
        ...selectBookByBookIdData?.data
      })
    } else {
      // 如果有该书籍，刷新时间
      IndexedDB.update(bookID)
    }
  }

  window.addEventListener('beforeunload', () => updateReadHistoryMutate(bookID))
  return (
    <>
      {loading ? (
        <Skeleton
          className="mt-10 p-5"
          active
          paragraph={{ rows: 10 }}
        />
      ) : (
        <div
          style={{
            fontSize: `${setup.fontSize}px`,
            lineHeight: `${setup.fontSize * setup.lineHeight}px`,
            filter: `brightness(${setup.brightness})`
          }}
          className="flex h-screen w-screen overflow-hidden bg-white dark:bg-[#1f1f1f] dark:text-[#929493]"
        >
          <Sidebar
            bookId={bookID}
            bookMark={showBookMarkData?.data.bookmark ?? []}
            bookName={selectBookData?.bookName}
            allChapter={selectBookData?.chapter}
            currentChapter={currentChapter - 1}
          />
          <Content
            bookId={bookID}
            bookMark={showBookMarkData?.data.bookmark ?? []}
            allChapterTotal={selectBookData?.chapter.length}
            currentChapter={selectBookData?.chapter[currentChapter - 1]}
            currentContent={selectBookData?.content[currentChapter - 1]}
          />
        </div>
      )}
    </>
  )
}
