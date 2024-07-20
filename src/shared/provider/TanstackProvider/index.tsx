import { routeTree } from '../../../routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import GlobalPending from '@/shared/components/GlobalPending'
import NotFound from '@/routes/404/route.lazy.tsx'

const router = createRouter({
  routeTree,
  defaultPendingComponent: GlobalPending,
  defaultNotFoundComponent: NotFound
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
