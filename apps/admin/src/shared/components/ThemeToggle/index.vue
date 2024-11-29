<script setup lang="ts">
import { MoonIcon, SumIcon, SunFlowerIcon } from '@/assets/icons'
import { ThemeEnum } from '@/shared/enums/ThemeEnum'
import { useLanguageStore } from '@/shared/store/useLanguageStore'
import { useThemeStore } from '@/shared/store/useThemeStore'
import { renderIcon } from '@/shared/utils/renderIcon'
import { useTranslation } from 'i18next-vue'

const { t } = useTranslation(['COMMON'])
const themeStore = useThemeStore()
const languageStore = useLanguageStore()
const baseIcon = '20px'
const options = ref()

watch(
  () => languageStore.language,
  () => {
    options.value = [
      {
        label: t('COMMON:night_mode'),
        key: ThemeEnum.LIGHT,
        icon: renderIcon(SumIcon, baseIcon, baseIcon)
      },
      {
        label: t('COMMON:day_mode'),
        key: ThemeEnum.DARK,
        icon: renderIcon(MoonIcon, baseIcon, baseIcon)
      },
      {
        label: t('COMMON:follow_system'),
        key: ThemeEnum.SYSTEM,
        icon: renderIcon(SunFlowerIcon, baseIcon, baseIcon)
      }
    ]
  },
  {
    immediate: true
  }
)

function changeLanguage(key: ThemeEnum) {
  themeStore.changeTheme(key)
}
</script>

<template>
  <n-dropdown
    :options="options"
    @select="changeLanguage"
  >
    <SumIcon v-if="themeStore.theme === ThemeEnum.LIGHT" />
    <MoonIcon v-if="themeStore.theme === ThemeEnum.DARK" />
    <SunFlowerIcon v-if="themeStore.theme === ThemeEnum.SYSTEM" />
  </n-dropdown>
</template>

<style scoped></style>
