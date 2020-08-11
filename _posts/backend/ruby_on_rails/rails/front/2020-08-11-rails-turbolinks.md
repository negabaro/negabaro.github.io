---
layout: post
title: "rails turbolinks란?"
description: "페이지 이동시 `특정조건`을 재실행하지 않게해서 퍼포먼스향상을 시키는 라이브러리"
author: negabaro kim
tags: rails
---

# turbolinks란?

turbolinks는 2가지 방법을 이용해 퍼포먼스향상을 시키는 라이브러리이다.

## 1.

페이지 이동시 재갱신(?)이 일어나기마련인데 실제 재갱신을 하지않고

Ajax(XMLHttpRequest)와 HistoryAPI를 이용해 유저가 재갱신이 일어난것처럼 보이게함

## 2. 

`페이지 이동시` `특정조건`을 재실행하지 않게해서 퍼포먼스향상한다.

### 특정조건이란?

여기서 말하는 특정조건이란 body태그와 head안의 title을 뺀 모든것을 말함.

웹어플리케이션은 보통 페이지마다 body태그의 내용이 다르고 그외에는 
공통적으로 사용하는 javascript라이브러리들을 로드하는데 페이지갱신마다 해당 라이브러리를 재로드하는건
비효율적이라는 계산에서 나온컨셉인듯 하다.

### How?(basic)

첫로딩시 body태그와 head안의 title 이외 부분을 turbolinks가 캐싱하고
재로딩시 turbolinks의 캐싱에 남아있으면 캐싱한 부분을 리턴해주게된다.

`Turbolinks.clearCache()`

를 사용하면 Turbolinks안의 캐쉬를 임의로 삭제가 가능하다.

### 페이지 이동이란?(Visit)

> `페이지 이동시` `특정조건`을 재실행하지 않게해서 퍼포먼스향상한다.

turbolinks에서 말하는 페이지 이동은 `Application Visits`과`Restoration Visits`이 두가지를 말한다.


## Application Visits

링크 클릭에의한 페이지 이동을 의미한다.

아래와 같은 dom을 클릭했을때 생기는 이동이다.(물론 같은 도메인일 경우만)

```js
<a href="xx">yy</a>
```

## Restoration Visits

링크 클릭은 아니지만 브라우저가 제공하는 뒤로가기/앞으로가기 버튼에의한 페이지이동을 말한다.

# 여기까지 정리하면

Turbolinks는 `Application Visits`이나`Restoration Visits`가 발생했을때 `body태그와 head안의 title이외`의 부분을 캐싱해서 재실행하지 않게해 퍼포먼스향상을 하고 Ajax,HistoryAPI를 이용해 실제 재갱신이 일어난것처럼 보여준다.


# How?(detail)

Application Visits과 Restoration Visits이 발생하면 
구체적으로 어떤 동작이 일어나는지 알아보자.

## Application Visits

1. 같은도메인내에 있는 `<a href>`태그의 클릭을 감시
2. 클릭시 링크에의한 일반적인 페이지 이동을 막음
3. 캐쉬가 있을경우 해당내용을 일시적으로 body에 표시(캐쉬프리뷰 표시)
4. Ajax(XMLHttpRequest)로 이동할 페이지의 정보를 가져옴
5. 가져온 정보를 현재 페이지에 덮어씀
6. 스크롤위치 갱신
7. HistoryAPI를 이용해 URL변환(history.pushState. 실제 페이지가 이동한것처럼 보이게함)

이외에도 훅이벤트를 이용해 페이지이동을 캔슬할 수 있음.


## Restoration Visits

1. 캐쉬가 존재할경우, 리퀘스트없이 캐쉬된 페이지를 재표시
2. 스크롤 위치를 기억해 뒤로가기/앞으로 가기 버튼 클릭시 복원됨
3. 링크와 동적으로 캔슬불가
   
---------------

여기까지 turbolinks가 무엇이고 turbolinks는 발동조건이 
Application Visits과 Restoration Visits에 대해서 알아봤고

turbolinks의 장/단점과 언제 turbolinks를 써야하고 쓰지말아야 할지 알아보자.

# 장점

퍼포먼스향상
도입 코스트가낮다(서버설정 불필요)
모바일 환경 대응

rails6디폴트로 들어가있음(rails4부터)

# 단점

학습코스트가 필요함.

turbolinks의 동작을 고려한 코딩이 필요함.

turbolinks이해하지 못한 초심자들에게 불필요한 삽질을 하게함.
(주로 읽어야할 js를 못읽어오는 문제)



# turbolinks를 사용해야할때

공통라이브러리가 많으면 많을수록 turbolinks를 사용하면 퍼포먼스 이득을 얻을 수 있다.

rails초심자의 경우 불필요한 삽질이 많으므로 turbolinks없이 코딩하는걸 추천(나중에 추가한다던지)


# turbolinks off하는법

## 특정 a link클릭시 turbolinks를 무효화하는 방법

a 링크에 `data-turbolinks="false"`를 지정하면 해당 링크클릭시
turbolinks동작을 무효화시킬 수 있다.
부모돔에 지정해도 같은효과를 얻을 수 있다.

### a link에 직접 지정하는 방법

```js
<a href="..." data-turbolinks="false">xx</a>
```

### 부모돔에 지정하는 방법

```js
<div data-turbolinks="false">
  <a href="...">...</a>
</div>
```


# 프로그레스바 표시하기

turbolinks에의한 페이지이동은 Ajax제어므로 브라우저의 프로그레스바에 progressbar는 표시되지않는다.
대안으로 로드상황을 화면 최상단에 표시하는것이 가능하다.

rails6에서 `Turbolinks.enableProgressBar()`가 디폴트 설정으로 들어가있다.
페이지이동시 `class="turbolinks-progress-bar"`가 추가되므로
해당 클래스에 css스타일을 아래와 같이 설정한다.

```css
.turbolinks-progress-bar {
   height: 5px;
   background-color: green;
}
```

정상적으로 동작한다면 turbolinks에 의한 페이지이동시 상단에 초록색 프로그레스바가 표시될것이다.



### reference:

```
https://qiita.com/morrr/items/54f4be21032a45fd4fe9
```