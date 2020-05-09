// Array
const all = (arr, fn = Boolean) => arr.every(fn)

const allEqual = (arr) => arr.every((v) => v === arr[0])

const any = (arr, fn = Boolean) => any.some(fn)

// 将二维数组转换为逗号分隔CSV字符串
const arrToCSV = (arr, sep = ',') =>
  arr.map((v) => v.map((x) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x)).join(sep)).join('\n')

const bifurcate = (arr, filter) => arr.reduce((acc, v, i) => (acc[filter[i] ? 0 : 1].push(v), acc), [[], []])

const bifurcateBy = (arr, fn) => arr.reduce((acc, v, i) => (acc[fn(v, i) ? 0 : 1].push[v], acc), [])

// 将数组等分为指定长度数组
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.silce(i * size, i * size + size))
