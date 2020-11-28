---
layout: post
title: "Javascript setInterval이란?"
author: negabaro kim
tags: js/webapi
---

# setInterVal이란

일정시간 동안 반복 실행할때 사용하는 setInterVal 메소드


# 사용 방법

```js
var testTimer;
testTimer=setInterval(function(){
  반복할 코드
} , 1000);
```

testTimer로 리턴값을 받아주는 이유는 정지시 해당 오브젝트가 필요하기 때문이다.
혹시 그럴일이 없다면 없어도 된다.

# 정지 방법

브라우저에 부하가 가지않도록 사용하지 않을때는 정지 해주자.

```js
clearInterval(testTimer);
```

# 주의사항

setInterval로 특정 메소드 실행시 더블쿼테이션으로 묶어주던가 `function(){}` 안에서 정의해줘야한다.


예를들어 아래와 같이 실행하면 동작할거 같지만 처음 1회만 실행될뿐 반복실행 되지 않는다.

```js
var testTimer = setInterval(test(),1000);
function test(){
    alert("test！");
}
```

아래와 같이 호출할 메소드 부분을 더블 쿼테이션으로 묶어야지 제대로 동작한다.

```js
var testTimer = setInterval("test()",1000);
function test(){
    alert("test！");
}
```

아래와 같이 function안에서 호출하는 방식도 가능하다.

```js
var testTimer = setInterval(function(){ test();},1000);
function test(){
    alert("test！");
}
```

---


# 메모

## NG예제

```js
const timeupdater = setInterval(console.log(" created setInterval!"), 100);
```



### reference:


[setInterval Document]: (https://developer.mozilla.org/ja/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)