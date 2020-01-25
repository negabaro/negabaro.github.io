
[QUESTION]함수는 복사할 때 bind를 하면 됩니다. this를 기존 함수와 같게 하면 똑같게 함수가 복사됩니다.

```js
var func = function () {
  alert('hi');
};
func2 = func.bind(this);
func2(); // 'hi'
```

https://www.zerocho.com/category/JavaScript/post/5750d384b73ae5152792188d