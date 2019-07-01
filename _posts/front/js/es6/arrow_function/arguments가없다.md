화살표 함수에는 arguments 객체가 없기 때문에 일반적으로 사용하는 함수와 다르다. 하지만 ES6의 나머지 매개변수 문법을 사용하면 매개변수에 접근할 수 있다.

```
var sumArguments = (...args) => {
   console.log(typeof arguments); // => 'undefined'
   return args.reduce((result, item) => result + item);
};
sumArguments.name      // => ''
sumArguments(5, 5, 6); // => 16
```

http://webframeworks.kr/tutorials/translate/explanation-of-this-in-javascript-2/
