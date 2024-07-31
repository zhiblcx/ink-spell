import { createLazyFileRoute } from '@tanstack/react-router'
import Profile from './-components'

export const Route = createLazyFileRoute('/_base/profile')({
  component: () => <Profile />
})
