---
layout: post
title: "Javascript에서의 싱글톤이란?"
author: negabaro kim
categories: Javascript
tags: Javascript
---

# 싱글톤이란?

객체생성시 하나의 인스턴스만 가지게하는,생성한 인스턴스를 공유하는 패턴을 싱글톤이라 함

다른 언어와 달리 자바스크립트는 처음부터 싱글톤 개념을 갖고 있다.

다만 `덜완벽한 싱글튼`이다.

# 덜완벽한 싱글톤?? 뭔소리임

완벽한 싱글톤의 조건은

1. 객체생성시 하나의 인스턴스만 가질것(새로 만들지 않기)
2. `외부에서 접근 못하도록 비공개 멤버를 정의할것`

인데 1번은 충족하는데 2번이 충족되지 않음

그래서 2번을 충족 시키기 위해서 `클로저`라는 친구에게 `비공개 상태 함수를 정의하는 힘`을 빌려
완벽한 싱글톤을 만들게 된다.

# 1번 조건도 무조건은 아니고 기본적으로 태생이 그렇다는 얘기

1번 조건도 자바스크립트의 모든 객체생성 방법에서 가지고 있는 개념은 아니고

`리터럴` 이나 `new Object()`을 이용한 객체생성 패턴시 싱글톤의 조건을 가진다

`new Object()`여도 선조들이 사용한 `꼼수(프로토타입끼리 연결)`을 시키면 싱글톤의 조건을 안가지게 된다.

`Object.create`나 `ES6부터 제공하는 class`라는 문법을 사용해도 싱글톤의 조건을 못가짐!

뭔말인가 싶으면 이 포스트를 읽어보자

[Javascript Prototype Chain 이해하기]({% post_url 2019-03-08-js-prototype-chain %})

`리터럴` 이나 `new Object()`을 이용한 객체생성시 `싱글톤이 발동(?)`하는 예제도 살펴보자

## 예제(new Object())

다른 포스트보면 `리터럴`만 적어 놨길래 `new Object()`로도 실험해봄

```js
var sana = new Object();
sana.skill = '샤샤샤';

var chang = new Object();


chang = sana;
//chang.__proto__ = sana;


console.log(chang.skill); //샤샤샤
console.log(sana.skill);  //샤샤샤
```

## 예제(리터럴)

```js
var sana = {
  skill: "샤샤샤"
}

var chang = {
}

chang = sana;
//chang.__proto__ = sana;

console.log(chang.skill); // '샤샤샤'
console.log(sana.skill);  // '샤샤샤'
```

# 정리

완벽한 싱글톤을 만들기 위해서는 `클로저`가 필요하다

현재 `클로저`를 모르므로 완벽한 싱글톤을 만들 수 없다..

### Reference Link:

https://ideveloper2.tistory.com/160
https://www.zerocho.com/category/JavaScript/post/57541bef7dfff917002c4e86
http://steadypost.net/post/lecture/id/13/
http://projectl33t.xyz/archives/50763
