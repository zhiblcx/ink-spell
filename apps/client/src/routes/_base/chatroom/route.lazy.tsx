import { createLazyFileRoute } from '@tanstack/react-router'
import ChatRoom from './-components'
import './index.scss'

export const Route = createLazyFileRoute('/_base/chatroom')({
  component: () => <ChatRoom />
})
