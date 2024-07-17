import { createLazyFileRoute } from '@tanstack/react-router'
import Header from '@/features/layouts/BaseLayout/Header'
import Content from '@/features/layouts/BaseLayout/Content'
import Sidebar from '@/features/layouts/BaseLayout/Sidebar'

export const Route = createLazyFileRoute('/_base')({
  component: () => (
    <div className="dark:bg-black flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex grow flex-col">
        <Header />
        <Content />
      </div>
    </div>
  )
})
