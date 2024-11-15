<script setup lang="ts">
import MoonIcon from '@/assets/icons/MoonIcon.vue'
import SumIcon from '@/assets/icons/SumIcon.vue'
import { ThemeEnum } from '@/shared/enums/ThemeEnum'
import { useThemeStore } from '@/shared/store/useThemeStore'
const themeStore = useThemeStore()

function changeTheme() {
  themeStore.changeTheme(themeStore.theme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT)
}
</script>

<template>
  <div @click="changeTheme">
    <MoonIcon v-if="themeStore.theme === ThemeEnum.LIGHT" />
    <SumIcon v-if="themeStore.theme === ThemeEnum.DARK" />
  </div>
</template>

<style scoped></style>
