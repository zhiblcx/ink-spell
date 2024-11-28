<script setup lang="ts">
import { ExitIcon, UserIcon } from '@/assets/icons'
import LogoDarkImg from '@/assets/images/logo-dark.png'
import LogoLightImg from '@/assets/images/logo-light.png'
import ThemeToggle from '@/shared/components/ThemeToggle/index.vue'
import { ThemeEnum } from '@/shared/enums/ThemeEnum'
import { useThemeStore } from '@/shared/store/useThemeStore'
import { NIcon } from 'naive-ui'

const themeStore = useThemeStore()
const options = [
  {
    label: '个人资料',
    key: 'profile',
    icon: renderIcon(UserIcon)
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(ExitIcon)
  }
]

function renderIcon(icon: Component) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}
</script>

<template>
  <n-layout-header
    bordered
    class="flex h-[60px] items-center justify-between px-[24px]"
  >
    <img
      :src="themeStore.currentTheme === ThemeEnum.DARK ? LogoLightImg : LogoDarkImg"
      class="w-[200px]"
    />
    <div class="flex">
      <n-dropdown :options="options">
        <n-avatar
          round
          size="small"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
      </n-dropdown>
      <ThemeToggle />
    </div>
  </n-layout-header>
</template>
