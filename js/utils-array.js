/**
 * 判断数组中所有元素是否都相等;
 * @param {*} arr
 */
const allEqual = (arr) => arr.every((el) => el === arr[0])
/**
 * 判断数组中所有元素是否都满足条件;
 * @param {*} arr
 * @param {*} func
 */
const allTruthy = (arr, func = Boolean) => arr.every(func)
/**
 * 判断数组中至少有一个元素满足条件;
 * @param {*} arr
 * @param {*} func
 */
const anyTruthy = (arr, func = Boolean) => any.some(func)
/**
 * 将二维数组转换为用指定分隔符拼接的CSV字符串;
 * @param {*} arr
 * @param {*} sep
 */
const arrToCSV = (arr, sep = ',') =>
  arr.map((el) => el.map((x) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x)).join(sep)).join('\n')
/**
 * 将指定的可迭代类数组对象转化为以参考值作为key的哈希对象；
 * @param {*} arr
 * @param {*} key
 */
const arrToHash = (arr, key) =>
  Array.prototype.reduce.call(arr, (acc, el, i) => ((acc[!key ? i : el[key]] = el), acc), {})
/**
 * 将数组划分为指定个数子数组;
 * @param {*} arr
 * @param {*} num
 */
const chunkToNum = (arr, num) => {
  const size = Math.ceil(arr.length / num)
  return Array.from({ length: num }, (el, i) => arr.slice(i * size, (i + 1) * size))
}
/**
 * 将数组划分为指定长度子数组;
 * @param {*} arr
 * @param {*} size
 */
const chunkToSize = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (el, i) => arr.silce(i * size, (i + 1) * size))
/**
 * 根据指定函数对数组元素进行分组,并统计相同元素个数;
 * @param {*} arr
 * @param {*} func
 */
const countByFunc = (arr, func) =>
  arr
    .map(typeof func === 'function' ? func : (el) => el[func])
    .reduce((acc, el) => ((acc[el] = (acc[el] || 0) + 1), acc), {})
/**
 * 统计指定元素在数组中出现次数;
 * @param {*} arr
 * @param {*} val
 */
const countByTimes = (arr, val) => arr.reduce((acc, el) => (el === val ? a + 1 : a), 0)
/**
 * 获取两个数组中的差异元素;
 * @param {*} arr1
 * @param {*} arr2
 */
const difference = (arr1, arr2) => {
  const set = new Set(arr2)
  const arr = [...new Set(arr1)]
  return arr.filter((el) => !set.has(el))
}
/**
 * 获取指定函数处理后两个数组中的差异元素;
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} func
 */
const diffByFunc = (arr1, arr2, func) => {
  const set = new Set(arr2.map(func))
  return arr1.map(func).filter((el) => !set.has(el))
}
/**
 * 获取两个数组中不满足比较函数的差异元素;
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} func
 */
const diffWithFunc = (arr1, arr2, func) => arr1.filter((a) => arr2.findIndex((b) => func(a, b)) === -1)
/**
 * 获取两个数组中的对称差异元素;
 * @param {*} arr1
 * @param {*} arr2
 */
const diffSymmetric = (arr1, arr2) => {
  const set1 = new Set(arr1),
    set2 = new Set(arr2)
  return [...arr1.filter((el) => !set2.has(el)), ...arr2.filter((el) => !set1.has(el))]
}
/**
 * 获取指定函数处理后两个数组中的对称差异元素;
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} func
 */
const diffSymmetricByFunc = (arr1, arr2, func) => {
  const set1 = new Set(arr1.map((el) => func(el))),
    set2 = new Set(arr2.map((el) => func(el)))
  return [...arr1.filter((el) => !set2.has(func(el))), ...arr2.filter((el) => !set1.has(func(el)))]
}
/**
 * 获取两个数组中不满足比较函数的对称差异元素;
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} func
 */
const diffSymmetricWithFunc = (arr1, arr2, func) => [
  ...arr1.filter((a) => arr2.findIndex((b) => func(a, b)) === -1),
  ...arr2.filter((a) => arr1.findIndex((b) => func(a, b)) === -1),
]
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
 * 获取数组指定位置元素(可以传负数索引)
 * @param {*} arr
 * @param {*} nth
 */
const elementNth = (arr, nth = 0) => (nth === -1 ? arr.slice(nth) : arr.slice(nth, nth + 1))[0]
/**
 * 获取数组中指定数字倍数位置的元素;
 * @param {*} arr
 * @param {*} nth
 */
const everyNth = (arr, nth) => arr.filter((el, i) => i % nth === nth - 1)
/**
 * 改变原数组过滤掉数组中对应元素;
 * @param {*} arr
 * @param  {...any} args
 */
const filterItems = (arr, ...args) => {
  const items = Array.isArray(args[0]) ? args[0] : args
  const remains = arr.filter((el) => !items.includes(el))
  arr.length = 0
  remains.forEach((el) => arr.push(el))
}
/**
 * 改变原数组过滤掉指定索引处元素;
 * @param {*} arr
 * @param {*} indexs
 */
const filterItemsAtIndex = (arr, indexs) => {
  let removed = []
  const remains = arr
    .map((el, i) => (indexs.includes(i) ? removed.push(el) : el))
    .filter((el, i) => !indexs.includes(i))
  arr.length = 0
  remains.forEach((el) => arr.push(el))
  return removed
}
/**
 * 改变原数组过滤掉指定的数组元素;
 * @param {*} arr
 * @param {*} values
 */
const filterItemsAtValue = (arr, values) => {
  let removed = []
  arr.forEach((el, i) => (values.includes(el) ? removed.push(el) : el))
  const remains = arr.filter((el, i) => !values.includes(el))
  arr.length = 0
  remains.forEach((el) => arr.push(el))
  return removed
}
// let arr = ['a', 'b', 'c', 'a', 'b', 'c']
// filterItemsAtValue(arr, ['a'])
/**
 * 根据指定函数改变原数组过滤掉指定元素;
 * @param {*} arr
 * @param  {...any} args
 */
const filterItemsByFunc = (arr, ...args) => {
  let func = args.length > 1 ? args[args.length - 1] : undefined
  func = typeof func === 'function' ? (args.pop(), func) : undefined
  const items = (Array.isArray(args[0]) ? args[0] : args).map((el) => func(el))
  const remains = arr.filter((el, i) => !items.includes(func(el)))
  arr.length = 0
  remains.forEach((el) => arr.push(el))
}
// let arr = [{ x: 1 }, { x: 2 }, { x: 3 }]
// filterItemsByFunc(arr, [{ x: 1 }, { x: 3 }], (v) => v.x)
/**
 * 根据条件函数过滤数组元素,返回不满足条件的元素;
 * @param {*} arr
 * @param {*} func
 */
const filterItemsRejected = (arr, func) => arr.filter((...args) => !func(...args))
/**
 * 根据指定函数删除不满足条件的数组元素;
 * @param {*} arr
 * @param {*} func
 */
const filterItemsResolved = (arr, func) =>
  Array.isArray(arr) ? arr.filter(func).reduce((acc, el) => (arr.splice(arr.indexOf(el), 1), acc.concat(el)), []) : []
// console.log(filterItemsResolved([1, 2, 3, 4], (n) => n % 2 !== 0))

/**
 * 通过条件函数过滤对象数组以及对象中未指定的key;
 * @param {*} arr
 * @param {*} keys
 * @param {*} func
 */
const filterObjectsByFunc = (arr, keys, func) =>
  arr.filter(func).map((el) => keys.reduce((acc, key) => ((acc[key] = el[key]), acc), {}))
/**
 * 筛选出数组中非唯一的元素;
 * @param {*} arr
 */
const filterNonUniqueItems = (arr) => arr.filter((el) => arr.indexOf(el) === arr.lastIndexOf(el))
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
const findLastItem = (arr, func) => arr.filter(func).pop()
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
const flattenDeep = (arr) => (Array.isArray(arr) ? arr.reduce((acc, el) => [...acc, ...flattenDeep(el)], []) : [arr])
// const flattenDeep = (arr) => [].concat(...arr.map((el) => (Array.isArray(el) ? flattenDeep(el) : el)))
/**
 * 将数组降维至指定维度;
 * @param {*} arr
 * @param {*} depth
 */
const flattenDepth = (arr, depth = 1) =>
  arr.reduce((acc, el) => acc.concat(depth > 1 && Array.isArray(el) ? flattenDepth(el, --depth) : el), [])
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
const frequency = (arr) => arr.reduce((acc, el) => ((acc[el] = acc[el] ? ++acc[el] : 1), acc), {})
/**
 * 根据指定函数对数组元素进行分组,返回分组对象;
 * @param {*} arr
 * @param {*} func
 */
const groupBy = (arr, func) =>
  arr
    .map(typeof func === 'function' ? func : (el) => el[func])
    .reduce((acc, el, i) => ((acc[el] = acc[el] || []).push(arr[i]), acc), {})
// console.log(groupBy(['one', 'two', 'three', 'four', 'five'], 'length'));
/**
 * 根据指定函数对数组元素进行分组,返回不同数组;
 * @param {*} arr
 * @param {*} func
 */
const groupByFunc = (arr, func) => arr.reduce((acc, el, i) => (acc[func(el, i) ? 0 : 1].push[el], acc), [[], []])
/**
 * 根据函数数组中对应函数对数组元素进行分组,返回不同数组;
 * @param {*} arr
 * @param {*} funcs
 */
const groupByFuncs = (arr, funcs) => arr.reduce((acc, el, i) => (acc[funcs[i] ? 0 : 1].push(el), acc), [[], []])
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
const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), [])
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
 * 使用指定分隔符和结束分隔符拼接数组元素;
 * @param {*} arr
 * @param {*} sep
 * @param {*} end
 */
const joinWith = (arr, sep = ',', end = sep) =>
  arr.reduce(
    (acc, el, i) => (i === arr.length - 2 ? acc + el + end : i === arr.length - 1 ? acc + el : acc + el + sep),
    ''
  )
/**
 * 将对象数组转换为用指定分隔符拼接的CSV字符串
 * @param {*} arr
 * @param {*} cols
 * @param {*} sep
 */
const jsonToCSV = (arr, cols, sep = ',') =>
  [
    cols.join(sep),
    ...arr.map((el) => cols.reduce((acc, key) => `${acc}${!acc.length ? '' : sep}"${!el[key] ? '' : el[key]}"`, '')),
  ].join('\n')
/**
 * 获取传入的可迭代对象中最长的对象;
 * @param  {...any} args
 */
const longestItem = (...args) => args.reduce((acc, arg) => (arg.length > acc.length ? arg : acc))
/**
 * 将数组转换为对象,以数组元素为key,函数处理元素的结果为value;
 * @param {*} arr
 * @param {*} func
 */
const mapObject = (arr, func) => arr.reduce((acc, el, i) => ((acc[el] = func(el, i, arr)), acc), {})
// console.log(mapObject([1, 2, 3, 4, 5], (a) => a * a))
/**
 * 获取数组中最大的N个元素;
 * @param {*} arr
 * @param {*} num
 */
const maxItems = (arr, num) => [...arr].sort((a, b) => b - a).slice(0, num)
/**
 * 获取数组中最小的N个元素;
 * @param {*} arr
 * @param {*} num
 */
const minItems = (arr, num) => [...arr].sort((a, b) => a - b).slice(0, num)
/**
 * 获取数组中最多的元素;
 * @param {*} arr
 */
const mostItem = (arr) =>
  Object.entries(arr.reduce((acc, el) => ((acc[el] = acc[el] ? ++acc[el] : 1), acc), {})).reduce(
    (acc, el) => (el[1] >= acc[1] ? el : acc),
    [null, 0]
  )[0]
/**
 * 将指定数量元素移动到数组结尾;
 * @param {*} arr
 * @param {*} offset
 */
const moveToEnd = (arr, offset) => [...arr.slice(offset), ...arr.slice(0, silce)]
/**
 * 判断数组中所有元素是否都不满足条件;
 * @param {*} arr
 * @param {*} func
 */
const noneTruthy = (arr, func = Boolean) => !arr.some(func)
/**
 * 获取数组元素的所有排列方式;
 * @param {*} arr
 */
const permutation = (arr) => {
  if (arr.length <= 2) {
    return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr
  } else {
    return arr.reduce(
      (acc, el, i) => acc.concat(permutation([...arr.slice(0, i), ...arr.slice(i + 1)]).map((v) => [el, ...v])),
      []
    )
  }
}
/**
 * 获取两个数组所有元素可排列出的每一对数组;
 * @param {*} arr1
 * @param {*} arr2
 */
const combination = (arr1, arr2) => arr1.reduce((acc, a) => acc.concat(arr2.map((b) => [a, b])), [])

/**
 * 获取数组中随机一个元素;
 * @param {*} arr
 */
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)]
/**
 * 获取数组中指定个数的随机元素;
 * @param {*} arr
 * @param {*} size
 */
const randomSize = (arr, size = 1) => {
  let len = arr.length
  while (len) {
    const i = Math.floor(Math.random() * len--)
    ;[arr[len], arr[i]] = [arr[i], arr[len]]
  }
  return arr.slice(0, size)
}
/**
 * 通过指定函数和累加器依次处理数组元素,返回处理后的数组;
 * @param {*} arr
 * @param {*} func
 * @param {*} res
 */
const reduceSuccessive = (arr, func, res) =>
  arr.reduce((acc, el, i, arr) => (acc.push(func(acc.slice(-1)[0], el, i, arr)), acc), [res])
/**
 * 根据指定函数的比较规则返回数组中最大值/最小值;
 * @param {*} arr
 * @param {*} func
 */
const reduceWhich = (arr, func = (a, b) => a - b) => arr.reduce((a, b) => (func(a, b) >= 0 ? b : a))
/**
 * 与splice功能一样,但不改变原数组,返回一个新数组;
 * @param {*} arr
 * @param {*} i
 * @param {*} num
 * @param  {...any} args
 */
const shankArr = (arr, i, num, ...args) =>
  arr
    .slice(0, i)
    .concat(args)
    .concat(arr.slice(i + num))
/**
 * 随机打乱数组元素顺序;
 * @param {*} arr
 */
const shuffleArr = (arr) => {
  let len = arr.length
  while (len) {
    const i = Math.floor(Math.random() * len--)
    ;[arr[len], arr[i]] = [arr[i], arr[len]]
  }
  return arr
}
/**
 * 获取两个数组中相同的元素;
 * @param {*} arr1
 * @param {*} arr2
 */
const similarity = (arr1, arr2) => arr1.filter((el) => arr2.includes(el))
/**
 * 保证数组元素排序顺序,获取指定元素应插入数组的索引位置;
 * @param {*} arr
 * @param {*} val
 */
const sortedIndex = (arr, val) => {
  const isDescending = arr[0] > arr[arr.length - 1]
  const index = arr.findIndex((el) => (isDescending ? val >= el : val <= el))
  return index === -1 ? arr.length : index
}
/**
 * 保证数组元素排序顺序,根据指定函数获取指定元素应插入数组的索引位置;
 * @param {*} arr
 * @param {*} val
 * @param {*} func
 */
const sortedIndexByFunc = (arr, val, func) => {
  const isDescending = func(arr[0]) > func(arr[arr.length - 1])
  const item = func(val)
  const index = arr.findIndex((el) => (isDescending ? item >= func(el) : item <= func(el)))
  return index === -1 ? arr.length : index
}
/**
 * 保证数组元素排序顺序,获取指定元素应插入数组的最大索引位置;
 * @param {*} arr
 * @param {*} val
 */
const sortedLastIndex = (arr, val) => {
  const isDescending = arr[0] > arr[arr.length - 1]
  const index = arr.reverse().findIndex((el) => (isDescending ? val <= el : (val) => el))
  return index === -1 ? 0 : arr.length - index
}
/**
 * 保证数组元素排序顺序,根据指定函数获取指定元素应插入数组的最大索引位置;
 * @param {*} arr
 * @param {*} val
 * @param {*} func
 */
const sortedLastIndexByFunc = (arr, val, func) => {
  const isDescending = func(arr[0]) > func(arr[arr.length - 1])
  const item = func(val)
  const index = arr
    .map(func)
    .reverse()
    .findIndex((el) => (isDescending ? item <= el : item >= el))
  return index === -1 ? 0 : arr.length - index
}
/**
 * 对数组进行稳定排序,返回一个新数组;
 * @param {*} arr
 * @param {*} func
 */
const stableSort = (arr, func = () => false) =>
  arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => func(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item)
/**
 * 获取数组开头指定个数元素;
 * @param {*} arr
 * @param {*} num
 */
const takeLeft = (arr, num = 1) => arr.slice(0, num)
/**
 * 获取数组结尾指定个数元素;
 * @param {*} arr
 * @param {*} num
 */
const takeRight = (arr, num = 1) => arr.slice(arr.length - num, arr.length)
/**
 * 从数组开头处移除元素,直到满足条件函数时返回移除元素;
 * @param {*} arr
 * @param {*} func
 */
const takeLeftWhile = (arr, func) => {
  for (const [i, el] of arr.entries()) {
    if (func(el)) return arr.slice(0, i)
  }
  return arr
}
/**
 * 从数组结尾处移除元素,直到满足条件函数时返回移除元素;
 * @param {*} arr
 * @param {*} func
 */
const takeRightWhile = (arr, func) => arr.reduce((acc, el) => (func(el) ? acc : [el, ...acc]), [])
/**
 * 获取两个数组中每个存在的元素;
 * @param {*} arr1
 * @param {*} arr2
 */
const unionArr = (arr1, arr2) => Array.from(new Set([...arr1, ...arr2]))
/**
 * 获取经过指定函数处理后两个数组中每个元素;
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} func
 */
const unionByFunc = (arr1, arr2, func) => {
  const set = new Set(arr1.map(func))
  return Array.from(new Set([...arr1, ...arr2.filter((el) => !set.has(func(el)))]))
}
/**
 * 获取两个数组中每个满足比较函数的元素;
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} func
 */
const unionWithFunc = (arr1, arr2, func) =>
  Array.from(new Set([...arr1, ...arr2.filter((a) => arr1.findIndex((b) => func(a, b)) === -1)]))
// console.log(unionWithFunc([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)))
/**
 * 从头开始获取数组中满足条件函数的唯一元素;
 * @param {*} arr
 * @param {*} func
 */
const uniqueItemsLeft = (arr, func) => arr.reduce((acc, el) => (!acc.some((x) => func(el, x)) && acc.push(el), acc), [])
/**
 * 从尾开始获取数组中满足条件函数的唯一元素;
 * @param {*} arr
 * @param {*} func
 */
const uniqueItemsRight = (arr, func) =>
  arr.reduceRight((acc, el) => (!acc.some((v) => func(el, v)) && acc.push(el), acc), [])
/**
 * 获取两个数组中唯一的对称差异元素;
 * @param {*} arr1
 * @param {*} arr2
 */
const uniqueItemsSymmetric = (arr1, arr2) => [
  ...new Set([...arr1.filter((el) => !arr2.includes(el)), ...arr2.filter((el) => !arr1.includes(el))]),
]
/**
 * 对数组中元素进行解构还原为原数组;
 * @param {*} arr
 */
const unzipArr = (arr) =>
  arr.reduce(
    (acc, el) => (el.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({ length: Math.max(...arr.map((el) => el.length)) }, () => [])
  )
// console.log(unzipArr([['a', 1, true], ['b', 2, false]]));
/**
 * 通过指定函数对数组中元素进行解构重新分组;
 * @param {*} arr
 * @param {*} func
 */
const unzipWith = (arr, func) =>
  arr
    .reduce(
      (acc, el) => (el.forEach((v, i) => acc[i].push(v)), acc),
      Array.from({ length: Math.max(...arr.map((el) => el.length)) }, () => [])
    )
    .map((el) => func(...el))
/**
 * 根据权重值获取数组中对应位置的元素;
 * @param {*} arr
 * @param {*} weights
 */
const weightedItem = (arr, weights) => {
  const random = Math.random()
  const index = weights
    .reduce((acc, el, i) => (i === 0 ? [el] : [...acc, acc[acc.length - 1] + el]), [])
    .findIndex((el, i, s) => random >= (i === 0 ? 0 : s[i - 1]) && random < el)
  return arr[index]
}
/**
 * 根据给定参数项过滤数组元素;
 * @param {*} arr
 * @param  {...any} args
 */
const withoutItem = (arr, ...args) => arr.filter((el) => !args.includes(el))
/**
 * 根据数组元素对应位置对多个数组重新分组;
 * @param  {...any} arr
 */
const zipArr = (...arr) => {
  const maxLen = Math.max(...arr.map((el) => el.length))
  return Array.from({ length: maxLen }, (_, i) => Array.from({ length: arr.length }, (_, j) => arr[j][i]))
}
/**
 * 根据给定的key数组和value数组返回一个关联对象;
 * @param {*} arr1
 * @param {*} arr2
 */
const zipObj = (arr1, arr2) => arr1.reduce((obj, el, i) => ((obj[el] = arr2[i]), obj), {})
/**
 * 通过指定函数处理数组中对应位置元素对多个数组重新分组;
 * @param {*} arr 
 * @param {*} func 
 */
const zipWith = (arr, func) => {
  const maxLen = Math.max(...arr.map((el) => el.length))
  return Array.from({ length: maxLen }, (_, i) => (func ? func(...arr.map((el) => el[i])) : arr.map((el) => el[i])))
}

