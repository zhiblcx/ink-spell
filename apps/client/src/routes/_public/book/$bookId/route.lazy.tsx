import Content from '@/features/layouts/ReadLayout/Content'
import Sidebar from '@/features/layouts/ReadLayout/Sidebar'
import { getBookByBookIdAPI } from '@/shared/API/book'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

interface BookChapterType {
  chapter: number
}

export const Route = createLazyFileRoute('/_public/book/$bookID')({
  component: Page
})

function Page() {
  const { chapter } = Route.useSearch<BookChapterType>()
  const bookID = Route.useParams().bookID

  const query = useQuery({
    queryKey: ['book', bookID],
    queryFn: () => getBookByBookIdAPI(bookID)
  })

  return (
    <Suspense fallback={<Skeleton />}>
      <div className="flex h-screen w-screen overflow-hidden dark:bg-[#1f1f1f] dark:text-[#929493]">
        <Sidebar
          allChapter={query.data?.data.data.chapter}
          currentChapter={chapter - 1}
        />
        <Content
          allChapterTotal={query.data?.data.data.chapter.length}
          currentChapter={query.data?.data.data.chapter[chapter - 1]}
          currentContent={query.data?.data.data.content[chapter - 1]}
        />
      </div>
    </Suspense>
  )
}
