<script setup lang="ts">
import { IconProps } from '../types'
const { width, height } = defineProps<IconProps>()
</script>

<template>
  <div
    class="i-mingcute:user-3-line w-1em h-1em"
    :style="{
      width,
      height
    }"
  />
</template>
