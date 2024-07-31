import Content from '@/features/layouts/BaseLayout/Content'
import Footer from '@/features/layouts/BaseLayout/Footer'
import Header from '@/features/layouts/BaseLayout/Header'
import Sidebar from '@/features/layouts/BaseLayout/Sidebar'
import { createLazyFileRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createLazyFileRoute('/_base')({
  component: () => (
    <div className="flex h-screen overflow-hidden dark:bg-black">
      <Sidebar />
      <div className="flex grow flex-col">
        <Header />
        <div className="flex flex-col">
          <Content />
          <Footer />
        </div>
      </div>
      <TanStackRouterDevtools />
    </div>
  )
})
