---
layout: post
title: "Javascript ES6 Arrow function에 대해서"
author: negabaro kim
categories: javascript
tags: javascript
---

화살표 함수의 기본 문법은 아래와 같다.

# 매개변수 지정 방법

|-------|--------|---------|
| before | after | 설명|
| () |() => {}| |매개변수가 없을 경우|
| (x){} | x => {}|| 매개변수가 한 개인 경우, 소괄호를 생략할 수 있다.|
| (x,y){} | (x, y) => {}|| 매개변수가 여러 개인 경우, 소괄호를 생략할 수 없다.|

```
// 매개변수 지정 방법
    () => { ... } // 매개변수가 없을 경우
     x => { ... } // 매개변수가 한 개인 경우, 소괄호를 생략할 수 있다.
(x, y) => { ... } //
```

````

# 함수 몸체 지정 방법

```
// 함수 몸체 지정 방법
x => { return x * x }  // single line block
x => x * x             // 함수 몸체가 한줄의 구문이라면 중괄호를 생략할 수 있으며 암묵적으로 return된다. 위 표현과 동일하다.

() => { return { a: 1 }; }
() => ({ a: 1 })  // 위 표현과 동일하다. 객체 반환시 소괄호를 사용한다.

() => {           // multi line block.
  const x = 10;
  return x * x;
};
```

아 그리구 arrow func을 쓰면 bind(this) 하지 않아두 되서 편해요

### Reference Link:

https://qiita.com/mejileben/items/69e5facdb60781927929
https://poiemaweb.com/es6-arrow-function
````
