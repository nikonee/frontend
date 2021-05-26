Function.prototype._apply = function (ctx = window, args) {
  const isStrict = (function () {
    return this === undefined;
  })();
  ctx = isStrict ? ctx : Object(ctx);
  const fn = Symbol('fn');
  ctx[fn] = this;
  const func = ctx[fn](...args);
  delete ctx[fn];
  return func;
};

Function.prototype._call = function (ctx = window, ...args) {
  const isStrict = (function () {
    return this === undefined;
  })();
  ctx = isStrict ? ctx : Object(ctx);
  const fn = Symbol('fn');
  ctx[fn] = this;
  const func = ctx[fn](...args);
  delete ctx[fn];
  return func;
};

Function.prototype._bind = function (ctx, ...args) {
  if (typeof this !== 'function') throw new TypeError('绑定对象必须为函数！');
  const _this = this;
  // return function func() {
  //   if (this instanceof func) {
  //     return new _this(...args, ...arguments)
  //   }
  //   return _this.apply(ctx, [...args, ...arguments])
  // }
  const func = function () {
    const _ctx = this instanceof func ? this : ctx;
    return _this.apply(_ctx, [...args, ...arguments]);
  };
  func.prototype = Object.create(_this.prototype || Function.prototype);
  return func;
};

function curry(func) {
  const prevArgs = [].slice.call(arguments, 1);
  function curried() {
    const nextArgs = [].slice.call(arguments);
    return curry.call(null, func, [...prevArgs, ...nextArgs]);
  }
  curried.toString = function () {
    return func.apply(null, prevArgs);
  };
  return curried;
}

function lengthOfLongestSubstr(str) {
  let map = new Map();
  let res = 0;
  let i = -1;
  for (let j = 0, len = str.length; j < len; j++) {
    if (map.has(str[j])) {
      i = Math.max(i, map.get(str[j]));
    }
    res = Math.max(res, j - i);
    map.set(str[j], j);
  }
  return res;
}

function debounce(func, wait = 100, immediate = true) {
  let ctx, args, timer;
  const later = () => {
    setTimeout(() => {
      timer = null;
      if (!immediate) {
        const result = func.apply(ctx, args);
        ctx = args = null;
        return result;
      }
    }, wait);
  };
  return function (...params) {
    if (timer) {
      clearTimeout(timer);
      timer = later();
    } else {
      timer = later();
      if (immediate) {
        return func.apply(ctx, args);
      } else {
        ctx = this;
        args = params;
      }
    }
  };
}

function throttle(func, wait, options = {}) {
  let ctx, args, timer, result;
  let prev = 0,
    remain = 0;
  const { leading, trailing } = options;
  const later = () => {
    prev = leading === false ? 0 : Date.now();
    timer = null;
    result = func.apply(ctx, args);
    if (!timer) ctx = args = null;
  };
  return function () {
    ctx = this;
    args = arguments;
    const now = Date.now();
    if (!prev && leading === false) prev = now;
    remain = wait - (now - prev);
    if (remain <= 0 || remain > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      result = func.apply(ctx, args);
      ctx = args = null;
      prev = now;
    } else if (!timer && trailing) {
      timer = setTimeout(later, remain);
    }
    return result;
  };
}

class EventBus {
  constructor() {
    this.events = new Map();
  }
  addEvent(key, func, once) {
    let map;
    const eventMap = this.events.get(key);
    if (eventMap) {
      map = eventMap;
    } else {
      map = new Map();
      this.events.set(key, map);
    }
    map.set(func, (...args) => {
      func(...args);
      once && this.off(key, func);
    });
  }
  on(key, func) {
    if (!func) return;
    this.addEvent(key, func, false);
  }
  off(key, func) {
    if (func) {
      let map = this.events.get(key);
      if (map) map.delete(func);
    } else {
      this.events.delete(key);
    }
  }
  once(key, func) {
    this.addEvent(key, func, true);
  }
  fire(key) {
    let map = this.events.get(key);
    if (map) {
      for (let [_, func] of map.entries()) {
        func();
      }
    }
  }
}
