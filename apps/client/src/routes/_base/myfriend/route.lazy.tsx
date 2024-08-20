import { createLazyFileRoute } from '@tanstack/react-router'
import type { TabsProps } from 'antd'
import MyFriend from './-components'

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
          key="following"
          type="following"
          api="/follow/follower"
        />
      )
    },
    {
      key: '2',
      label: '粉丝',
      children: (
        <MyFriend
          key="follower"
          type="follower"
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
