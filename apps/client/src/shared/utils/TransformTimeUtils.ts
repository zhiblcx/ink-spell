import dayjs from "dayjs"

export class TransformTimeUtils {

  /**
  * @param {Date} [timer = new Date()] - 可选参数 表示要获取年份的时间戳，默认为当前时间
  * @return {number} 给定时间戳的年份
  * @example
  * ```ts
  * TransformTimeUtils.getYear()
  * ```
  */
  static getYear(timer = new Date()) {
    return dayjs(timer).year()
  }

  /**
  * @param {Date} [timer = new Date()] - 可选参数 表示要获取月份的时间戳，默认为当前时间
  * @return {number} 给定时间戳的月份
  * @example
  * ```ts
  * TransformTimeUtils.getMonth()
  * ```
  */
  static getMonth(timer = new Date()) {
    return dayjs(timer).month() + 1
  }

  /**
  * @param {Date} [timer = new Date()] - 可选参数 表示要获取日期的时间戳，默认为当前时间
  * @return {number} 给定时间戳的日期
  * @example
  * ```ts
  * TransformTimeUtils.getDate()
  * ```
  */
  static getDate(timer = new Date()) {
    return dayjs(timer).date()
  }

  /**
  * @param {Date} [timer = new Date()] - 可选参数 表示要获取小时的时间戳，默认为当前时间
  * @return {number} 给定时间的小时
  * @example
  * ```ts
  * TransformTimeUtils.getHour()
  * ```
  */
  static getHour(timer = new Date()) {
    return dayjs(timer).hour()
  }

  /**
  * @param {Date} [timer = new Date()] - 可选参数 表示要获取分钟的时间戳，默认为当前时间
  * @return {number} 给定时间戳的分钟
  * @example
  * ```ts
  * TransformTimeUtils.getMinute()
  * ```
  */
  static getMinute(timer = new Date()) {
    return dayjs(timer).minute()
  }

  /**
  * @param {Date} [timer = new Date()] - 可选参数 表示要获取秒数的时间戳，默认为当前时间
  * @return {number} 给定时间戳的秒数
  * @example
  * ```ts
  * TransformTimeUtils.getSecond()
  * ```
  */
  static getSecond(timer = new Date()) {
    return dayjs(timer).second()
  }

  /**
  * @param {Date} [timer = new Date()] - 可选参数 表示要获取的时间戳，默认为当前时间
  * @return {number} 给定时间戳
  * @example
  * ```ts
  * TransformTimeUtils.getTimestamp()
  * ```
  */
  static getTimestamp(timer = new Date()) {
    return dayjs(timer).valueOf()
  }

  /**
  * @param {Date} [timer = new Date()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'YYYY-MM-DD HH:mm:ss'] - 可选参数 表示要格式化的时间格式，默认为'YYYY-MM-DD HH:mm:ss'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateYMDHMS()
  * ```
  */
  static formatDateYMDHMS(timer = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(timer).format(format)
  }

  /**
  * @param {Date} [timer = new Date()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'MM-DD HH:mm'] - 可选参数 表示要格式化的时间格式，默认为'MM-DD HH:mm'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateMDHM()
  * ```
  */
  static formatDateMDHM(timer = new Date(), format = 'MM-DD HH:mm') {
    return dayjs(timer).format(format)
  }

  /**
  * @param {Date} [timer = new Date()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'YYYY-MM-DD'] - 可选参数 表示要格式化的时间格式，默认为'YYYY-MM-DD'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateYMD()
  * ```
  */
  static formatDateYMD(timer = new Date(), format = 'YYYY-MM-DD') {
    return dayjs(timer).format(format)
  }

  /**
  * @param {Date} [timer = new Date()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'YYYY-MM'] - 可选参数 表示要格式化的时间格式，默认为'YYYY-MM'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateYM()
  * ```
  */
  static formatDateYM(timer = new Date(), format = 'YYYY-MM') {
    return dayjs(timer).format(format)
  }

  /**
  * @param {Date} [timer = new Date()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'MM-DD'] - 可选参数 表示要格式化的时间格式，默认为'MM-DD'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateMD()
  * ```
  */
  static formatDateMD(timer = new Date(), format = 'MM-DD') {
    return dayjs(timer).format(format)
  }

  /**
  * @param {Date} [timer = new Date()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'HH:mm:ss'] - 可选参数 表示要格式化的时间格式，默认为'HH:mm:ss'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateHMS()
  * ```
  */
  static formatDateHMS(timer = new Date(), format = 'HH:mm:ss') {
    return dayjs(timer).format(format)
  }

  /**
  * @param {Date} [timer = new Date()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'HH:mm'] - 可选参数 表示要格式化的时间格式，默认为'HH:mm'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateHM()
  * ```
  */
  static formatDateHM(timer = new Date(), format = 'HH:mm') {
    return dayjs(timer).format(format)
  }

  /**
  * @param {Date} [timer = new Date()] - 可选参数 表示要格式化的时间戳，默认为当前时间
  * @param {string} [format = 'mm:ss'] - 可选参数 表示要格式化的时间格式，默认为'mm:ss'
  * @return {string} 按照指定格式格式化的日期时间字符串
  * @example
  * ```ts
  * TransformTimeUtils.formatDateMS()
  * ```
  */
  static formatDateMS(timer = new Date(), format = 'mm:ss') {
    return dayjs(timer).format(format)
  }

  /**
  * @param {Date} timer1 - 第一个时间戳，默认为当前时间
  * @param {Date} timer2 - 第二个时间戳，默认为当前时间
  * @returns {boolean} - 如果timer1 在 timer2 之前，则返回true，否则返回false
  * @example
  * ```ts
  * TransformTimeUtils.compareTimer()
  * ```
  */
  static compareTimer(timer1 = new Date(), timer2 = new Date()) {
    return dayjs(timer1).isBefore(dayjs(timer2))
  }
}