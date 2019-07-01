---
layout: post
title: "Javascript scope chain이란"
author: negabaro kim
categories: js
tags: js
---

# 스코프 체인은 왜 알아야하나?

클로저 개념을 이해하기 위해

선언한 변수를 어떤식으로 찾아가는지에 대한 개념을 이해하기 위해

# 스코프 체인이란

꼬리를 물고 계속 범위를 넓히면서 찾는 관계를 `스코프 체인`이라고 부른다.

`스코프 체인`은 식별자 중에서 객체(전역 객체 제외)의 프로퍼티가 아닌 식별자, 즉 변수를 검색하는 메커니즘이다.

식별자 중에서 변수가 아닌 객체의 프로퍼티(물론 메소드도 포함된다)를 검색하는 메커니즘은 `프로토타입 체인(Prototype Chain)`이라고 부른다

# scope

유효범위를 의미함.

유효범위에는 여러가지 특성이 있는데 이 포스트에서는 그중 하나인 `함수 단위의 유효범위`의 특징만 간단히 기술한다.

## 함수 단위의 유효범위 특징

1. `내부 함수`에서는 `외부 함수`의 변수에 접근 `가능`
2. `외부 함수`에서는 `내부 함수`의 변수에 접근 `불가능`
3. `전역 객체`에는 어떤 함수도 접근 `가능`

# 용어 정리

1. 전역 객체 = 전역 스코프에 선언한 변수,함수
2. 즉, 크게 보면 `전역 객체 = 전역 스코프 = 전역 변수`라고 이해해도 무방
3. 외부 함수 = 나(?) 보다 상위에 있는 함수?
4. 내부 함수 = 지역 스코프 = 지역 변수

# 예제)

예제를 살펴보자

```
var agency = 'jyp';
function jyp() {
  console.log('jyp 소속사명:', agency);  //jyp
  //console.log('twice 남자친구:', boy_friend); // undefined error //해설3
  function twice() {
    var boy_friend = 'xxx';
    console.log('twice 소속사명:', agency); //jyp //해설1
  }
  twice();
}
jyp();
//console.log("twice 남자친구:", boy_friend); // undefined error //해설2
```

### 해설1 //console.log('twice 소속사명:', agency);

1. twice 함수는 자신의 함수내 스코프에서 agency 변수를 찾음 --> 없음
2. 한 단계 올라가 jyp 함수에서 agency 변수를 찾음 --> 없음
3. 마지막으로 `전역 스코프`에서 찾음. --> 있음!!

다행히 `전역 스코프`에서 agency 변수를 찾아서 'jyp'라는 값을 얻었다.

만약 전역 스코프에도 없다면 변수를 찾지 못하였다는 에러가 발생한다.

이렇게 꼬리를 물고 계속 범위를 넓히면서 찾는 관계를 `스코프 체인`이라고함

### 해설2 전역스코프에서 console.log("twice 남자친구:", boy_friend);

1. `전역 스코프`에서 boy_friend변수를 찾음. --> 없음!!
2. 더이상 찾을때가 없어서 undefined 리턴함.

> 전역 스코프에서 jyp함수의 내부함수인 twice에서 선언한 변수 `boy_friend`에 접근이 불가능

`아래에서 위로 변수를 검색하는 메커니즘이 스코프 체인`이므로 자신의 스코프보다 하위에 있는 twice함수에서 선언한 변수를 찾으러 가지 앟는다.

### 해설3 jyp함수 스코프내에서 console.log("twice 남자친구:", boy_friend);

1. jyp 함수에서 boy_friend 변수를 찾음 --> 없음
1. `전역 스코프`에서 boy_friend 변수를 찾음. --> 없음!!
1. 더이상 찾을때가 없어서 undefined 리턴함.

해설2와 동일하다. 자신보다 하위에 있는 twice함수를 찾으러가는 생각을 하지 않는다.

### Reference Link:

https://www.zerocho.com/category/Javascript/post/5740531574288ebc5f2ba97e
