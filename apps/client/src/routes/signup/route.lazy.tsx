import { createLazyFileRoute } from '@tanstack/react-router'
import Signup from './-components'

export const Route = createLazyFileRoute('/signup')({
  component: () => <Signup />
})
