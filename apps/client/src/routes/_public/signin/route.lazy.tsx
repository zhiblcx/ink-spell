import Signin from './-components'

export const Route = createLazyFileRoute('/_public/signin')({
  component: () => <Signin />
})
