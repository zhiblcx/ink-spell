import Content from '@/features/layouts/ReadLayout/Content'
import Sidebar from '@/features/layouts/ReadLayout/Sidebar'
import { getBookByBookIdAPI } from '@/shared/API/book'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

interface BookChapterType {
  chapter: number
}

export const Route = createLazyFileRoute('/_public/book/$bookId')({
  component: Page
})

function Page() {
  const { chapter } = Route.useSearch<BookChapterType>()
  const bookID = Route.useParams().bookId

  const { data: query, isLoading } = useQuery({
    queryKey: ['book', bookID],
    queryFn: () => getBookByBookIdAPI(bookID)
  })

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
            currentChapter={chapter - 1}
          />
          <Content
            allChapterTotal={query?.data.data.chapter.length}
            currentChapter={query?.data.data.chapter[chapter - 1]}
            currentContent={query?.data.data.content[chapter - 1]}
          />
        </div>
      )}
    </>
  )
}
