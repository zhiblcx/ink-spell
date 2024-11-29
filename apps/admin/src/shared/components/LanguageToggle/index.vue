<script setup lang="ts">
import { TranslateIcon } from '@/assets/icons'
import { LanguageEnum } from '@/shared/enums/LanguageEnum'
import { useLanguageStore } from '@/shared/store/useLanguageStore'
const languageStore = useLanguageStore()

const options = [
  {
    label: '简体中文',
    key: LanguageEnum.CHINESE
  },
  {
    label: 'English',
    key: LanguageEnum.ENGLISH
  }
]

function changeTheme(key: LanguageEnum) {
  languageStore.setLanguage(key)
}
</script>

<template>
  <n-dropdown
    :options="options"
    @select="changeTheme"
  >
    <TranslateIcon />
  </n-dropdown>
</template>
