/**
 * 根据指定最大参数个数执行函数;
 * @param {*} func
 * @param {*} num
 */
const ary = (func, num) => (...args) => func(...args.slice(0, num))
/**
 * 根据指定参数执行函数,返回执行结果;
 * @param {*} func
 * @param  {...any} args
 */
const attempt = (func, ...args) => {
  try {
    return func(...args)
  } catch (e) {
    return e instanceof Error ? e : new Error(e)
  }
}
/**
 * 根据指定上下文和外部参数调用指定函数;
 * @param {*} func
 * @param {*} ctx
 * @param  {...any} boundArgs
 */
const bind = (func, ctx, ...boundArgs) => (...args) => func.apply(ctx, [...boundArgs, ...args])
/**
 * 提供函数名和外部参数给指定上下文调用;
 * @param {*} ctx
 * @param {*} func
 * @param  {...any} boundArgs
 */
const bindKey = (ctx, func, ...boundArgs) => (...args) => ctx[func].apply(ctx, [...boundArgs, ...args])
/**
 * 提供函数名和参数给指定上下文调用;
 * @param {*} func
 * @param  {...any} args
 */
const call = (func, ...args) => (ctx) => ctx[func](...args)
/**
 * 链式异步调用函数;
 * @param {*} funcs
 */
const chainAsync = (funcs) => {
  let index = 0
  const last = funcs[funcs.length - 1]
  const next = () => {
    const func = funcs[index++]
    func === last ? func() : func(next)
  }
  next()
}
/**
 * 根据指定函数和属性判断对象是否成立;
 * @param {*} func
 * @param {*} prop
 */
const checkProp = (func, prop) => (obj) => !!func(obj[prop])
/**
 * 从左向右依次执行函数;
 * @param  {...any} funcs
 */
const composeLeft = (...funcs) => funcs.reduce((func1, func2) => (...args) => func2(func1(...args)))
/**
 * 从右向左依次执行函数;
 * @param  {...any} funcs
 */
const composeRight = (...funcs) => funcs.reduce((func1, func2) => (...args) => func1(func2(...args)))
/**
 * 根据收敛函数和分支函数列表依次执行分支函数并将结果作为参数传递给收敛函数;
 * @param {*} converger
 * @param {*} funcs
 */
const converge = (converger, funcs) => (...args) => converger(...funcs.map((func) => func.apply(null, args)))
/**
 * 函数柯里化;
 * @param {*} func
 * @param {*} arity
 * @param  {...any} args
 */
const curry = (func, arity = func.length, ...args) => {
  console.log(func, arity, args)
  return arity <= args.length ? func(...args) : curry.bind(null, func, arity, ...args)
}
// console.log(curry(Math.min, 3)(10)(50)(2))
/**
 * 简易防抖函数;
 * @param {*} func
 * @param {*} wait
 */
const debounce = (func, wait = 0) => {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}
/**
 * 判断根据给定参数执行函数是否都成立;
 * @param {*} func1
 * @param {*} func2
 */
const execBoth = (func1, func2) => (...args) => func1(...args) && func2(...args)
/**
 * 直到当前调用栈清空时才执行函数;
 * @param {*} func
 * @param  {...any} args
 */
const execDefer = (func, ...args) => setTimeout(func, 1, ...args)
/**
 * 等待指定时间后执行函数;
 * @param {*} func
 * @param {*} wait
 * @param  {...any} args
 */
const execDelay = (func, wait, ...args) => setTimeout(func, wait, ...args)
/**
 * 判断根据给定参数执行函数至少有一个成;
 * @param {*} func1
 * @param {*} func2
 */
const execEither = (func1, func2) => (...args) => func1(...args) || func2(...args)
/**
 * 函数仅执行一次;
 * @param {*} func
 */
const execOnce = (func) => {
  let called = false
  return function (...args) {
    if (called) return
    called = true
    return func.apply(this, args)
  }
}
/**
 * 根据给点参数执行所有函数并返回结果;
 * @param  {...any} funcs
 */
const execOver = (...funcs) => (...args) => funcs.map((func) => func.apply(null, args))
/**
 * 连续执行指定Promises;
 * @param {*} promises
 */
const execPromises = (promises) => promises.reduce((promise, next) => promise.then(next), Promise.resolve())
/**
 * 根据指定上下文连续调用函数;
 * @param {*} num
 * @param {*} func
 * @param {*} ctx
 */
const execTimes = (num, func, ctx = undefined) => {
  let i = 0
  while (func.call(ctx, i) !== false && ++i < num) {}
}
/**
 *
 * @param {*} pred
 * @param {*} whenTrue
 */
const execWhen = (pred, whenTrue) => (x) => (pred(x) ? whenTrue(x) : x)
/**
 * 获取给定函数中执行最快的函数索引;
 * @param {*} funcs
 * @param {*} iterations
 */
const fastest = (funcs, iterations = 10000) => {
  const times = funcs.map((func) => {
    const before = performance.now()
    for (let i = 0; i < iterations; i++) func()
    return performance.now() - before
  })
  return times.indexOf(Math.min(...times))
}
/**
 * 将首参数移至末尾;
 * @param {*} func
 */
const flipArg = (func) => (arg, ...args) => func(...args, arg)
/**
 * 获取函数每秒执行的频率;
 * @param {*} func
 * @param {*} iterations
 */
const frequency = (func, iterations = 100) => {
  const before = performance.now()
  for (let i = 0; i < iterations; i++) func()
  return (1000 * iterations) / (performance.now() - before)
}
/**
 * 函数缓存处理;
 * @param {*} func
 */
// const memoize = (func) => {
//   const cache = new Map()
//   const cached = function (arg) {
//     return cache.has(arg) ? cache.get(arg) : cache.set(arg, func.call(this, arg)) && cache.get(arg)
//   }
//   cached.cache = cache
//   return cached
// }
const memoize = func => new Proxy(func, {
  cache: new Map(),
  apply(target, ctx, args) {
    let cacheKey = args.toString();
    if(!this.cache.has(cacheKey))
      this.cache.set(cacheKey, target.apply(ctx, args));
    return this.cache.get(cacheKey);
  }
});
/**
 * 函数在指定索引处获取参数;
 * @param {*} index
 */
const nthArg = (index) => (...args) => args.slice(index)[0]
/**
 * 在接收到的参数前拼接给定参数;
 * @param {*} func
 * @param  {...any} partials
 */
const partialLeft = (func, ...partials) => (...args) => func(...partials, ...args)
/**
 * 在接收到的参数后拼接给定参数;
 * @param {*} func
 * @param  {...any} partials
 */
const partialRight = (func, ...partials) => (...args) => func(...args, ...partials)
/**
 * 异步从左向右依次执行函数;
 * @param  {...any} funcs
 */
const pipeAsyncLeft = (...funcs) => (arg) => funcs.reduce((func1, func2) => func1.then(func2), Promise.resolve(arg))
/**
 * 异步从右向左依次执行函数;
 * @param  {...any} funcs
 */
const pipeAsyncRight = (...funcs) => (arg) => funcs.reduce((func1, func2) => func2.then(func1), Promise.resolve(arg))
/**
 * 将异步函数转换为Promise;
 * @param {*} func
 */
const promisify = (func) => (...args) =>
  new Promise((resolve, reject) => func(...args, (err, res) => (err ? reject(err) : resolve(res))))
/**
 * 单例基础版实现;
 * @param {*} className
 */
const singleton = (className) => {
  return new Proxy(className.prototype.constructor, {
    instance: null,
    construct: (target, argumentsList) => {
      if (!this.instance) this.instance = new target(...argumentsList)
      return this.instance
    },
  })
}
/**
 * 根据指定时间延迟执行异步事件;
 * @param {*} wait
 */
const sleep = (wait) => new Promise((resolve) => setTimeout(resolve, wait))
/**
 * 根据给定索引排列接收到的参数;
 * @param {*} func
 * @param {*} indexes
 */
const sortArgs = (func, indexes) => (...args) => func(...indexes.map((i) => args[i]))
/**
 * 打印函数执行所需时间;
 * @param {*} func
 */
const takeTime = (func) => {
  console.time(func.name)
  func()
  console.timeEnd(func.name)
}
/**
 * 节流函数实现;
 * @param {*} func
 * @param {*} wait
 */
const throttle = (func, wait) => {
  let inThrottle, lastTime, timeout
  return function () {
    const ctx = this,
      args = arguments
    if (!inThrottle) {
      func.apply(ctx, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(timeout)
      timeout = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          func.apply(ctx, args)
          lastTime = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  }
}
/**
 * 根据指定函数处理转换给定参数;
 * @param {*} func
 * @param {*} transforms
 */
const transormArgs = (func, transforms) => (...args) => func(...args.map((arg, i) => transforms[i](arg)))
/**
 * 反向柯里化函数执行到指定深度;
 * @param {*} func
 * @param {*} depth
 */
const uncurry = (func, depth = 1) => (...args) => {
  const next = (acc) => (args) => args.reduce((f1, f2) => f1(f2), acc)
  if (depth > args.length) throw new RangeError('Arguments too few!')
  return next(func)(args.slice(0, depth))
}
/**
 * 根据迭代函数和初始值构建数组;
 * @param {*} func
 * @param {*} seed
 */
const unfold = (func, seed) => {
  let result = [],
  arr = [null, seed]
  while ((arr = func(arr[1]))) result.push(arr[0])
  return result
}

export {
  ary,
  attempt,
  bind,
  bindKey,
  call,
  chainAsync,
  checkProp,
  composeLeft,
  composeRight,
  converge,
  curry,
  debounce,
  execBoth,
  execDefer,
  execDelay,
  execEither,
  execOnce,
  execOver,
  execPromises,
  execTimes
  execWhen,
  fastest,
  flipArg,
  frequency,
  memoize,
  nthArg,
  partialLeft,
  partialRight,
  pipeAsyncLeft,
  pipeAsyncRight,
  promisify,
  singleton,
  sleep,
  sortArgs,
  takeTime,
  throttle,
  transormArgs,
  uncurry,
  unfold
}
