<script setup lang="ts">
import { IconProps } from '../types'
const { width, height } = defineProps<IconProps>()
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
