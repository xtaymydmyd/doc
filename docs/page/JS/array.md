# Array

`https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array`

## Array.prototype.filter()
`filter()` 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
```js
// 筛选排除所有较小的值(创建了一个新数组，该数组的元素由原数组中值大于 10 的元素组成)
function isBigEnough(element) {
  return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]
```

```js
// 过滤 JSON 中的无效条目(创建具有非零 id 的元素的 json)
var arr = [
  { id: 15 },
  { id: -1 },
  { id: 0 },
  { id: 3 },
  { id: 12.2 },
  { },
  { id: null },
  { id: NaN },
  { id: 'undefined' }
];
var invalidEntries = 0;

function isNumber(obj) {
  return obj !== undefined && typeof(obj) === 'number' && !isNaN(obj);
}

function filterByID(item) {
  if (isNumber(item.id) && item.id !== 0) {
    return true;
  }
  invalidEntries++;
  return false;
}

var arrByID = arr.filter(filterByID);

console.log('Filtered Array\n', arrByID);
// Filtered Array
// [{ id: 15 }, { id: -1 }, { id: 3 }, { id: 12.2 }]

console.log('Number of Invalid Entries = ', invalidEntries);
```

```js
//在数组中搜索(根据搜索条件来过滤数组内容)
var fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

/**
 * Array filters items based on search criteria (query)
 */
function filterItems(query) {
  return fruits.filter(function(el) {
      return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
  })
}

console.log(filterItems('ap')); // ['apple', 'grapes']
console.log(filterItems('an')); // ['banana', 'mango', 'orange']
```

## Array.prototype.every()
`every()`方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。