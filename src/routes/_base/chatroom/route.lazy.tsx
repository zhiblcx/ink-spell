import { createLazyFileRoute } from '@tanstack/react-router'
import EmptyPage from '@/shared/components/EmptyPage'

export const Route = createLazyFileRoute('/_base/chatroom')({
  component: () => <EmptyPage name="暂时没有书籍，请先导入书籍哦~" />
})
