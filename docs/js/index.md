```js
//  1、防抖
function debounce(func, wait = 300) {
  let timeout;
  return function () {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout((...args) => {
      func.apply(this, args);
      timeout = null;
    }, wait);
  };
}

// 2、节流 【代码题】 实现一个节流函数? 如果想要最后一次必须执行的话怎么实现?
function throttle(func, wait = 300) {
  let preTime = 0;
  return function () {
    if (Date.now() - preTime > wait) {
      func.apply(this, arguments);
      preTime = Date.now();
    }
  };
}

// 3、实现instanceOf

const myInstanceOf = (target, origin) => {
  if (typeof target !== 'object' || target === null) return false;
  if (typeof origin !== 'function') return false;
  let proto = Object.getPrototypeOf(target);
  while (proto) {
    if (proto === origin.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};

// 4、实现reduce
Array.prototype.myReduce = function (cb, initialValue) {
  const arr = this;
  let prev = initialValue === undefined ? arr[0] : initialValue;
  for (let i = initialValue === undefined ? 1 : 0; i < arr.length; i++) {
    prev = cb(prev, arr[i], i, arr);
  }
  return prev;
};

// 5、【代码题】 实现一个批量请求函数, 能够限制并发量?

const limitCountRun = (fn, list, count = 5) => {
  const res = [];
  const execing = [];
  let index = 0;

  const run = () => {
    if (list.length) {
      const idx = index++;
      const p = Promise.resolve(fn(list.shift())).then((data) => {
        res[idx] = data;
      });
      const prom = p.then(() => {
        const index = execing.findIndex((item) => item === prom);
        execing.splice(index, 1);
      });
      execing.push(prom);
      if (execing.length < count) return run();
      return Promise.race(execing).then(() => run());
    }
    return Promise.all(execing);
  };

  return run().then(() => res);
};

// 6、【代码题】 数组转树结构
const trnaformListToTree = (list) => {
  const res = [];
  const map = {};
  for (let item of list) {
    const id = item.id;
    if (!map[id]) {
      map[id] = {
        ...item,
        children: [],
      };
    }
  }

  for (let item of list) {
    if (item.parentId) {
      map[item.parentId].children.push(item);
      continue;
    }
    res.push(map[item.id]);
  }
  return res;
};
// 7、【代码题】 去除字符串中出现次数最少的字符，不改变原字符串的顺序。

// 8、【代码题】 去除字符串中出现次数最少的字符，不改变原字符串的顺序。

// 9、代码题】 写出一个函数trans，将数字转换成汉语的输出，输入为不超过10000亿的数字。 trans(123456) —— 十二万三千四百五十六，trans（100010001）—— 一亿零一万零一

// 10、实现请求重试
function createRepeat(fn, repeat = 5) {
  return (string) => {
    const run = () => {
      const promise = Promise.resolve(fn());
      return promise.catch((e) => (repeat-- ? run(string) : Promise.reject(e)));
    };
    return run();
  };
}

const runRepeat = createRepeat(function () {
  return Math.random() > 0.7 ? '成功' : Promise.reject('fail');
});

// 11、【代码题】 实现LRU算法
class LRU {
  data = new Map();
  constructor(length) {
    this.length = length;
  }
  get(key) {
    const data = this.data;
    if (!data.has(key)) return null;
    const value = data.get(key);
    data.delete(key);
    data.set(key, value);
    return value;
  }

  set(key, value) {
    const data = this.data;
    if (data.has(key)) data.delete(key);
    data.set(key, value);
    if (data.size > this.length) {
      const delKey = data.keys().next().value;
      data.delete(delKey);
    }
  }
}
// 12, 快速排序
function quickSort(arr) {
  if (arr.length < 2) return arr;
  const index = (arr.length / 2) >> 0;
  const middle = arr[index];
  arr.splice(index, 1);
  const left = [];
  const right = [];
  for (let item of arr) {
    if (item < middle) {
      left.push(item);
    } else right.push(item);
  }
  return quickSort(left).concat(middle).concat(quickSort(right));
}

// 13、堆排序 顶堆

function heapify(arr, n, i) {
  let largest = i;
  const left = i * 2 + 1;
  const right = i * 2 + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

function heapSort(arr) {
  // 构建堆
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  // 排序
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
}

// 14、归并排序
function mergeSort(arr) {
  const len = arr.length;
  if (len < 2) return arr;
  // --- “分”
  const m = Math.floor(len / 2);
  const left = arr.slice(0, m);
  const right = arr.slice(m);
  // --- “合”
  return merge(mergeSort(left), mergeSort(right));
}

/**
 * 合并数组（排序）
 * @param {number[]} A - 子数组（左）
 * @param {number[]} B - 子数组（右）
 * @return {number[]} 合并且排序后的数组
 */
function merge(A, B) {
  const merged = [];
  while (A.length > 0 && B.length > 0) {
    if (A[0] <= B[0]) {
      merged.push(A.shift());
    } else {
      merged.push(B.shift());
    }
  }

  if (A.length > 0) {
    merged.push(...A);
  } else if (B.length > 0) {
    merged.push(...B);
  }

  return merged;
}

// 15、实现create
Object.myCreate = function (o) {
  function fun() {}
  fun.prototype = o;
  return new fun();
};

// 16、数组扁平化
function flat(arr) {
  const result = [];
  for (let item of arr) {
    if (Array.isArray(item)) result.push(...flat(item));
    else result.push(item);
  }
  return result;
}
// 17、数组去重复 使用map

// 18、实现promise
// promise.js

// 19、实现深拷贝
function deepClone(obj, hash = new WeakMap()) {
  if (obj == null) return obj; //null 和 undefined 都不用处理
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== 'object') return obj; // 普通常量直接返回

  //  防止对象中的循环引用爆栈，把拷贝过的对象直接返还即可
  if (hash.has(obj)) return hash.get(obj);

  // 不直接创建空对象的目的：克隆的结果和之前保持相同的所属类
  // 同时也兼容了数组的情况
  let newObj = new obj.constructor();

  hash.set(obj, newObj); // 制作一个映射表

  //判断是否有 key 为 symbol 的属性
  let symKeys = Object.getOwnPropertySymbols(obj);
  if (symKeys.length) {
    symKeys.forEach((symKey) => {
      newObj[symKey] = deepClone(obj[symKey], hash);
    });
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 不拷贝原型链上的属性
      newObj[key] = deepClone(obj[key], hash); // 递归赋值
    }
  }
  return newObj;
}

// 20、字符串转二进制
function charToBinary(text) {
  let code = '';
  for (let i of text) {
    // 字符编码
    let number = i.charCodeAt().toString(2);
    // 1 bytes = 8bit，将 number 不足8位的0补上
    for (let a = 0; a <= 8 - number.length; a++) {
      number = 0 + number;
    }
    code += number;
  }
  return code;
}

// 21、实现new操作符
function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);
  const result = constructor.apply(obj, args);

  if (typeof result !== 'object' && result !== null) {
    return result;
  }
  return obj;
}

// 22、实现call
function myCall(fn, context, ...args) {
  if (typeof fs !== 'function') {
    throw new TypeError('');
  }
  const key = Symbol();
  context[key] = fn;
  const result = context[key](...args);
  delete context[key];
  return result;
}

// 23、手写bind
function myBind(fn, context, ...args) {
  if (typeof fn !== 'function') {
    throw new TypeError();
  }
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
}

// 24、希尔排序
function shellSort(arr) {
  let gap = Math.floor(arr.length / 2);
  while (gap >= 1) {
    for (let i = gap; i < arr.length; i++) {
      let j = i;
      while (arr[j] > arr[i - gap] && j - gap >= 0) {
        [arr[j], arr[i]] = [arr[i], arr[j]];
        j -= gap;
      }
    }
    gap = Math.floor(gap / 2);
  }
  return arr;
}

// 25 选择排序
var selectionSort = function (nums) {
  const len = nums.length;
  let minIndex;

  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j;
      }
    }
    swap(nums, i, minIndex);
  }
};

// 26、插入排序
function insertSort2(arr) {
  if (arr.length < 2) {
    return arr;
  }
  for (let i = 1; i < arr.length; i++) {
    count++;
    let insertValue = arr[i];
    let j = i - 1;
    // 循环执行的条件是当前插入的元素小于当前遍历到的元素
    for (; j >= 0 && insertValue < arr[j]; j--) {
      // 之所以可以始终后移，不怕覆盖最后一位元素，是因为最后一位即为待插入元素的位置
      arr[j + 1] = arr[j]; // 如果 当前插入的元素小于当前遍历到的元素，则将该位置元素后移
    }
    arr[j + 1] = insertValue;
  }
  return arr;
}

// 26、格式化金额
const formatMoney = (str) => {
  return str.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
};

// 27、冒泡排序
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 1; j < arr.length - i; j++) {
      if (arr[j - 1] > arr[j]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      }
    }
  }
  return arr;
}
```
