import EmptyPage from '@/shared/components/EmptyPage'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_base/myfriend')({
  component: () => (
    <EmptyPage
      name="该功能正在火速开发中！"
      description="请尽情期待"
    />
  )
})
