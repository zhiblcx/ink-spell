<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
import { DEFAULT_COLOR, DEFAULT_WIDTH } from '../../default'
import { echartsProps } from '../../types'
const options = defineProps<echartsProps>()
const echartsDom = ref(null)
const chartInstance = shallowRef<echarts.EChartsType | null>(null)

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
  initChart()
  window.addEventListener('resize', () => myChartResize())

  const unWatch = watch(
    () => options.relyVariable,
    () => {
      if (options.relyVariable === undefined || options.relyVariable === null) {
        unWatch()
      } else {
        myChartResize()
      }
    }
  )
})

// 组件卸载时移除事件监听器并销毁图表实例
onUnmounted(() => {
  window.removeEventListener('resize', () => handleResize()) // 移除窗口大小调整的监听器
  disposeChart() // 销毁图表实例
})

// 监听 options 的变化，并在其发生改变时更新图表
watch(options as echarts.EChartsOption, updateChartOptions, { deep: true })

function initChart() {
  // 确保 chartRef 绑定了 DOM 元素且 chartInstance 尚未初始化
  if (echartsDom.value && !chartInstance.value) {
    // 初始化 ECharts 实例并赋值给 chartInstance
    chartInstance.value = echarts.init(echartsDom.value)
    // 设置图表的初始选项
    chartInstance.value.setOption({ ...option, ...options.options })
  }
}

// 更新图表配置选项的函数
function updateChartOptions(newOptions: echarts.EChartsOption) {
  if (chartInstance.value) {
    // 使用新的选项更新图表，不合并现有选项并延迟更新以优化性能
    chartInstance.value.setOption(
      {
        ...option,
        xAxis: { ...option.xAxis, data: options.data.map((item) => item.label) },
        series: { ...option.series, data: options.data.map((item) => item.value) }
      },
      { lazyUpdate: true }
    )
  }
}

// 销毁图表实例的函数，释放内存并清空引用
function disposeChart() {
  chartInstance.value?.dispose() // 调用 ECharts 的 dispose 方法销毁实例
  chartInstance.value = null // 清空 chartInstance 引用，避免内存泄漏
}

// 处理窗口大小调整的函数，确保图表能够自动调整大小
function handleResize() {
  chartInstance.value?.resize()
}
</script>

<template>
  <div
    ref="echartsDom"
    :style="{ height: options.height, width: options.width ?? DEFAULT_WIDTH }"
  />
</template>
