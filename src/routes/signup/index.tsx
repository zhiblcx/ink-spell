import { createFileRoute } from '@tanstack/react-router'
import Signup from './-components'

export const Route = createFileRoute('/signup/')({
  component: () => <Signup />
})
