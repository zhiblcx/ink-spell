<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'
import { DEFAULT_PIE_COLORS, DEFAULT_WIDTH } from '../../default'
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
  color: options.color ?? DEFAULT_PIE_COLORS
}

onMounted(() => {
  const myChart = echarts.init(echartsDom.value)
  myChart.setOption({ ...option, ...options.options })
  window.addEventListener('resize', () => myChartResize(myChart))

  const unWatch = watch(
    () => options.relyVariable,
    () => {
      if (options.relyVariable === undefined || options.relyVariable === null) {
        unWatch()
      } else {
        myChartResize(myChart)
      }
    }
  )
})

function myChartResize(myChart: echarts.ECharts) {
  myChart.resize()
}
</script>

<template>
  <div
    ref="echartsDom"
    :style="{ height: options.height, width: options.width ?? DEFAULT_WIDTH }"
  />
</template>
