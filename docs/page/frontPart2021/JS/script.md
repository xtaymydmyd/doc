# JS基础用法

## Object.keys()

`Object.keys()` 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 

```js
let obj = {
    a: 1,
    b: 2,
    c: 3
}
console.log(Object.keys(obj))
//  ['a', 'b', 'c']
```

