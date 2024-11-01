import { createLazyFileRoute } from '@tanstack/react-router'
import ChatRoom from './-components'

export const Route = createLazyFileRoute('/_base/chatroom')({
  component: () => <ChatRoom />
})
