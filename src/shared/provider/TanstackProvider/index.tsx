import { routeTree } from '../../../routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function TanstackProvider() {
  return <RouterProvider router={router} />
}

export default TanstackProvider
