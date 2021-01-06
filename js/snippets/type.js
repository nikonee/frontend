/**
 * 将多个值转换为数组;
 * @param {*} val
 */
const castArray = (val) => (Array.isArray(val) ? val : [val])
/**
 * 拷贝正则表达式;
 * @param {*} regex
 */
const cloneRegex = (regex) => new RegExp(regex.source, regex.flags)
/**
 * 获取首个非空参数;
 * @param  {...any} args
 */
const coalesce = (...args) => args.find((arg) => ![undefined, null].includes(arg))
/**
 * 获取满足验证函数的首个参数;
 * @param {*} valid
 */
const coalesceFactory = (valid) => (...args) => args.find(valid)
/**
 * 获取参数值的原始类型;
 * @param {*} val
 */
const getType = (val) => (val === undefined ? 'undefined' : val === null ? 'null' : v.constructor.name)
/**
 * 判断给定参数是否为指定类型;
 * @param {*} type
 * @param {*} val
 */
const isType = (type, val) => ![, null].includes(val) && val.constructor === type
/**
 * 判断给定参数是否为类数组类型;
 * @param {*} obj
 */
const isArrayLike = (obj) => obj != null && typeof obj[Symbol.iterator] === 'function'
/**
 * 判断给定参数是否为空集合;
 * @param {*} obj
 */
const isEmpty = (obj) => obj == null || !(Object.keys(obj) || obj).length
/**
 * 判断给定参数是否为类对象类型;
 * @param {*} obj
 */
const isObjectLike = (obj) => obj !== null && typeof obj === 'object'
/**
 * 判断给定参数的构造函数是否为Object;
 * @param {*} obj
 */
const isPlainObject = (obj) => !!obj && typeof obj === 'object' && obj.constructor === Object
/**
 * 判断给定参数是否为原始值;
 * @param {*} val
 */
const isPrimitive = (val) => Object(val) !== val
/**
 * 判断给定参数是否类似Promise;
 * @param {*} obj
 */
const isPromiseLike = (obj) =>
  obj !== null && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
/**
 * 判断字符串是否为有效JSON格式;
 * @param {*} str
 */
const isValidJSON = (str) => {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

export {
  castArray,
  cloneRegex,
  coalesce,
  coalesceFactory,
  getType,
  isType,
  isArrayLike,
  isEmpty,
  isObjectLike,
  isPlainObject,
  isPrimitive,
  isPromiseLike,
  isValidJSON,
}
