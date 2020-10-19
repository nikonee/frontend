Function.prototype._apply = function (ctx = window, args) {
  const isStrict = (function () {
    return this === undefined
  })()
  // const _args = Array.isArray(args) ? args : []
  let _ctx = isStrict ? ctx : Object(ctx)
  const fn = Symbol('fn')
  _ctx[fn] = this
  const func = _ctx[fn](...args)
  delete _ctx[fn]
  return func
}

Function.prototype._call = function (ctx, ...args) {
  const isStrict = (function () {
    return this === undefined
  })()
  let _ctx = isStrict ? ctx : Object(ctx)
  const fn = Symbol('fn')
  _ctx[fn] = this
  const func = _ctx[fn](...args)
  delete _ctx[fn]
  return func
}

Function.prototype._bind = function (ctx, ...args) {
  if (typeof this !== 'function') throw new TypeError('Error')
  const _this = this
  // return function func() {
  //   if (this instanceof func) {
  //     return new _this(...args, ...arguments)
  //   }
  //   return _this.apply(ctx, [...args, ...arguments])
  // }
  const func = function () {
    const _ctx = this instanceof func ? this : ctx
    return _this.apply(_ctx, [...args, ...arguments])
  }
  func.prototype = Object.create(_this.prototype || Function.prototype)
  return func
}

function curry(func) {
  const prevArgs = [].slice.call(arguments, 1)
  function curried() {
    const nextArgs = [].slice.call(arguments)
    return curry.call(null, func, [...prevArgs, ...nextArgs])
  }
  curried.toString = function () {
    return func.apply(null, prevArgs)
  }
  return curried
}

function lengthOfLongestSubstr(str) {
  let map = new Map()
  let res = 0
  let i = -1
  for (let j = 0, len = str.length; j < len; j++) {
    if (map.has(str[j])) {
      i = Math.max(i, map.get(str[j]))
    }
    res = Math.max(res, j - i)
    map.set(str[j], j)
  }
  return res
}

function debounce(func, wait = 100, immediate = true) {
  let ctx, args, timer, result
  const later = () => {
    setTimeout(() => {
      timer = null
      if (!immediate) {
        result = func.apply(ctx, args)
        ctx = args = null
      }
    }, wait)
  }
  return function () {
    ctx = this
    args = arguments
    if (timer) {
      clearTimeout(timer)
    } else if (immediate) {
      result = func.apply(ctx, args)
    }
    timer = later()
    return result
  }
}

function throttle(func, wait, options = { leading: true, trailing: true }) {
  let ctx, args, timer, result
  let prev = 0,
    remain = 0
  const { leading, trailing } = options
  const later = () => {
    prev = leading ? Date.now() : 0
    timer = null
    result = func.apply(ctx, args)
    ctx = args = null
  }
  return function () {
    ctx = this
    args = arguments
    const now = Date.now()
    if (!prev && !leading) prev = now
    remain = wait - (now - prev)
    if (remain <= 0 || remain > wait) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      result = func.apply(ctx, args)
      ctx = args = null
      prev = now
    } else if (!timer && trailing) {
      timer = setTimeout(later, remain)
    }
    return result
  }
}
