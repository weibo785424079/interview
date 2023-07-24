https://juejin.cn/post/7243019785100165179

1. DOCTYPE 的作用
   告诉浏览器以什么样的模式来解析文档（标准模式、兼容模式）

2. 对 html 语义化的理解
   用合适的标签做合适的事情，有利于搜索引擎爬取有效信息，支持读屏软件，生成目录，对开发者友好

3. javascript 延迟加载的方式
   放在文档底部
   添加 defer 属性
   添加 async 属性
   动态创建，控制创建的时机

4. 常见的 meta 标签 提交 html 文档的元数据
   chartset 指定 html 文档的编码 utf-8
   name & content

5. 在 meta 中设置 name=viewport
   控制视口的大小和比例

6. html5 有哪些更新
   新特性 新标签 nav audio localstorage canvas history API

7. 行内元素 块级元素
   a b span img inpuit select strong i
   div ul ol li dl dt dd p

8. web worker
   运行在后台的 js

9. iframe 的优缺点
10. html5 drag API
    dragstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发。
    darg：事件主体是被拖放元素，在正在拖放被拖放元素时触发。
    dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。
    dragover：事件主体是目标元素，在被拖放在某元素内移动时触发。
    dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发。
    drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。
    dragend：事件主体是被拖放元素，在整个拖放操作结束时触发。
