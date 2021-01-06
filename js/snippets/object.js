/**
 * 将对象方法绑定到自身以覆盖现有方法;
 * @param {*} obj
 * @param  {...any} funcs
 */
const bindAll = (obj, ...funcs) =>
  funcs.forEach(
    (func) => (
      (funct = obj[func]),
      (obj[func] = function () {
        return funct.apply(obj)
      })
    )
  )
/**
 * 对象深拷贝基础版;
 * @param {*} obj
 */
const deepClone = (obj) => {
  if (obj === null) return null
  let clone = Object.assign({}, obj)
  Object.keys(clone).forEach((key) => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]))
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
    ? Array.from(obj)
    : clone
}
/**
 * 对象深度冻结;
 * @param {*} obj
 */
const deepFreeze = (obj) => {
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] === 'object' && !Object.isFrozen(obj[prop])) deepFreeze(obj[prop])
  })
  return Object.freeze(obj)
}
/**
 * 根据KEY数组获取嵌套对象目标值;
 * @param {*} obj
 * @param {*} keys
 */
const deepGet = (obj, keys) => keys.reduce((acc, k) => (acc && acc[k] ? acc[k] : null), obj)
/**
 * 深度遍历对象键;
 * @param {*} obj
 * @param {*} func
 */
const deepMap = (obj, func) =>
  Array.isArray(obj)
    ? obj.map((val) => deepMapKeys(val, func))
    : typeof obj === 'object'
    ? Object.keys(obj).reduce((acc, current) => {
        const key = func(current)
        const val = obj[current]
        acc[key] = val !== null && typeof val === 'object' ? deepMapKeys(val, func) : val
        return acc
      }, {})
    : obj

/**
 * 为对象中未定义属性分配默认值
 * @param {*} obj
 * @param  {...any} defs
 */
const defaults = (obj, ...defs) => Object.assign({}, obj, ...defs.reverse(), obj)
/**
 * 根据给定KEY获取对象中目标值;
 * @param {*} obj
 * @param {*} key
 */
const digValue = (obj, key) =>
  key in obj
    ? obj[key]
    : Object.values(obj).reduce((acc, val) => {
        if (acc !== undefined) return acc
        if (typeof val === 'object') return dig(val, key)
      }, undefined)
/**
 * 获取对象可枚举属性;
 * @param {*} obj
 * @param {*} inherited
 */
const enumProps = (obj, inherited = false) =>
  (inherited ? [...Object.keys(obj), ...Object.keys(Object.getPrototypeOf(obj))] : Object.keys(obj)).filter(
    (key) => typeof obj[key] === 'function'
  )
/**
 * 深度比较两个值是否相等;
 * @param {*} a
 * @param {*} b
 */
const equals = (a, b) => {
  if (a === b) return true
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b
  if (a.prototype !== b.prototype) return false
  let keys = Object.keys(a)
  if (keys.length !== Object.keys(b).length) return false
  return keys.every((k) => equals(a[k], b[k]))
}
/**
 * 根据指定函数获取开头处满足条件的KEY;
 * @param {*} obj
 * @param {*} func
 */
const findFirstKey = (obj, func) => Object.keys(obj).find((key) => func(obj[key], key, obj))
/**
 * 根据指定函数获取末尾处满足条件的KEY;
 * @param {*} obj
 * @param {*} func
 */
const findLastKey = (obj, func) =>
  Object.keys(obj)
    .reverse()
    .find((key) => func(obj[key], key, obj))
/**
 * 通过键路径串联展平对象;
 * @param {*} obj
 * @param {*} prefix
 */
const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : ''
    if (typeof obj[k] === 'object') Object.assign(acc, flattenObject(obj[k], pre + k))
    else acc[pre + k] = obj[k]
    return acc
  }, {})
/**
 * 正序遍历对象属性依次执行指定函数;
 * @param {*} obj
 * @param {*} func
 */
const forOwnLeft = (obj, func) => Object.keys(obj).forEach((key) => func(obj[key], key, obj))
/**
 * 倒序遍历对象属性依次执行指定函数;
 * @param {*} obj
 * @param {*} func
 */
const forOwnRight = (obj, func) =>
  Object.keys(obj)
    .reverse()
    .forEach((key) => func(obj[key], key, obj))
/**
 * 根据给定键获取对象目标属性值;
 * @param {*} from
 * @param  {...any} keys
 */
const getTargetValues = (from, ...keys) =>
  [...keys].map((s) =>
    s
      .replace(/\[([^\[\]]*)\]/g, '.$1.')
      .split('.')
      .filter((t) => t !== '')
      .reduce((prev, cur) => prev && prev[cur], from)
  )
/**
 * 判断对象是否拥有指定键;
 * @param {*} obj
 * @param {*} keys
 */
const hasKey = (obj, keys) => {
  return (
    keys.length > 0 &&
    keys.every((key) => {
      if (typeof obj !== 'object' || !obj.hasOwnProperty(key)) return false
      obj = obj[key]
      return true
    })
  )
}
/**
 * 反转对象的键值对,键反转后组成数组作为反转值;
 * @param {*} obj
 * @param {*} func
 */
const invertKeyValues = (obj, func) =>
  Object.keys(obj).reduce((acc, key) => {
    const val = func ? func(obj[key]) : obj[key]
    acc[val] = acc[val] || []
    acc[val].push(key)
    return acc
  }, {})
/**
 * 根据给定对象创建一个所有键小写的新对象;
 * @param {*} obj
 */
const lowercaseKeys = (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key]
    return acc
  }, {})
/**
 * 根据指定函数处理对象的键生成一个新对象;
 * @param {*} obj
 * @param {*} func
 */
const mapKeys = (obj, func) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[func(obj[k], k, obj)] = obj[k]
    return acc
  }, {})
/**
 * 根据指定函数处理对象的值生成一个新对象;
 * @param {*} obj
 * @param {*} func
 */
const mapValues = (obj, func) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k] = func(obj[k], k, obj)
    return acc
  }, {})
/**
 * 判断对象A是否包含对象B的属性值;
 * @param {*} obj1
 * @param {*} obj2
 */
const matches = (obj1, obj2) => Object.keys(obj2).every((key) => obj1.hasOwnProperty(key) && obj1[key] === obj2[key])
/**
 * 根据指定函数处理并判断对象A是否包含对象B的属性值;
 * @param {*} obj1
 * @param {*} obj2
 * @param {*} func
 */
const matchesWith = (obj1, obj2, func) =>
  Object.keys(obj2).every((key) =>
    obj1.hasOwnProperty(key) && func ? func(obj1[key], obj2[key], key, obj1, obj2) : obj1[key] == obj2[key]
  )
/**
 * 根据多个对象组合创建一个新对象;
 * @param  {...any} objs
 */
const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k) ? [].concat(acc[k]).concat(obj[k]) : obj[k]
        return acc
      }, {}),
    {}
  )
/**
 * 递归嵌套给定的相互链接的对象;
 * @param {*} items
 * @param {*} id
 * @param {*} link
 */
const nest = (items, id = null, link = 'parent_id') =>
  items.filter((item) => item[link] === id).map((item) => ({ ...item, children: nest(items, item.id, link) }))
/**
 * 根据给定的键值对数组创建对象;
 * @param {*} arr
 */
const objectFromPairs = (arr) => arr.reduce((acc, [key, val]) => ((acc[key] = val), acc), {})
/**
 * 根据给定的对象生成键值对数组;
 * @param {*} obj
 */
const objectToPairs = (obj) => Object.entries(obj)
/**
 * 根据给定参数对象生成查询字符串;
 * @param {*} queryParams
 */
const objectToQueryString = (queryParams) => {
  return queryParams
    ? Object.entries(queryParams).reduce((queryString, [key, val], index) => {
        const symbol = queryString.length === 0 ? '?' : '&'
        queryString += typeof val === 'string' ? `${symbol}${key}=${val}` : ''
        return queryString
      }, '')
    : ''
}
/**
 * 根据给定键移除对象中对应的键值对;
 * @param {*} obj
 * @param {*} arr
 */
const omit = (obj, arr) =>
  Object.keys(obj)
    .filter((k) => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {})
/**
 * 根据指定函数处理并移除对象中对应键值对;
 * @param {*} obj
 * @param {*} func
 */
const omitBy = (obj, func) =>
  Object.keys(obj)
    .filter((k) => !func(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {})
/**
 * 根据给定键和排序方式对数组中对象进行组合排序;
 * @param {*} arr
 * @param {*} props
 * @param {*} orders
 */
const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]]
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0
      }
      return acc
    }, 0)
  )
/**
 * 根据给定键获取对象中对应的键值对;
 * @param {*} obj
 * @param {*} arr
 */
const pick = (obj, arr) => arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {})
/**
 * 根据指定函数处理并选取对象中对应键值对;
 * @param {*} obj
 * @param {*} func
 */
const pickBy = (obj, func) =>
  Object.keys(obj)
    .filter((k) => func(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {})
/**
 * 根据给定键值对替换对象中对应的键值对;
 * @param {*} keys
 * @param {*} obj
 */
const renameKeys = (keys, obj) =>
  Object.keys(obj).reduce(
    (acc, k) => ({
      ...acc,
      ...{ [keys[k] || k]: obj[k] },
    }),
    {}
  )
/**
 * 获取可遍历对象/数组/字符串的长度;
 * @param {*} obj
 */
const sizeOf = (obj) =>
  Array.isArray(obj)
    ? obj.length
    : obj && typeof obj === 'object'
    ? obj.size || obj.length || Object.keys(obj).length
    : typeof obj === 'string'
    ? new Blob([obj]).size
    : 0
/**
 * 根据对象创建键值对数组;
 * @param {*} obj
 */
const toPairs = (obj) =>
  obj[Symbol.iterator] instanceof Function && obj.entries instanceof Function
    ? Array.from(obj.entries())
    : Object.entries(obj)

/**
 * 通过指定函数依次处理给定值和对象中每个键;
 * @param {*} obj
 * @param {*} func
 * @param {*} val
 */
const transform = (obj, func, val) => Object.keys(obj).reduce((acc, k) => func(acc, obj[k], k, obj), acvalc)
/**
 * 通过键的调用路径展开对象;
 * @param {*} obj
 */
const unflattenObject = (obj) =>
  Object.keys(obj).reduce((acc, k) => {
    if (k.indexOf('.') !== -1) {
      const keys = k.split('.')
      Object.assign(
        acc,
        JSON.parse(
          '{' +
            keys.map((v, i) => (i !== keys.length - 1 ? `"${v}":{` : `"${v}":`)).join('') +
            obj[k] +
            '}'.repeat(keys.length)
        )
      )
    } else acc[k] = obj[k]
    return acc
  }, {})

export {
  bindAll,
  deepClone,
  deepFreeze,
  deepGet,
  deepMap,
  defaults,
  digValue,
  enumProps,
  equals,
  findFirstKey,
  findLastKey,
  flattenObject,
  forOwnLeft,
  forOwnRight,
  getTargetValues,
  hasKey,
  invertKeyValues,
  lowercaseKeys,
  mapKeys,
  mapValues,
  matches,
  matchesWith,
  merge,
  nest,
  objectFromPairs,
  objectToPairs,
  objectToQueryString,
  omit,
  omitBy,
  orderBy,
  pick,
  pickBy,
  renameKeys,
  sizeOf,
  toPairs,
  transform,
  unflattenObject,
}
