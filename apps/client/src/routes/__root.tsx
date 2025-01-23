import { updateAnnouncementUserMutation } from '@/features/system/mutation'
import { getAnnouncementUserQuery } from '@/features/system/query'
import { SystemConstant } from '@/shared/constants/system'
import { notification } from 'antd'

export const Route = createRootRoute({
  beforeLoad: (router) => {
    if (router.location.href !== '/signin' && router.location.href !== '/signup') {
      Page = () => {
        const [api, contextHolder] = notification.useNotification()
        const { t } = useTranslation(['COMMON'])
        const { data: announcementUserData, isLoading } = getAnnouncementUserQuery()
        const { mutate: updateAnnouncementUserMutate } = updateAnnouncementUserMutation()

        const openNotification = () => {
          const key = `open${Date.now()}`
          const btn = (
            <Space>
              <Button
                type="primary"
                size="small"
                onClick={() => api.destroy(key)}
              >
                {t('COMMON:knew')}
              </Button>
            </Space>
          )
          api.open({
            message: t('COMMON:announcement'),
            description: announcementUserData?.data.text,
            btn,
            key,
            onClose: () => {
              updateAnnouncementUserMutate(announcementUserData?.data.id)
            }
          })
        }

        useEffect(() => {
          if (!isLoading && announcementUserData?.data?.status == SystemConstant.status.UNREAD) {
            openNotification()
          }
        }, [isLoading])

        return <>{contextHolder}</>
      }
    }
  },
  component: () => (
    <>
      <Page />
      <Outlet />
    </>
  )
})

let Page = () => <></>
