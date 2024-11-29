<script setup lang="ts">
import { FullScreenExitIcon, FullScreenIcon } from '@/assets/icons'
import { useFullScreenStore } from '@/shared/store/useFullScreenStore'
const fullScreen = useFullScreenStore()
</script>

<template>
  <FullScreenExitIcon
    v-if="fullScreen.isFullScreen"
    @click="fullScreen.handleFullScreenExit()"
  />
  <FullScreenIcon
    v-if="!fullScreen.isFullScreen"
    @click="fullScreen.handleFullScreen()"
  />
</template>
