# mustache - vue 

!未完待续

## 概述 

模板引擎是将数据data变为视图view（html）的解决方案

`Mustache`是常见的Web模板引擎中的一种，这些年随着前端的不断发展,基于javascript的模版引擎越来越多。目前流行有 `Mustache`、`Hogan`、`doT.js`、`JsRender`、`Kendo UI Templates`等

## 简介

`Mustache`是一个`logic-less`(轻逻辑)模板解析引擎,它的优势在于可以应用在`Javascript`、`PHP`、`Python`、`Perl`等多种编程语言中。

## npm 安装

```terminal
npm install mustache@4.2.0 --save
```

## 样例代码

```js
var view = {
  title: "Joe",
  calc: function () {
    return 2 + 4;
  }
};

var output = Mustache.render("{{title}} spends {{calc}}", view);

```

## mustache的原理
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0de58a1fb40046baacaff130d2038101~tplv-k3u1fbpfcp-watermark.image)

### replace()方法 和 正则表达式实现最简单的模板数据填充

* replace()方法

    这个方法接收两个参数，第一个参数可以是一个RegExp对象或一个字符串（这个字符串不会转换为正则表达式），第二个参数可以是一个字符串或一个函数

    replace()的第二个参数可以是一个函数。在只有一个匹配项时，这个函数会收到3个参数：与整个模式匹配的字符串、匹配项在字符串中的开始位置，以及整个字符串

    ```js
    console.log('我爱踢足球，我爱脱口秀'.replace(/我/g, function (a, b, c) {
        console.log(a, b, c)
        return '你'
    }))
    ```

* 正则的捕获

    ```
        /\}\}{(\w+)\}\}/ 
    ```

    表示捕获{{}}中间的多个文字或数字

    ```
    var templateStr = '<h1>我买了一个{{thing}}，好{{mood}}的啊</h1>'
        console.log(templateStr.replace(/\{\{(\w+)\}\}/g, function (a, b, c, d) {
        console.log(a, b, c, d)
        return '*'
    }))

    ```

    ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c033ba637b7b48b093094083b180bab6~tplv-k3u1fbpfcp-watermark.image)

* 实现

    ```html
    <div id="container"></div>

    <script>
    var templateStr = '<h1>我买了一个{{thing}}，花了{{money}}，好{{mood}}</h1>'
    var data = {
        thing: '华为手机',
        money: 5999,
        mood: '开心'
    }
    // 最简单的模板引擎实现机理，利用的是正则表达式中的 replace() 方法
    // replace() 的第二个参数可以是一个函数，这个函数提供捕获的东西的参数，就是 $1 结合data对象，即可进行智能的替换
    // function中的参数分别是：①findStr匹配到的部分{{thing}} ②捕获到的thing ③位置9 ④原串
    function render(templateStr, data) {
        return templateStr.replace(/\{\{(\w+)\}\}/g, function (findStr, $1) {
        return data[$1]
        })
    }
    var domStr = render(templateStr, data)
    var container = document.getElementById('container')
    container.innerHTML = domStr
    </script>


    ```

## mustache 的实现原理

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6b73e5d90364a29bc9fb94ddaeba36a~tplv-k3u1fbpfcp-watermark.image)

## 什么是 tokens？

tokens 是`JS的嵌套数组`，就是`模板字符串的JS表示` 它是`抽象语法树`、`虚拟节点`等的`开山鼻祖`

## tokens最简单的形式

模板字符串
```
<h1>我买了一个{{thing}}，好{{mood}}啊</h1>
```
tokens
```
[
  ["text", "<h1>我买了一个"],
  ["name", "thing"],
  ["text", "好"],
  ["name", "mood"],
  ["text", "啊</h1>"]
]

```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d96c310dd0664a00b622ae964f99e6ef~tplv-k3u1fbpfcp-watermark.image)

## 循环数组情况下的 tokens

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9766b3c82084f15aec05d9d164eccf0~tplv-k3u1fbpfcp-watermark.image)

## 多重循环

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a395024305243db8dc7c40c8437dfb4~tplv-k3u1fbpfcp-watermark.image)

## 实现 mustache 库 的重点是

* 将模板字符串编译为 tokens
* 将 tokens 结合数据data，解析为 DOM 字符串