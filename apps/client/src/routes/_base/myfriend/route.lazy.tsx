import type { TabsProps } from 'antd'
import MyFriend from './-components'
import { FollowEnum } from './-components/FollowEnum'
import IncreaseFriend from './-components/IncreaseFriend'

export const Route = createLazyFileRoute('/_base/myfriend')({
  component: () => <Page />
})

function Page() {
  const { t } = useTranslation(['COMMON'])
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('follow'),
      children: (
        <MyFriend
          type={FollowEnum.FOLLOWING}
          api="/follow/follower"
        />
      )
    },
    {
      key: '2',
      label: '粉丝',
      children: (
        <MyFriend
          type={FollowEnum.FOLLOWER}
          api="/follow/following"
        />
      )
    },
    {
      key: '3',
      label: '添加好友',
      children: <IncreaseFriend />
    }
  ]

  return (
    <Tabs
      centered
      defaultActiveKey={items[0].key}
      items={items}
    />
  )
}
