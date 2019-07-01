---
layout: post
title: "Javascript 함수의 메소드 call,apply"
author: negabaro kim
categories: javascript
tags: javascript
---

# call,apply는 왜 알아야하는가?

this의 참조값을 바꿔서 Javascript의 재사용/공유 패턴을 이해하기 위해

# call,apply란

JS function 객체가 기본적으로 갖고 있는 메소드

`()`와 같은 `선언한 함수 호출이 가능`

this가 참조하는 값을 바꿀 수 있다.

# call,apply의 차이

`인자 하나씩 전달하느냐(call)` `인자 리스트를 전달하느냐(apply)` 의 차이뿐이다

# 1. 함수호출

함수 뒤에 ()를 붙이는 것과, call 그리고 apply하는 방법이 있다.

### call 함수호출 예제

```
school_meal_clubs.call(null, "다현", "쯔위", "채영");
```

### apply 함수호출 예제

```
school_meal_clubs.apply(null, ["다현", "쯔위", "채영"]);
```

# 2. this참조 값 교체

## 예제1)

this는 기본적으로 window값을 가지는데 `call,apply,bind` 를 이용해 이 this값을 바꿔줄 수 있다.

```
var sana = {
  buzzword: '샤샤샤',
  set_buzzword : function() {
    alert(this.buzzword);
  }
};

var KnowingBros = {
  buzzword: '치즈김밥?'
};

sana.set_buzzword(); // '샤샤샤';
sana.set_buzzword.call(KnowingBros); // '치즈김밥?'
```

마지막 줄에서 `sana.set_buzzword.call(KnowingBros)`로 this가 가리키는 것을 `sana`에서 `KnowingBros`로 바꾸었다.
call,apply를 사용하지 않으면 "샤샤샤"가 출력되지만 사용시 넘겨준 오브젝트안에 선언된 buzzword인 "치즈김밥?"이 출력되었다.

이런식으로 다른객체를 넘겨주므로서 그 객체로 this의 참조값을 변경할 수 있다.

## 예제2(함수)

```
function Drop(thing) {
  console.log(this instanceof Sana); // => true //즉 Drop을 호출한 함수(sana)의 this를 가져온것
  this.thing = thing;
}
function Sana(thing, dropCount) {
  console.log(this instanceof Sana); // => true

  Drop.call(this, thing); // 간접 실행
  this.dropCount = dropCount;
}
var sana = new Sana('headband', 2);
console.log(sana); // { name: 'headband', dropCount: 2 }
```

함수인 경우도 마찬가지다.

Sana함수에서 Drop함수를call하면서 Sana함수의 this를 첫번째 인자에 넘겨주었다.

Drop함수에서는 instanceof를 통해 자신의 this와 Sana함수를 비교해보니 true가 출력
즉 Sana함수의 this를 넘겨받아 Drop에서 사용가능하게 된것

Sana함수와Drop함수가 this를 공유하고 있다고 말할 수 있을것 같다.(둘다 Sana함수를 가리키고 있으므로)

# call,apply장점

유용한 메소드들의 재사용/공유가 가능, 중복을 방지

자바스크립트에서 object를 효율적으로 사용하면서 재사용 패턴까지 구현할 수 있는 유용한 방법

### Reference Link:

```
https://www.zerocho.com/category/JavaScript/post/57433645a48729787807c3fd
https://www.deep-rain.com/programming/javascript/919
```
