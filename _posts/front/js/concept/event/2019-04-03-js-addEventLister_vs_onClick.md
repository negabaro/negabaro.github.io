---
layout: post
title: "addEventListener와onClick의 차이"
author: negabaro kim
categories: js
tags: js
---

## onclick:

```js
<input type="button" onclick="alert('hello')">
```

## addEventListener:

```js
var button = document.querySelector("input");
button.addEventListener("click", function() {
  alert("hello");
});
```

# addEventListener와onClick의 차이

대게 onClick보다는 addEventListener를 사용하는것을 추천한다

## 이벤트 중첩이 가능 vs 불가능

addEventListener는 여러 개의 이벤트를 중첩 사용가능

onClick은 마지막에 선언한 이벤트만 사용가능(중첩 불가능)overwrite되어버림

```js
let obj = document.getElementById("trigger");
let do1 = () => {
  alert("do1");
};
let do2 = () => {
  alert("do2");
};
obj.onclick = do1;
obj.onclick = do2;
```

위와 같이 onclick을 이용해서 do1,do2를 설정하면 do1의 설정을 overwrite해서 do2만 작동하게 되고 do1함수는 작동하지 않음

그에 반해

```js
obj.addEventListener("click", do1, false);
obj.addEventListener("click", do2, false);
```

addEventListener는 do1,do2가 작성 순서대로 작동하게 됨.
클릭이 일어났을때 여러가지 일이 동작하게 하고 싶고 함수가 분리되어 있다면 addEventListener로러 작성하는것이 좋음

## Separation of concerns측면에서 addEventListener가 좋음

```js
<input type="button" onclick="alert('hello')">
```

이런식으로 html안에 onClick이 있을 경우

onClick안에 있는 이벤트를 변경해야할때 html영역에서 작업을 해야되는 부분이 Separation of concerns측면에서 좋지 않음.

자바스크립트를 HTML으로부터 분리함으로써 필요없는 반복을 줄이게 되고 전체 어플리케이션의 유지를 더 쉽게 만들 수 있음.

## 이벤트버블링과 캡쳐링 지정 가능

세번째 파라메터의 true,false값을 넣을 수 있는데
default 값이 false 이기 때문에, 단순히 사용했다면 버블링을 통해 이벤트를 전파함
true 로 설정해주면 캡처링을 통해 이벤트를 전파한다.

```js
target.addEventListener("click", function() {}, 요기);
```

true라고 할지라도 `e.stopPropagation()` 메소드를 사용하면 이벤트 전파를 하지않게 된다.

```js
target.addEventListener("click", function(e) {
  e.stopPropagation();
});
```

### Reference Link:

https://codeclu.com/questions/52/onclick-addeventlistener-%EC%B0%A8%EC%9D%B4%EC%A0%90
https://mygumi.tistory.com/315
https://ozepon.github.io/onclick_vs_addEventListener/
https://github.com/ozepon/onclick_vs_addEventListener/blob/master/js/app.js
