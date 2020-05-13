// --------------------Array--------------------
/**
 * 判断数组中所有元素是否都满足条件;
 * @param {*} arr
 * @param {*} func
 */
const all = (arr, func = Boolean) => arr.every(func)
/**
 * 判断数组中所有元素是否都相等;
 * @param {*} arr
 */
const allEqual = (arr) => arr.every((el) => el === arr[0])
/**
 * 判断数组中至少有一个元素满足条件;
 * @param {*} arr
 * @param {*} func
 */
const any = (arr, func = Boolean) => any.some(func)
/**
 * 将二维数组转换为用指定分隔符拼接的CSV字符串;
 * @param {*} arr
 * @param {*} sep
 */
const arrToCSV = (arr, sep = ',') =>
  arr.map((el) => el.map((x) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x)).join(sep)).join('\n')
/**
 * 将数组划分为指定长度小数组;
 * @param {*} arr
 * @param {*} size
 */
const chunkToSize = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (el, i) => arr.silce(i * size, (i + 1) * size))
/**
 * 将数组划分为指定个数小数组;
 * @param {*} arr
 * @param {*} num
 */
const chunkToNum = (arr, num) => {
  const size = Math.ceil(arr.length / num)
  return Array.from({ length: num }, (el, i) => arr.slice(i * size, (i + 1) * size))
}
/**
 * 根据指定函数对数组元素进行分组,并统计相同元素个数;
 * @param {*} arr
 * @param {*} func
 */
const countByFunc = (arr, func) =>
  arr.map(typeof func === 'function' ? func : (el) => el[func]).reduce((res, el) => {
    res[el] = (res[el] || 0) + 1
    return res
  }, {})
/**
 * 统计指定元素在数组中出现次数;
 * @param {*} arr
 * @param {*} val
 */
const countByTimes = (arr, val) => arr.reduce((res, el) => (el === val ? a + 1 : a), 0)
/**
 * 获取两个数组中不同的元素;
 * @param {*} arr1
 * @param {*} arr2
 */
const difference = (arr1, arr2) => {
  const set = new Set(arr2)
  const arr = [...new Set(arr1)]
  return arr.filter((el) => !set.has(el))
}
/**
 * 获取指定函数处理后两个数组中不同的元素;
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} func
 */
const diffByFunc = (arr1, arr2, func) => {
  const set = new Set(arr2.map(func))
  return arr1.map(func).filter((el) => !set.has(el))
}
/**
 * 获取两个数组中不满足条件函数的元素;
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} func
 */
const diffWithFunc = (arr1, arr2, func) => arr1.filter((a) => arr2.findIndex((b) => func(a, b)) === -1)
/**
 * 在数组开头处移除指定个数元素;
 * @param {*} arr
 * @param {*} num
 */
const dropLeft = (arr, num = 1) => arr.slice(num)
/**
 * 在数组结尾处移除指定个数元素;
 * @param {*} arr
 * @param {*} num
 */
const dropRight = (arr, num = 1) => arr.slice(0, -num)
/**
 * 从数组开头处移除元素,直到满足条件函数时返回其余元素;
 * @param {*} arr
 * @param {*} func
 */
const dropLeftWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr.shift()
  return arr
}
/**
 * 从数组结尾处移除元素,直到满足条件函数时返回其余元素;
 * @param {*} arr
 * @param {*} func
 */
const dropRightWhile = (arr, func) => {
  let right = arr.length
  while (right-- && !func(arr[right])) return arr.slice(0, right + 1)
}
/**
 * 获取数组中指定数字倍数位置的元素;
 * @param {*} arr
 * @param {*} nth
 */
const everyNth = (arr, nth) => arr.filter((el, i) => i % nth === nth - 1)
/**
 * 筛选出数组中非唯一的元素;
 * @param {*} arr
 */
const filterNonUniqueEl = (arr) => arr.filter((el) => arr.indexOf(el) === arr.lastIndexOf(el))
/**
 * 根据条件函数筛选出数组中非唯一的元素;
 * @param {*} arr
 * @param {*} func
 */
const filterNonUniqueByFunc = (arr, func) => arr.filter((a, i) => arr.every((b, j) => (i === j) === func(a, b, i, j)))
/**
 * 过滤数组中空元素;
 * @param {*} arr
 */
const filterNull = (arr) => arr.filter(Boolean)

/**
 * 获取满足条件函数的最后一个元素;
 * @param {*} arr
 * @param {*} func
 */
const findLastEl = (arr, func) => arr.filter(func).pop()
/**
 * 获取满足条件函数的最后一个元素索引
 * @param {*} arr
 * @param {*} func
 */
const findLastIndex = (arr, func) => {
  const res = arr
    .map((el, i) => [i, el])
    .filter(([i, el]) => func(el, i, arr))
    .pop()
  return res ? res[0] : -1
}

/**
 * 将数组深度降维至一维;
 * @param {*} arr
 */
const flattenDeep = (arr) => (Array.isArray(arr) ? arr.reduce((res, el) => [...res, ...flattenDeep(el)], []) : [arr])
// const flattenDeep = (arr) => [].concat(...arr.map((el) => (Array.isArray(el) ? flattenDeep(el) : el)))
/**
 * 将数组降维至指定维度;
 * @param {*} arr
 * @param {*} depth
 */
const flattenDepth = (arr, depth = 1) =>
  arr.reduce((res, el) => res.concat(depth > 1 && Array.isArray(el) ? flattenDepth(el, --depth) : el), [])
/**
 * 数组元素倒序依次执行指定函数;
 * @param {*} arr
 * @param {*} func
 */
const forEachRight = (arr, func) => [...arr].reverse().forEach(func)
/**
 * 统计数组中相同元素个数;
 * @param {*} arr
 */
const frequency = (arr) =>
  arr.reduce((res, el) => {
    res[el] = res[el] ? ++res[el] : 1
    return res
  }, {})
/**
 * 根据指定函数对数组元素进行分组,返回分组对象;
 * @param {*} arr
 * @param {*} func
 */
const groupBy = (arr, func) =>
  arr.map(typeof func === 'function' ? func : (el) => el[func]).reduce((res, el, i) => {
    res[el] = (res[el] || []).push(arr[i])
    return res
  }, {})
/**
 * 根据指定函数对数组元素进行分组,返回不同数组;
 * @param {*} arr
 * @param {*} func
 */
const groupByFunc = (arr, func) => arr.reduce((res, el, i) => (res[func(el, i) ? 0 : 1].push[el], res), [[], []])
/**
 * 根据函数数组中对应函数对数组元素进行分组,返回不同数组;
 * @param {*} arr
 * @param {*} funcs
 */
const groupByFuncs = (arr, funcs) => arr.reduce((res, el, i) => (res[funcs[i] ? 0 : 1].push(el), res), [[], []])
/**
 * 判断数组A中是否包含数组B中所有元素;
 * @param {*} arr1
 * @param {*} arr2
 */
const includesAll = (arr1, arr2) => arr2.every((el) => arr1.includes(el))
/**
 * 判断数组A中是否包含数组B中至少一个元素;
 * @param {*} arr1
 * @param {*} arr2
 */
const includesAny = (arr1, arr2) => arr2.some((el) => arr1.includes(el))
/**
 * 获取指定元素在数组中所有索引;
 * @param {*} arr
 * @param {*} val
 */
const indexOfAll = (arr, val) => arr.reduce((res, el, i) => (el === val ? [...res, i] : res), [])
/**
 * 根据指定维度和值创建二维数组;
 * @param {*} w
 * @param {*} h
 * @param {*} val
 */
const init2DArr = (w, h, val = null) => Array.from({ length: h }, () => Array.from({ length: w }).fill(val))
/**
 * 根据指定维度和值创建多维数组;
 * @param {*} val
 * @param  {...any} args
 */
const initNDArr = (val, ...args) =>
  args.length === 0 ? val : Array.from({ length: args[0] }, () => initNDArr(val, ...args.slice(1)))

/**
 * 根据指定范围值和间隔初始化数组;
 * @param {*} end
 * @param {*} start
 * @param {*} step
 */
const initArrWithRange = (end, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end - start + 1) / step) }, (el, i) => i * step + start)
/**
 * 根据指定长度和值初始化数组;
 * @param {*} len
 * @param {*} val
 */
const initArrWithVal = (len, val = 0) => Array(len).fill(val)
/**
 * 获取两个数组中相同的元素;
 * @param {*} arr1
 * @param {*} arr2
 */
const intersection = (arr1, arr2) => {
  const set = new Set(arr2)
  const arr = [...new Set(arr1)]
  return arr.filter((el) => set.has(el))
}
/**
 * 获取指定函数处理后两个数组中相同的元素;
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} func
 */
const intersectByFunc = (arr1, arr2, func) => {
  const set = new Set(arr2.map(func))
  return arr1.map(func).filter((el) => set.has(el))
}
/**
 * 获取两个数组中满足条件函数的元素
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} func
 */
const intersectWithFunc = (arr1, arr2, func) => arr1.filter((a) => arr2.findIndex((b) => func(a, b)) !== -1)
/**
 * 判断数组A是否包含数组B中所有元素
 * @param {*} arr1
 * @param {*} arr2
 */
const isContainedIn = (arr1, arr2) => {
  const set = new Set(arr1)
  for (const v of set) {
    if (!arr2.some((b) => b === v) || arr1.filter((a) => a === v).length > arr2.filter((b) => b === v).length)
      return false
  }
  return true
}
/**
 * 不考虑顺序,判断两个数组中元素是否相同;
 * @param {*} arr1
 * @param {*} arr2
 */
const isSameWith = (arr1, arr2) => {
  const set = new Set([...arr1, ...arr2])
  for (const v of set) {
    if (arr1.filter((a) => a === v).length !== arr2.filter((b) => b === v).length) return false
  }
  return true
}
/**
 * 判断数组元素排序方式,升序返回1,降序返回-1,否则返回0;
 * @param {*} arr
 */
const isSorted = (arr) => {
  let direction = arr[1] - arr[0]
  for (let [i, el] of arr.entries()) {
    if (i > 0) direction = !direction ? arr[i] - arr[i - 1] : direction
    if (i === arr.length - 1) return !direction ? 0 : direction / Math.abs(direction)
    else if ((el - arr[i + 1]) * direction > 0) return 0
  }
}
/**
 * 将对象数组转换为用指定分隔符拼接的CSV字符串
 * @param {*} arr
 * @param {*} cols
 * @param {*} sep
 */
const jsonToCSV = (arr, cols, sep = ',') =>
  [
    cols.join(sep),
    ...arr.map((el) => cols.reduce((res, key) => `${res}${!res.length ? '' : sep}"${!el[key] ? '' : el[key]}"`, '')),
  ].join('\n')
