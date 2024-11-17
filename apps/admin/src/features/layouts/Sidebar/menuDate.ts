import MingcuteBook2Line from '~icons/mingcute/book-2-line'
import MingcuteBook5Line from '~icons/mingcute/book-5-line'
import MingcuteHome3Line from '~icons/mingcute/home-3-line'
import MingcuteUser3Line from '~icons/mingcute/user-3-line'
import { NIcon } from 'naive-ui'
import type { Component } from 'vue'
import { h } from 'vue'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

export const menuOptions = [
  {
    label: '首页',
    key: '/',
    icon: renderIcon(MingcuteHome3Line)
  },
  {
    label: '用户管理',
    key: '',
    icon: renderIcon(MingcuteUser3Line),
    children: [
      {
        label: '用户信息',
        key: '/user/info'
      },
      {
        label: '用户动态',
        key: '/user/dynamic'
      }
    ]
  },
  {
    label: '书架管理',
    key: '/bookshelf/manage',
    icon: renderIcon(MingcuteBook5Line)
  },
  {
    label: '书籍管理',
    key: '/book/manage',
    icon: renderIcon(MingcuteBook2Line)
  }
]
