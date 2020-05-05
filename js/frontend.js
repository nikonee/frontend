function createObj() {
  let obj = new Object()
  let con = [].shift.call(arguments)
  obj.__proto__ = con.prototype
  const res = con.apply(obj, arguments)
  return typeof res === 'object' ? res : obj
}

const instanceOf = (instance, target) => {
  const prototype = target.prototype
  let proto = instance.__proto__
  while (true) {
    if (instance === null) return false
    if (proto === prototype) return true
    proto = proto.__proto__
  }
}
// console.log(instanceOf({}, Object))

// for (let i = 1; i <= 5; i++) {
//   setTimeout(function timer() {
//     console.log(i)
//   }, i * 1000)
// }

// let a = {
//   age: undefined,
//   sex: Symbol('male'),
//   jobs: function () {},
//   name: 'yck',
// }
// let b = JSON.parse(JSON.stringify(a))

function structuralClone(obj) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel()
    port2.onmessage = (ev) => resolve(ev.data)
    port1.postMessage(obj)
  })
} // 注意该方法是异步的

// 可以处理 undefined 和循环引用对象
// ;(async () => {
//   const c = {
//     a: 1,
//     b: {
//       c: b,
//     },
//   }
//   const res = await structuralClone(c)
//   console.log(res)
// })()

const debounce = (func, wait = 5000, imme = true) => {
  let timeout, timestamp, ctx, args

  const later = () => {
    const time = Date.now() - timestamp
    if (time > 0 && time < wait) {
      timeout = setTimeout(later, wait - time)
    } else {
      timeout = null
      if (!imme) {
        func.apply(ctx, args)
        ctx = args = null
      }
    }
  }
  return function (...params) {
    ctx = this
    args = params
    timestamp = Date.now()

    if (!timeout) {
      if (imme) {
        func.apply(ctx, params)
        ctx = args = null
      } else {
        timeout = setTimeout(later, wait)
      }
    }
  }
}

const throttle = (func, wait = 5000, options = {}) => {
  let timeout,
    ctx,
    args,
    result,
    prev = 0

  const later = function () {
    // 如果起始调用则保存当前时间,否则置为0
    prev = options.leading ? Date.now() : 0
    // 置空用于定时器判断,防止内存泄漏
    timeout = null
    result = func.apply(ctx, args)
    if (!timeout) ctx = args = null
  }
  return function () {
    const now = Date.now()
    console.log(now)
    // 如果起始不调用函数则保存之前时间
    if (!prev && !options.leading) prev = now
    const remain = wait - (now - prev)
    ctx = this
    args = arguments
    if (remain <= 0 || remain > wait) {
      // 如果存在定时器就清理掉否则会调用二次回调
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      prev = now
      result = func.apply(ctx, args)
      if (!timeout) ctx = args = null
    } else if (!timeout && options.trailing) {
      // 如果设置结尾调用且定时器不存在则初始化定时器
      timeout = setTimeout(later, remain)
    }
    return result
  }
}

function Super() {}
function Sub() {}
Sub.prototype = Object.create(Super.prototype, {
  constructor: {
    value: Sub,
    enumerable: false,
    writable: true,
    configurable: true,
  },
})

function MyDate() {}
MyDate.prototype.getTime = function () {
  return this.getTime()
}
Object.setPrototypeOf(new Date(), MyDate.prototype)
Object.setPrototypeOf(MyDate.prototype, Date.prototype)
// console.log(new MyDate().__proto__.__proto__)

const flatDeep = (arr) => (Array.isArray(arr) ? arr.reduce((a, b) => [...a, ...flatDeep(b)], []) : [arr])

const jsonp = (url, callback, success) => {
  let script = document.createElement('script')
  script.src = url
  script.async = true
  script.type = 'text/javascript'
  window[callback] = function (res) {
    success && success(res)
  }
  document.body.appendChild(script)
}

export default class Element {
  constructor(tag, props, children, key) {
    this.tag = tag
    this.props = props
    if (Array.isArray(children)) {
      this.children = children
    } else if (typeof children === 'string') {
      this.key = children
      this.children = null
    }
    if (key) this.key = key
  }

  _createElement(tag, props, children, key) {
    let el = document.createElement(tag)
    for (const k in props) {
      if (props.hasOwnProperty(k)) {
        el.setAttribute(k, props[k])
      }
    }
    if (key) el.setAttribute('key', key)
    if (children) {
      children.forEach((item) => {
        let child
        if (item instanceof Element) {
          child = this.createElement(item.tag, item.props, item.children, item.key)
        } else {
          child = document.createTextNode(item)
        }
        el.appendChild(child)
      })
    }
    return el
  }

  create() {
    return this._createElement(this.tag, this.props, this.children, this.key)
  }

  render() {
    const root = this._createElement(this.tag, this.props, this.children, this.key)
    document.body.appendChild(root)
    return root
  }
}
