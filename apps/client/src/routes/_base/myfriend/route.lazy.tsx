import { createLazyFileRoute } from '@tanstack/react-router'
import type { TabsProps } from 'antd'
import MyFriend from './-components'

export const Route = createLazyFileRoute('/_base/myfriend')({
  component: () => <Page />
})

function Page() {
  const onChange = (key: string) => {
    console.log(key)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '关注',
      children: <MyFriend />
    },
    {
      key: '2',
      label: '粉丝',
      children: <MyFriend />
    }
  ]

  return (
    <Tabs
      centered
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
    />
  )
}
