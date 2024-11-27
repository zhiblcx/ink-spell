<script setup lang="ts">
import { ref } from 'vue'
import { DEFAULT_WIDTH } from '../default'
import { echartsProps } from '../types'
import { echartsPieOptions } from '../utils'
import { useEcharts } from './useEcharts'
const options = defineProps<echartsProps>()
const echartsDom = ref(null)
useEcharts(echartsDom, options, echartsPieOptions)
</script>

<template>
  <div
    ref="echartsDom"
    :style="{ height: options.height, width: options.width ?? DEFAULT_WIDTH }"
  />
</template>
