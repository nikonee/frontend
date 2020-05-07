// Array
const all = (arr, fn = Boolean) => arr.every(fn)

const allEqual = (arr) => arr.every((v) => v === arr[0])

const any = (arr, fn = Boolean) => any.some(fn)
// 二维数组转换为逗号分隔CSV字符串
const arrToCSV = (arr, sep = ',') =>
  arr.map((v) => v.map((x) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x)).join(sep)).join('\n')

/**
 * Animate动画回调
 *
 * @param {*} selector 元素选择器
 * @param {*} animation 动画名称
 * @param {*} callback 回调函数
 * @param {number} [delay=1000] 动画时长
 */
function animateCallBack(selector, animation, callback, delay = 1000) {
  const node = document.querySelector(selector)
  node.classList.add('animated', animation)
  node.addEventListener('animationend', animationEnd)
  function animationEnd() {
    setTimeout(() => {
      node.classList.remove('animated', animation)
      node.removeEventListener('animationend', animationEnd)

      callback && callback()
    }, delay)
  }
}
/**
 * Animate动画
 *
 * @param {*} node 动画元素
 * @param {*} animation 动画名称
 * @param {number} [delay=1000] 动画时长
 */
function animateWithDelay(node, animation, delay = 1000) {
  node.classList.add(animation)
  setTimeout(() => {
    node.classList.remove(animation)
  }, delay)
}
/**
 * 数组遍历-通过While优化
 */
function arrayEach(array, iteratee) {
  let index = -1
  const length = array.length

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) break
  }
  return array
}
/**
 * 深拷贝-基础版(仅支持Array/Object)
 */
function cloneDeep(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    const isArray = Array.isArray(target)
    let cloneTarget = isArray ? [] : {}
    // 通过WeakMap解决循环引用内存问题
    if (map.get(target)) return map.get(target)
    map.set(target, cloneTarget)
    // 通过While优化遍历速度
    const keys = isArray ? undefined : Object.keys(target)
    arrayEach(keys || target, (value, key) => {
      if (keys) key = value
      cloneTarget[key] = cloneDeep(target[key], map)
    })
    return cloneTarget
  } else {
    return target
  }
}
/**
 * 深拷贝-MessageChannel实现,不支持函数拷贝
 *
 * @param {*} target
 */
function cloneDeepWithMC(target) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel()
    port2.onmessage = (e) => resolve(e.data)
    port1.postMessage(target)
  })
}
/**
 * 生成星级评分
 *
 * @param {*} rate 评分
 * @returns
 */
function createStarRate(rate) {
  return '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate)
}
/**
 * 自定义防抖函数(每次触发事件会重置计时器时间为设定延迟时间)
 *
 * @param {*} func 回调函数
 * @param {number} [wait=50] 延迟执行时间
 * @param {boolean} [immediate=true] 是否立即执行
 */
function debounce(func, wait = 50, immediate = true) {
  let timer, context, args

  // 延迟执行函数
  const later = setTimeout(() => {
    timer = null
    if (!immediate) {
      // 执行函数使用之前缓存的上下文和参数
      func.apply(context, args)
      // 执行完毕清除上下文和参数
      context = args = null
    }
  }, wait)

  return (...params) => {
    if (!timer) {
      // 如果立即执行就直接调用函数,否则缓存参数和上下文
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    } else {
      clearTimeout(timer)
    }
    timer = later()
  }
}
/**
 * 过滤XSS脚本
 *
 * @param {*} content
 * @returns
 */
function filterXSS(content) {
  let elem = document.createElement('div')
  elem.innerText = content
  const result = elem.innerHTML
  elem = null
  return result
}
/**
 * 数组降维
 *
 * @param {*} arr
 */
function flattenArray(arr) {
  return arr.reduce((a, b) => [...a, ...flattenArray(b)], [])
}
/**
 * 格式化系统时间
 *
 * @param {*} time
 */
function formatDateTime(time) {
  const result = time.match(/\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
  if (result) {
    return result[0].replace(/T/, ' ')
  } else {
    return time
  }
}
/**
 * 数字格式化为单位
 *
 * @param {*} num
 * @param {*} digits
 */
function formatNumberWithUnit(num, digits) {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}
/**
 * 数字格式化为千分位
 *
 * @param {*} num
 */
function formatNumberToThousand(num) {
  return num.toString().indexOf('.') !== -1 ? num.toLocaleString() : num.toString().replace(/\B(?=(\d{3})+$)/g, ',')
}
/**
 * 时间解析转化为指定格式
 *
 * @param {*} time 指定时间
 * @param {*} format 指定格式
 */
function formatTimeWithFormatter(time, format) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const date = new Date(time)
  const now = Date.now()
  const diff = (now - date) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (format) {
    return parseTimeWithFormatter(time, format)
  } else {
    return date.getMonth() + 1 + '月' + date.getDate() + '日' + date.getHours() + '时' + date.getMinutes() + '分'
  }
}
/**
 * 获取URL查询参数
 *
 * @param {*} url
 * @returns
 */
function getQueryParams(url = window.location.search) {
  return new URLSearchParams(url.replace(/\?/gi, ''))
}
/**
 * 获取URL请求参数
 *
 * @param {*} url
 */
function getQueryObject(url = window.location.href) {
  const queryStr = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  queryStr.replace(reg, (rs, $1, $2) => {
    const key = decodeURIComponent($1)
    let value = decodeURIComponent($2)
    obj[key] = String(value)
    return rs
  })
  return obj
}
/**
 * URL字符串转化为对象
 *
 * @param {*} url
 */
function getQueryObjectFromURL(url) {
  const queryStr = url.substring(url.lastIndexOf('?') + 1)
  if (!queryStr) {
    return {}
  } else {
    return JSON.parse(
      '{"' +
        decodeURIComponent(queryStr)
          .replace(/"/g, '\\"')
          .replace(/=/g, '":"')
          .replace(/&/g, '","')
          .replace(/\+/g, ' ') +
        '"}'
    )
  }
}
/**
 * 对象转化为URL字符串
 *
 * @param {*} obj 指定对象
 */
function getQueryStringFromOBJ(obj) {
  if (!obj) return ''
  let result = Object.keys(obj).map((key) => {
    if (obj[key] === undefined) {
      return ''
    } else {
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    }
  })
  return result.filter(Boolean).join('&')
}
/**
 * 获取UTF8格式字符串长度
 *
 * @param {*} str UTF8字符串
 */
function getUTF8StringLength(str) {
  let len = str.length
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) len++
    else if (code > 0x7ff && code <= 0xffff) len += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return len
}
/**
 * 判断移动端
 */
function isMobile() {
  return /Android|BlackBerry|iPhone|iPad|iPod|SymbianOS|Windows Phone/i.test(navigator.userAgent)
}
/**
 * 判断微信端
 */
function isWechat() {
  return /MicroMessenger/i.test(navigator.userAgent)
}
/**
 * JSONP请求
 *
 * @param {*} url 请求地址
 * @param {*} name 请求名称
 * @param {*} callback 请求回调
 */
function jsonpRequest(url, name = 'jsonpCallback', callback) {
  let script = document.createElement('script')
  script.src = url + '&callback=' + name
  script.async = true
  script.type = 'text/javascript'
  window[name] = (data) => {
    callback && callback(data)
  }
  document.body.appendChild(script)
}
/**
 * 数组混淆
 *
 * @param {*} arr
 * @returns
 */
function mixArray(arr) {
  return arr.slice().sort(() => Math.random() - 0.5)
}
/**
 * 对象数据绑定和监听
 *
 * @param {*} obj
 * @param {*} setCallback set回调函数
 * @param {*} getCallback get回调函数
 */
function observeObject(obj, setCallback, getCallback) {
  const handler = {
    set(target, property, value) {
      setCallback(value)
      return Reflect.set(target, property, value)
    },
    get(target, property, receiver) {
      getCallback(target, property)
      return Reflect.get(target, property, receiver)
    },
  }
  return new Proxy(obj, handler)
}
/**
 * 时间解析转化为指定格式
 *
 * @param {*} time 指定时间
 * @param {*} format 指定格式
 */
function parseTimeWithFormatter(time, format) {
  if (arguments.length === 0) {
    return null
  }
  format = format || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
    time = parseInt(time)
  } else if (typeof time === 'number' && time.toString().length === 10) {
    time = time * 1000
  } else {
    date = new Date(time)
  }

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const days = ['日', '一', '二', '三', '四', '五', '六']
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return days[value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
/**
 * 生成随机ID
 *
 * @param {*} len ID长度
 * @returns
 */
function randomID(len) {
  return Math.random().toString(36).substr(2, len)
}
/**
 * 生成随机颜色
 *
 * @returns
 */
function randomColor() {
  const hexColor = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')
  return `#${hexColor}`
}
/**
 * 生成随机数
 *
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @returns
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
/**
 * 延迟执行函数
 *
 * @param {*} delay 延迟时间
 */
function sleep(delay) {
  var start = new Date().getTime()
  while (new Date().getTime() - start < delay) continue
}
/**
 * 数组元素统计
 *
 * @param {*} arr
 * @returns
 */
function statArray(arr) {
  return arr.reduce((t, c) => {
    t[c] = t[c] ? ++t[c] : 1
    return t
  }, {})
}
/**
 * 页面滚动平滑效果
 *
 * @param {*} element 滚动元素
 * @param {*} position 滚动位置
 * @param {*} rate 滚动速率
 */
function scrollSmoothly(element, position, rate = 5) {
  if (typeof window.getComputedStyle(document.body).scrollBehavior === 'undefined') {
    // 不存在原生`requestAnimationFrame`，用`setTimeout`模拟替代
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback) {
        return setTimeout(callback, 17)
      }
    }
    // 当前滚动高度
    let top = document.body.scrollTop || document.documentElement.scrollTop
    const step = () => {
      // 距离目标滚动距离
      const distance = position - top
      // 目标滚动位置
      top += distance / rate
      if (Math.abs(distance) < 1) {
        window.scrollTo(0, position)
      } else {
        window.scrollTo(0, top)
        requestAnimationFrame(step)
      }
    }
    step()
  } else {
    element.scrollIntoView({
      behavior: 'smooth',
    })
  }
}
/**
 * 页面滚动动画效果
 * 配合animate.css动画
 *
 */
function scrollAnimation(selector = '.animated') {
  const top = document.body.scrollTop || document.documentElement.scrollTop
  const vh = document.documentElement.clientHeight
  const dom = document.querySelectorAll(selector)
  ;[].slice.call(dom).forEach((v) => {
    if (v.offsetTop < top + vh) {
      const delay = v.dataset.delay
      if (delay) {
        setTimeout(() => {
          v.style.opacity = 1
          v.classList.add(v.dataset.animate)
        }, delay)
      } else {
        v.style.opacity = 1
        v.classList.add(v.dataset.animate)
      }
    } else {
      v.classList.remove(v.dataset.animate)
      v.style.opacity = 0
    }
  })
}
/**
 * 判断数据类型(小写)
 * @param {*} obj
 */
function typeOf(obj) {
  const type =
    obj instanceof Element
      ? 'element' // 为了统一DOM节点类型输出
      : Object.prototype.toString
          .call(obj)
          .replace(/\[object\s(.+)\]/, '$1')
          .toLowerCase()
  return type
}
/**
 * 字符串首字母大写
 *
 * @param {String} str
 */
function uppercaseInitial(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export {
  animateCallBack,
  animateWithDelay,
  cloneDeep,
  createStarRate,
  randomID,
  randomColor,
  randomNumber,
  debounce,
  cloneDeepWithMC,
  filterXSS,
  flattenArray,
  formatDateTime,
  formatNumberWithUnit,
  formatNumberToThousand,
  formatTimeWithFormatter,
  getQueryParams,
  getQueryObject,
  getQueryObjectFromURL,
  getQueryStringFromOBJ,
  getUTF8StringLength,
  isMobile,
  isWechat,
  jsonpRequest,
  mixArray,
  observeObject,
  parseTimeWithFormatter,
  sleep,
  statArray,
  scrollSmoothly,
  scrollAnimation,
  typeOf,
  uppercaseInitial,
}
