import { notification } from 'antd'

export const Route = createRootRoute({
  component: () => (
    <>
      <Page />
      <Outlet />
    </>
  )
})
export function Page() {
  const [api, contextHolder] = notification.useNotification()
  const openNotification = () => {
    const key = `open${Date.now()}`
    const btn = (
      <Space>
        <Button
          type="primary"
          size="small"
          onClick={() => api.destroy(key)}
        >
          知道了
        </Button>
      </Space>
    )
    api.open({
      message: '公告',
      description: '早上好',
      btn,
      key,
      onClose: () => {
        console.log('知道了')
      }
    })
  }

  setTimeout(() => openNotification(), 0)

  return <>{contextHolder}</>
}
