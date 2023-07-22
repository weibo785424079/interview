// 【代码题】 实现一个节流函数? 如果想要最后一次必须执行的话怎么实现?

// 【代码题】 实现一个批量请求函数, 能够限制并发量?

const throttle = (fn, delay = 500) => {
  let timer = null;
  let last = Date.now();
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        timer = Date.now()
        fn();
      }, delay);
      return;
    }
    if (Date.now() - last > delay) {
      fn();
      clearTimeout(timer);
      last = Date.now();
    }
  }
}

const fn =throttle(() => {
  console.log('run')
})

fn()
fn()
fn()

const limitCountRun = (fn, list, count = 5) => {

  const res = [];
  const execing = [];
  let index = 0;

  const run = () => {
    if (list.length) {
      const idx = index++;
      const p = Promise.resolve(fn(list.shift())).then(data => {
        res[idx] = data;
      });
      const prom = p.then(() => {
        const index = execing.findIndex((item) => item === prom);
        execing.splice(index, 1);
      })
      execing.push(prom)
      if (execing.length < count) return run();
      return Promise.race(execing).then(() => run());
    }
    return Promise.all(execing);
  };

  return  run().then(() => res);
}

limitCountRun((data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(data)
      resolve(data)
    }, 1000)
  })
}, [1,2,3,4,5,6], 2).then((res) => {
  console.log(res)
})

// 【代码题】 数组转树结构


// 【代码题】 去除字符串中出现次数最少的字符，不改变原字符串的顺序。

// 【代码题】 去除字符串中出现次数最少的字符，不改变原字符串的顺序。

// 代码题】 写出一个函数trans，将数字转换成汉语的输出，输入为不超过10000亿的数字。

// trans(123456) —— 十二万三千四百五十六
// trans（100010001）—— 一亿零一万零一

function createRepeat(fn, repeat, interval) {
  return (string) => {
    const run =() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          fn(string);
          resolve(--repeat ? run() : undefined)
        }, interval * 1000);
      })
    }
    return run();
  }
}

// const request = createRepeat(console.log, 3,4)

// request('hello world')

// 【代码题】 实现LRU算法
class LRU {
	get(key) {
	}

	set(key, value) {
	}
}

