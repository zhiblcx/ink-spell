<script setup lang="ts">
import LogoDarkImg from '@/assets/images/logo-dark.png'
import LogoLightImg from '@/assets/images/logo-light.png'
import ThemeToggle from '@/shared/components/ThemeToggle/index.vue'
import { ThemeEnum } from '@/shared/enums/ThemeEnum'
import { useThemeStore } from '@/shared/store/useThemeStore'
const themeStore = useThemeStore()
</script>

<template>
  <n-layout-header
    bordered
    class="flex h-[60px] items-center justify-between px-[24px]"
  >
    <img
      :src="themeStore.theme === ThemeEnum.DARK ? LogoLightImg : LogoDarkImg"
      class="w-[200px]"
    />
    <div class="flex">
      <ThemeToggle />
    </div>
  </n-layout-header>
</template>
