<script setup lang="ts">
import { DarkModeIconProps } from './types'
const { width, height } = defineProps<DarkModeIconProps>()
</script>

<template>
  <div
    class="i-mingcute:moon-stars-line w-2em h-2em cursor-pointer"
    :style="{
      width,
      height
    }"
  />
</template>

<style scoped></style>
