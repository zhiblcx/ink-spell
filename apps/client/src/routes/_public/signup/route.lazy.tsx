import { createLazyFileRoute } from '@tanstack/react-router'
import Signup from './-components'

export const Route = createLazyFileRoute('/_public/signup')({
  component: () => <Signup />
})
