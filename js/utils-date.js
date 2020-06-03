/**
 * 获取指定日期为一年中第几天;
 * @param {*} date
 */
const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
/**
 * 根据指定日期字符串提取年月日;
 * @param {*} date
 */
const extractDate = (date) => {
  const res = date.match(/\d{4}-\d{2}-\d{2}/)
  return res ? res[0] : date
}
/**
 * 根据指定日期字符串提取时分秒;
 * @param {*} date
 */
const extractTime = (date) => {
  const res = date.match(/\d{2}:\d{2}:\d{2}/)
  return res ? res[0] : date
}
/**
 * 根据给定正则格式化指定日期字符串;
 * @param {*} date
 * @param {*} regex
 */
const formatDate = (date, regex = /\d{4}-\d{2}-\d{2}(T)\d{2}:\d{2}:\d{2}/) => {
  const res = date.match(regex)
  return res ? res[0].replace(/T/, ' ') : date
}
/**
 * 毫秒时间格式化显示;
 * @param {*} ms
 */
const formatDura = (ms) => {
  if (ms < 0) ms = -ms
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  }
  return Object.entries(time)
    .filter(([key, val]) => val !== 0)
    .map(([key, val]) => `${val} ${key}${val > 1 ? 's' : ''}`)
    .join(', ')
}
/**
 * 获取两个指定日期相差天数;
 * @param {*} dateStart
 * @param {*} dateEnd
 */
const getDaysDiff = (dateStart, dateEnd) => (dateEnd - dateStart) / (1000 * 3600 * 24)
/**
 * 将小时转换为十二小时显示格式;
 * @param {*} num
 */
const getMeridiemSuffix = (num) =>
  num === 0 || num === 24 ? 12 + 'am' : num === 12 ? 12 + 'pm' : num < 12 ? (num % 12) + 'am' : (num % 12) + 'pm'
/**
 * 根据指定日期获取HH:MM:SS格式时间;
 * @param {*} date
 */
const getTimeString = (date) => date.toTimeString().slice(0, 8)
/**
 * 判断日期A是否晚于日期B;
 * @param {*} dateA
 * @param {*} dateB
 */
const isAfterDate = (dateA, dateB) => dateA > dateB
/**
 * 判断日期A是否早于日期B;
 * @param {*} dateA
 * @param {*} dateB
 */
const isBeforeDate = (dateA, dateB) => dateA < dateB
/**
 * 判断指定年份是否为闰年;
 * @param {*} year
 */
const isLeapYear = (year) => new Date(year, 1, 29).getMonth() === 1
/**
 * 判断两个日期是否相同;
 * @param {*} dateA
 * @param {*} dateB
 */
const isSameDate = (dateA, dateB) => dateA.toISOString() === dateB.toISOString()
/**
 * 判断指定日期是否为工作日;
 * @param {*} date
 */
const isWeekday = (date = new Date()) => {
  return date.getDay() % 6 !== 0
}
/**
 * 获取给定日期中最大日期;
 * @param {*} dates
 */
const maxDate = (dates) => new Date(Math.max(...dates))
/**
 * 获取给定日期中最小日期;
 * @param {*} dates
 */
const minDate = (dates) => new Date(Math.min(...dates))
/**
 * 获取明天的日期;
 */
const tomorrow = () => {
  let date = new Date()
  date.setDate(date.getDate() + 1)
  return date.toISOString().split('T')[0]
}
/**
 * 获取昨天的日期;
 */
const yesterday = () => {
  let date = new Date()
  date.setDate(date.getDate() - 1)
  return date.toISOString().split('T')[0]
}

export {
  dayOfYear,
  extractDate,
  extractTime,
  formatDate,
  formatDura,
  getDaysDiff,
  getMeridiemSuffix,
  getTimeString,
  isAfterDate,
  isBeforeDate,
  isLeapYear,
  isSameDate,
  isWeekday,
  maxDate,
  minDate,
  tomorrow,
  yesterday,
}
