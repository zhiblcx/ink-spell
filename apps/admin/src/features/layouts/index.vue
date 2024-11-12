<template>
  <n-layout-header
    bordered
    class="flex h-[60px] items-center justify-center px-[24px]"
  >
    头部
  </n-layout-header>
  <n-layout
    has-sider
    position="absolute"
    style="top: 60px; bottom: 30px"
  >
    <n-layout-sider
      bordered
      show-trigger
      collapse-mode="width"
      :width="240"
      :native-scrollbar="false"
    >
      <n-menu
        :options="menuOptions"
        :on-update:value="selectMenuFunction"
      />
    </n-layout-sider>
    <n-layout
      bordered
      :native-scrollbar="false"
      content-style="padding: 24px;"
    >
      <router-view />
    </n-layout>
  </n-layout>

  <n-layout-footer
    bordered
    position="absolute"
    class="flex h-[30px] items-center justify-center"
  >
    后台管理 &copy ink-spell
  </n-layout-footer>
</template>

<script lang="ts" setup>
import { router } from '@/routes'
import { NIcon } from 'naive-ui'
import type { Component } from 'vue'
import { h } from 'vue'
import MingcuteBook2Line from '~icons/mingcute/book-2-line'
import MingcuteBook5Line from '~icons/mingcute/book-5-line'
import MingcuteHome3Line from '~icons/mingcute/home-3-line'
import MingcuteUser3Line from '~icons/mingcute/user-3-line'

const selectMenuFunction = (value: string) => {
  router.push(value)
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: '首页',
    key: '/',
    icon: renderIcon(MingcuteHome3Line)
  },
  {
    label: '用户管理',
    key: '/user/manage',
    icon: renderIcon(MingcuteUser3Line)
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
</script>

<style scoped></style>
