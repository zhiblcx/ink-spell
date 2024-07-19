import { routeTree } from '../../../routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import GlobalPending from '@/shared/components/GlobalPending'

const router = createRouter({
  routeTree,
  defaultPendingComponent: GlobalPending
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function TanstackProvider() {
  return <RouterProvider router={router} />
}

export default TanstackProvider
