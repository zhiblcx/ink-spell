<script setup lang="ts">
import { ThemeEnum } from '@/shared/enums/ThemeEnum'
import { useThemeStore } from '@/shared/store/useThemeStore'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { ConfigProviderProps, createDiscreteApi, darkTheme } from 'naive-ui'
import { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'

declare global {
  interface Window {
    $message: MessageApiInjection
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
      <n-dialog-provider>
        <n-modal-provider>
          <router-view />
          <VueQueryDevtools />
        </n-modal-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
