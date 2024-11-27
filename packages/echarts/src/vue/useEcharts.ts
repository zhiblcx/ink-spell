import * as echarts from 'echarts'
import { echartsProps } from '../types'
import { onMounted, onUnmounted, shallowRef, watch } from 'vue'

export function useEcharts(echartsDom: globalThis.Ref<null, null>, options: echartsProps, getOptionsFn: Function,) {
  const chartInstance = shallowRef<echarts.EChartsType | null>(null)

  onMounted(() => {
    initChart()
    window.addEventListener('resize', () => handleResize())

    const unWatch = watch(
      () => options.relyVariable,
      () => {
        if (options.relyVariable === undefined || options.relyVariable === null) {
          unWatch()
        } else {
          handleResize()
        }
      }
    )
  })

  // 组件卸载时移除事件监听器并销毁图表实例
  onUnmounted(() => {
    window.removeEventListener('resize', () => handleResize()) // 移除窗口大小调整的监听器
    disposeChart() // 销毁图表实例
  })

  function initChart() {
    if (echartsDom.value && !chartInstance.value) {
      const option = getOptionsFn(options);
      chartInstance.value = echarts.init(echartsDom.value);
      chartInstance.value.setOption(option);
    }
  }


  // 监听 options 的变化，并在其发生改变时更新图表
  watch(options as echarts.EChartsOption, updateChartOptions, { deep: true })
  watch(() => options.dark, toggleDarkMode)

  // 切换暗夜模式，重新初始化
  function toggleDarkMode() {
    disposeChart()
    initChart()
  }

  // 销毁图表实例的函数，释放内存并清空引用
  function disposeChart() {
    chartInstance.value?.dispose() // 调用 ECharts 的 dispose 方法销毁实例
    chartInstance.value = null // 清空 chartInstance 引用，避免内存泄漏
  }

  // 更新图表配置选项的函数
  function updateChartOptions() {
    const option = getOptionsFn(options)
    if (chartInstance.value) {
      // 使用新的选项更新图表，不合并现有选项并延迟更新以优化性能
      chartInstance.value.setOption({ ...option, ...options.options }, { lazyUpdate: true })
    }
  }

  // 处理窗口大小调整的函数，确保图表能够自动调整大小
  function handleResize() {
    chartInstance.value?.resize()
  }

  return {
    onMounted, onUnmounted, toggleDarkMode, disposeChart, handleResize, initChart, updateChartOptions
  }
}
