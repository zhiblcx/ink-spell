<script setup lang="ts">
import { ThemeEnum } from '@/shared/enums/ThemeEnum'
import { useThemeStore } from '@/shared/store/useThemeStore'
import { ConfigProviderProps, createDiscreteApi, darkTheme } from 'naive-ui'
import { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
declare global {
  interface Window {
    $message: MessageApiInjection // 根据实际类型替换 `any`
  }
}
const themeStore = useThemeStore()
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: themeStore.currentTheme === ThemeEnum.DARK ? darkTheme : null
}))
const { message } = createDiscreteApi(['message'], {
  configProviderProps: configProviderPropsRef
})
window.$message = message
</script>

<template>
  <n-config-provider :theme="themeStore.currentTheme === ThemeEnum.DARK ? darkTheme : null">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>
