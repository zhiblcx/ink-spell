import { createLazyFileRoute } from '@tanstack/react-router'
import Content from '@/features/layouts/ReadLayout/Content'
import Sidebar from '@/features/layouts/ReadLayout/Sidebar'

interface BookChapterType {
  chapter: number
}

export const Route = createLazyFileRoute('/_public/book/$bookId')({
  component: Page
})

function Page() {
  const { chapter } = Route.useSearch<BookChapterType>()
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <Sidebar currentChapter={chapter} />
      <Content />
    </div>
  )
}
