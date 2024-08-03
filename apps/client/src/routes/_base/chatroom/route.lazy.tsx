import EmptyPage from '@/shared/components/EmptyPage'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_base/chatroom')({
  component: () => <EmptyPage name="该功能正在火速开发中！" />
})
