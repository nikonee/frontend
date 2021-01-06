/**
 * 获取字符串字节长度;
 * @param {*} str
 */
const byteSize = (str) => new Blob([str]).size
/**
 * 字符串首字母大写;
 * @param {*} param
 * @param {*} lowerRest
 */
const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''))
/**
 * 字母串每个词的首字母大写;
 * @param {*} str
 */
const capitalizeInitial = (str) => str.replace(/\b[a-z]/g, (char) => char.toUpperCase())
/**
 * 压缩字符串中连续空格;
 * @param {*} str
 */
const compactWhitespace = (str) => str.replace(/\s{2,}/g, ' ')
/**
 * 判断字符串中是否有空格符;
 * @param {*} str
 */
const containsWhitespace = (str) => /\s/.test(str)
/**
 * 将逗号分隔字符串转换为二维数组;
 * @param {*} data
 * @param {*} sep
 * @param {*} omit
 */
const csvToArray = (data, sep = ',', omit = false) =>
  data
    .slice(omit ? data.indexOf('\n') + 1 : 0)
    .split('\n')
    .map((v) => v.split(sep))
/**
 * 将逗号分隔字符串转换为对象数组;
 * @param {*} data
 * @param {*} sep
 */
const csvToJSON = (data, sep = ',') => {
  const titles = data.slice(0, data.indexOf('\n')).split(sep)
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map((v) => {
      const values = v.split(sep)
      return titles.reduce((obj, title, index) => ((obj[title] = values[index]), obj), {})
    })
}
/**
 * 字符串首字母小写;
 * @param {*} param
 * @param {*} upperRest
 */
const decapitalize = ([first, ...rest], upperRest = false) =>
  first.toLowerCase() + (upperRest ? rest.join('').toUpperCase() : rest.join(''))
/**
 * 转义HTML字符串;
 * @param {*} str
 */
const escapeHTML = (str) =>
  str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      }[tag] || tag)
  )
/**
 * 将字符串转义为正则表达式;
 * @param {*} str
 */
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
/**
 * 将制表符转换为指定个数空格;
 * @param {*} str
 * @param {*} count
 */
const expandTabs = (str, count) => str.replace(/\t/g, ' '.repeat(count))
/**
 * 将三位颜色代码拓展为六位颜色代码;
 * @param {*} hex
 */
const extendHex = (hex) =>
  '#' +
  hex
    .slice(hex.startsWith('#') ? 1 : 0)
    .split('')
    .map((x) => x + x)
    .join('')
/**
 * 根据指定分隔符转换驼峰式字符串;
 * @param {*} str
 * @param {*} sep
 */
const fromCamelCase = (str, sep = '_') =>
  str
    .replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2')
    .toLowerCase()
/**
 * 将HEX格式颜色值转换为RGB格式;
 * @param {*} hex
 */
const hexToRGB = (hex) => {
  let alpha = false,
    h = hex.slice(hex.startsWith('#') ? 1 : 0)
  if (h.length === 3) h = [...h].map((x) => x + x).join('')
  else if (h.length === 8) alpha = true
  h = parseInt(h, 16)
  return (
    'rgb' +
    (alpha ? 'a' : '') +
    '(' +
    (h >>> (alpha ? 24 : 16)) +
    ', ' +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ', ' +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : '') +
    ')'
  )
}
/**
 * 在每行字符串开头添加缩进符;
 * @param {*} str
 * @param {*} count
 * @param {*} indent
 */
const indentStr = (str, count, indent = ' ') => str.replace(/^/gm, indent.repeat(count))
/**
 * 判断字符串是否为绝对URL;
 * @param {*} str
 */
const isAbsoluteUrl = (str) => /^[a-z][a-z0-9+.-]*:/.test(str)
/**
 * 字符串A是否是字符串B的字母组合;
 * @param {*} str1
 * @param {*} str2
 */
const isAnagram = (str1, str2) => {
  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('')
  return normalize(str1) === normalize(str2)
}
/**
 * 通过指定函数依次处理字符串字符;
 * @param {*} str
 * @param {*} func
 */
const mapStr = (str, func) =>
  str
    .split('')
    .map((c, i) => func(c, i, str))
    .join('')
/**
 * 通过掩码字符替换指定范围字符串;
 * @param {*} str
 * @param {*} num
 * @param {*} mask
 */
const maskStr = (str, num = 4, mask = '*') => `${str}`.slice(-num).padStart(`${str}`.length, mask)
/**
 * 标准化字符串行尾格式;
 * @param {*} str
 * @param {*} normal
 */
const normalizeLineEnd = (str, normal = '\r\n') => str.replace(/\r?\n/g, normal)
/**
 * 将给定URL段组合成标准URL;
 * @param  {...any} args
 */
const normalizeUrl = (...args) =>
  args
    .join('/')
    .replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?')
/**
 * 判断字符串长度在两头填充字符;
 * @param {*} str
 * @param {*} len
 * @param {*} char
 */
const padStr = (str, len, char = ' ') => str.padStart((str.length + len) / 2, char).padEnd(len, char)
/**
 * 判断字符串是否为回文;
 * @param {*} str
 */
const palindrome = (str) => {
  const s = str.toLowerCase().replace(/[\W_]/g, '')
  return s === [...s].reverse().join('')
}
/**
 * 根据给定数字获取单词的单数/复数形式;
 * @param {*} val
 * @param {*} word
 * @param {*} plural
 */
const pluralize = (val, word, plural = word + 's') => {
  const _pluralize = (num, word, plural = word + 's') => ([1, -1].includes(Number(num)) ? word : plural)
  if (typeof val === 'object') return (num, word) => _pluralize(num, word, val[word])
  return _pluralize(val, word, plural)
}
/**
 * 将字节单位值转换为可读字符串;
 * @param {*} num
 * @param {*} precision
 * @param {*} addSpace
 */
const prettyBytes = (num, precision = 3, addSpace = true) => {
  const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  if (Math.abs(num) < 1) return num + (addSpace ? ' ' : '') + UNITS[0]
  const exponent = Math.min(Math.floor(Math.log10(num < 0 ? -num : num) / 3), UNITS.length - 1)
  const n = Number(((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision))
  return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + UNITS[exponent]
}
/**
 * 去除不可打印的ASCII字符;
 * @param {*} str
 */
const removeNonASCII = (str) => str.replace(/[^\x20-\x7E]/g, '')
/**
 * 反转字符串;
 * @param {*} str
 */
const reverseStr = (str) => [...str].reverse().join('')
/**
 * 将RGB格式颜色值转换为HEX格式;
 * @param {*} r
 * @param {*} g
 * @param {*} b
 */
const rgbToHEX = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')
/**
 * 对字符串中字符进行排序;
 * @param {*} str
 */
const sortChar = (str) => [...str].sort((a, b) => a.localeCompare(b)).join('')
/**
 * 将多行字符串拆分为数组;
 * @param {*} str
 */
const splitLines = (str) => str.split(/\r?\n/)
/**
 * 获取字符串中字符的所有排列;
 * @param {*} str
 */
const stringPermutations = (str) => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str]
  return str
    .split('')
    .reduce(
      (acc, letter, i) => acc.concat(stringPermutations(str.slice(0, i) + str.slice(i + 1)).map((c) => letter + c)),
      []
    )
}
/**
 * 去除字符串中所有HTML标签;
 * @param {*} str
 */
const stripHTMLTags = (str) => str.replace(/<[^>]*>/g, '')
/**
 * 将字符串转换为驼峰格式;
 * @param {*} str
 */
const toCamelCase = (str) => {
  let s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('')
  return s.slice(0, 1).toLowerCase() + s.slice(1)
}
/**
 * 将字符串转换为KEBAB格式;
 * @param {*} str
 */
const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-')
/**
 * 将字符串转换为蛇形格式;
 * @param {*} str
 */
const toSnakeCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('_')
/**
 * 将字符串转换为标题格式;
 * @param {*} str
 */
const toTitleCase = (str) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ')
/**
 * 将字符串转换为单词数组;
 * @param {*} str
 * @param {*} pattern
 */
const toWords = (str, pattern = /[^a-zA-Z-]+/) => str.split(pattern).filter(Boolean)
/**
 * 根据指定长度截断字符串;
 * @param {*} str
 * @param {*} num
 */
const truncateStr = (str, num) => (str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str)
/**
 * 反转义HTML字符串;
 * @param {*} str
 */
const unescapeHTML = (str) =>
  str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    (tag) =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"',
      }[tag] || tag)
  )
/**
 * 判断字符串是YES还是NO;
 * @param {*} str
 * @param {*} def
 */
const yesOrNo = (str, def = false) => (/^(y|yes)$/i.test(str) ? true : /^(n|no)$/i.test(str) ? false : def)
console.log(yesOrNo('Foo', true))

export {
  byteSize,
  capitalize,
  capitalizeInitial,
  compactWhitespace,
  containsWhitespace,
  csvToArray,
  csvToJSON,
  decapitalize,
  escapeHTML,
  escapeRegex,
  expandTabs,
  extendHex,
  fromCamelCase,
  hexToRGB,
  indentStr,
  isAbsoluteUrl,
  isAnagram,
  mapStr,
  maskStr,
  normalizeLineEnd,
  normalizeUrl,
  padStr,
  palindrome,
  pluralize,
  prettyBytes,
  removeNonASCII,
  reverseStr,
  rgbToHEX,
  sortChar,
  splitLines,
  stringPermutations,
  stripHTMLTags,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  toTitleCase,
  toWords,
  truncateStr,
  unescapeHTML,
  yesOrNo,
}
