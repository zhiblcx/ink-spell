import { createLazyFileRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Header from '@/features/layouts/BaseLayout/Header'
import Content from '@/features/layouts/BaseLayout/Content'
import Sidebar from '@/features/layouts/BaseLayout/Sidebar'
import Footer from '@/features/layouts/BaseLayout/Footer'

export const Route = createLazyFileRoute('/_base')({
  component: () => (
    <div className="dark:bg-black flex h-screen overflow-hidden">
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
