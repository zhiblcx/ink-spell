import { Outlet } from '@tanstack/react-router'

function Content() {
  return (
    <main className="grow overflow-y-auto h-screen pt-2">
      <Outlet />
    </main>
  )
}

export default Content
