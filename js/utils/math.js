/**
 * 根据给定数字返回部分和数组;
 * @param  {...any} nums
 */
const accumulate = (...nums) => nums.reduce((acc, num) => [...acc, num + +acc.slice(-1)], [])
/**
 * 判断两个数字是否近似相等;
 * @param {*} num1
 * @param {*} num2
 * @param {*} epsilon
 */
const approximateEqual = (num1, num2, epsilon = 0.001) => Math.abs(num1 - num2) < epsilon
/**
 * 获取给定数字的平均值;
 * @param  {...any} nums
 */
const average = (...nums) => nums.reduce((acc, num) => acc + num, 0) / nums.length
/**
 * 根据指定函数处理数组元素并返回平均值;
 * @param {*} arr
 * @param {*} func
 */
const averageByFunc = (arr, func) =>
  arr.map(typeof func === 'function' ? func : (el) => el[func]).reduce((acc, num) => acc + num, 0) / arr.length
/**
 * 计算两个整数的二项式系数;
 * @param {*} a
 * @param {*} b
 */
const binomialCoefficient = (a, b) => {
  if (Number.isNaN(a) || Number.isNaN(b)) return NaN
  if (b < 0 || b > a) return 0
  if (b === 0 || b === a) return 1
  if (b === 1 || b === a - 1) return a
  if (a - b < b) b = a - b
  let res = a
  for (let i = 2; i <= b; i++) res *= (a - i + 1) / i
  return Math.round(res)
}
/**
 * 将摄氏温度转换为华氏温度;
 * @param {*} temp
 */
const celsiusToFahrenheit = (temp) => 1.8 * temp + 32
/**
 * 根据边界值范围获取最接近的数字;
 * @param {*} num
 * @param {*} a
 * @param {*} b
 */
const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b))
/**
 * 将角度转换为弧度;
 * @param {*} deg
 */
const degreeToRad = (deg) => (deg * Math.PI) / 180.0
/**
 * 将数字转换为数字数组;
 * @param {*} num
 */
const digitize = (num) => [...`${num}`].map((i) => parseInt(i))
/**
 * 计算两点间距离;
 * @param {*} x1
 * @param {*} y1
 * @param {*} x2
 * @param {*} y2
 */
const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1)
/**
 * 计算数字的阶乘;
 * @param {*} num
 */
const factorial = (num) =>
  num < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!')
      })()
    : num <= 1
    ? 1
    : num * factorial(num - 1)
/**
 * 将华氏温度转换为摄氏温度;
 * @param {*} temp
 */
const fahrenheitToCelsius = (temp) => ((temp - 32) * 5) / 9
/**
 * 根据指定长度生成斐波那契序列数组;
 * @param {*} len
 */
const fibonacci = (len) =>
  Array.from({ length: len }).reduce((acc, num, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), [])
/**
 * 根据指定范围数字和两项之比创建数组;
 * @param {*} end
 * @param {*} start
 * @param {*} step
 */
const geometricProgression = (end, start = 1, step = 2) =>
  Array.from({ length: Math.floor(Math.log(end / start) / Math.log(step)) + 1 }).map((_, i) => start * step ** i)
/**
 * 使用ELO评分系统计算两个或多个对手之间的新评分;
 * @param {*} param0
 * @param {*} factor
 * @param {*} selfRating
 */
const getELO = ([...ratings], factor = 32, selfRating) => {
  const [a, b] = ratings
  const expectedScore = (self, opponent) => 1 / (1 + 10 ** ((opponent - self) / 400))
  const newRating = (rating, i) => (selfRating || rating) + factor * (i - expectedScore(i ? a : b, i ? b : a))
  if (ratings.length === 2) return [newRating(a, 1), newRating(b, 0)]

  for (let i = 0, len = ratings.length; i < len; i++) {
    let j = i
    while (j < len - 1) {
      j++
      ;[ratings[i], ratings[j]] = getELO([ratings[i], ratings[j]], factor)
    }
  }
  return ratings
}
/**
 * 计算多个数字的最大公约数;
 * @param  {...any} arr
 */
const getGCD = (...arr) => {
  const gcd = (a, b) => (!b ? a : getGCD(b, a % b))
  return [...arr].reduce((a, b) => gcd(a, b))
}
/**
 * 获取多个数字的最小公倍数;
 * @param  {...any} arr
 */
const getLCM = (...arr) => {
  const gcd = (a, b) => (!b ? a : gcd(b, a % b))
  const lcm = (a, b) => (a * b) / gcd(a, b)
  return [...arr].reduce((a, b) => lcm(a, b))
}
/**
 * 计算两个值之间的汉明距离;
 * @param {*} num1
 * @param {*} num2
 */
const hammingDistance = (num1, num2) => ((num1 ^ num2).toString(2).match(/1/g) || '').length
/**
 * 判断数字是否在给定范围内;
 * @param {*} num
 * @param {*} start
 * @param {*} end
 */
const inRange = (num, start, end = null) => {
  if (end && start > end) [end, start] = [start, end]
  return end == null ? num >= 0 && num < start : num >= start && num < end
}
/**
 * 判断被除数能否被除数整除;
 * @param {*} dividend
 * @param {*} divisor
 */
const isDivisible = (dividend, divisor) => dividend % divisor === 0
/**
 * 判断数字是否为偶数;
 * @param {*} num
 */
const isEven = (num) => num % 2 === 0
/**
 * 判断数字是否为-0;
 * @param {*} num
 */
const isNegativeZero = (num) => num === 0 && 1 / num === -Infinity
/**
 * 判断数字是否为奇数;
 * @param {*} num
 */
const isOdd = (num) => num % 2 === 1
/**
 * 判断数字是否为2的次幂;
 * @param {*} num
 */
const isPowerOfTwo = (num) => !!num && (num & (num - 1)) == 0
/**
 * 判断数字是否为质数;
 * @param {*} num
 */
const isPrime = (num) => {
  const boundary = Math.floor(Math.sqrt(num))
  for (var i = 2; i <= boundary; i++) if (num % i === 0) return false
  return num >= 2
}
/**
 * Luhn算法用于验证各种标识号;
 * @param {*} num
 */
const luhnCheck = (num) => {
  let arr = (num + '')
    .split('')
    .reverse()
    .map((x) => parseInt(x))
  let lastDigit = arr.splice(0, 1)[0]
  let sum = arr.reduce((acc, num, i) => (i % 2 !== 0 ? acc + num : acc + ((num * 2) % 9) || 9), 0)
  sum += lastDigit
  return sum % 10 === 0
}
/**
 * 根据指定范围映射数字;
 * @param {*} num
 * @param {*} inMin
 * @param {*} inMax
 * @param {*} outMin
 * @param {*} outMax
 */
const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
/**
 * 根据指定函数处理数组并返回最大值;
 * @param {*} arr
 * @param {*} func
 */
const maxByFunc = (arr, func) => Math.max(...arr.map(typeof func === 'function' ? func : (el) => el[func]))
/**
 * 获取数组中数字的中位数;
 * @param {*} arr
 */
const median = (arr) => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b)
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
}
/**
 * 获取两点之间的中点;
 * @param {*} param0
 * @param {*} param1
 */
const midpoint = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2]
/**
 * 根据指定函数处理数组并返回最小值;
 * @param {*} arr
 * @param {*} func
 */
const minByFunc = (arr, func) => Math.min(...arr.map(typeof func === 'function' ? func : (el) => el[func]))
/**
 * 根据百分比公式计算数字在给定数组中位置;
 * @param {*} arr
 * @param {*} val
 */
const percentile = (arr, val) =>
  (100 * arr.reduce((acc, num) => acc + (num < val ? 1 : 0) + (num === val ? 0.5 : 0), 0)) / arr.length
/**
 * 获取给定数字数组的幂集;
 * @param {*} arr
 */
const powerset = (arr) => arr.reduce((acc, num) => acc.concat(acc.map((el) => [num].concat(el))), [[]])
/**
 * 通过埃拉托色尼筛选法生成给定数字以内的质数;
 * @param {*} num
 */
const primes = (num) => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2)
  numsTillSqroot.forEach((x) => (arr = arr.filter((y) => y % x !== 0 || y === x)))
  return arr
}
/**
 * 将弧度转换为角度;
 * @param {*} rad
 */
const radToDegree = (rad) => (rad * 180.0) / Math.PI
/**
 * 根据给定范围随机生成指定长度数组;
 * @param {*} min
 * @param {*} max
 * @param {*} len
 */
const randomArrInRange = (min, max, len = 1) =>
  Array.from({ length: len }, () => Math.floor(Math.random() * (max - min + 1)) + min)
/**
 * 随机生成十六进制颜色代码;
 */
const randomHexColor = () => {
  let num = (Math.random() * 0xfffff * 1000000).toString(16)
  return '#' + nnum.slice(0, 6)
}
/**
 * 根据给定范围随机生成整数;
 * @param {*} min
 * @param {*} max
 */
const randomIntInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
/**
 * 根据给定范围随机生成数字;
 * @param {*} min
 * @param {*} max
 */
const randomNumInRange = (min, max) => Math.random() * (max - min) + min
/**
 * 将数字四舍五入至指定位数;
 * @param {*} num
 * @param {*} decimal
 */
const round = (num, decimal = 0) => Number(`${Math.round(`${num}e${decimal}`)}e-${decimal}`)
/**
 * 将字符串哈希为整数;
 * @param {*} str
 */
const sdbm = (str) => {
  let arr = str.split('')
  return arr.reduce(
    (hashCode, currentVal) => (hashCode = currentVal.charCodeAt(0) + (hashCode << 6) + (hashCode << 16) - hashCode),
    0
  )
}
/**
 * 获取数字数组的标准差;
 * @param {*} arr
 * @param {*} use
 */
const standardDeviation = (arr, use = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length
  return Math.sqrt(
    arr.reduce((acc, val) => acc.concat((val - mean) ** 2), []).reduce((acc, val) => acc + val, 0) /
      (arr.length - (use ? 0 : 1))
  )
}
/**
 * 数组中数字计算求和;
 * @param  {...any} arr
 */
const sum = (...arr) => [...arr].reduce((acc, num) => acc + num, 0)
/**
 * 根据指定函数处理数组中数字并计算求和;
 * @param {*} arr
 * @param {*} func
 */
const sumByFunc = (arr, func) =>
  arr.map(typeof func === 'function' ? func : (el) => el[func]).reduce((acc, num) => acc + num, 0)
/**
 * 根据给定数字范围获取所有数字N次幂的和;
 * @param {*} end
 * @param {*} power
 * @param {*} start
 */
const sumByPower = (end, power = 2, start = 1) =>
  Array(end + 1 - start)
    .fill(0)
    .map((_, i) => (i + start) ** power)
    .reduce((a, b) => a + b, 0)
/**
 * 根据给定数字返回指定货币格式;
 * @param {*} num
 * @param {*} curr
 * @param {*} lang
 */
const toCurrency = (num, curr, lang = undefined) =>
  Intl.NumberFormat(lang, { style: 'currency', currency: curr }).format(num)
/**
 * 将数字转换为小数点格式字符串;
 * @param {*} num
 */
const toDecimalMark = (num) => num.toLocaleString('en-US')
/**
 * 在数字后添加序数后缀;
 * @param {*} num
 */
const toOrdinalSuffix = (num) => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19]
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3]
}
/**
 * 将数字转换为安全整数;
 * @param {*} num
 */
const toSafeInteger = (num) => Math.round(Math.max(Math.min(num, Number.MAX_SAFE_INTEGER), Number.MIN_SAFE_INTEGER))
/**
 * 判断是否为数字;
 * @param {*} num
 */
const validateNumber = (num) => !isNaN(parseFloat(num)) && isFinite(num) && Number(num) == num
/**
 * 获取两个向量之间角度;
 * @param {*} x
 * @param {*} y
 */
const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0))
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0))
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY))
}
/**
 * 获取两个向量之间距离;
 * @param {*} x
 * @param {*} y
 */
const vectorDistance = (x, y) => Math.sqrt(x.reduce((acc, num, i) => acc + Math.pow(num - y[i], 2), 0))
console.log(vectorDistance([10, 0, 5], [20, 0, 10]));

export {
  accumulate,
  approximateEqual,
  average,
  averageByFunc,
  binomialCoefficient,
  celsiusToFahrenheit,
  clampNumber,
  degreeToRad,
  digitize,
  distance,
  factorial,
  fahrenheitToCelsius,
  fibonacci,
  geometricProgression,
  getELO,
  getGCD,
  getLCM
  hammingDistance,
  inRange,
  isDivisible,
  isEven,
  isNegativeZero,
  isOdd,
  isPowerOfTwo,
  isPrime,
  luhnCheck,
  mapNumRange,
  maxByFunc,
  median,
  midpoint,
  minByFunc,
  percentile,
  powerset,
  primes,
  radToDegree,
  randomArrInRange,
  randomHexColor,
  randomIntInRange,
  randomNumInRange,
  sdbm,
  standardDeviation,
  sum,
  sumByFunc,
  sumByPower,
  toCurrency,
  toDecimalMark,
  toOrdinalSuffix,
  toSafeInteger,
  validateNumber,
  vectorAngle,
  vectorDistance
}
