<script setup lang="ts">
import { ThemeEnum } from '@/shared/enums/ThemeEnum'
import { useLanguageStore, useThemeStore } from '@/shared/store'
import { ConfigProviderProps, createDiscreteApi, darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
import { LanguageEnum } from './shared/enums/LanguageEnum'

declare global {
  interface Window {
    $message: MessageApiInjection
  }
}

const themeStore = useThemeStore()
const languageStore = useLanguageStore()
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: themeStore.currentTheme === ThemeEnum.DARK ? darkTheme : null
}))
const { message } = createDiscreteApi(['message'], {
  configProviderProps: configProviderPropsRef
})
window.$message = message
</script>

<template>
  <n-config-provider
    :theme="themeStore.currentTheme === ThemeEnum.DARK ? darkTheme : null"
    :locale="languageStore.language === LanguageEnum.ENGLISH ? null : zhCN"
    :date-locale="languageStore.language === LanguageEnum.ENGLISH ? null : dateZhCN"
  >
    <n-message-provider>
      <n-dialog-provider>
        <n-modal-provider>
          <!-- <VueQueryDevtools /> -->
          <router-view />
        </n-modal-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
