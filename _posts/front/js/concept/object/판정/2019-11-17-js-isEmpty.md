---
layout: post
title: "javascript의 null,undefined,empty 체크시 좋은 코딩방법"
author: negabaro kim
categories: js
tags: js concept
---

# javascript null,undefined,empty 체크시 좋은 코딩방법


대전제로 javascript의 조건문안에서 
*** null,undefined,'',0 은 false로 변환된다 ***



## 조건문이란?

javascript에서 조건문이라 하면 이하와 같은  코드를 말한다.

#### 1. 
```js
if ( xx )
```

#### 2.

```js
!xx
```

#### 3.

```js
!!xx
```

#### 4.

```js
xx ? yy : zz
```

너무 중요해서 계속 반복
해당 로직안에서 ```null,undefined,'',0```은 false로 변환된다.

## null,undefined,'',0 === false라고?? 검증해보자

```!!```를 사용해서 검증해보자.


```js
> !!undefined  
false
> !!null
false
> !!""
false
> !!0
false
```

전부 false가 반환되는걸 알 수 있다.

이 특징을 잘이해하면 판별로직을 짦게 작성할 수 있다.
실제 코드를 살펴보자.

## 1) obj === 0 은 !obj와 같다

위에서 검증했듯이 조건문에서 0은 false와 같다.
그러므로 !0은 true가 된다.

array의 길이가 0일때를 판별하고 싶을때는 

```obj === 0```보다는 더 짦은 ```!obj```를 사용하자


#### bad

```
if ( array.length === 0 )
```


#### better


```
if ( !array.length )
```


## 2) array.length === 0보다 클때를 판정하는 로직

```array.length > 0```이 로직은

array.length의 특성상 음수값은 존재하지 않고 양수값만 존재하게된다.
그러므로 0이냐 0이 아니냐로 판단이 가능하다.

```js
0 > 0
> false
```

```js
1 > 0
> true
```



#### bad

```
if ( array.length > 0 ) ...
```


#### better

```
if ( array.length ) ...
```

array.length가 0일경우 조건문안에서 false가 되므로 if문안의 로직은 실행하지 않는다.

음수값은 조건문 안에서 true가 되므로 0보다 큰값을 판별하는 모든 로직에는 사용할 수 없다.

```js
!!-3
true
```

## 3) undefined,null,공백문자를 판별하고 싶을때

0과 마찬가지다.

#### bad

```js
obj === undefined
obj === null
obj === ""
obj === 0
```

보단 코드수가 짦은

#### better 

```js
!obj
```

로 적어주자


## 4) 문자열이 비어있지 않다는 것을 판별할때

빈문자열은 조건문안에서 false이다.
그러므로 빈문자열이 아닐때를 판별할때는 
빈문자열이 들어올 변수를 조건문안에 넣어주기만 하면된다.

#### bad

```js
if ( string !== "" )
```

#### better

```js
if ( string )
```


## 5) 4번과 반대로 문자열이 비어있는것을 판별할때

빈문자열은 조건문안에서 false이다.
빈문자열임을 확인하고 싶으면 부정(!)을 더해서 false -> true로 만들어주면 된다.

#### bad

```js
if ( string === "" )
```

#### better

```js
if ( !string )
```


## 6) true인지 판별할때


#### bad

```js
if ( xx === true )
```

#### better

```js
if ( xx )
```

## 7) false를 판별할때

#### bad

```js
if ( xx === false )
```

#### better

```js
if ( !xx )
```

이 부분은 조심해야하는게 `0, “”, null, undefined`도 false이므로 
단순히 boolean값의 false만 판정하고 싶을때는 ```if ( foo === false )```
로 적어주는게 맞다.

### Reference Link:

```
http://blog.tojiru.net/article/205007468.html
https://skibis.tistory.com/263
```
