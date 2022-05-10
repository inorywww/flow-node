# es6语法

## 对象解构（数组解构

```js
//对象
const obj1 = {
    a: 1,
    b: 2,
}
const obj2 = {
    c: 3,
    d: 4,
}
//  a: 1, b: 2, c: 3, d: 4,
const combinedObj = {
    ...obj1,
    ...obj2,
}
//数组
const arr1 = [1, 2];
const arr2 = [3, 4];
//[1, 2, 3, 4] === arr1.concat(arr2)
const combinedArr = [...arr1, ...arr2];

```

