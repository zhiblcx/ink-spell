import { createLazyFileRoute } from '@tanstack/react-router'
import type { TabsProps } from 'antd'
import MyFriend from './-components'
import { FollowEnum } from './-components/FollowEnum'

export const Route = createLazyFileRoute('/_base/myfriend')({
  component: () => <Page />
})

function Page() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '关注',
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
