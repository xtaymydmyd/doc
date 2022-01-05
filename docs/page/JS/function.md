# 函数

## Arguments 对象
`arguments` 是一个对应于传递给函数的参数的类数组对象。[MDN文档地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)

`arguments`对象是所有（非箭头）函数中都可用的局部变量。你可以使用`arguments`对象在函数中引用函数的参数。此对象包含传递给函数的每个参数，第一个参数在索引0处

```js
function func1(a, b, c) {
  console.log(arguments[0]);
  // expected output: 1

  console.log(arguments[1]);
  // expected output: 2

  console.log(arguments[2]);
  // expected output: 3
}

func1(1, 2, 3);

```

参数也可以被设置：
```js
arguments[1] = 'new value';
```

`arguments`对象不是一个 `Array` 。它类似于Array，但除了length属性和索引元素之外没有任何Array属性。例如，它没有 pop 方法。但是它可以被转换为一个真正的Array：

```js
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);

// ES2015
const args = Array.from(arguments);
const args = [...arguments];
```

### 对参数使用 typeof
`typeof`参数返回 'object'。

```js
console.log(typeof arguments);    // 'object'
// arguments 对象只能在函数内使用
function test(a){
    console.log(a,Object.prototype.toString.call(arguments));
    console.log(arguments[0],arguments[1]);
    console.log(typeof arguments[0]);
}
test(1);
/*
1 "[object Arguments]"
1 undefined
number
*/
```

可以使用索引确定单个参数的类型。
```js
console.log(typeof arguments[0]); //this will return the typeof individual arguments.
```

### 对参数使用扩展语法
您还可以使用`Array.from()`方法或扩展运算符将参数转换为真实数组：

```js
var args = Array.from(arguments);
var args = [...arguments];
```

### 属性
`arguments.callee`指向参数所属的当前执行的函数。指向调用当前函数的函数。

`arguments.length`传递给函数的参数数量。

`arguments[@@iterator]`返回一个新的Array 迭代器 对象，该对象包含参数中每个索引的值。
