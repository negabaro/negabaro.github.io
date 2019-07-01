---
layout: post
title: "JS Function 함수 표현식 기명함수,익명함수,무명함수에 대해서"
author: negabaro kim
categories: js
tags: js concept
---

## 함수의 이름 있다,없다에 따라 용어가 틀림

함수의 이름이 있는 함수를 `기명 함수 표현식` 이라고 부름
함수의 이름이 없는 함수를 `무명 함수 표현식`,`익명함수`, 심지어 `함수 표현식`이라고 부른다고함.
게다가 `익명함수`는 `람다식`,`람다함수`라고도 말함..(뭐 이렇게 부르는게 많냐)

이 포스트에서는 간단하게 기명이와 무명이라고 나눠서 부르기로 하자

## 함수표현식 안에 기명,무명 이가 있다고 말할 수도 있을듯

`함수 표현식`이 더 넓은 의미의 용어이며, `기명 함수 표현식`은 함수 표현식 중 이름을 정의한 함수를 가리키는 구체적인 용어

즉 함수표현식 안에 기명이와 무명이가 있고
무명이를 그냥 함수표현식이라고 퉁쳐서 부른다는 의미인듯

### 기명 함수 표현식(named function expression) 예제

```
var add = function add(a, b) {
  return a + b;
};
```

function 뒤에 add라는 이름이 있다.

### 무명 함수 표현식(unnamed function expressioin),익명함수(anonymous function),함수 표현식(function expression) 예제

```
var add = function (a, b) {
  return a + b;
};
```

function 뒤에 이름이 없다.

## 기명이와 무명이의 차이는?

거의 똑같지만 무명이로 정의한 함수 객체의 name프로퍼티가 빈 문자열이 된다는것이 가장 큰차이

## name프로퍼티가 뭔데?

ECMA 표준은 아니지만 많은 실행환경에서 쓰임
파이어버그와 같은 디버거를 사용시 함수 안에서 자기 자신을 재귀적으로 호출할때 유용히 씀.
이러한 용도로 쓸게 아니면 생략해도 무방.

예제를 봐보자

```
function foo() { } // 함수 선언문
var bar = function() { }; // 무명 함수 표현식
var baz = function baz() { }; // 기명 함수 표현식

foo.name; // "foo"
bar.name; // ""
baz.name; // "baz"
```

무명이만 name프로퍼티가 없음.

참고로 브라우저별로 무명이로 선언시 name프로퍼티의 값이 다름
IE에서는 undefined가 되고, 파이어폭스와 웹킷에서는 빈 문자열로 정의됨.(역시 IE!!!!!)

## 그래서 무명이 기명이 중에 뭐가 좋은데??

뭐가 좋다고 분명히 말하긴 어려움

기명이는 stack track가 함수의 이름을 포함하여 출력하기 때문에 에러를 찾기 쉬움

무명이는 함수 이름 한자 더 안적어도 되니 팔이 덜 힘들겠지?(가독성도)

## 사실 함수표현식에서는 숨겨진 자식이..

이 포스트에서는 생략했지만 즉시실행함수(IIFE)도 함수표현식의 하나의 종류임

### Reference Link:

```
https://webclub.tistory.com/310
https://beomy.tistory.com/9
https://joshua1988.github.io/web-development/javascript/function-expressions-vs-declarations/
```
