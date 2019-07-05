---
layout: post
title: "javascript　Hoisting이란?"
author: negabaro kim
categories: js
tags: js concept
---

## 호이스팅이란?

=**자바스크립트가 함수나 var로 선언한 변수를 맨 위로 끌어 올리는 현상(?)**을 호이스팅이라 일컬음
=인터프린터가 자바스크립트 코드를 해석함에 있어서 Global 영역의 선언된 코드블럭을 최상의 Scope로 끌어올리는 것
즉 Global 영역에 선언된 변수(const/let제외한 var만) 또는 함수는 자바사크립트 엔진이 가장 먼저 해석하게 된다

**단 할당구문은 런타임과정 이루어지기 때문에 hosting이 되지 않는다.**

```
//#예제 1 : 함수선언에서의  호이스팅
sana();
function sana() {
    console.log('샤샤샤');
};
> 샤샤샤

//#예제 2 : 함수표현(할당)에서의  호이스팅
sana();
var sana = function() {
    console.log('샤샤샤'');
};
> Syntax Error
>
```

## hoist영어의 의미

네이버 영어사전에서 검색해보면 hoist의 뜻은
`[동사] (흔히 밧줄이나 장비를 이용하여) 들어[끌어]올리다`
이라는 뜻!

## 맨위로 끌어 올린다는게 먼소리?

x행에 선언하더라도 그 코드를 1행(가장위로) 올린다는 의미

## 그게 어때서??

30행에 선언한 `var x='hoge'`를 30행 이전에도 사용할 수 있다는 의미니까 중요
위에서 밑으로 읽혀지는 특성을 역행하므로 `어 이게 왜 움직이지?`한 코드를 이해하기 위해 중요한 개념

## 왜 자바스크립트는 함수나 var을 맨위로 끌어올리지?

모르지 그건 이제 찾아봐야지

## 호이스팅 var 예제

```
x;  // undefined !?
var x = 3;
```

음?undefined??못쓰는거 아냐?? 구라친거임?

아니다..값을 못 읽어왔다는거지 선언한 x는 위에서 읽어온게 고무적임

let으로 바꿔보면 차이를 암

```
x;  // ReferenceError
let x = 3;
```

let이나const의 경우 이렇게 x를 찾지 못하고 ReferenceError에러를 뱉음.

## 호이스팅 함수 예제

함수도 마찬가지

```
f()                      // 'f'
function f() {           // 함수 선언
    console.log('f');
}

f2();                    // ReferrenceError
let f2 = function() {    // 함수 할당
    console.log('f')
}
```

## 스코프의 영역으로 Hoisting을 설명

'var' 과 '함수의 선언'(Hoisting) 은 함수 레벨의 스코프
'let' 과 'const'(!Hoisting) 는 블록 레벨의 스코프

라고도 나눈다함

## 변수의 동작으로 보는 Hoisting 설명

변수의 선언(declaration)/초기화(initialization)/할당(assignment) 이라는
세 단계 동작에서 선언부가 함수 스코프의 최상단으로 끌어올려진 듯한 현상을 Hoisting이라고 함

## hoisting 언제쓰나?

음..js의 공식적인 개념도 아니고 하나의 부가적인 현상을 Hosting이라고 하기에
그냥 움직임을 이해하기 위해 알고 있기만 하면 될듯?

직관적인 코드를 짜기 위해서라도 블록 레벨 스코프, 'let'과 'const'로 짜는게 좋을듯
추가) 글로벌 변수,함수를 남발하면 hoisting에 의해서 main함수를 실행하는데 지연이 발생할 가능성이 있음.

## 블록스코프에서의 끌어올림(?)

블록 스코프에 해당하는 let도 블록안에서 최상단으로 변수를 끌어올린다고 함
끌어올리는 것 자체를 영어로 Hoist라고 부르니 블록 스코프도 Hoisting하네??

라고 말할 수도 있지만 선언부 위에서 참조해도 ReferenceError에러가 발생하므로 JS세계에서 이 움직임에 대해
Hoisting라고 표현하지는 않는듯?? 맞나..?

## hoisting 단점

너무 많은 선언문이 남발되어 있는 자바스크립트 코드는 실행코드의 해석시점이 뒤로 밀리게 됨으로서
자바스크립트 실행코드의 구동시점이 길어지는 좋지않는 결과를 가져오기도 한다.

글로벌함수,변수를 너무 많이 정의해놓으면 hoisting에 의해 지연이 발생할 수 있다는 얘기

## TIP

호이스팅을 제대로 모르더라도 **함수와 변수를 가급적 코드 상단부에서 선언하면, 호이스팅으로 인한 스코프 꼬임 현상은 방지**할 수 있다.

## hoisting 관련 명언집(by brightparagon)

1. Hoisting 자체는 변수가 선언/할당으로 분리되는 것이라기 보다는 선언(declaration)/초기화(initialization)/할당(assignment) 세 단계에서 **선언부가 함수 스코프의 최상단으로 끌어올려진 듯한 현상**을 일컫습니다. 끌어올려진다는 의미로 hoist 라는 단어를 씁니다.

2. Hoisting은 JS의 공식적인 개념이라기 보다는 자바스크립트 엔진이 js 파일을 읽고 **Execution Context 객체를 만들때 선언된 변수들을 이 객체 안에(variable object) 먼저 모두 넣어둔 뒤 코드를 한줄씩 실행하면서 나타나는 하나의 부가적인 현상**입니다. 한줄씩 실행할때 연산 과정에 필요한 변수를 variable object에서 찾아서 활용하기 때문에 이 실행중인 함수나 변수가 이 시점에 선언되어 있지 않아도 에러없이 코드 실행(연산 작업)이 가능합니다.

3. TDZ도 위와 마찬가지로 JS의 공식적인 개념은 아니고 var와 다르게 let/const를 JS 엔진이 취급하는데, let/const도 var와 똑같이 선언/초기화/할당 세단계로 진행되지만 var는 선언과 초기화(undefined로)가 동시에 진행되어 var로 선언한 변수는 undefined라는 값으로 메모리에 등록되어 언제든 액세스할 수 있지만 let/const는 선언과 초기화가 동시에 진행되지 않습니다. 즉, 선언이 되면 할당문을 만나기 전까지 메모리에 아예 등록 자체가 되지를 않아서 Reference 에러를 냅니다. 이러한 차이를 일부러 쉽게 표현하기 위해서 개발자들이 TDZ라는 용어를 사용하게 됐다고 보면 됩니다.

### Reference Link:

```
https://jw910911.tistory.com/10?category=665935
https://github.com/Jogeonsang/Hoisting/blob/master/README.md
https://ja.stackoverflow.com/questions/21992/let%E3%81%A7%E3%81%AE%E5%A4%89%E6%95%B0%E5%AE%A3%E8%A8%80%E3%81%A7%E3%81%AF%E5%B7%BB%E3%81%8D%E4%B8%8A%E3%81%92%E3%81%8C%E8%A1%8C%E3%82%8F%E3%82%8C%E3%81%AA%E3%81%84
```
