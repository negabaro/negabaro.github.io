---
layout: post
title:  "Rails의 escape(이스케이프)에 대해 알아보자"
author: negabaro kim
tags: rails/view
---


## 이스케이프(escape)란?

영어적 의미로는 어딘가에서 `탈출하다`라는 의미이다.

어떤 상황에서 탈출하는가 하면 html문에서 사용하는 특별한 문자열들은 공통의 규칙으로 브라우저에서 특정 돔을 그려주는데 사용하는데 이 상황을 탈출하는 의미로 이스케이프를 사용한다.

보통 `이스케이프 처리하다`라고 많이 말하고 `이스케이핑`이라고도 한다.

아래서부터는 `이스케이핑`으로 통일해서 기술하겠다.

## 이스케이핑이 필요한 이유

이스케이핑이 필요한 큰 이유로는 취약점 공격을 막기 위해서다.

DB에 악의적인 `<script>`코드들을 삽입해 취약점 공격에 쓰일 가능성을 막기 위해서이다.


## rails에서의 escape

rails에서는 `<%= ～ %>`를 이용해 view에서 문자를 표시할때 자동적으로 이스케이핑해준다.


## escape의 원리

html에 사용되는 문자들을 단순 문자열로 표기가능한 `new제네레이션한 특수문자열(?)`로 다시 바꿔준다.

예를들면 아래와 같이 문자가 치환된다.


```
<  -->  &lt;
>  -->  &gt;
&  -->  &amp;
"  -->  &quot;
```


## 간단히 말해서 이스케이핑의 의미는?

html문에서 사용하는 특별한 문자열들을 단순 문자열로서 보여준다는 의미이다.

이스케이핑 전과 후를 비교해 살펴보자.

### 이스케이핑 전：

이스케이핑전 특수문자들을 html태그로서 표현하는 반면

<a href="http://example.com">dahyun</a>


## 이스케이핑 후：

이스케이핑 후는 아래와 같은 `new제네레이션한 특수문자열(?)`로 바꿔줘서 화면에

```
&lt;a href=&quot;http://example.com&quot;&gt;dahyun&lt;/a&gt;
```

아래와 같은 문자열로 보여주게 된다..

```
<a href="http://example.com">dahyun</a>
```


---

## 메모

이렇게 rails에서는 친절(?)하게 이스케이핑을 자동으로 해주는데 게시판등을 만들때 이 자동화된 이스케이핑 처리를  이스케이핑(탈출..) 하고 싶은 상황이 펼쳐진다.

해당 게시판내에서는 html태그들을 단순 문자열이 아닌 태그로서 표현하고 싶을때 말이다.

이때 사용하는 대표적인 메소드가 `html_safe`,`raw`,`==`,`sanitize`가 있다.
