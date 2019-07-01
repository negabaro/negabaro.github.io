---
layout: post
title: "JS Function 함수 선언식(Function Declarations)과 함수 표현식(Function Expressions)"
author: negabaro kim
categories: js
tags: js concept
---

## 함수에는 선언식과 표현식이 있다(함수 선언식 vs 함수 표현식)

## 함수선언식(Function Declarations)이란

함수선언은 Function Statement 라고도 하며 말그대로 함수 문장이란 뜻

`Statement`의 의미를 아는것이 중요한데 함수 선언문이 `Statement`라는 말은 코드블럭 자체는 실행가능 코드가 아니라는 것을 의미한다.

특징으로 `콘솔에서 함수선언식을 실행하여도 어떠한 결과도 return 되지않는다.`

#### 함수 선언식(Function Declarations) 예제

```
function 함수명() {
  구현 로직
}
```

## 함수 표현식(Function Expressions)이란

함수 표현식에는 크게 2가지가 있는것으로 안다.

1. 특정변수에 할당된 경우를 의미
2. 즉시 실행가능한 코드 블럭으로서 존재하는 함수를 의미

#### 함수 표현식(Function Expressions) 특정변수에 할당된 예제

```
var 함수명 = function () {
  구현 로직
};
```

#### 함수 표현식(Function Expressions) 즉시 실행가능한 코드 블럭으로서 존재하는 함수 예제

함수 표현식을 즉시 실행가능한 코드로 해석시키기 위해서 ()를 이용하여 함수를 감싸 주어야 한다.
이를 자기호출함수(self invoking function) 라고도 한다.

```
// self invoking function expression
(function dahyun() {
    console.log('둡둡');
})();
```

## 함수 선언식과 함수 표현식의 차이는?

#### 1. 호이스팅(가장 큰차이)

`함수 선언식은 호이스팅에 영향을 받지만`, `함수 표현식은 호이스팅에 영향을 받지 않는다.`
함수 선언식은 코드를 구현한 위치와 관계없이 자바스크립트의 특징인 호이스팅에 따라 브라우저가 자바스크립트를 해석할 때 맨 위로 끌어 올려진다.

#### 2. 세미콜론 여부

함수 선언식은 세미콜론이 필요하지 않지만 함수 표현식에서는 필요

##### 함수 표현식에서 세미콜론 안붙여줬는데 움직이던데??

###### -> 원래 필요한데 세미콜론 삽입장치가 자동으로 세미콜론을 넣어준것일 뿐.

#### 3. VO(variable object)저장 여부

함수선언식 함수는 자바스크립트 인터프리터가 스크립트가 로딩되는 시점에 바로 초기화하고 이를 VO(variable object)에 저장하므로 함수 선언의 위치와는 상관없이 소스 내 어느 곳에서든지 호출이 가능

함수표현식은 함수선언식과는 달리 스크립트 로딩 시점에 VO에 함수를 저장하지 않고 runtime시에 해석되고 실행됨

함수선언식으로 함수를 정의하면 사용하기에 쉽지만 대규모 애플리케이션을 개발하는 경우 인터프리터가 너무 많은 코드를 VO에 저장하므로 애플리케이션의 응답속도는 현저히 떨어질 수 있음.

참고로, 스크립트 파일을 모듈화하고 이를 필요한 시점에 비동기 방식으로 로딩하여 http 요청을 줄이고 응답속도와 사용자 체감속도를 향상시킬 수 있음.

## 함수 표현식의 장점은?

‘함수 표현식이 호이스팅에 영향을 받지 않는다’ 는 특징 이외에도 함수 선언식보다 클로저나 콜백함수 구현시에 유용하게 쓰인다고 한다.
클로저 아직 공부안해서 이해가 잘안가므로 패스..

## ETC

함수 표현식이 선언식에 비해 가지는 장점이 많고 AirBnb 의 JS Style 가이드 에서도
함수 선언식보다는 함수 표현식을 지향하고 있기는 하나 자기가 코딩하기 편한 방식으로 구현하는게 좋을듯

※추가. 함수 선언식을 너무 많이 사용하면 hosting이 많아져 실행코드의 구동시점이 길어지는 좋지않는 결과를 가져오기도 한다고함.

### Reference Link:

```
http://insanehong.kr/post/javascript-function/
https://webclub.tistory.com/310
https://joshua1988.github.io/web-development/javascript/function-expressions-vs-declarations/
```
