import { AuthUtils } from '@/shared/utils'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_base')({
  beforeLoad: async () => {
    if (AuthUtils.getToken() === null) {
      redirect({ to: '/signin', throw: true })
    }
  }
})
