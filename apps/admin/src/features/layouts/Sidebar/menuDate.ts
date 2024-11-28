
import { HomeIcon, UserIcon, BookshelfIcon, BookIcon } from '@/assets/icons'
import { renderIcon } from '@/shared/utils/renderIcon'



export const menuOptions = [
  {
    label: '首页',
    key: '/',
    icon: renderIcon(HomeIcon)
  },
  {
    label: '用户管理',
    key: '/user/manage',
    icon: renderIcon(UserIcon),
  },
  {
    label: '书架管理',
    key: '/bookshelf/manage',
    icon: renderIcon(BookshelfIcon)
  },
  {
    label: '书籍管理',
    key: '/book/manage',
    icon: renderIcon(BookIcon)
  }
]
