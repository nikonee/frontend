function createObj() {
  let obj = new Object();
  let con = [].shift.call(arguments);
  obj.__proto__ = con.prototype;
  const res = con.apply(obj, arguments);
  return typeof res === 'object' ? res : obj;
}

const instanceOf = (instance, target) => {
  const prototype = target.prototype;
  let proto = instance.__proto__;
  while (true) {
    if (instance === null) return false;
    if (proto === prototype) return true;
    proto = proto.__proto__;
  }
};

Promise.all = function (iterators) {
  return new Promise((resolve, reject) => {
    if (!iterators || iterators.length === 0) {
      return resolve([]);
    }
    let count = 0,
      result = [];
    for (let i = 0; i < iterators.length; i++) {
      Promise.resolve(iterators[i])
        .then((res) => {
          result[i] = res;
          if (++count === iterators.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          return reject(err);
        });
    }
  });
};

Promise.race = function (iterators) {
  return new Promise((resolve, reject) => {
    for (const iterator of iterators) {
      Promise.resolve(iterator)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

Promise.allSettled = function (iterators) {
  return new Promise((resolve) => {
    if (!iterators || iterators.length === 0) {
      return resolve([]);
    }
    let count = 0,
      result = [];
    for (let i = 0; i < iterators.length; i++) {
      Promise.resolve(iterators[i])
        .then((res) => {
          result[i] = { status: 'fulfilled', value: res };
        })
        .catch((err) => {
          result[i] = { status: 'rejected', reason: err };
        })
        .finally(() => {
          if (++count === iterators.length) {
            resolve(result);
          }
        });
    }
  });
};