import { createLazyFileRoute } from '@tanstack/react-router'
import Signin from './-components'

export const Route = createLazyFileRoute('/signin')({
  component: () => <Signin />
})
