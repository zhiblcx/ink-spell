import { AuthUtils } from '@/shared/utils'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  beforeLoad: (router) => {
    if (router.location.href === '/signin' || router.location.href === 'signup') {
      if (AuthUtils.getToken() !== null) {
        redirect({ to: '/', throw: true })
      }
    }
  }
})
