import { createFileRoute } from '@tanstack/react-router'
import Signin from './-components'

export const Route = createFileRoute('/signin/')({
  component: () => <Signin />
})
