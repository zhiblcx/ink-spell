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
  xAxis: {
    type: 'category',
    data: options.data.map((item) => item.label)
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: options.data.map((item) => item.value),
      type: 'line',
      label: {
        show: options.label,
        position: 'top'
      }
    }
  ],
  color: options.color ?? ['#2fa968']
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
