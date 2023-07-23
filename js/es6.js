// 1、let const
// 声明块级作用域
// 不存在变量提升，暂时性死区
// 不能重复声明
// const 声明常量，对象属性还是能变动
// 顶层对象属性 window global ，var 声明和window属性是等价的，let const则不是

// 2、解构赋值
// 结构对象，数组，字符串，函数参数，默认值（只在undefined时生效）

// 3、字符串扩展
// \u{} \u0000~\uFFFF
// for of string
// 模板字符串
// 模板编译
// 标签模板
// let a = 5;
// let b = 10;

// tag`Hello ${ a + b } world ${ a * b }`;
// // 等同于
// tag(['Hello ', ' world ', ''], 15, 50);
// 实例方法

// 正则扩展
// 数值扩展

// 函数的扩展
// 默认参数
// 参数解构
// 函数length
// rest参数
// name属性
// 箭头函数

// 数组扩展
// 扩展运算符

// 对象扩展
// 1、属性简洁标识法
// // const baz = {foo};
// // 等同于hello: function ()...
//   hello() { console.log('我的名字是', this.name); }

// 2、属性名表达式 obj['a' + 'bc'] = 123;
// 3、属性的可枚举性和遍历
// 4、属性的遍历
// 5、super关键字 super.foo等同于Object.getPrototypeOf(this).foo
// 6、对象的扩展运算符
// 7、新增的方法 is assign setprototypeOf getPrototypeOf

// 运算符的扩展
// 指数运算符
// 可选连
// 空值合并
// 逻辑赋值运算
// #!命令
// Unix 的命令行脚本都支持#!命令，又称为 Shebang 或 Hashbang。这个命令放在脚本的第一行，用来指定脚本的执行器。
// // 写在脚本文件第一行
// #!/usr/bin/env node
// 'use strict';
// console.log(1);

// // 写在模块文件第一行
// #!/usr/bin/env node
// export {};
// console.log(1);
// # 以前执行脚本的方式
// $ node hello.js

// # hashbang 的方式
// $ ./hello.js

// Symbol
// Set map WeakSet weakMap

// Proxy 拦截13种操作

// var obj = new Proxy({}, {
//   get: function (target, propKey, receiver) {
//     console.log(`getting ${propKey}!`);
//     return Reflect.get(target, propKey, receiver);
//   },
//   set: function (target, propKey, value, receiver) {
//     console.log(`setting ${propKey}!`);
//     return Reflect.set(target, propKey, value, receiver);
//   }
// });

// Reflect

// （1） 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。
// 现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。
// 也就是说，从Reflect对象上可以拿到语言内部的方法。
// （2） 修改某些Object方法的返回结果，让其变得更合理。
// 比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，
// 而Reflect.defineProperty(obj, name, desc)则会返回false。
// 3） 让Object操作都变成函数行为。某些Object操作是命令式，
// 比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)
// 让它们变成了函数行为
// （4）Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。
// 这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，
// 不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。

// Promise
// 手写实现一下

// itrator 和 for of循环
//   默认部署iterator的数据类型
//  [Symbol.iterator]
//  与生成器的结合

// Generator

// async 异步函数

// class

// module

// 编程风格，读懂规格

// 异步遍历器

// ArrayBuffer

// 最新提案
// do表达式

// Decorator

// @frozen class Foo {
//   @configurable(false)
//   @enumerable(true)
//   method() {}

//   @throttle(500)
//   expensiveMethod() {}
// }
