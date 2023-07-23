/**
 * promise 有三个状态：pending，fulfilled，or rejected；「规范 Promise/A+ 2.1」
new promise时， 需要传递一个executor()执行器，执行器立即执行；
executor接受两个参数，分别是resolve和reject；
promise  的默认状态是 pending；
promise 有一个value保存成功状态的值，可以是undefined/thenable/promise；「规范 Promise/A+ 1.3」
promise 有一个reason保存失败状态的值；「规范 Promise/A+ 1.5」
promise 只能从pending到rejected, 或者从pending到fulfilled，状态一旦确认，就不会再改变；
promise 必须有一个then方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 和 promise 失败的回调 onRejected；「规范 Promise/A+ 2.2」
如果调用 then 时，promise 已经成功，则执行onFulfilled，参数是promise的value；
如果调用 then 时，promise 已经失败，那么执行onRejected, 参数是promise的reason；
如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调onRejected；

then 的参数 onFulfilled 和 onRejected 可以缺省，如果 onFulfilled 或者 onRejected不是函数，将其忽略，且依旧可以在下面的 then 中获取到之前返回的值；「规范 Promise/A+ 2.2.1、2.2.1.1、2.2.1.2」
promise 可以 then 多次，每次执行完 promise.then 方法后返回的都是一个“新的promise"；「规范 Promise/A+ 2.2.7」
如果 then 的返回值 x 是一个普通值，那么就会把这个结果作为参数，传递给下一个 then 的成功的回调中；
如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调中；「规范 Promise/A+ 2.2.7.2」
如果 then 的返回值 x 是一个 promise，那么会等这个 promise 执行完，promise 如果成功，就走下一个 then 的成功；如果失败，就走下一个 then 的失败；如果抛出异常，就走下一个 then 的失败；「规范 Promise/A+ 2.2.7.3、2.2.7.4」
如果 then 的返回值 x 和 promise 是同一个引用对象，造成循环引用，则抛出异常，把异常传递给下一个 then 的失败的回调中；「规范 Promise/A+ 2.3.1」
如果 then 的返回值 x 是一个 promise，且 x 同时调用 resolve 函数和 reject 函数，则第一次调用优先，其他所有调用被忽略；「规范 Promise/A+ 2.3.3.3.3」
 */
const PENDING = 'PENDING';
const FULLFILLED = 'FULLFILLED';
const REJECTED = 'REJECTED';

const resolvePromise = (promise1, value, resolve, reject) => {
  if (promise1 === value) {
    return reject(new TypeError());
  }
  let called;
  if (
    (typeof value === 'object' && value !== null) ||
    typeof x === 'function'
  ) {
    try {
      let then = value.then;
      if (typeof then === 'function') {
        then.call(
          value,
          (v) => {
            if (called) return;
            called = true;
            resolvePromise(promise1, v, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          },
        );
      } else {
        resolve(value);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(value);
  }
};

class Promise {
  static resolve = (value) => {
    return new Promise((resolve) => resolve(value));
  };
  static reject(reason) {
    return new Promise((_, reject) => reject(reason));
  }
  static all(values) {
    if (!Array.isArray(values)) {
      return new TypeError('');
    }
    return new Promise((resolve, reject) => {
      let resuleArr = [];
      let orderIndex = 0;

      const procesByKey = (value, index) => {
        resuleArr[index] = value;
        if (++orderIndex === values.length) {
          resolve(resuleArr);
        }
      };
      for (let i = 0; i < values.length; i++) {
        let value = values[i];
        if (value && typeof value.then === 'function') {
          value.then((value) => {
            procesByKey(value, i);
          }, reject);
        } else {
          procesByKey(value, i);
        }
      }
    });
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        const val = promises[i];
        if (val && typeof val.then === 'function') {
          val.then(resolve, reject);
        } else {
          resolve(val);
        }
      }
    });
  }
  catch(cb) {
    return this.then(null, cb);
  }
  finally(callback) {
    return this.then(
      (value) => Promise.resolve(callback()).then(() => value),
      (reason) =>
        Promise.resolve(callback()).then(() => {
          throw reason;
        }),
    );
  }

  constructor(exector) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULLFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      exector(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
    //因为错误的值要让后面访问到，所以这里也要跑出个错误，不然会在之后 then 的 resolve 中捕获
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };

    let promise2 = new this.constructor((resolve, reject) => {
      if (this.status === FULLFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
}

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok1');
  }, 1000);
});

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok2');
  }, 1000);
});

Promise.all([1, 2, 3, p1, p2]).then(
  (data) => {
    console.log('resolve', data);
  },
  (err) => {
    console.log('reject', err);
  },
);

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;

function wrap(promise) {
  let abort;
  const newPromise = new Promise((resolve, reject) => {
    abort = reject;
  });
  const p = Promise.race([promise, newPromise]);
  p.abort = abort;
  return p;
}

exports.wrap = wrap;
