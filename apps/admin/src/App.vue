<script setup lang="ts">
import { ThemeEnum } from '@/shared/enums/ThemeEnum'
import { useThemeStore } from '@/shared/store/useThemeStore'
import { darkTheme } from 'naive-ui'
const themeStore = useThemeStore()
</script>

<template>
  <n-config-provider :theme="themeStore.theme === ThemeEnum.DARK ? darkTheme : null">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
