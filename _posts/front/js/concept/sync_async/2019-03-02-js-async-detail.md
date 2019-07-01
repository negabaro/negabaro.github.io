---
layout: post
title: "js 비동기처리의  동작구조에 대해서"
author: negabaro kim
categories: js
tags: js
---

[js 동기 처리,비동기 처리]({% post_url 2019-03-01-js-sync-async %}) 에 이어서
js에서의 비동기처리의 동작구조에 대해서 알아보자.

## 동작이해를 위해

javascript에서 비동기처리가 어떤식으로 동작하기 위해서는 `javascript 엔진`,`call stack`, `Web API`, `Task Queue`, `Event Loop`
등의 용어를 이해할 필요가 있음.

# javascript 엔진

자바스크립트 엔진은 메모리힙(Memory Heap)과 단일 호출 스택 (Call Stack)을 가지고 있음.

자바스크립트 엔진 중 유명한 것이 구글의 V8엔진. V8엔진은 크롬과 노드js에서 사용됨.

# 메모리힙(Memory Heap)

메모리할당이 이루어지는 곳
동적으로 생성된 객체(인스턴스)는 이곳에 할당됨

# call stack

call stack에 작업이 하나씩 쌓이고(PUSH) 쌓인 작업을 하나씩 실행(PUSH)하는 곳

```
function a() {
	b()
	console.log("a")
}

function b() {
	console.log("b")
}

a()
```

위 코드를 실행하면 이하와 같이 Call Stack에 PUSH,POP이 실행된다(추가되는 현상이 PUSH임)

[a()] -> [a(),b()] -> [a(),b(),console.log("b")] -> `console.log("b")` POP실행
-> [a(),b()] -> `b()` POP실행(b안에서 할거 다했으므로) -> [a()] -> [a(),console.log("a")]
-> `console.log("a")` POP실행 -> [a()] -> `a()` POP실행(a안에서 할거 다했으므로) -> `[]` 작업완료!

# Javascript 실행환경(Javascript Runtime)

javascript가 실행되는 전체환경을 의미
javascript 실행환경에서는 `javascript engine`외에 `Web API`와 `Task Queue`, `Event Loop`
가 존재함.

# WebpAPI

Web API 는 브라우저에서 제공되는 API
`AJAX`나 `Timeout` 등의 비동기 작업을 실행함.

예를들어 setTimeout 과 같은 함수를 실행하면 `javascript engine`은 `Web API`에 `setTimeout`을 요청하고 동시에 setTimeout에 넣어준 Callback 까지 전달함.
`javascript engine`의 `Callstack`에서는 `Web API` 요청 이후(Web API에게 작업을 넘긴후)setTimeout 작업이 완료되어 제거된다.
즉 Web API가 setTimeOut작업을 하지만 자바스크립트 엔진 입장에서는 그작업을 본인 스스로하는게 아닌 WebAPI에게 부탁만 하는것이므로
이거부탁해 라는 명령만으로 자신의 작업이 끝났다고 넘기는것 (그다음 작업이 있으면 그걸 실행)
이것이 javascript 비동기처리의 핵심

Web API는 방금 요청받은 setTimeout을 완료하고, 동시에 전달받은 Callback 을 Task Queue라는 곳에 넘겨줌.

# Task Queue(Callback Queue)

Task Queue 는 Callback Queue 라고도 함.
큐 형태로 Web API에서 넘겨받은 Callback 함수를 저장함.

이 Callback 함수들은 자바스크립트 엔진의 Call Stack의 모든 작업이 완료되면 순서대로 Call Stack에 추가됨.

# Event Loop

자바스크립트 엔진의 Call Stack의 모든 작업이 완료되면 Task Queue 의 작업을 순서대로 Call Stack에 옮기는 작업을 반복해서 실행함.

Call Stack 가 비어있지 않은지 (실행중인 작업이 존재하는지) 와 Task Queue 에 Task가 존재하는지 를 판단후, Task Queue 의 작업을 Call Stack 에 옮김

Event Loop 는 이 작업을 처음부터 끝까지 계속 반복하여 실행함. 그래서 Event ‘Loop’ 인것

```
while (queue.waitForMessage()) {
    queue.processNextMessage();
}
```

MDN은 Event Loop의 작업을 위와같은 가상의 코드로 설명하고 있음

## 여기까지 결론

결국 여기서 알 수 있는 점은 Javascript 엔진은 그저 주어진 코드를 실행하는 온디맨드 (on demand) 실행 환경이라는 것과
코드 실행의 스케줄링은 Javascript 엔진이 호스팅된 런타임 환경이 맡게되는 것임.

## Interval이 0이라면?

```
setTimeout(function() {
    console.log("Bye, World!");
}, 0);
console.log("Hello, World!")
```

위 코드는 `Hello, World!`,`Bye, World!`순으로 실행된다.
Interval이 0이면 `Bye, World!`,가 먼저 실행되야 하는것 아닌가 하고 생각할 수 있지만

setTimeout Call Stack등록후 실행 -> WebAPI에 작업을 부탁한후 Call Stack에서 setTimeout 작업 제거 ->
console.log(“Hello, World!”) 작업 등록 -> console.log(“Hello, World!”) 작업 완료 ->
Task Queue 에서 대기중인 console.log(“Bye, World!”) 작업이 Call Stack으로 전달되어 실행 -> 프로그램 종료

순으로 실행되므로 `Hello, World!`,`Bye, World!`로 출력하게 된다.

## setTimeout함수에 값을 얼마를 넣어도 Interval은 정확하지 않음

이 부분도 포인트인데
task queue가 javascript engine의 call stack에 전달되려면 `call stack이 비어 있는것`이 조건이다.
즉 어떤 이유로 call stack이 비어있지 않은 동안에는 task queue에서 call stack으로의 이주를 오매불망 기다리는
콜백함수는 지연될수 밖에 없다.

그래서 setTimeOut이 5초로 지정한다 하더라도 이러한 이유로인해 5초를 넘길수 있는것.

### Reference Link:

```
https://hudi.kr/%EB%B9%84%EB%8F%99%EA%B8%B0%EC%A0%81-javascript-%EC%8B%B1%EA%B8%80%EC%8A%A4%EB%A0%88%EB%93%9C-%EA%B8%B0%EB%B0%98-js%EC%9D%98-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%B2%98%EB%A6%AC-%EB%B0%A9%EB%B2%95/
```
