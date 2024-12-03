import { defineStore } from 'pinia'
import { ThemeUtils } from '../utils/ThemeUtils'
import { ThemeEnum } from '../enums/ThemeEnum'
import { TransformTimeUtils } from "@ink-spell/utils"
import dayjs from 'dayjs'
import { renderIcon } from '../utils/renderIcon'
import LeafIcon from '@/assets/icons/iconify/LeafIcon.vue'
import BlingIcon from '@/assets/icons/iconify/BlingIcon.vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ThemeEnum>(ThemeUtils.getTheme() as ThemeEnum ?? ThemeEnum.LIGHT)
  const currentTheme = ref(ThemeEnum.LIGHT)
  let timer: NodeJS.Timeout | null = null
  const startTime = "6:00"
  const endTime = "19:00"

  function changeTheme(state: ThemeEnum) {
    if (state === ThemeEnum.SYSTEM) {
      currentTheme.value = syncThemeBasedOnTime()
    } else {
      currentTheme.value = state
    }
    ThemeUtils.changeTheme(currentTheme.value)
    ThemeUtils.setTheme(state)
    theme.value = state
  }

  // 跟随系统时间
  function syncThemeBasedOnTime(): ThemeEnum {
    // 当前时间
    const {
      currentHour, currentMinute,
      startTimeHour, startTimeMinute,
      endTimeHour, endTimeMinute
    } = getTimeComponents(startTime, endTime)
    // 如果当前时间在 endTimer(包括) - startTimeHour(不包括) 之间暗夜模式
    let result
    if (currentHour < startTimeHour ||
      (currentHour === startTimeHour && currentMinute < startTimeMinute) ||
      currentHour > endTimeHour ||
      (currentHour === endTimeHour && currentMinute >= endTimeMinute)
    ) {
      result = ThemeEnum.DARK
    } else {
      result = ThemeEnum.LIGHT
    }
    setupTimer()
    return result
  }

  // 设置定时器
  function setupTimer() {
    // 当前时间
    let nextCheckTime = 0
    let greeting = () => window.$message.success("星星点点，夜深了，愿你有个好梦", {
      icon: renderIcon(BlingIcon)
    })
    // 如果当前时间在 startTime(包括) - endTime(不包括) 之间，则设置下一个时间点 startTime 为白天模式
    const {
      currentHour, currentMinute,
      startTimeHour, startTimeMinute,
      endTimeHour, endTimeMinute
    } = getTimeComponents(startTime, endTime)
    if (currentHour < startTimeHour ||
      (currentHour === startTimeHour && currentMinute < startTimeMinute) ||
      currentHour > endTimeHour ||
      (currentHour === endTimeHour && currentMinute >= endTimeMinute)) {
      const tomorrow = TransformTimeUtils.getSpecificTimeInFuture({ n: 1, hour: startTimeHour, minute: startTimeMinute })
      nextCheckTime = TransformTimeUtils.compareTimerDiff(dayjs(tomorrow), dayjs(), 'second')
      greeting = () => window.$message.success("早安！新的一天开始了，愿你充满活力", {
        icon: renderIcon(LeafIcon)
      })
    } else {
      const today = TransformTimeUtils.getSpecificTimeInFuture({ n: 0, hour: endTimeHour, minute: endTimeMinute })
      nextCheckTime = TransformTimeUtils.compareTimerDiff(dayjs(today), dayjs(), 'second')
    }

    if (timer === null) {
      timer = setTimeout(() => {
        changeTheme(ThemeEnum.SYSTEM)
        greeting()
        if (timer != null) {
          clearTimeout(timer)
        }
        timer = null
      }, nextCheckTime * 1000)
    }
  }

  // 封装获取当前时间和特定时间的小时和分钟的函数
  function getTimeComponents(startTime: string, endTime: string) {
    const currentHour = TransformTimeUtils.getHour();
    const currentMinute = TransformTimeUtils.getMinute();
    const startTimeHour = parseInt(startTime.split(":")[0]);
    const startTimeMinute = parseInt(startTime.split(":")[1]);
    const endTimeHour = parseInt(endTime.split(":")[0]);
    const endTimeMinute = parseInt(endTime.split(":")[1]);

    return {
      currentHour,
      currentMinute,
      startTimeHour,
      startTimeMinute,
      endTimeHour,
      endTimeMinute,
    };
  }

  changeTheme(theme.value)

  return { theme, changeTheme, currentTheme }
})


// 跟随系统主题
// function syncWithSystemTheme() {
//   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const systemTheme = prefersDark ? ThemeEnum.DARK : ThemeEnum.LIGHT;
//   changeTheme(systemTheme);
// }

// // 监听系统主题变化
// window
//   .matchMedia("(prefers-color-scheme: dark)").addEventListener('change', (_) => {
//     syncWithSystemTheme()
//   });

