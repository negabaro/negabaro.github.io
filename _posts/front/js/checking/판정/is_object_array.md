https://qiita.com/uto-usui/items/698e762d1715f9b2d2bc
https://qiita.com/myzkyy/items/8b1b91e998ef890e868c

```js
function isArray( obj ) {
  return Object.prototype.toString.call( obj ) === "[object Array]"
}

isArray([]);  // true
isArray({});  // false
```