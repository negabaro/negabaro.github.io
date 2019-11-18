---
layout: post
title: "javascript null,undefined,empty 체크시 좋은 코딩방법"
author: negabaro kim
categories: js
tags: js concept
---

# javascript null,undefined,empty 체크시 좋은 코딩방법


## 1) obj === 0 은 !obj와 같다

고로 더 짦은 ```!obj```를 사용하자


#### bad

```
if ( array.length === 0 )
```


#### better


```
if ( !array.length )
```




## 2) undefined,null,공백문자,0 은 false와 같다


```js
> !undefined  
true //-> undefined는 false와 같다
> !null
true //-> null은 false와 같다
> !""
true //-> 공백문자도 false와 같다
> !0
true  //-> 0또한 false와 같다
```

그러므로

```js
obj === undefined
obj === null
obj === ""
obj === 0
```

보단 ```!obj```

로 정의하는게 코드수가 줄어든다.




-------------

## 2) obj === 0 은 !obj와 같다

#### bad

```
if ( array.length > 0 ) ...
```


#### better

```
if ( array.length ) ...
```

/ 4.1.3
// 문자열이 비어있지 않다는 것을 확인할 때에는,
// 다음처럼 작성하지 마시고
if ( string !== "" ) ...
 
// ...다음과 같이 작성하세요
if ( string ) ...
 
// 4.1.4
// 문자열이 _비어있다는 것_을 확인만 하는 경우라면,
// 다음처럼 작성하지 마시고:
if ( string === "" ) ...
 
// ...다음과 같이 작성해서, 거짓인지를 확인하세요.
if ( !string ) ...
 
// 4.1.5
// 참조 변수가 true인지 확인하려면,
// 다음처럼 작성하지 마시고
if ( foo === true ) ...
 
// ...그냥 아래처럼 써주세요. 기본 기능을 활용하면 됩니다:
if ( foo ) ...
 
// 4.1.6
// 어떤 참조 변수가 false인지 판정할 때에는,
// 다음처럼 작성하지 마시고
if ( foo === false ) ...
 
// ...true인지를 확인하도록 부정(!)을 사용하세요.
if ( !foo ) ...
 
// ...주의하세요. 이렇게 제안하면 foo의 값이 0, “”, null, undefined, NaN인 경우에도 참을 반환할 겁니다.
// foo가 불린값 false를 갖는지를 확인하는 경우라면, 아래와 같이 사용하세요.
if ( foo === false ) ...
 
// 4.1.7
// 어떤 변수가 있다고 하죠. 이 변수의 값은 null이나 undefined일 수는 있지만 false나 "", 또는 0의 값은 가지지 않습니다. 이런 변수를 판정할 때에는,
// 아래처럼 작성하지 마시고
if ( foo === null || foo === undefined ) ...
 
// ...강제형변환되는 ==를 사용하세요. 다음과 같이요:
if ( foo == null ) ...
 
// 그리고 이 점을 기억하세요. == 를 사용하면, 판정하려는 변수의 값이 `null` 이나 `undefined` 일 때, 참을 반환할 것입니다.
// 하지만 `false` 나 "" 나 0 값을 가질 때에는 거짓을 반환할 것입니다.
null == undefined


출처: https://skibis.tistory.com/263 [Skibi's Notepad]

출처: https://skibis.tistory.com/263 [Skibi's Notepad]

### Reference Link:

```
https://skibis.tistory.com/263
```
