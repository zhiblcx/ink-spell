import Content from '@/features/layouts/ReadLayout/Content'
import Sidebar from '@/features/layouts/ReadLayout/Sidebar'
import request from '@/shared/API/request'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

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
    queryFn: () => request.get(`/book/${bookID}`)
  })

  console.log(query)

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar currentChapter={chapter} />
      <Content currentContent={query.data?.data.data.content[chapter]} />
    </div>
  )
}
