<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { echartsProps } from '../../types'
const options = defineProps<echartsProps>()
const echartsDom = ref(null)

const option = {
  title: {
    text: options.title,
    subtext: options.subtext,
    left: 'center'
  },
  toolbox: {
    feature: {
      saveAsImage: {
        show: options.downloadImg
      }
    }
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: options.name,
      data: options.data.map((item) => ({
        name: item.label,
        value: item.value
      })),
      type: 'pie',
      label: {
        show: options.label
      }
    }
  ],
  color: options.color ?? [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc'
  ]
}

onMounted(() => {
  const myChart = echarts.init(echartsDom.value)
  myChart.setOption({ ...option, ...options.options })
  window.addEventListener('resize', () => myChartResize(myChart))
})

function myChartResize(myChart: echarts.ECharts) {
  myChart.resize()
}
</script>

<template>
  <div
    ref="echartsDom"
    class="w-[100%]"
    :style="{ height: options.height, width: options.width }"
  />
</template>
