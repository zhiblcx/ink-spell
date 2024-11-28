import dayjs from 'dayjs';

export class TransformTimeUtils {

  /**
  * @description 获取当前时间戳的年份
  * @param {dayjs.Dayjs | Date} [timer =  dayjs()] - 可选参数 表示要获取年份的时间戳，默认为当前时间
  * @return {number} 给定时间戳的年份
  * @example
  * ```ts
  * TransformTimeUtils.getYear()
  * ```
  */
  static getYear(timer: Date | dayjs.Dayjs = dayjs()): number {
    return dayjs(timer).year()
  }

  /**
  * @description 获取当前时间戳的月份
  * @param {dayjs.Dayjs | Date} [timer =  dayjs()] - 可选参数 表示要获取月份的时间戳，默认为当前时间
  * @return {number} 给定时间戳的月份
  * @example
  * ```ts
  * TransformTimeUtils.getMonth()
  * ```
  */
  static getMonth(timer: Date | dayjs.Dayjs = dayjs()): number {
    return dayjs(timer).month() + 1
  }

  /**
  * @description 获取当前时间戳的日期
  * @param {dayjs.Dayjs | Date} [timer =  dayjs()] - 可选参数 表示要获取日期的时间戳，默认为当前时间
  * @return {number} 给定时间戳的日期
  * @example
  * ```ts
  * TransformTimeUtils.getDate()
  * ```
  */
  static getDate(timer: Date | dayjs.Dayjs = dayjs()): number {
    return dayjs(timer).date()
  }

  /**
   * @description 获取当前时间戳的小时数
  * @param {dayjs.Dayjs | Date} [timer =  dayjs()] - 可选参数 表示要获取小时的时间戳，默认为当前时间
  * @return {number} 给定时间的小时
  * @example
  * ```ts
  * TransformTimeUtils.getHour()
  * ```
  */
  static getHour(timer: Date | dayjs.Dayjs = dayjs()): number {
    return dayjs(timer).hour()
  }

  /**
  * @description 获取当前时间戳的分钟数
  * @param {dayjs.Dayjs | Date} [timer =  dayjs()] - 可选参数 表示要获取分钟的时间戳，默认为当前时间
  * @return {number} 给定时间戳的分钟
  * @example
  * ```ts
  * TransformTimeUtils.getMinute()
  * ```
  */
  static getMinute(timer: Date | dayjs.Dayjs = dayjs()): number {
    return dayjs(timer).minute()
  }

  /**
  * @description 获取当前时间戳的秒数
  * @param {dayjs.Dayjs | Date} [timer =  dayjs()] - 可选参数 表示要获取秒数的时间戳，默认为当前时间
  * @return {number} 给定时间戳的秒数
  * @example
  * ```ts
  * TransformTimeUtils.getSecond()
  * ```
  */
  static getSecond(timer: Date | dayjs.Dayjs = dayjs()): number {
    return dayjs(timer).second()
  }

  /**
  * @description 获取当前时间戳
  * @param {dayjs.Dayjs | Date} [timer =  dayjs()] - 可选参数 表示要获取的时间戳，默认为当前时间
  * @return {number} 给定时间戳
  * @example
  * ```ts
  * TransformTimeUtils.getTimestamp()
  * ```
  */
  static getTimestamp(timer: Date | dayjs.Dayjs = dayjs()): number {
    return dayjs(timer).valueOf()
  }

  /**
   * @description 格式化时间戳为指定格式
  * @param {dayjs.Dayjs | Date} [timer =  dayjs()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'YYYY-MM-DD HH:mm:ss'] - 可选参数 表示要格式化的时间格式，默认为'YYYY-MM-DD HH:mm:ss'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateYMDHMS()
  * ```
  */
  static formatDateYMDHMS(timer: Date | dayjs.Dayjs = dayjs(), format = 'YYYY-MM-DD HH:mm:ss'): string {

    return dayjs(timer).format(format)
  }

  /**
   * @description 格式化时间戳为指定格式
  * @param {dayjs.Dayjs | Date} [timer =  dayjs()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'YYYY-MM-DD HH:mm'] - 可选参数 表示要格式化的时间格式，默认为'YYYY-MM-DD HH:mm:ss'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateYMDHM()
  * ```
  */
  static formatDateYMDHM(timer: Date | dayjs.Dayjs = dayjs(), format = 'YYYY-MM-DD HH:mm'): string {
    return dayjs(timer).format(format)
  }

  /**
   * @description 格式化时间戳为指定格式
  * @param {dayjs.Dayjs | Date} [timer =  dayjs()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'MM-DD HH:mm'] - 可选参数 表示要格式化的时间格式，默认为'MM-DD HH:mm'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateMDHM()
  * ```
  */
  static formatDateMDHM(timer: Date | dayjs.Dayjs = dayjs(), format = 'MM-DD HH:mm'): string {
    return dayjs(timer).format(format)
  }

  /**
   * @description 格式化时间戳为指定格式
  * @param {dayjs.Dayjs | Date} [timer =  dayjs()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'YYYY-MM-DD'] - 可选参数 表示要格式化的时间格式，默认为'YYYY-MM-DD'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateYMD()
  * ```
  */
  static formatDateYMD(timer: Date | dayjs.Dayjs = dayjs(), format = 'YYYY-MM-DD'): string {
    return dayjs(timer).format(format)
  }

  /**
   * @description 格式化时间戳为指定格式
  * @param {dayjs.Dayjs | Date} [timer =  dayjs()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'YYYY-MM'] - 可选参数 表示要格式化的时间格式，默认为'YYYY-MM'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateYM()
  * ```
  */
  static formatDateYM(timer: Date | dayjs.Dayjs = dayjs(), format = 'YYYY-MM'): string {
    return dayjs(timer).format(format)
  }

  /**
   * @description 格式化时间戳为指定格式
  * @param {dayjs.Dayjs | Date} [timer =  dayjs()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'MM-DD'] - 可选参数 表示要格式化的时间格式，默认为'MM-DD'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateMD()
  * ```
  */
  static formatDateMD(timer: Date | dayjs.Dayjs = dayjs(), format = 'MM-DD'): string {
    return dayjs(timer).format(format)
  }

  /**
   * @description 格式化时间戳为指定格式
  * @param {dayjs.Dayjs | Date} [timer =  dayjs()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'HH:mm:ss'] - 可选参数 表示要格式化的时间格式，默认为'HH:mm:ss'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateHMS()
  * ```
  */
  static formatDateHMS(timer: Date | dayjs.Dayjs = dayjs(), format = 'HH:mm:ss'): string {
    return dayjs(timer).format(format)
  }

  /**
   * @description 格式化时间戳为指定格式
  * @param {dayjs.Dayjs | Date} [timer =  dayjs()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'HH:mm'] - 可选参数 表示要格式化的时间格式，默认为'HH:mm'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateHM()
  * ```
  */
  static formatDateHM(timer: Date | dayjs.Dayjs = dayjs(), format = 'HH:mm'): string {
    return dayjs(timer).format(format)
  }

  /**
   * @description 格式化时间戳为指定格式
  * @param {dayjs.Dayjs | Date} [timer =  dayjs()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'mm:ss'] - 可选参数 表示要格式化的时间格式，默认为'mm:ss'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateMS()
  * ```
  */
  static formatDateMS(timer: Date | dayjs.Dayjs = dayjs(), format = 'mm:ss'): string {
    return dayjs(timer).format(format)
  }

  /**
   * @description 比较两个时间戳的大小
  * @param {dayjs.Dayjs | Date} timer1 - 第一个时间戳，默认为当前时间
  * @param {dayjs.Dayjs | Date} timer2 - 第二个时间戳，默认为当前时间
  * @returns {boolean} - 如果timer1 在 timer2 之前，则返回true，否则返回false
  * @example
  * ```ts
  * TransformTimeUtils.compareTimer()
  * ```
  */
  static compareTimer(timer1: Date | dayjs.Dayjs = dayjs(), timer2: Date | dayjs.Dayjs = dayjs()): boolean {
    return dayjs(timer1).isBefore(dayjs(timer2))
  }

  /**
   * @description 比较两个时间的差异
  * @param {dayjs.Dayjs | Date} timer1 - 第一个时间戳，默认为当前时间
  * @param {dayjs.Dayjs | Date} timer2 - 第二个时间戳，默认为当前时间
  * @param {QUnitType | OpUnitType} - 比较单位，默认为'minute'
  * @returns {boolean} - 返回指定单位中两个日期时间之间的差异
  * @example
  * ```ts
  * TransformTimeUtils.compareTimerDiff()
  * ```
  */
  static compareTimerDiff(timer1: Date | dayjs.Dayjs = dayjs(), timer2: Date | dayjs.Dayjs = dayjs(), unit?: dayjs.OpUnitType | dayjs.OpUnitType): number {
    if (timer1 < timer2) [timer1, timer2] = [timer2, timer1]
    return dayjs(timer1).diff(dayjs(timer2), unit ?? 'minute')
  }


  /**
  * @description 获取指定时间之前日期
  * @param {number} n - 要获取的时间单位数量
  * @param {dayjs.Dayjs | Date} timer - 指定的时间，默认为当前时间
  * @param {dayjs.ManipulateType} [unit] - 要获取的时间单位，默认为'day'
  * @param {string} [format] - 要返回的时间格式，默认为'YYYY-MM-DD'
  * @returns {string} - 返回指定时间单位之前的指定日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.getUnitsBefore(2)
  * ```
  */
  static getUnitsBefore(n: number, timer: Date | dayjs.Dayjs = dayjs(), unit: dayjs.ManipulateType = 'day', format = 'YYYY-MM-DD'): string {
    return dayjs(timer).subtract(n, unit).format(format)
  }

  /**
  * @description 获取指定时间之后日期
  * @param {number} n - 要获取的时间单位数量
  * @param {dayjs.Dayjs | Date} timer - 指定的时间，默认为当前时间
  * @param {dayjs.ManipulateType} [unit] - 要获取的时间单位，默认为'day'
  * @param {string} [format] - 要返回的时间格式，默认为'YYYY-MM-DD'
  * @returns {string} - 返回指定时间时间单位之前的指定日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.getUnitsAfter(2)
  * ```
  */
  static getUnitsAfter(n: number, timer: Date | dayjs.Dayjs = dayjs(), unit: dayjs.ManipulateType = 'day', format = 'YYYY-MM-DD'): string {
    return dayjs(timer).add(n, unit).format(format)
  }

  /**
  * @description 获取未来特定天数的特定时间
  * @param {number} n - 要获取的时间单位数量
  * @param {dayjs.ManipulateType} unit - 要获取的时间单位，默认为'day'
  * @param {number} hour - 要获取的小时数
  * @param {number} minute - 要获取的分钟数，默认为0
  * @param {number} second - 要获取的秒数，默认为0
  * @returns {dayjs.Dayjs} - 返回未来特定天数的特定时间
  * @example
  * ```ts
  * TransformTimeUtils.getSpecificTimeInFuture(1,6)
  * ```
  */
  static getSpecificTimeInFuture({ n, unit = 'day', hour, minute = 0, second = 0 }: {
    n: number; unit: dayjs.ManipulateType; hour: number; minute: number; second: number
  }): dayjs.Dayjs {
    return dayjs().add(n, unit).hour(hour).minute(minute).second(second)
  }

  /**
  * @description 获取过去特定天数的特定时间
  * @param {number} n - 要获取的时间单位数量
  * @param {dayjs.ManipulateType} unit - 要获取的时间单位，默认为'day'
  * @param {number} hour - 要获取的小时数
  * @param {number} minute - 要获取的分钟数，默认为0
  * @param {number} second - 要获取的秒数，默认为0
  * @returns {dayjs.Dayjs} - 返回过去特定天数的特定时间
  * @example
  * ```ts
  * TransformTimeUtils.getSpecificTimeInPass(1,6)
  * ```
  */
  static getSpecificTimeInPass({ n, unit = 'day', hour, minute = 0, second = 0 }: {
    n: number; unit: dayjs.ManipulateType; hour: number; minute: number; second: number
  }): dayjs.Dayjs {
    return dayjs().subtract(n, unit).hour(hour).minute(minute).second(second)
  }
}
