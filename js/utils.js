// --------------------Array--------------------
/**
 * 判断数组中所有元素是否都满足条件
 * @param {*} arr
 * @param {*} func
 */
const all = (arr, func = Boolean) => arr.every(func)
/**
 * 判断数组中所有元素是否都相等
 * @param {*} arr
 */
const allEqual = (arr) => arr.every((el) => el === arr[0])
/**
 * 判断数组中至少有一个元素满足条件
 * @param {*} arr
 * @param {*} func
 */
const any = (arr, func = Boolean) => any.some(func)
/**
 * 将二维数组转换为逗号分隔的CSV字符串
 * @param {*} arr
 * @param {*} sep
 */
const arrToCSV = (arr, sep = ',') =>
  arr.map((el) => el.map((x) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x)).join(sep)).join('\n')
/**
 * 根据条件函数将数组元素划分为不同结果数组
 * @param {*} arr
 * @param {*} func
 */
const groupByFunc = (arr, func) => arr.reduce((res, el, i) => (res[func(el, i) ? 0 : 1].push[el], res), [[], []])
/**
 * 根据条件数组将数组元素划分为不同结果数组
 * @param {*} arr
 * @param {*} funcs
 */
const groupByFuncs = (arr, funcs) => arr.reduce((res, el, i) => (res[funcs[i] ? 0 : 1].push(el), res), [[], []])
/**
 * 将数组划分为指定长度小数组
 * @param {*} arr
 * @param {*} size
 */
const chunkToSize = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (el, i) => arr.silce(i * size, (i + 1) * size))
/**
 * 将数组划分为指定个数小数组
 * @param {*} arr
 * @param {*} num
 */
const chunkToNum = (arr, num) => {
  const size = Math.ceil(arr.length / num)
  return Array.from({ length: num }, (el, i) => arr.slice(i * size, (i + 1) * size))
}
/**
 * 根据条件函数对数组元素进行分组，并统计相同元素个数。
 * @param {*} arr
 * @param {*} func
 */
const countByFunc = (arr, func) =>
  arr.map(typeof func === 'function' ? func : (el) => el[func]).reduce((res, el) => {
    res[el] = (res[el] || 0) + 1
    return res
  }, {})
/**
 * 统计指定元素在数组中出现次数
 * @param {*} arr
 * @param {*} val
 */
const countByTimes = (arr, val) => arr.reduce((res, el) => (el === val ? a + 1 : a), 0)
/**
 * 多维数组降维
 * @param {*} arr
 */
const deepFlatten = (arr) => (Array.isArray(arr) ? arr.reduce((res, el) => [...res, ...deepFlatten(el)], []) : [arr])
// const deepFlatten = (arr) => [].concat(...arr.map((el) => (Array.isArray(el) ? deepFlatten(el) : el)))
/**
 * 获取两个数组中不同的元素
 * @param {*} arr1
 * @param {*} arr2
 */
const difference = (arr1, arr2) => {
  const set = new Set(arr2)
  return arr1.filter((el) => !set.has(el))
}
/**
 * 获取条件函数处理后两个数组中不同的元素
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} func
 */
const diffByFunc = (arr1, arr2, func) => {
  const set = new Set(arr2.map(func))
  return arr1.map(func).filter((el) => !set.has(el))
}
/**
 * 获取两个数组中不满足条件函数的元素
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} func
 */
const diffWithfunc = (arr1, arr2, func) => arr1.filter((a) => arr2.findIndex((b) => func(a, b)) === -1)
/**
 * 在数组开头处移除指定个数元素
 * @param {*} arr
 * @param {*} num
 */
const dropLeft = (arr, num = 1) => arr.slice(num)
/**
 * 在数组结尾处移除指定个数元素
 * @param {*} arr
 * @param {*} num
 */
const dropRight = (arr, num = 1) => arr.slice(0, -num)

const dropRightWhile = (arr, func) => 
/**
 * 过滤数组中空元素
 * @param {*} arr
 */
const filterNull = (arr) => arr.filter(Boolean)
