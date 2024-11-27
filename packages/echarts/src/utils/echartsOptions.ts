import { DEFAULT_COLOR, DEFAULT_PIE_COLORS } from "../default";
import { echartsProps } from "../types";

export function echartsBaseOptions(options: echartsProps) {
  return {
    title: {
      text: options.title,
      subtext: options.subtext,
      left: 'center',
      textStyle: {
        color: options.dark ? '#fff' : '#000'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {
          show: options.downloadImg
        }
      }
    }
  }
}

export function echartsBarOptions(options: echartsProps) {
  return {
    ...echartsBaseOptions(options),
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
}

export function echartsLineOptions(options: echartsProps) {
  return {
    ...echartsBaseOptions(options),
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
    color: options.color ?? DEFAULT_COLOR
  }
}

export function echartsPieOptions(options: echartsProps) {
  return {
    ...echartsBaseOptions(options),
    tooltip: {
      trigger: 'item'
    },
    legend: {
      left: 'center',
      top: 'bottom',
      textStyle: {
        color: options.dark ? '#fff' : '#000'
      }
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
}
