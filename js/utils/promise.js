const PENDING = 'pending'; // 挂起状态
const FULFILLED = 'fulfilled'; // 完成状态
const REJECTED = 'rejected'; // 拒绝状态

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }
  // 储存状态的变量
  status = PENDING;
  // 完成后返回的值
  value = null;
  // 拒绝返回的原因
  reason = null;
  // 完成回调函数数组
  onFulfilledCallbacks = [];
  // 拒绝回调函数数组
  onRejectedCallbacks = [];

  // 声明静态方法
  static resolve(obj) {
    if (obj instanceof MyPromise) {
      return obj;
    }
    return new MyPromise((resolve) => {
      resolve(obj);
    });
  }
  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason);
    });
  }

  // 使用箭头函数指向当前实例
  // 完成后更改状态
  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      while (this.onFulfilledCallbacks.length > 0) {
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  };
  // 拒绝后更改状态
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      while (this.onRejectedCallbacks.length > 0) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  };

  then(onFulfilled, onRejected) {
    // 判断回调参数类型
    const onFulfilledCallback = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    const onRejectedCallback =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };
    // 返回promise对象用于链式调用
    const promise = new MyPromise((resolve, reject) => {
      // 创建微任务等待promise初始化完成
      const fulfilledMicrotask = () =>
        queueMicrotask(() => {
          try {
            this.resolvePromise(onFulfilledCallback(this.value), promise, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });

      const rejectedMicrotask = () =>
        queueMicrotask(() => {
          try {
            this.resolvePromise(onRejectedCallback(this.reason), promise, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });

      if (this.status === FULFILLED) {
        fulfilledMicrotask();
      } else if (this.status === REJECTED) {
        rejectedMicrotask();
      } else if (this.status === PENDING) {
        // 储存回调函数等待状态更新后执行
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });

    return promise;
  }

  resolvePromise(obj, promise, resolve, reject) {
    // 判断返回值是不是自身,如果是则抛出类型错误
    if (obj === promise) {
      return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    if (typeof obj === 'object' || typeof obj === 'function') {
      if (obj === null) {
        return resolve(obj);
      }
      let then;
      try {
        then = obj.then;
      } catch (err) {
        return reject(err);
      }
      if (typeof then === 'function') {
        let called = false;
        try {
          then.call(
            obj,
            (value) => {
              if (called) return;
              called = true;
              this.resolvePromise(value, promise, resolve, reject);
            },
            (reason) => {
              if (called) return;
              called = true;
              reject(reason);
            }
          );
        } catch (err) {
          if (called) return;
          reject(err);
        }
      } else {
        resolve(obj);
      }
    } else {
      resolve(obj);
    }
  }
}

Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });

module.exports = MyPromise;
