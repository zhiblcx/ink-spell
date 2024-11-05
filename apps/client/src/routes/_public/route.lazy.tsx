export const Route = createLazyFileRoute('/_public')({
  component: () => <Outlet />
})
