import { AuthUtils } from '@/shared/utils'

export const Route = createFileRoute('/_base')({
  beforeLoad: async () => {
    if (AuthUtils.getAccessToken() === null) {
      redirect({ to: '/signin', throw: true })
    }
  }
})
