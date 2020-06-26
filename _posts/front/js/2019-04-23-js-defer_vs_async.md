---
layout: post
title: "script의 async와 defer 속성"
author: negabaro kim
categories: js
tags: js
---

# 일반적인 실행(인라인 실행)

async와 defer의 동작에 대해 알아보기 전에 기본적인 `<script>`의 실행 과정에 대해 알아보자.
웹 브라우저는 html을 랜더링하는 과정에서 css(`<link type='text/css'>`) 또는 js(`<script>`) 를 만나면 동기적으로 처리한다.ｓ
다시 말해 해당 내용이 해석되고 실행되기 전에는 뒤에 나오는 내용을 처리하지 않는다는 것이다. 이 부분은 화면의 랜더링 속도에 큰 영향을 줄 수 있다(사용자 경험 측면에서 큰 영향을 주며 SEO와도 관련된다).

```
<script src="myScript.js"></script>
```

만약 엄청 무거운 script가 있다면 우선 해당 스크립트를 내려받아 해석하고 실행(execute)할 때까지 웹 문서의 HTML 코드 parsing 작업을 잠시 뒤로 미룬다.

그래서 용량이 큰 스크립트를 문서 해석 초기에 만나게 되면 해당 페이지를 불러오는 속도마저 지체되는 현상을 일으키게 되어 결국 전체적 성능을 떨어뜨리는 결과를 가져오는데, 이런 성능의 병목 현상을 막기 위해 여러 다양한 꼼수들이 쓰여왔다. 이런 부작용을 근본적으로 막기 위해 소개된 것이 script 태그의 async와 defer 속성이다.

# async와 defer의 공통점은 작업의 중단없이 script를 내려받는것

`parsing작업의 중단 없이 script를 내려받는다`(즉 다운로드가 비동기로 움직인다.)

인라인 방법에서 처럼 읽어오는데 시간이 걸리는 스크립트가 있더라도 구문 해석(parsing)은 그대로 실행시키고
동시에 script도 내려받게 되므로 해당 스크립트 이후에 HTML구문이 해석되지 않아 브라우저에 표시되지 않는 현상은 없게된다.

선택적으로 onload handler를 지정해서 일반적인 초기화 작업도 진행할 수 있다.

```
<script async src="myAsyncScript.js" onload="myInit()"></script>
<script defer src="myDeferScript.js" onload="myInit()"></script>
```

---

# async과 defer의 차이점은 다운로드후 해당 스크립트를 실행하는 타이밍이다.

스크립트가 실행되는 시점이 서로 다르다

## async

`async script`는 window의 load event 전 내려받는 즉시 바로 실행

비동기로 다운로드가 완료되면 `스크립트가 실행될 수 있도록 구문 분석이 일시 중지 된다`.

## defer

`defer script`는 문서의 parsing 작업이 끝난 후 DOMContentLoaded event 전에 문서에 삽입된 순서에 따라 실행

HTML 구문 분석이 실행되는 동안 파일을 다운로드 할 수 있으나 `HTML 구문 분석이 완료되기 전에 스크립트 다운로드가 완료 되더라도 구문 분석이 완료 될 때까지 스크립트는 실행되지 않는다`. 또한, async와는 다르게 호출된 순서대로 실행된다.

# 사용 타이밍

script가 문서를 직접 만지고 조작하거나 서로 간 로딩 순서가 중요할 때에는 defer 속성을 쓰고,
그렇지 않다면 async 속성을 써서 웹 페이지 로딩 속도를 줄일 수 있다.

## defer를 사용하는 경우

### 의존성이 있는 js

js에서 DOM을 조작하는등 의존성이 생기는 경우, 스크립트를 실행하기 전에 DOM이 완전히 해석되어야 정상적인 동작을 할 수 있다.
일반적으로 이러한 스크립트 파일은 페이지의 맨 아래에 배치되어 모든 내용이 파싱된 후에 동작하도록 해야 한다.
그러나 어떤 이유로 든 문제의 파일을 다른 위치에 배치해야 하는 상황에서는 defer 속성을 사용할 수 있다.

## async을 사용하는 경우

### 종속성이 없는 js

다른 파일들에 종속적이지 않거나 종속성 자체가 없는 스크립트 파일의 경우 async 속성이 특히 유용하다.
파일이 어느 지점에서 실행되는지 정확히 알 필요가 없기 때문에 비동기 로드가 가장 적합하다.

## async,defer사용하지 않고 일반적인 인라인을 사용하는 경우

### 종속성을 가지지만 스크립트 크기가 작은경우

다른 파일에 의존성을 가지지만 스크립트 크기가 비교적 작은 경우 인라인으로 정의하는 것이 더 유용 할 수 있다.
인라인을 사용하면 HTML 문서의 구문 분석이 차단되지만 크기가 작으면 큰 문제가 되지 않는다.
또한 다른 파일에 의존하는 경우 차단이 필요할 수 있다.

---

# etc

## 기본적으로 css는 <head> 영역에 js는 </body> 바로 앞에 선언하는 것을 추천

`<script>` 요소가 문서 맨 끝에 있지 않으면 스크립트의 비동기 및 지연 실행이 더 중요하다. HTML 문서는 첫 번째 여는 <html> 요소부터 닫히는 순서로 파싱됩니다. 외부 소스 JavaScript 파일이 닫는 </body> 요소 바로 앞에 있으면, async 또는 defer 속성을 사용하는 것이 큰 효과가 없다(HTML 파서가 그 시점까지 문서의 대다수를 완성 했기 때문에 지연에 의미가 크게 없다는 것이다).

## onload대신

onload를 사용하지 않아도 script태그에 defer를 기술하거나 요소의 뒤에 `<script>`에 기술하면 동작함
defer속성이 JS를 비동기로 읽어들여 실행자체는 dom을 읽어낸후로 지연가능시키므로

### Reference Link:

```
https://blog.asamaru.net/2017/05/04/script-async-defer/
https://appletree.or.kr/blog/web-development/javascript/script-%ED%83%9C%EA%B7%B8%EC%9D%98-async%EC%99%80-defer-%EC%86%8D%EC%84%B1/
https://qiita.com/FeET/items/9445b0518d7e66fa2a26
```