---
layout: post
title: "javascript Object.create와{}의 차이는?"
author: negabaro kim
categories: js
tags: js
---

# 빠른결론(javascript Object.create와{}의 차이는?)

1. 퍼포먼스는 `{}`가 빠름
2. `Object.create와{}`는 프로토타입을 지정이 가능
3. 코드 가독성면의 차이가 있지만 뭐가 좋은지는 케바케

# Object.create란?

객체생성하는 3가지 방법중 하나이다.
ECMAScript5부터 생긴 사양으로
prototype 지정이 가능(Object의 프로토타입을 자동적으로 상속받지 않는다.)

# prototype지정이 가능?? 지정이 안가능한건??

```
var twice = {}
```

예를 들어서 위와 같이 `리터럴`을 이용해서 객체를 생성하면
javascript의 단군 할아버지 `Object()`의 prototype을 저절로 상속받게 된다.

반면 Object를 이용하면

```
var itzy = Object.create(나만의 프로토타입);
```

위와 같이 첫번째 인자에 나만의 프로토타입(?) 지정이 가능하다.

# Object.create에서 Object()의 prototype을 받으려면

`Object.prototype`을 사용하면 된다.

```
var twice = {}
var itzy = Object.create(Object.prototype)
```

twice,itzy는 의 prototype은 동일함

# OK.. Object.create(null) vs {} 의 차이 === prototype지정이 가능/불가능하다 끝?

큰 이미지는 맞는데 `퍼포먼스면`,`코드 가독성면`에서 차이가 있음.

# 퍼포먼스면

`{}`가 짱짱맨 가장 퍼포먼스가 좋다고 알려짐
그 다음으로 빠른`Object.create(Object.prototype)`보다 10배는 빠르다고 함

![image](https://user-images.githubusercontent.com/4640346/53860778-74db2f80-4025-11e9-88cc-365e8afa0d1e.png)

##### 잡생각: 왜{}가 빠를까 Object.create(null)가 빈깡통이라서 발로차면 더 느린건가

# 코드 가독성면

for-in돌릴때 hasOwnProperty로Object의 prototype의 오염을 고려할 필요가 없다

## before

```
Object.prototype.foo = 0
{
  var o = {};
  o.a = 1;
  o.b = 2;
  o.c = 3;
  for (var key in o) //if (o.hasOwnProperty(key))
  {
    // a, b, c, foo(bug!)
    console.log(key);
  }
}
```

## after

```
{
  var o = Object.create(null);
  o.a = 1;
  o.b = 2;
  o.c = 3;
  for (var key in o) {
    // a, b, c
    console.log(key);
  }
}
```

vs

아니다. 기존코드에서 hasOwnProperty를 사용하는 패턴이 많아져서
오히려 혼란을 가중시킬 가능성이 있다.

등의 의견이 있었다.

# 정리

객체를 생성하는 방법중 하나인`{}`과`Object.create와{}`의 차이를 알아봤다.
퍼포먼스면에서 `{}`빠르다니 웬만하면 `{}`를 사용하는것이 좋을듯하다.

왜`{}`가 빠른지도 얼른 이해하고 싶다.

### Reference Link:

```
https://qiita.com/tady/items/1215a801e178c98deb35
https://qiita.com/knhr__/items/6c414aaaa441cc3a90c7
```
