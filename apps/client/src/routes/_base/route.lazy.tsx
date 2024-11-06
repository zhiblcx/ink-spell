import { Content, Footer, Header, Sidebar } from '@/features/layouts/BaseLayout'

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
