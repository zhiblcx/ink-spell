import { selectBookByBookIdQuery, showBookMarkQuery } from '@/features/book'
import { Content, Sidebar } from '@/features/layouts/ReadLayout'
import { updateReadHistoryMutation } from '@/features/read-history'
import { useSetUpStore } from '@/shared/store/SetupStore'
import { UrlUtils } from '@/shared/utils'

interface BookChapterType {
  chapter: number
}

export const Route = createLazyFileRoute('/_public/book/$bookId')({
  component: Page
})

function Page() {
  const { chapter } = Route.useSearch<BookChapterType>()
  const bookID = parseInt(UrlUtils.decodeUrlById(Route.useParams().bookId))
  const currentChapter = parseInt(UrlUtils.decodeUrlById(chapter.toString()))
  const { setup } = useSetUpStore()
  const { data: query, isLoading } = selectBookByBookIdQuery(bookID)
  const { data: bookMark } = showBookMarkQuery(bookID)
  const { mutate } = updateReadHistoryMutation()
  window.addEventListener('beforeunload', () => mutate(bookID))
  return (
    <>
      {isLoading ? (
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
            bookMark={bookMark?.data.bookmark}
            bookName={query?.data.bookName}
            allChapter={query?.data.chapter}
            currentChapter={currentChapter - 1}
          />
          <Content
            bookId={bookID}
            bookMark={bookMark?.data.bookmark}
            allChapterTotal={query?.data.chapter.length}
            currentChapter={query?.data.chapter[currentChapter - 1]}
            currentContent={query?.data.content[currentChapter - 1]}
          />
        </div>
      )}
    </>
  )
}
