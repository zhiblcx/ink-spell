import { httpRequest } from '@ink-spell/axios'
import { AuthUtils } from '@ink-spell/axios/utils'

export const Route = createFileRoute('/$')({
  beforeLoad: async (router) => {
    if (router.location.pathname === '/oauth') {
      const { method, code } = router.search as { method: string; code?: string }
      if (code !== undefined) {
        try {
          const result = await httpRequest.get(`/auth/oauth?code=${code}&method=${method}`)
          const { access_token, refresh_token } = result.data
          AuthUtils.setAccessToken(access_token)
          AuthUtils.setFreshToken(refresh_token)
          // 通过 window.opener 打开的窗口的父窗口重新刷新
          window.opener.location.href = '/'
          window.close()
        } catch (_) {
          window.opener.alert('连接超时')
          window.close()
        }
      }
      return
    }
    throw redirect({
      to: '/404'
    })
  },
  component: () => (
    <h1 className="flex flex-col items-center justify-center text-2xl font-bold">
      <div className="absolute top-10 z-10">正在登录中...</div>
      <GlobalPending />
    </h1>
  )
})
