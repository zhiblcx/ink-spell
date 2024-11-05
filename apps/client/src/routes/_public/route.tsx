import { AuthUtils } from '@/shared/utils'

export const Route = createFileRoute('/_public')({
  beforeLoad: (router) => {
    if (
      router.location.href === '/signin' ||
      router.location.href === 'signup' ||
      router.location.href === '/signup' ||
      router.location.href === 'signup'
    ) {
      if (AuthUtils.getAccessToken() !== null) {
        redirect({ to: '/', throw: true })
      }
    }
  }
})
