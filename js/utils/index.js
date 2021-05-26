/**
 * Animate动画回调
 *
 * @param {*} selector 元素选择器
 * @param {*} animation 动画名称
 * @param {*} callback 回调函数
 * @param {number} [delay=1000] 动画时长
 */
function animateCallBack(selector, animation, callback, delay = 1000) {
  const node = document.querySelector(selector);
  node.classList.add('animated', animation);
  node.addEventListener('animationend', animationEnd);
  function animationEnd() {
    setTimeout(() => {
      node.classList.remove('animated', animation);
      node.removeEventListener('animationend', animationEnd);

      callback && callback();
    }, delay);
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
  node.classList.add(animation);
  setTimeout(() => {
    node.classList.remove(animation);
  }, delay);
}
/**
 * 数组扁平化
 *
 * @param {*} arr
 */
function arrFlatten(arr) {
  return arr.reduce((a, b) => [...a, ...arrFlatten(b)], []);
}
/**
 * 数组随机洗牌
 *
 * @param {*} arr
 */
function arrShuffle(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}
/**
 * 数组元素统计
 *
 * @param {*} arr
 */
function arrStatis(arr) {
  return arr.reduce((t, c) => {
    t[c] = t[c] ? ++t[c] : 1;
    return t;
  }, {});
}
/**
 * 控制并发任务数量
 * @param {*} limit 限制并发数
 * @param {*} array 任务数据源
 * @param {*} func 迭代处理函数
 * @returns
 */
async function asyncPool(limit, array, func) {
  let pool = [],
    running = [];
  for (const item of array) {
    const task = Promise.resolve().then(() => func(item, array));
    pool.push(task);

    if (array.length >= limit) {
      const callback = task.then(() => running.splice(running.indexOf(callback), 1));
      running.push(callback);

      if (running.length >= limit) {
        return Promise.race(running);
      }
    }
  }
  return Promise.all(pool);
}
/**
 * 字符串首字母大写
 *
 * @param {String} str
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * 函数柯里化
 * @param {*} func
 */
function curryFunc(func) {
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
/**
 * DataURL转Blob对象
 * @param {*} dataUrl
 * @param {*} mimeType
 * @returns
 */
function dataUrlToBlob(dataUrl, mimeType) {
  let blob = window.atob(dataUrl.split(',')[1]);
  let u8arr = new Uint8Array(blob.length);
  for (let i = 0; i < blob.length; i++) {
    u8arr[i] = blob.charCodeAt(i);
  }
  return new Blob([u8arr], { type: mimeType });
}
/**
 * DataURL转File对象
 * @param {*} dataUrl
 * @param {*} fileName
 * @returns
 */
function dataUrlToFile(dataUrl, fileName) {
  const [mimeStr, base64] = dataUrl.split(',');
  let mimeType = mimeStr.match(/:(.*?);/)[1],
    blob = window.atob(base64),
    u8arr = new Uint8Array(blob.length);
  for (let i = 0; i < blob.length; i++) {
    u8arr[i] = blob.charCodeAt(i);
  }
  return new File([u8arr], fileName, { type: mimeType });
}
/**
 * 防抖处理函数
 *
 * @param {*} func 回调函数
 * @param {number} [wait=50] 延迟执行时间
 * @param {boolean} [immediate=true] 是否立即执行
 */
function debounce(func, wait = 1000, immediate = true) {
  let timer, ctx, args;
  // 延迟执行函数
  const timeout = setTimeout(() => {
    timer = null;
    if (!immediate) {
      // 执行时使用缓存的上下文和参数
      func.apply(ctx, args);
      ctx = args = null;
    }
  }, wait);
  // 实际调用函数
  return (...params) => {
    if (!timer) {
      // 如果立即执行直接调用函数,否则缓存上下文和参数
      if (immediate) {
        func.apply(this, params);
      } else {
        ctx = this;
        args = params;
      }
    } else {
      clearTimeout(timer);
    }
    // 重新设定延迟执行函数
    timer = timeout();
  };
}
/**
 * 深拷贝-完整版
 * @param {*} target
 * @param {*} weakMap
 */
function deepClone(target, weakMap = new WeakMap()) {
  // 判断是否为对象类型
  if (typeof target !== 'object' || target === null) return target;
  // 缓存中存在直接返回
  if (weakMap.has(target)) return weakMap.get(target);
  // 缓存循环引用对象
  weakMap.set(
    target,
    Object.create(Object.getPrototypeOf(target), Object.getOwnPropertyDescriptors(target))
  );
  let cloneTarget;
  if (target instanceof Array) {
    cloneTarget = [];
  } else if (target instanceof Function) {
    cloneTarget = function () {
      return target.apply(this, arguments);
    };
  } else if (target instanceof RegExp) {
    cloneTarget = new RegExp(target.source, target.flags);
  } else if (target instanceof Date) {
    cloneTarget = new Date(target);
  } else {
    cloneTarget = {};
  }
  // 遍历处理拷贝对象
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      cloneTarget[key] = deepClone(target[key]);
    }
  }
  // 遍历处理Symbol属性
  // const symKeys = Object.getOwnPropertySymbols(target);
  // if (symKeys.length > 0) {
  //   for (const key of symKeys) {
  //     cloneTarget[key] = deepClone(target[key]);
  //   }
  // }
  return cloneTarget;
}
/**
 * MessageChannel深拷贝(不支持函数拷贝)
 *
 * @param {*} target
 */
function deepCloneWithMC(target) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port2.onmessage = (e) => resolve(e.data);
    port1.postMessage(target);
  });
}
/**
 * 提取日期时间
 *
 * @param {*} time
 */
function extractDateTime(time) {
  const result = time.match(/\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  if (result) {
    return result[0].replace(/T/, ' ');
  } else {
    return time;
  }
}
/**
 * 提取日期时间
 *
 * @param {*} time
 */
function extractDayTime(time) {
  const res = time.match(/\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  return res ? res[0].replace(/T/, ' ') : time;
}
/**
 * 过滤XSS脚本
 *
 * @param {*} content
 */
function filterXSS(content) {
  let elem = document.createElement('div');
  elem.innerText = content;
  const result = elem.innerHTML;
  elem = null;
  return result;
}
function floatAddition(num1, num2) {
  let sq1, sq2;
  try {
    sq1 = num1.toString().split('.')[1].length;
  } catch (e) {
    sq1 = 0;
  }
  try {
    sq2 = num2.toString().split('.')[1].length;
  } catch (e) {
    sq2 = 0;
  }
  const max = Math.pow(10, Math.max(sq1, sq2));
  return (Math.round(num1 * max) + Math.round(num2 * max)) / max;
}
/**
 * 时间解析转化为指定格式
 *
 * @param {*} time 指定时间
 * @param {*} format 指定格式
 */
function formatTime(time, format) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const date = new Date(time);
  const now = Date.now();
  const diff = (now - date) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (format) {
    return parseTime(time, format);
  } else {
    return (
      date.getMonth() +
      1 +
      '月' +
      date.getDate() +
      '日' +
      date.getHours() +
      '时' +
      date.getMinutes() +
      '分'
    );
  }
}
/**
 * 获取URL查询参数
 *
 * @param {*} url
 */
function getQueryParams(url = window.location.search) {
  return new URLSearchParams(url.replace(/\?/gi, ''));
}
/**
 * 获取URL请求参数
 *
 * @param {*} url
 */
function getQueryObject(url = window.location.href) {
  const queryStr = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  queryStr.replace(reg, (rs, $1, $2) => {
    const key = decodeURIComponent($1);
    let value = decodeURIComponent($2);
    obj[key] = String(value);
    return rs;
  });
  return obj;
}
/**
 * URL字符串转化为对象
 *
 * @param {*} url
 */
function getQueryObjectFromURL(url) {
  const queryStr = url.substring(url.lastIndexOf('?') + 1);
  if (!queryStr) {
    return {};
  } else {
    return JSON.parse(
      '{"' +
        decodeURIComponent(queryStr)
          .replace(/"/g, '\\"')
          .replace(/=/g, '":"')
          .replace(/&/g, '","')
          .replace(/\+/g, ' ') +
        '"}'
    );
  }
}
/**
 * 对象转化为URL字符串
 *
 * @param {*} obj 指定对象
 */
function getQueryStringFromObj(obj) {
  if (!obj) return '';
  let result = Object.keys(obj).map((key) => {
    if (obj[key] === undefined) {
      return '';
    } else {
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }
  });
  return result.filter(Boolean).join('&');
}
/**
 * 获取UTF8格式字符串长度
 *
 * @param {*} str UTF8字符串
 */
function getUTF8StringLength(str) {
  let len = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) len++;
    else if (code > 0x7ff && code <= 0xffff) len += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--;
  }
  return len;
}
/**
 * 判断移动端
 */
function isMobile() {
  return /Android|BlackBerry|iPhone|iPad|iPod|SymbianOS|Windows Phone/i.test(navigator.userAgent);
}
/**
 * 判断微信端
 */
function isWechat() {
  return /MicroMessenger/i.test(navigator.userAgent);
}
/**
 * 判断对象类型
 * @param {*} obj
 * @param {*} type
 * @returns
 */
function isTypeOf(obj, type) {
  return Object.prototype.toString.call(obj).slice(8, -1) === type;
}
/**
 * 判断对象类型(原型链)
 * @param {*} instance
 * @param {*} target
 * @returns
 */
function isInstanceOf(instance, target) {
  let proto = instance.__proto__;
  while (true) {
    if (instance === null) return false;
    if (proto === target.prototype) return true;
    proto = proto.__proto__;
  }
}
/**
 * JSONP请求
 *
 * @param {*} url 请求地址
 * @param {*} name 请求名称
 * @param {*} callback 请求回调
 */
function jsonpRequest(url, name = 'jsonpCallback', callback) {
  let script = document.createElement('script');
  script.src = url + '&callback=' + name;
  script.async = true;
  script.type = 'text/javascript';
  window[name] = (data) => {
    callback && callback(data);
  };
  document.body.appendChild(script);
}
/**
 * 数字格式化为单位
 *
 * @param {*} num
 * @param {*} digits
 */
function numWithUnit(num, digits) {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
        si[i].symbol
      );
    }
  }
  return num.toString();
}
/**
 * 数字格式化为千分位
 *
 * @param {*} num
 */
function numToThousands(num) {
  return num.toString().indexOf('.') !== -1
    ? num.toLocaleString()
    : num.toString().replace(/\B(?=(\d{3})+$)/g, ',');
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
      setCallback(value);
      return Reflect.set(target, property, value);
    },
    get(target, property, receiver) {
      getCallback(target, property);
      return Reflect.get(target, property, receiver);
    },
  };
  return new Proxy(obj, handler);
}
/**
 * 时间解析转化为指定格式
 *
 * @param {*} time 指定时间
 * @param {*} format 指定格式
 */
function parseTime(time, format) {
  if (arguments.length === 0) {
    return null;
  }
  format = format || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
    time = parseInt(time);
  } else if (typeof time === 'number' && time.toString().length === 10) {
    time = time * 1000;
  } else {
    date = new Date(time);
  }

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const days = ['日', '一', '二', '三', '四', '五', '六'];
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return days[value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}
/**
 * 生成随机ID
 *
 * @param {*} len ID长度
 */
function randomId(len) {
  return Math.random().toString(36).substr(2, len);
}
/**
 * 生成随机颜色
 *
 */
function randomColor() {
  const hexColor = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0');
  return `#${hexColor}`;
}
/**
 * 生成随机数
 *
 * @param {*} min 最小值
 * @param {*} max 最大值
 */
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * 延迟执行函数
 *
 * @param {*} delay 延迟时间
 */
function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() - start < delay) continue;
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
        return setTimeout(callback, 17);
      };
    }
    // 当前滚动高度
    let top = document.body.scrollTop || document.documentElement.scrollTop;
    const step = () => {
      // 距离目标滚动距离
      const distance = position - top;
      // 目标滚动位置
      top += distance / rate;
      if (Math.abs(distance) < 1) {
        window.scrollTo(0, position);
      } else {
        window.scrollTo(0, top);
        requestAnimationFrame(step);
      }
    };
    step();
  } else {
    element.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
/**
 * 页面滚动动画效果
 * 配合animate.css动画
 *
 */
function scrollAnimation(selector = '.animated') {
  const top = document.body.scrollTop || document.documentElement.scrollTop;
  const vh = document.documentElement.clientHeight;
  const dom = document.querySelectorAll(selector);
  [].slice.call(dom).forEach((v) => {
    if (v.offsetTop < top + vh) {
      const delay = v.dataset.delay;
      if (delay) {
        setTimeout(() => {
          v.style.opacity = 1;
          v.classList.add(v.dataset.animate);
        }, delay);
      } else {
        v.style.opacity = 1;
        v.classList.add(v.dataset.animate);
      }
    } else {
      v.classList.remove(v.dataset.animate);
      v.style.opacity = 0;
    }
  });
}
/**
 * 节流处理函数
 * @param {*} func
 * @param {*} wait
 * @param {*} options
 * @returns
 */
function throttle(func, wait = 1000, options = {}) {
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
/**
 * 获取对象类型
 * @param {*} obj
 */
function typeOf(obj) {
  const type =
    obj instanceof Element
      ? 'element' // 为了统一DOM节点类型输出
      : Object.prototype.toString.call(obj).replace(/\[object\s(.+)\]/, '$1');
  return type;
}
/**
 * URL转File对象
 * @param {*} url
 * @param {*} fileName
 * @param {*} mimeType
 * @returns
 */
function urlToFile(url, fileName, mimeType) {
  return fetch(url)
    .then((res) => {
      return res.arrayBuffer();
    })
    .then((buffer) => {
      return new File([buffer], fileName, { type: mimeType });
    });
}

export {
  animateCallBack,
  animateWithDelay,
  arrFlatten,
  arrShuffle,
  arrStatis,
  asyncPool,
  curryFunc,
  dataUrlToBlob,
  dataUrlToFile,
  debounce,
  deepClone,
  deepCloneWithMC,
  extractDateTime,
  extractDayTime,
  filterXSS,
  floatAddition,
  numWithUnit,
  numToThousands,
  formatTime,
  getQueryParams,
  getQueryObject,
  getQueryObjectFromURL,
  getQueryStringFromObj,
  getUTF8StringLength,
  isMobile,
  isWechat,
  isTypeOf,
  isInstanceOf,
  jsonpRequest,
  observeObject,
  parseTime,
  randomId,
  randomColor,
  randomNum,
  sleep,
  scrollSmoothly,
  scrollAnimation,
  throttle,
  typeOf,
  capitalize,
  urlToFile,
};
