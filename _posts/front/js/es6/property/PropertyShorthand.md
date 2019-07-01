---
layout: post
title: "Javascript ES6 프로퍼티 축약 표현"
author: negabaro kim
categories: javascript
tags: javascript
---

# 프로퍼티 축약 표현

ES5에서 객체 리터럴의 프로퍼티는 프로퍼티 이름과 프로퍼티 값으로 구성되었다.

프로퍼티의 값은 변수에 할당된 값일 수도 있다.

```
// ES5
var dahyun = "dubu",  momo = "moguri";

var obj = {
  dahyun: dahyun,
  momo: momo
};

console.log(obj); // { dahyun: dubu, momo: moguri }
```

ES6에서는 `프로퍼티 값으로 변수를 사용하는 경우`, `프로퍼티 이름을 생략(Property shorthand`)할 수 있다.

이때 프로퍼티 이름은 변수의 이름으로 자동 생성된다.

```
// ES6
let dahyun = "dubu",  momo = "moguri";

const obj = { dahyun, momo };

console.log(obj); // { dahyun: dubu, momo: moguri }
```

### Reference Link:

https://poiemaweb.com/es6-enhanced-object-property#3-%EB%A9%94%EC%86%8C%EB%93%9C-%EC%B6%95%EC%95%BD-%ED%91%9C%ED%98%84
