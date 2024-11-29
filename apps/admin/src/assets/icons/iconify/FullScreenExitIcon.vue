<script setup lang="ts">
import { IconProps } from '../types'
const { width, height } = defineProps<IconProps>()
</script>

<template>
  <div
    class="i-mingcute:fullscreen-exit-line w-2em h-2em"
    :style="{
      width,
      height
    }"
  />
</template>
