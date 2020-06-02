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
const createElement = (str) => {
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
 * 判断父元素是否包含子元素;
 * @param {*} parent
 * @param {*} child
 */
const elementContains = (parent, child) => parent !== child && parent.contains(child)
/**
 * 判断元素是否完全/部分可见;
 * @param {*} el
 * @param {*} part
 */
const elementInViewport = (el, part = false) => {
  const { top, left, right, botton } = el.getBoundingClientRect()
  const { innerWidth, innerHeight } = window
  return part
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
}
/**
 * 将FORM表单转换为对象;
 * @param {*} form
 */
const formToObject = (form) => Array.from(new FormData(form)).reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {})
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
const getImages = (el, uniq = false) => {
  const images = [...el.getElementsByTagName('img')].map((img) => img.getAttribute('src'))
  return uniq ? images : [...new Set(iamges)]
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
const hideElements = (...el) => [...el].forEach((e) => (e.style.display = 'none'))
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
const httpsRedirect = () => {
  if (location.protocol !== 'https:' location.replace('https://' + location.href.split('//')[1])
}
/**
 * 在指定元素结尾处插入HTML;
 * @param {*} el 
 * @param {*} html 
 */
const insertAfter = (el, html) => el.insertAdjacentHTML('afterend', html)

