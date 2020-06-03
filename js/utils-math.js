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
const clampNum = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b))
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
 * 使用ELO评分系统计算两个或多个对手之间的新评分;
 * @param {*} param0
 * @param {*} factor
 * @param {*} selfRating
 */
const elo = ([...ratings], factor = 32, selfRating) => {
  const [a, b] = ratings
  const expectedScore = (self, opponent) => 1 / (1 + 10 ** ((opponent - self) / 400))
  const newRating = (rating, i) => (selfRating || rating) + factor * (i - expectedScore(i ? a : b, i ? b : a))
  if (ratings.length === 2) return [newRating(a, 1), newRating(b, 0)]

  for (let i = 0, len = ratings.length; i < len; i++) {
    let j = i
    while (j < len - 1) {
      j++
      ;[ratings[i], ratings[j]] = elo([ratings[i], ratings[j]], factor)
    }
  }
  return ratings
}
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
 * @param {*} num
 */
const fibonacci = (num) =>
  Array.from({ length: num }).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), [])
/**
 * 计算多个数字的最大公约数;
 * @param  {...any} arr
 */
const gcd = (...arr) => {
  const _gcd = (a, b) => (!b ? a : gcd(b, a % b))
  return [...arr].reduce((a, b) => _gcd(a, b))
}
/**
 * 根据指定范围数字和两项之比创建数组;
 * @param {*} end
 * @param {*} start
 * @param {*} step
 */
const geometricProgression = (end, start = 1, step = 2) =>
  Array.from({ length: Math.floor(Math.log(end / start) / Math.log(step)) + 1 }).map((_, i) => start * step ** i)
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
 * 获取多个数字的最小公倍数;
 * @param  {...any} arr
 */
const lcm = (...arr) => {
  const gcd = (a, b) => (!b ? a : gcd(b, a % b))
  const _lcm = (a, b) => (a * b) / gcd(a, b)
  return [...arr].reduce((a, b) => _lcm(a, b))
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
  let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0)
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
const maxByFunc = (arr, func) => Math.max(...arr.map(typeof func === 'function' ? func : (val) => val[func]))
