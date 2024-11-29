<script setup lang="ts">
import LogoDarkImg from '@/assets/images/logo-dark.png'
import LogoLightImg from '@/assets/images/logo-light.png'
import { FullScreenButton, LanguageToggle } from '@/shared/components'
import ThemeToggle from '@/shared/components/ThemeToggle/index.vue'
import { ThemeEnum } from '@/shared/enums/ThemeEnum'
import { useThemeStore } from '@/shared/store/useThemeStore'
import { Avatar } from './components'

const themeStore = useThemeStore()
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
    <div class="flex space-x-3">
      <FullScreenButton />
      <LanguageToggle />
      <ThemeToggle />
      <Avatar />
    </div>
  </n-layout-header>
</template>
