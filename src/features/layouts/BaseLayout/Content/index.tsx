import { Outlet } from '@tanstack/react-router'
import './index.scss'

function Content() {
  return (
    <main className="grow height absolute">
      <Outlet />
    </main>
  )
}

export default Content
