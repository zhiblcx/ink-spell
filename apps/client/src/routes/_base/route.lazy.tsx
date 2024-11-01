import Content from '@/features/layouts/BaseLayout/Content'
import Footer from '@/features/layouts/BaseLayout/Footer'
import Header from '@/features/layouts/BaseLayout/Header'
import Sidebar from '@/features/layouts/BaseLayout/Sidebar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_base')({
  component: () => (
    <div className="flex h-screen w-screen overflow-hidden dark:bg-[#1f1f1f]">
      <Sidebar />
      <div className="flex grow flex-col">
        <Header />
        <div className="flex flex-col">
          <Content />
          <Footer />
        </div>
      </div>
    </div>
  )
})
