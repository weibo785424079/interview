_Q: 怎么看 nodejs 可支持高并发_

1.  nodejs 的单线程架构模型
    nodejs 其实并不是真正的单线程架构，因为 nodejs 还有 I/O 线程存在（网络 I/O、磁盘 I/O），这些 I/O 线程是由更底层的 libuv 处理，这部分线程对于开发者来说是透明的。 JavaScript 代码永远运行在 V8 上，是单线程的。

优势：
单线程就一个线程在玩，省去了线程间切换的开销
还有线程同步的问题，线程冲突的问题的也不需要担心

劣势：

劣势也很明显，现在起步都是 4 核，单线程没法充分利用 cpu 的资源
单线程，一旦崩溃，应用就挂掉了，大家调试脚本也知道一旦执行过程报错了，本次调试就直接结束了
因为只能利用一个 cpu ，一旦 cpu 被某个计算一直占用， cpu 得不到释放，后续的请求就会一直被挂起，直接无响应了

> 当然这些劣势都已经有成熟的解决方案了，使用 PM2 管理进程，或者上 K8S 也可以

2. 核心：事件循环机制
3. 给出个结论 nodejs 是异步非阻塞的，所以能扛住高并发
   1. 阻塞：在等待调用结果时，线程挂起了，不往下执行, 非阻塞：与上面相反，当前线程继续往下执行

_Q: 介绍下 nodejs 的事件循环_

1. Timers: 定时器 Interval Timoout 回调事件，将依次执行定时器回调函数
2. Pending: 一些系统级回调将会在此阶段执行
3. Idle,prepare: 此阶段"仅供内部使用"
4. Poll: IO 回调函数，这个阶段较为重要也复杂些，
5. Check: 执行 setImmediate() 的回调
6. Close: 执行 socket 的 close 事件回调

_Q: nodejs 怎么创建进程线程，可以用在哪些场景_

child_process worker_threads cluster

_Q: koa2 洋葱模型的实现和原理_

```js
// koa-compose/index.js
function compose(middleware) {
  // middleware 函数数组
  if (!Array.isArray(middleware))
    throw new TypeError('Middleware stack must be an array!');
  for (const fn of middleware) {
    if (typeof fn !== 'function')
      throw new TypeError('Middleware must be composed of functions!');
  }
  /*
      content:上下文  
      next:新增一个中间件方法，位于所有中间件末尾，用于内部扩展
    */
  return function (context, next) {
    // last called middleware #
    let index = -1; // 计数器，用于判断中间是否执行到最后一个
    return dispatch(0); // 开始执行第一个中间件方法
    function dispatch(i) {
      if (i <= index)
        return Promise.reject(new Error('next() called multiple times'));
      index = i;
      let fn = middleware[i]; // 获取中间件函数
      if (i === middleware.length) fn = next; // 如果中间件已经到了最后一个，执行内部扩展的中间件
      if (!fn) return Promise.resolve(); // 执行完毕，返回 Promise
      try {
        // 执行 fn ，将下一个中间件函数赋值给 next 参数，在自定义的中间件方法中显示的调用 next 函数，中间件函数就可串联起来了
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}
```

_Q: 介绍下 stream_

流，可以理解成是一个管道，比如读取一个文件，常用的方法是从硬盘读取到内存中，在从内存中读取，这种方式对于小文件没问题，但若是大文件，效率就非常低，还有可能内存不足，采用流的方式，就好像给大文件插上一根吸管，持续的一点点读取文件的内容，管道的另一端收到数据，就可以进行处理

Stream 是一种处理流式数据的抽象接口，用于读取、写入、转换和操作数据流。它是一个基于事件的 API，可以让我们以高效、低延迟的方式处理大型数据集。

Writable - 可写入数据的流（例如 fs.createWriteStream()）。
Readable - 可读取数据的流（例如 fs.createReadStream()）。
Duplex - 可读又可写的流（例如 net.Socket）。
Transform - 在读写过程中可以修改或转换数据的 Duplex 流（例如 zlib.createDeflate()）。
接触比较多的还是第一二种
pipe 来消费可读流

_Q: nodejs 日志切割用什么实现_

用 winston 和 winston-daily-rotate-file 实现日志管理和切割，日切和根据大小进行切割。

_Q: 关于字符编码_

ASCII：编码的规范标准

Unicode：将全世界所有的字符包含在一个集合里，计算机只要支持这一个字符集，就能显示所有的字符，再也不会有乱码了。Unicode 码是 ASCII 码的一个超集(superset)
UTF-32 UTF-8 UTF-16 都是 Unicode 码的编码形式
UTF-32：用固定长度的四个字节来表示每个码点
UTF-8：用可变长度的字节来表示每个码点,如果只需要一个字节就能表示的,就用一个字节,一个不够,就用两个…所以,在 UTF-8 编码下,一个字符有可能由 1-4 个字节组成.
UTF-16：结合了固定长度和可变长度,它只有两个字节和四个字节两种方式来表示码点

_Q: npm install 的执行过程_

1. 发出 npm install 命令
2. 查询 node_modules 目录之中是否已经存在指定模块
3. 若存在，不再重新安装
4. 若不存在
5. npm 向 registry 查询模块压缩包的网址
6. 下载压缩包，存放在根目录下的.npm 目录里
7. 解压压缩包到当前项目的 node_modules 目录

执行 npm install

1. 执行工程自身 preinstall，当前 npm 工程如果定义了 preinstall 钩子此时会被执行。
2. 确定首层依赖模块，首先需要做的是确定工程中的首层依赖，也就是 dependencies 和 devDependencies 属性中直接指定的模块（假设此时没有添加 npm install 参数）。工程本身是整棵依赖树的根节点，每个首层依赖模块都是根节点下面的一棵子树，npm 会开启多进程从每个首层依赖模块开始逐步寻找更深层级的节点。
   获取模块，获取模块是一个递归的过程，分为以下几步：
3. 获取模块信息。在下载一个模块之前，首先要确定其版本，这是因为 package.json 中往往是 semantic version（semver，语义化版本）。此时如果版本描述文件（npm-shrinkwrap.json 或 package-lock.json）中有该模块信息直接拿即可，如果没有则从仓库获取。如 packaeg.json 中某个包的版本是 ^1.1.0，npm 就会去仓库中获取符合 1.x.x 形式的最新版本。
4. 获取模块实体。上一步会获取到模块的压缩包地址（resolved 字段），npm 会用此地址检查本地缓存，缓存中有就直接拿，如果没有则从仓库下载。
   查找该模块依赖，如果有依赖则回到第 1 步，没有则停止。
5. 安装模块，这一步将会更新工程中的 node_modules ，并执行模块中的生命周期函数（按照 preinstall、install、postinstall 的顺序）。
6. 执行工程自身生命周期，当前 npm 工程如果定义了钩子此时会被执行（按照 install、postinstall、prepublish、prepare 的顺序）。
