import NotFound from '@/routes/404/route.lazy.tsx'
import { routeTree } from '@/routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'

const router = createRouter({
  routeTree,
  defaultPendingComponent: GlobalPending,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: ErrorPage
})

const queryClient = new QueryClient()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function TanstackProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
