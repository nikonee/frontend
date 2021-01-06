/**
 * 将数组转换为li列表并添加至指定节点;
 * @param {*} arr
 * @param {*} id
 */
const arrToHtml = (arr, id) =>
  ((el) => ((el = document.getElementById(id)), (el.innerHTML += arr.map((val) => `<li>${val}</li>`).join(''))))()
/**
 * 判断页面是否滚动到底;
 */
const bottomVisible = () =>
  document.documentElement.clientHeight + window.screenY >=
  (document.documentElement.scrollHeight || document.documentElement.clientHeight)
/**
 * 复制字符串到粘贴板;
 * @param {*} str
 */
const copyToClipboard = (str) => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}
/**
 * 通过指定选择器创建一个指定范围,步长和持续时间的计数器;
 * @param {*} selector
 * @param {*} start
 * @param {*} end
 * @param {*} step
 * @param {*} duration
 */
const counter = (selector, start, end, step = 1, duration = 2000) => {
  let current = start
  let steps = (end - start) * step < 0 ? -step : step
  const timer = setInterval(() => {
    current += steps
    document.querySelector(selector).innerHTML = current
    if (current >= end) document.querySelector(selector).innerHTML = end
    if (current >= end) clearInterval(timer)
  }, Math.abs(Math.floor(duration / (end - start))))
  return timer
}
/**
 * 通过指定字符串创建元素;
 * @param {*} str
 */
const createEl = (str) => {
  const el = document.createElement('div')
  el.innerHTML = str
  return el.firstElementChild
}
/**
 * 创建一个包含emit/on/off方法的发布/订阅事件中心;
 */
const createEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    ;(this.hub[event] || []).forEach((handler) => handler(data))
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = []
    this.hub[event].push(handler)
  },
  off(event, handler) {
    const index = (this.hub(event) || []).findIndex((func) => func === handler)
    if (index > -1) this.hub[event].splice(i, 1)
    if (this.hub[event].length === 0) delete this.hub[event]
  },
})
/**
 * 浏览器环境下生成随机UUID;
 */
const createUUID = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )
/**
 * 获取浏览器支持的CSS属性前缀;
 * @param {*} prop
 */
const cssPrefix = (prop) => {
  const capitalProp = prop.charAt(0).toUpperCase() + prop.slice(1)
  const prefixes = ['webkit', 'moz', 'ms', 'o', '']
  const index = prefixes.findIndex(
    (prefix) => typeof document.body.style[prefix ? prefix + capitalProp : prop] !== 'undefined'
  )
  return index !== -1 ? (index === 0 ? prop : prefixes[index] + capitalProp) : null
}
/**
 * 判断父元素是否包含子元素;
 * @param {*} parent
 * @param {*} child
 */
const elContains = (parent, child) => parent !== child && parent.contains(child)
/**
 * 判断元素是否完全/部分可见;
 * @param {*} el
 * @param {*} part
 */
const elInViewport = (el, part = false) => {
  const { top, left, right, botton } = el.getBoundingClientRect()
  const { innerWidth, innerHeight } = window
  return part
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
}
/**
 * 提取基础URL;
 * @param {*} url
 */
const getBaseUrl = (url) => (url.indexOf('?') > 0 ? url.slice(0, url.indexOf('?')) : url)
/**
 * 检测设备类型;
 */
const getDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
/**
 * 根据指定元素获取所有IMG标签;
 * @param {*} el
 * @param {*} uniq
 */
const getElImages = (el, unique = false) => {
  const images = [...el.getElementsByTagName('img')].map((img) => img.getAttribute('src'))
  return unique ? images : [...new Set(iamges)]
}
/**
 * 获取页面当前滚动位置;
 * @param {*} el
 */
const getScrollPosition = (el = window) => ({ x: el.pageXOffset || el.scrollLeft, y: el.pageYOffset || el.scrollTop })
/**
 * 获取元素指定CSS属性;
 * @param {*} el
 * @param {*} attr
 */
const getStyle = (el, attr) => getComputedStyle(el)[attr]
/**
 * 获取当前URL参数对象;
 * @param {*} url
 */
const getUrlParams = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (acc, str) => ((acc[str.slice(0, str.indexOf('='))] = str.slice(str.indexOf('=') + 1)), acc),
    {}
  )
/**
 * 判断元素是否声明指定类名;
 * @param {*} el
 * @param {*} className
 */
const hasClass = (el, className) => el.classList.contains(className)
/**
 * 通过SHA-256加密生成哈希值;
 * @param {*} val
 */
const hashBrowser = (val) =>
  crypto.subtle.digest('SHA-256', new TextEncoder('utf-8').encode(val)).then((res) => {
    const hexes = []
    const view = new DataView(res)
    for (let i = 0; i < view.byteLength; i += 4) {
      hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8))
    }
    return hexes.join('')
  })
/**
 * 隐藏指定元素;
 * @param  {...any} el
 */
const hideEl = (...el) => [...el].forEach((e) => (e.style.display = 'none'))
/**
 * XMLHttpRequest发送DELETE请求;
 * @param {*} url
 * @param {*} load
 * @param {*} err
 */
const httpDelete = (url, load, err = console.error) => {
  const xhr = new XMLHttpRequest()
  xhr.open('DELETE', url, true)
  xhr.onload = () => load(xhr)
  xhr.onerror = () => err(xhr)
  xhr.send()
}
/**
 * XMLHttpRequest发送GET请求;
 * @param {*} url
 * @param {*} load
 * @param {*} err
 */
const httpGet = (url, load, err = console.error) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.onload = () => load(xhr.responseText)
  xhr.onerror = () => err(xhr)
  xhr.send()
}
/**
 * XMLHttpRequest发送POST请求;
 * @param {*} url
 * @param {*} load
 * @param {*} err
 */
const httpPost = (url, data, load, err = console.error) => {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
  xhr.onload = () => load(xhr.responseText)
  xhr.onerror = () => err(xhr)
  xhr.send(data)
}
/**
 * XMLHttpRequest发送PUT请求;
 * @param {*} url
 * @param {*} load
 * @param {*} err
 */
const httpPut = (url, data, load, err = console.error) => {
  const xhr = new XMLHttpRequest()
  xhr.open('PUT', url, true)
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
  xhr.onload = () => load(xhr)
  xhr.onerror = () => err(xhr)
  xhr.send(data)
}
/**
 * HTTP重定向至HTTPS;
 */
const httpsRedirect = () =>
  location.protocol !== 'https:' && location.replace('https://' + location.href.split('//')[1])
/**
 * 在指定元素结尾插入HTML;
 * @param {*} el
 * @param {*} html
 */
const insertAfter = (el, html) => el.insertAdjacentHTML('afterend', html)
/**
 * 在指定元素开头插入HTML;
 * @param {*} el
 * @param {*} html
 */
const insertBefore = (el, html) => el.insertAdjacentHTML('beforebegin', html)
/**
 * 判断是否浏览器运行环境;
 */
// const isBrowser = () => ![typeof window, typeof document].includes('undefined')
const isBrowser = () => typeof window === 'undefined' || typeof document === 'undefined'
/**
 * 判断是否当前浏览器窗口;
 */
const isBrowserTab = () => !document.hidden
/**
 * 判断用户窗口是否为暗色;
 */
const isDarkScheme = () => window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
/**
 * 判断用户窗口是否为亮色;
 */
const isLightScheme = () => window && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
/**
 * 指定元素移除监听事件;
 * @param {*} el
 * @param {*} evt
 * @param {*} func
 * @param {*} opts
 */
const listenOff = (el, evt, func, opts = false) => el.removeEventListener(evt, func, opts)
/**
 * 指定元素添加监听事件;
 * @param {*} el
 * @param {*} evt
 * @param {*} func
 * @param {*} opts
 */
const listenOn = (el, evt, func, opts = {}) => {
  const callback = (e) => e.target.matches(opts.target) && func.call(e.target, e)
  el.addEventListener(evt, opts.target ? callback : func, opts.options || false)
  if (opts.target) return callback
}
/**
 * 指定元素添加监听事件仅执行一次;
 * @param {*} el
 * @param {*} evt
 * @param {*} func
 */
const listenOnce = (el, evt, func) => {
  const listener = el.addEventListener(evt, (args) => {
    func(args)
    el.removeEventListener(evt, listener)
  })
}
/**
 * 给指定元素添加观察者监听事件;
 * @param {*} el
 * @param {*} cb
 * @param {*} opts
 */
const observeMutations = (el, cb, opts) => {
  const observer = new MutationObserver((mutations) => mutations.forEach((m) => cb(m)))
  observer.observe(
    el,
    Object.assign(
      {
        childList: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true,
        subtree: true,
      },
      opts
    )
  )
  return observer
}
/**
 * 根据用户输入方式及设备运行回调函数;
 * @param {*} callback
 */
const onUserInputChange = (callback) => {
  let type = 'mouse',
    lastTime = 0
  const mousemoveHandler = () => {
    const now = performance.now()
    if (now - lastTime < 20) {
      ;(type = 'mouse'), callback(type), document.removeEventListener('mousemove', mousemoveHandler)
    }
    lastTime = now
  }
  document.addEventListener('touchstart', () => {
    if (type === 'touch') return
    ;(type = 'touch'), callback(type), document.addEventListener('mousemove', mousemoveHandler)
  })
}
/**
 * 将Cookie解析为键值对象;
 * @param {*} cookie
 */
const parseCookie = (cookie) =>
  cookie
    .split(';')
    .map((el) => el.split('='))
    .reduce((acc, el) => ((acc[decodeURIComponent(el[0].trim())] = decodeURIComponent(el[1].trim())), acc), {})
// console.log(parseCookie('foo=bar; equation=E%3Dmc%5E2'))
/**
 * 将FORM表单解析为键值对象;
 * @param {*} form
 */
const parseForm = (form) => Array.from(new FormData(form)).reduce((acc, [key, val]) => ((acc[key] = val), acc), {})
/**
 * 根据动画帧执行回调函数;
 * @param {*} callback
 * @param {*} auto
 */
const recordAnimationFrames = (callback, auto = true) => {
  let running = true,
    raf
  const start = () => {
    running = true
    run()
  }
  const stop = () => {
    running = false
    cancelAnimationFrame(raf)
  }
  const run = () => {
    raf = requestAnimationFrame(() => {
      callback()
      running && run()
    })
  }
  auto && start()
  return { start, stop }
}
/**
 * URL重定向;
 * @param {*} url
 * @param {*} link
 */
const redirect = (url, link = true) => (link ? (window.location.href = url) : window.location.replace(url))
/**
 * 将DOM树渲染插入到指定元素;
 * @param {*} param0
 * @param {*} container
 */
const renderEl = ({ type, props = {} }, container) => {
  const isTextEl = !type
  const element = isTextEl ? document.createTextNode('') : document.createElement(type)

  const isListener = (p) => p.startsWith('on')
  const isAttribute = (p) => !isListener(p) && p !== 'children'

  Object.keys(props).forEach((p) => {
    if (isAttribute(p)) element[p] = props[p]
    if (!isTextEl && isListener(p)) element.addEventListener(p.toLowerCase().slice(2), props[p])
  })

  if (!isTextEl && props.children && props.children.length)
    props.children.forEach((childEl) => renderEl(childEl, element))

  container.appendChild(element)
}
/**
 * 通过WebWorker在新线程中执行任务,不阻塞UI;
 * @param {*} func
 */
const runAsync = (func) => {
  const worker = new Worker(
    URL.createObjectURL(new Blob([`postMessage((${func})());`]), {
      type: 'application/javascript; charset=utf-8',
    })
  )
  return new Promise((resolve, reject) => {
    worker.onmessage = ({ data }) => {
      resolve(data), worker.terminate()
    }
    worker.onerror = (err) => {
      reject(err), worker.terminate()
    }
  })
}
/**
 * 平滑滚动至指定元素;
 * @param {*} selector
 */
const scrollSmoothly = (selector) =>
  document.querySelector(selector).scrollIntoView({
    behavior: 'smooth',
  })
/**
 * 平滑滚动至页面顶部;
 */
const scrollToTop = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, scrollTop - scrollTop / 8)
  }
}
/**
 * Cookie键值对序列化;
 * @param {*} key
 * @param {*} val
 */
const serializeCookie = (key, val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
/**
 * Form表单字段序列化;
 * @param {*} form
 */
const serializeForm = (form) =>
  Array.from(new FormData(form), (field) => field.map(encodeURIComponent).join('=')).join('&')
/**
 * 指定元素设置CSS属性;
 * @param {*} el
 * @param {*} attr
 * @param {*} val
 */
const setStyle = (el, attr, val) => (el.style[attr] = val)
/**
 * 显示指定元素;
 * @param  {...any} el
 */
const showEl = (...el) => [...el].forEach((el) => (el.style.display = ''))
/**
 * 判断是否支持触摸事件;
 */
const supportsTouch = () =>
  window && ('ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch))
/**
 * 指定元素切换类名;
 * @param {*} el
 * @param {*} className
 */
const toggleClass = (el, className) => el.classList.toggle(className)
/**
 * 在指定元素上触发给定事件参数;
 * @param {*} el
 * @param {*} evt
 * @param {*} args
 */
const triggerEvent = (el, evt, args) => el.dispatchEvent(new CustomEvent(evt, { args }))

export {
  arrToHtml,
  bottomVisible,
  copyToClipboard,
  counter,
  createEl,
  createEventHub,
  createUUID,
  cssPrefix,
  elContains,
  elInViewport,
  getBaseUrl,
  getDeviceType,
  getElImages,
  getScrollPosition,
  getStyle,
  getUrlParams,
  hasClass,
  hashBrowser,
  hideEl,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  httpsRedirect,
  insertAfter,
  insertBefore,
  isBrowser,
  isBrowserTab,
  isDarkScheme,
  isLightScheme,
  listenOff,
  listenOn,
  listenOnce,
  observeMutations,
  onUserInputChange,
  parseCookie,
  parseForm,
  recordAnimationFrames,
  redirect,
  renderEl,
  runAsync,
  scrollSmoothly,
  scrollToTop,
  serializeCookie,
  serializeForm,
  setStyle,
  showEl,
  supportsTouch,
  toggleClass,
  triggerEvent,
}
