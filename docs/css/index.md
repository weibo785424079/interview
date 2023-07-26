1. css 选择器有哪些
   id 类 标签 后代 相邻后代 兄弟 相邻兄弟 属性 伪类 伪元素 通配符

2. css 选择器优先级
   !important 正无穷
   行内 1000
   id 100
   类、伪类、属性 10
   标签 1
   通配、子类、兄弟 0
   !important > 行内样式>ID 选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性

3. display 的值有哪些
   block none inline inline-block list-item table flex linle-flex grid

4. 伪类和伪元素的区别
   伪类更多定义的是状态 :hover :active :focus :visited :link :not :first-child :last-child

5. 伪元素 不存在 dom 树中的虚拟元素
   before after ::fitst-letter ::first-line

6. 、盒子模型
7. 、px em rem vh vw
8. 、居中布局
9. 影藏元素的方法
   display none
   visiblible hidden
   opacity 0
   position absolute
   z-index 负值
   transform：scale(0,0)

10. 两列自适应
11. 三列自适应
12. bfc 块级格式化上下文
    独立容器，内部元素不会影响外部
    根元素
    float 不为 none
    overflow 不为 visible
    display inline-block table flex grid
    position 为 absolute 或 fixed
    清除内部浮动
    同一个 bfc 相邻 margin 会塌陷

13. css 新特性
    属性选择器
    圆角
    rgba
    transform trsiontion animation
    box-shadow text0shadow text-decoration 渐变

14. link 和@import 的区别
    link 是 XHTML 标签 @import 属于 css 规范
    link 引用 CSS 时，在页面载入时同时加载；@import 需要页面网页完全载入以后加载。@import 会产生闪烁的问题
    link 支持使用 Javascript 控制 DOM 去改变样式；而@import 不支持

15. requestAnimationframe 要求浏览器在下次重绘之前调用指定的回调函数更新动画
    优势 cpu 节能未激活刷新次数会降低 函数节流（高频事件保证执行一次） 减少 dom 操作
