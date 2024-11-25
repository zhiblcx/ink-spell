import * as dayjs from 'dayjs';

declare class TransformTimeUtils {
    /**
    * @param {Date} [timer = new Date()] - 可选参数 表示要获取年份的时间戳，默认为当前时间
    * @return {number} 给定时间戳的年份
    * @example
    * ```ts
    * TransformTimeUtils.getYear()
    * ```
    */
    static getYear(timer?: Date): number;
    /**
    * @param {Date} [timer = new Date()] - 可选参数 表示要获取月份的时间戳，默认为当前时间
    * @return {number} 给定时间戳的月份
    * @example
    * ```ts
    * TransformTimeUtils.getMonth()
    * ```
    */
    static getMonth(timer?: Date): number;
    /**
    * @param {Date} [timer = new Date()] - 可选参数 表示要获取日期的时间戳，默认为当前时间
    * @return {number} 给定时间戳的日期
    * @example
    * ```ts
    * TransformTimeUtils.getDate()
    * ```
    */
    static getDate(timer?: Date): number;
    /**
    * @param {Date} [timer = new Date()] - 可选参数 表示要获取小时的时间戳，默认为当前时间
    * @return {number} 给定时间的小时
    * @example
    * ```ts
    * TransformTimeUtils.getHour()
    * ```
    */
    static getHour(timer?: Date): number;
    /**
    * @param {Date} [timer = new Date()] - 可选参数 表示要获取分钟的时间戳，默认为当前时间
    * @return {number} 给定时间戳的分钟
    * @example
    * ```ts
    * TransformTimeUtils.getMinute()
    * ```
    */
    static getMinute(timer?: Date): number;
    /**
    * @param {Date} [timer = new Date()] - 可选参数 表示要获取秒数的时间戳，默认为当前时间
    * @return {number} 给定时间戳的秒数
    * @example
    * ```ts
    * TransformTimeUtils.getSecond()
    * ```
    */
    static getSecond(timer?: Date): number;
    /**
    * @param {Date} [timer = new Date()] - 可选参数 表示要获取的时间戳，默认为当前时间
    * @return {number} 给定时间戳
    * @example
    * ```ts
    * TransformTimeUtils.getTimestamp()
    * ```
    */
    static getTimestamp(timer?: Date): number;
    /**
    * @param {Date} [timer = new Date()] - 可选参数 表示要格式化的时间戳，默认为当前时间
    * @param {string} [format = 'YYYY-MM-DD HH:mm:ss'] - 可选参数 表示要格式化的时间格式，默认为'YYYY-MM-DD HH:mm:ss'
    * @return {string} 按照指定格式格式化的日期时间字符串
    * @example
    * ```ts
    * TransformTimeUtils.formatDateYMDHMS()
    * ```
    */
    static formatDateYMDHMS(timer?: Date, format?: string): string;
    /**
    * @param {Date} [timer = new Date()] - 可选参数 表示要格式化的时间戳，默认为当前时间
    * @param {string} [format = 'MM-DD HH:mm'] - 可选参数 表示要格式化的时间格式，默认为'MM-DD HH:mm'
    * @return {string} 按照指定格式格式化的日期时间字符串
    * @example
    * ```ts
    * TransformTimeUtils.formatDateMDHM()
    * ```
    */
    static formatDateMDHM(timer?: Date, format?: string): string;
    /**
    * @param {Date} [timer = new Date()] - 可选参数 表示要格式化的时间戳，默认为当前时间
    * @param {string} [format = 'YYYY-MM-DD'] - 可选参数 表示要格式化的时间格式，默认为'YYYY-MM-DD'
    * @return {string} 按照指定格式格式化的日期时间字符串
    * @example
    * ```ts
    * TransformTimeUtils.formatDateYMD()
    * ```
    */
    static formatDateYMD(timer?: Date, format?: string): string;
    /**
    * @param {Date} [timer = new Date()] - 可选参数 表示要格式化的时间戳，默认为当前时间
    * @param {string} [format = 'YYYY-MM'] - 可选参数 表示要格式化的时间格式，默认为'YYYY-MM'
    * @return {string} 按照指定格式格式化的日期时间字符串
    * @example
    * ```ts
    * TransformTimeUtils.formatDateYM()
    * ```
    */
    static formatDateYM(timer?: Date, format?: string): string;
    /**
    * @param {Date} [timer = new Date()] - 可选参数 表示要格式化的时间戳，默认为当前时间
    * @param {string} [format = 'MM-DD'] - 可选参数 表示要格式化的时间格式，默认为'MM-DD'
    * @return {string} 按照指定格式格式化的日期时间字符串
    * @example
    * ```ts
    * TransformTimeUtils.formatDateMD()
    * ```
    */
    static formatDateMD(timer?: Date, format?: string): string;
    /**
    * @param {Date} [timer = new Date()] - 可选参数 表示要格式化的时间戳，默认为当前时间
    * @param {string} [format = 'HH:mm:ss'] - 可选参数 表示要格式化的时间格式，默认为'HH:mm:ss'
    * @return {string} 按照指定格式格式化的日期时间字符串
    * @example
    * ```ts
    * TransformTimeUtils.formatDateHMS()
    * ```
    */
    static formatDateHMS(timer?: Date, format?: string): string;
    /**
    * @param {Date} [timer = new Date()] - 可选参数 表示要格式化的时间戳，默认为当前时间
    * @param {string} [format = 'HH:mm'] - 可选参数 表示要格式化的时间格式，默认为'HH:mm'
    * @return {string} 按照指定格式格式化的日期时间字符串
    * @example
    * ```ts
    * TransformTimeUtils.formatDateHM()
    * ```
    */
    static formatDateHM(timer?: Date, format?: string): string;
    /**
    * @param {Date} [timer = new Date()] - 可选参数 表示要格式化的时间戳，默认为当前时间
    * @param {string} [format = 'mm:ss'] - 可选参数 表示要格式化的时间格式，默认为'mm:ss'
    * @return {string} 按照指定格式格式化的日期时间字符串
    * @example
    * ```ts
    * TransformTimeUtils.formatDateMS()
    * ```
    */
    static formatDateMS(timer?: Date, format?: string): string;
    /**
    * @param {Date} timer1 - 第一个时间戳，默认为当前时间
    * @param {Date} timer2 - 第二个时间戳，默认为当前时间
    * @returns {boolean} - 如果timer1 在 timer2 之前，则返回true，否则返回false
    * @example
    * ```ts
    * TransformTimeUtils.compareTimer()
    * ```
    */
    static compareTimer(timer1?: Date, timer2?: Date): boolean;
    /**
    * @param {Date} timer1 - 第一个时间戳，默认为当前时间
    * @param {Date} timer2 - 第二个时间戳，默认为当前时间
    * @param {QUnitType | OpUnitType} - 比较单位，默认为'minute'
    * @returns {boolean} - 返回指定单位中两个日期时间之间的差异
    * @example
    * ```ts
    * TransformTimeUtils.compareTimerMinute()
    * ```
    */
    static compareTimerMinute(timer1?: Date, timer2?: Date, unit?: dayjs.OpUnitType | dayjs.OpUnitType): number;
}

export { TransformTimeUtils };
