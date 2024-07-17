import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_base/chatroom')({
  component: () => <div>Hello /_base/chatroom!</div>
})
