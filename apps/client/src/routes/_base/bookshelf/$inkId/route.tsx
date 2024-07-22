import { createFileRoute, redirect } from '@tanstack/react-router'
import { user_mock, shelf_value_mock } from '@/mock'

export const Route = createFileRoute('/_base/bookshelf/$inkId')({
  beforeLoad: async ({ params }) => {
    const flag = shelf_value_mock.some((item) => {
      if (item.dic_id === user_mock.dic_id) {
        return Number(params.inkId) == item.id
      }
      return false
    })
    if (!flag) {
      redirect({ to: '/404', throw: true })
    }
  }
})
