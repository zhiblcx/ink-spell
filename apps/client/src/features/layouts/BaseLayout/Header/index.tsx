import { useNavigate } from '@tanstack/react-router'
import { type MenuProps } from 'antd'
import { AlignLeft, AlignRight } from 'lucide-react'

import avatar from '@/assets/images/avatar.png'
import ThemeToggle from '@/shared/components/ThemeToggle'
import { Menu } from '@/shared/enums'
import { useMenuStore } from '@/shared/store'
import { AuthUtils } from '@/shared/utils'
import { ReactNode } from '@tanstack/react-router'

function Header() {
  const { Search } = Input
  const { menu, setMenu } = useMenuStore()
  const navigate = useNavigate()

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
      label: (
        <div
          onClick={() => {
            AuthUtils.clearToken()
            navigate({ to: '/signin', replace: true })
          }}
        >
          退出登录
        </div>
      )
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
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <Icon
          onClick={() => {
            setMenu(menu === Menu.EXTEND ? Menu.SHRINK : Menu.EXTEND)
          }}
        />
        <Search
          className="mx-2 flex items-center justify-center min-[375px]:mx-0 min-[375px]:w-[145px] md:w-[200px]"
          placeholder="请输入要搜索的书"
        />
      </div>
      <div className="flex items-center justify-center min-[375px]:ml-2 min-[375px]:space-x-2 md:mr-10 md:space-x-4">
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
