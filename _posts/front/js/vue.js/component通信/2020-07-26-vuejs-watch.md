---
layout: post
title:  "vue.js watch에 대해 알아보자"
description: 특정 데이터(props,data)의 변화를 감지하여 자동으로 특정 로직을 수행해주는 속성
author: negabaro kim
tags:	vue.js
---

# watch란?

특정 데이터(props,data)의 변화를 감지하여 자동으로 특정 로직을 수행해주는 속성

# watch 문법

watch문법은 아래와 같다.


## 변경값 파라메터를 가지지 않는 문법

```js
watch: {
   변경을감시할프로퍼티명: function () {
      ...
 }
}
```

## 변경값 파라메터를 가지는 문법

필수 항목은 아님

```js
watch: {
   변경을감시할프로퍼티명: function (변경후의값, 변경전의값) {
      ...
 }
}
```

# 감지 방법

감지 방법에는 감시할 프로퍼티명으로 watch에서 프로퍼티를 만들어주는 `data를 직접매핑하는 방법`과
data와 method를 watch에서 매핑해주는 `data를 간접매핑하는 방법` 2가지가 있다.
편의상 직접매핑,간접매핑으로 표기하겠다.


## 직접매핑

```js
props: ["cat-crying2"],
watch: {
  catCrying2(val, oldVal) {
    console.warn(`watched catCrying2 oldValue: ${oldVal} value: ${val}`);
  }
}
```


## 간접매핑

watch 대상 속성에 직접 함수를 연결하는 대신 메서드 함수를 연결할 수 있다.
아래예제는 methods의 logMessage()와 props의 catCrying의 매핑시키는 방법이다.

```js
props: ["cat-crying2"],
watch: {
  catCrying2: "logMessage"
}
methods: {
  logMessage() {
    console.log("logMessage");
  }
}
```

참고로 methods에서 선언한 메소드에도 변경값의 파라메터를 가질 수 있다.


```js
logMessage(val, oldVal) {
  console.log(`logMessage oldValue: ${oldVal} value: ${val}`);
}
```

# 복수의 감지를 watch에 넣으면 마지막에 선언한 부분만 유효함.


동일한 data에 복수의 watch를 선언하면 마지막에 선언한 부분만 실행된다.

아래 예제는 catCrying2에 logMessage,logMessage2라는 2개의 watch를 등록했는데
실행되는것은 logMessage2 뿐이다.

```js
watch: {
  catCrying2: "logMessage",
  catCrying2: "logMessage2"
}
methods: {
  logMessage() {
    console.log("logMessage");
  },
  logMessage2(val, oldVal) {// 이 부분이 실행됨
    console.log(`logMessage2 oldValue: ${oldVal} value: ${val}`);
  }
}
```

# watch options

watch프로퍼티 안에서 사용가능한 옵션에 대해 알아보자.

## handler

먼저 옵션사용시 기존 메소드 내용은 handler에 선언한다.

옵션을 지정하지 않고도 아래와 같이 사용이 가능하다.

```js
watch: {
  catCrying2: {
    handler(val, oldVal) {
      console.warn(`catCrying2 handler oldValue: ${oldVal} value: ${val}`);
    }
  }
}
```



## immediate: true

`immediate: true`을 추가하면 컴포넌트가 생성되자마자 즉시 실행된다.


```js
watch: {
  catCrying2: {
    handler(val, oldVal) {
      console.warn(`catCrying2 oldValue: ${oldVal} value: ${val}`);
    },
    immediate: true // 컴포넌트가 생성되자마자 즉시 실행
  }
}
```

위 watch옵션이 CatChild컴퍼넌트안에 존재한다면 CatChild컴퍼넌트의 life cycle에서
`created()`전에 해당 watch가 한번 실행되게 된다.

아직까지 실무에서 사용해본 경험은 없지만 watch안에서 특정 data값을 초기화 시킬때 사용되지 않을까 싶다.


## deep: true

data가 object일 경우、nested한 값이 변경될때도 감지되게끔 해준다.

```js
data() {
  return {
    catType: {
      type: "Russian Blue",
      sex: "female"
    }
  };
},
watch: {
  catType: {
    handler() {
      console.warn("catType");
    },
    deep: true
  }
}
```


`deep: false`일 때는 아래와 같이 오브젝트 하위의 값을 변경해도 watch가 동작하지 않지만

```js
created(){
  //this.catType = null;
  this.catType.sex = "male";
  this.catType.type = "Bengal";
}
```

`deep: true`일 경우 watch가 동작한다.


### deep를 쓰지 않고 nested한 값 watch하는법

deep를 쓰지 않고도 쿼테이션안에 nested된 오브젝트 키값을 정의해주어도 watch가 동작한다.

```js
catType: {
    type: 'Russian Blue',
    sex: 'female'
},
watch: {
    'catType.type': function(val){
      console.log('catType.type changed');
    }
```

### reference:

```
https://www.e-loop.jp/knowledges/2/
https://joshua1988.github.io/vue-camp/syntax/watch.html#watch-%EC%BD%94%EB%93%9C-%ED%98%95%EC%8B%9D
https://qiita.com/_Keitaro_/items/8e3f8448d1a0fe281648
```