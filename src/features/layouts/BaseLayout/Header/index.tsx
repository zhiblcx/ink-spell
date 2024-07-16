import { Input, Button, Avatar, Dropdown, type MenuProps } from 'antd'
import { AlignLeft, AlignRight } from 'lucide-react'

import ThemeToggle from '@/shared/components/ThemeToggle'
import avatar from '@/assets/images/avatar.png'
import { ReactNode } from '@tanstack/react-router'
import { useMenuStore } from '@/shared/store'
import { Menu } from '@/shared/enums'

function Header() {
  const { Search } = Input
  const { menu, setMenu } = useMenuStore()

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <div
          onClick={() => {
            console.log('个人资料')
          }}
        >
          个人资料
        </div>
      )
    },
    {
      key: 2,
      label: (
        <div
          onClick={() => {
            console.log('重置密码')
          }}
        >
          重置密码
        </div>
      )
    },
    {
      key: 3,
      label: <div>退出登录</div>
    }
  ]

  function Icon(props: ReactNode) {
    return (
      <div onClick={props.onClick}>
        {menu === Menu.EXTEND ? (
          <AlignLeft
            className="mr-2 cursor-pointer"
            size={30}
          />
        ) : (
          <AlignRight
            className="mr-2 cursor-pointer"
            size={30}
          />
        )}
      </div>
    )
  }
  return (
    <div className="dark:bg-black flex justify-between items-center py-4">
      <div className="flex items-center">
        <Icon
          onClick={() => {
            setMenu(menu === Menu.EXTEND ? Menu.SHRINK : Menu.EXTEND)
          }}
        />
        <Search
          className="flex justify-center items-center mx-2 min-[375px]:mx-0"
          placeholder="请输入要搜索的书籍"
          style={{ width: 200 }}
        />
      </div>
      <div className="md:mr-10 flex justify-center items-center space-x-4">
        <ThemeToggle />
        <Dropdown
          menu={{ items }}
          placement="bottomLeft"
        >
          <Avatar
            src={avatar}
            size={34}
          />
        </Dropdown>
        <Button type="primary">导入图书</Button>
      </div>
    </div>
  )
}

export default Header
