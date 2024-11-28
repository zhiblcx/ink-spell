<script setup lang="ts">
import { MoonIcon, SumIcon, SunFlowerIcon } from '@/assets/icons'
import { ThemeEnum } from '@/shared/enums/ThemeEnum'
import { useThemeStore } from '@/shared/store/useThemeStore'
import { renderIcon } from '@/shared/utils/renderIcon'
const themeStore = useThemeStore()
const baseIcon = '20px'

const options = [
  {
    label: '白天模式',
    key: ThemeEnum.LIGHT,
    icon: renderIcon(SumIcon, baseIcon, baseIcon)
  },
  {
    label: '暗夜模式',
    key: ThemeEnum.DARK,
    icon: renderIcon(MoonIcon, baseIcon, baseIcon)
  },
  {
    label: '跟随系统',
    key: ThemeEnum.SYSTEM,
    icon: renderIcon(SunFlowerIcon, baseIcon, baseIcon)
  }
]

function changeTheme(key: ThemeEnum) {
  themeStore.changeTheme(key)
}
</script>

<template>
  <n-dropdown
    :options="options"
    @select="changeTheme"
  >
    <MoonIcon v-if="themeStore.theme === ThemeEnum.LIGHT" />
    <SumIcon v-if="themeStore.theme === ThemeEnum.DARK" />
    <SunFlowerIcon v-if="themeStore.theme === ThemeEnum.SYSTEM" />
  </n-dropdown>
</template>

<style scoped></style>
