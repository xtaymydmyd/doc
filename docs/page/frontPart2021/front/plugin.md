# 原生JavaScript插件编写指南

### 前提
在jQuery大量使用的环境下，目前网上的众多jQuery插件也能基本满足要求，但是在项目具体需求下，有时候依旧需要自己造轮子，本文介绍了如何不依赖jQuery等库进行原生JavsScript插件的编写。


## 插件需要满足的条件

一个可复用的插件需要满足以下条件：

    插件自身的作用域与用户当前的作用域相互独立，也就是插件内部的私有变量不能影响使用者的环境变量；
    插件需具备默认设置参数；
    插件除了具备已实现的基本功能外，需提供部分API，使用者可以通过该API修改插件功能的默认参数，从而实现用户自定义插件效果；
    插件需提供监听入口，及针对指定元素进行监听，使得该元素与插件响应达到插件效果；
    插件支持链式调用。

以下便针对这四点要求进行逐个讲解，以实现自定义的原生插件。

### 1、插件全局函数

实现私有作用域，最好的办法就是使用闭包。可以把插件当做一个函数，插件内部的变量及函数的私有变量，为了在调用插件后依旧能使用其功能，闭包的作用就是延长函数(插件)内部变量的生命周期，使得插件函数可以重复调用，而不影响用户自身作用域。

故需将插件的所有功能写在一个立即执行函数中：

```js
(function () {
	//插件所有功能都写在这个函数下
})();
```

### 2、插件默认参数

插件的主要功能可以总结至几个关键参数，通过这几个关键参数即可修改插件的主要功能，也是第三步API设置的关键参数。

将默认参数放置在全局函数的最前面，参数变量名为options,通过对象字面量进行赋值：

```js
var options = {
	key1: para1,
	key2: para2,
	key3: para3,
	...
	keyn: paran
}
```
key即为可以插件变量名字，para为该变量对应的值。如我需要编写一个设置颜色的插件，默认颜色为黑色，option应为：
```js
var options = {
	color: '#333333'
}
```
### 3、插件API、参数设置和监听
因为API指向的是使用者，故需要在用户调用插件时将API暴露给用户，因用户API时是通过插件提供的名字进行使用，故将API设置为Object类型，用户就可以通过调用API的key进行使用，具体的代码如下：

```js
var api = {
	config: function (ops) {
		//....
		return this;
	},
	listen: function listen(elem) {
		//...
		return this;
	},
	feature1: function() {
		//...
	},
	feature2: function() {
		//...
	}
}
this.pluginName = api;
```

上面提供了api的写法示范，该api提供了config以设置自定义参数，listen为插件监听的dom操作，feature为插件的主要功能，使用options参数的功能都要写在api下，注意api.config和api.listen两个函数都应该在最后返回this，以便实现插件的链式调用。

有了上面的框架，针对config设置函数的写法就有了明确的要求：在用户没有传入自定义函数时，默认使用上一节options中的参数，如果用户有设置config参数，使用用户自定义参数：

```js
config: function (opts) {
	//没有参数传入，直接返回默认参数
	if(!opts) return options;
	//有参数传入，通过key将options的值更新为用户的值
	for(var key in opts) {
		options[key] = opts[key];
	}
	return this;
}
```

针对元素的监听listen，需要对所有符合条件的dom元素进行监听：
```js
listen: function listen(elem) {
	//这里通过typeof设置监听的元素需为字符串调用，实际可根据需要进行更改
	if (typeof elem === 'string') {
		//这里使用ES5的querySelectorAll方法获取dom元素
		var elems = document.querySelectorAll(elem),
			i = elems.length;
			//通过递归将listen方法应用在所有的dom元素上
			while (i--) {
				listen(elems[i]);
			}
			return
	}
	//在这里，你可以将插件的部分功能函数写在这里

	return this;
}
```

在config和listen这两个最基本的API完成后，需要将API与插件的名字结合起来：
```js
this.pluginName = api;
```
则最基本的API如下：
```js
var api = {
	//插件参数设定
	config: function (opts) {
		if(!opts) return options;
		for(var key in opts) {
			options[key] = opts[key];
		}
		return this;
	},
	//插件监听
	listen: function listen(elem) {
		if (typeof elem === 'string') {
			var elems = document.querySelectorAll(elem),
				i = elems.length;
				while (i--) {
					listen(elems[i]);
				}
				return
		}
		//插件功能函数可以写在这
		return this;
	}
}
//将API赋值给插件名字
this.pluginName = api;
```
则用户使用该插件时，调用方式为：
```js
pluginName.listen('#demo');
```
如需要自定义参数
```js
pluginName.config({key: 'para'}).listen('#demo');
//因为config和listen已经返回this，所有可以这样调用：
pluginName.listen('#demo').config({key: 'para'});
//还可以这样调用：
pluginName.config({key: 'para'})
		  .listen('#demo');
```


