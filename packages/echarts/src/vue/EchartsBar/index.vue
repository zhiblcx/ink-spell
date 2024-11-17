<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'
import { DEFAULT_COLOR, DEFAULT_WIDTH } from '../../default'
import { echartsProps } from '../../types'
const options = defineProps<echartsProps>()
const echartsDom = ref(null)

const option = {
  title: {
    text: options.title,
    subtext: options.subtext,
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 阴影指示器
      type: 'shadow'
    }
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
      name: options.name,
      data: options.data.map((item) => item.value),
      type: 'bar',
      label: {
        show: options.label,
        position: 'top'
      }
    }
  ],
  color: options.color ?? DEFAULT_COLOR
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
