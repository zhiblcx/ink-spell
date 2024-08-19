import { Outlet } from '@tanstack/react-router'

function Content() {
  return (
    <main className="overflow-hidden">
      <Outlet />
    </main>
  )
}

export default Content
