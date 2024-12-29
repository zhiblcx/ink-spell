<script setup lang="ts">
import { APP_NAME } from '@/shared/constants/app.ts'
import { ThemeEnum } from '@/shared/enums/ThemeEnum'
import { useLanguageStore, useThemeStore } from '@/shared/store'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useTranslation } from 'i18next-vue'
import { ConfigProviderProps, createDiscreteApi, darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { LoadingBarInst } from 'naive-ui/es/loading-bar/src/LoadingBarProvider'
import { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
import { LanguageEnum } from './shared/enums/LanguageEnum'
const { t } = useTranslation(['COMMON'])

declare global {
  interface Window {
    $message: MessageApiInjection
    $loading: LoadingBarInst
  }
}

const themeStore = useThemeStore()
const languageStore = useLanguageStore()

const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: themeStore.currentTheme === ThemeEnum.DARK ? darkTheme : null
}))
const { message, loadingBar } = createDiscreteApi(['message', 'loadingBar'], {
  configProviderProps: configProviderPropsRef
})

onMounted(() => {
  document.title = `${APP_NAME} ${t('back_stage_management')}`
})

window.$message = message
window.$loading = loadingBar
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
          <n-loading-bar-provider>
            <router-view />
            <VueQueryDevtools />
          </n-loading-bar-provider>
        </n-modal-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
