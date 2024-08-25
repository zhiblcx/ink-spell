import { selectBookByBookIdQuery } from '@/features/book'
import Content from '@/features/layouts/ReadLayout/Content'
import Sidebar from '@/features/layouts/ReadLayout/Sidebar'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { createLazyFileRoute } from '@tanstack/react-router'

interface BookChapterType {
  chapter: number
}

export const Route = createLazyFileRoute('/_public/book/$bookId')({
  component: Page
})

function Page() {
  const { chapter } = Route.useSearch<BookChapterType>()
  const bookID = UrlUtils.decodeUrlById(Route.useParams().bookId)
  const currentChapter = parseInt(UrlUtils.decodeUrlById(chapter.toString()))

  const { data: query, isLoading } = selectBookByBookIdQuery(bookID)

  return (
    <>
      {isLoading ? (
        <Skeleton
          className="mt-10 p-5"
          active
          paragraph={{ rows: 10 }}
        />
      ) : (
        <div className="flex h-screen w-screen overflow-hidden dark:bg-[#1f1f1f] dark:text-[#929493]">
          <Sidebar
            allChapter={query?.data.data.chapter}
            currentChapter={currentChapter - 1}
          />
          <Content
            allChapterTotal={query?.data.data.chapter.length}
            currentChapter={query?.data.data.chapter[currentChapter - 1]}
            currentContent={query?.data.data.content[currentChapter - 1]}
          />
        </div>
      )}
    </>
  )
}
