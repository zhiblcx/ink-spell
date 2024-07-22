import { Outlet } from '@tanstack/react-router'
import './index.scss'

function Content() {
  return (
    // TODO: remove absolute
    <main className="height absolute">
      <Outlet />
    </main>
  )
}

export default Content
