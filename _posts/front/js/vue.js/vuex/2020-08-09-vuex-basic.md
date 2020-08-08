---
layout: post
title:  "vue.js Vuex에 대해서 알아보자"
author: negabaro kim
tags:	vue.js vuex
---

# vuex란?

Vue에서 개발하는 컴퍼넌트에서 사용가능한 데이터를 중앙 집중식 저장소에서 저장하고 관리하는 툴이다.

여기서 말하는 데이터는 특정 액션에 의해 값이 변하는데 이 변화를 추적하는것이 vuex의 중요한 역할이어서
데이터(data)를 상태(state)라고 표현한다.

# store란?

위에서 말한 중앙 집중식 저장소를 store라고 부른다.

# state란?

store안에 있는 데이터를 state라고 부른다.

data가 아닌 state라고 표기한것은 vuex의 목적이 data의 변화를 캐치하는것이 메인이어서 state라고 명명한것 같다.


# vuex의 내부기능/외부기능

vuex는 개발자가 건드릴 수 없는 영역(내부기능?)과 개발자가 건드릴 수 있는 영역(내부기능?)이 있다.

## 외부기능

개발자가 건드릴 수 있는 영역이다. 우리가 열심히 만져야할 부분..

외부기능의 목적은 state값을 set하거나 get하는것이다.

set에 해당하는 기능으로는 mutations get에 해당하는 기능으로는 getters가 있다.
그리고 set하는 기능인 mutations을 보조하는 역할로 actions가 있다.


## 내부기능

만지지는 못하지만 잘 이해해야할 부분이다.

vuex의 특징과도 같은데 대표적으로는 state가 갱신되면 해당 상태를 참조하는 컴퍼넌트들에게도 갱신된 정보가 전달된다는 점이다.


# getters란?

getters는 store에 있는 state값을 가져올때 사용한다.

사실 getters가 없어도 이런식으로 `this.$store.state.xx` state값에 접근하는게 가능하다.
그런데도 getters를 쓰는 이유는 일종의 규약으로서 코드의 가독성이 높아지고 중복 호출시 성능의 이점도 가지기 때문이다.

그 이외에도 store를 module별로 나눴을때 A모듈의 getters에서 B모듈의 state값에 접근이 가능하는 등(rootState) 유용한 기능이 많다.

그러므로 Vue 초심자분들은 일단 `state는 getters를 경유해서 가져온다`라고 생각하면 좋을것 같다.

## getters문법

기본 문법은 아래와 같다.

### 등록

```js
export const store = new Vuex.Store({
  // ...
  getters: {
    getItem: function (state) {
      return state.item;
    }
  }
});
```

### 호출

```js
<template>
  <div id="app">
    {{ getItem }}
  </div>
</template>
<script>
computed: {
  getItem() {
    this.$store.getters.getItem;
  }
},
</script>
```

# mutations

state값을 set할때 사용한다.

state값은 초기값이 있으므로 set보다 갱신(변경)한다고도 표현하는게 맞을 수 있다.

mutations 안에서 변경하지 않고 state를 직접 변경하는것도 가능하지만 
어디에서 변경되었는지 추적이 어려워 안티패턴이다.

당연한 얘기지만 갱신을 하므로 인자를 받는다.

mutations 호출시 commit이라는 메소드를 이용해야한다.

mutation의 경우 다른 모듈의 state값에 접근할 수 없다.(인자로 rootState를 받을 수 없음. rootState를 사용하기 위해서는 뒤에서 설명할 actions을 경유해야함)

## mutations문법

### 등록 

```js
// store.js
export const store = new Vuex.Store({
  // ...
  mutations: {
    addItem: function (state, item) {
      return state.item = item;
    }
  }
});
```

### 호출

```js
methods: {
  addItem(item) {
    this.$store.commit('addItem', item);
  }
},
```

# actions

actions는 mutations을 보조해준다고 생각하면 편하다.

javascript에서는 동기처리/비동기 처리라는 개념이 있는데 
mutations에서 동기처리/비동기 처리를 전부 포함 시켜버리면 변경 순서에 대한 예측이 어려우므로
mutations에서는 동기처리만을 담당하게 하고 actions에서는 비동기 처리를 담당하도록 역할 분담을 하고 있다.

여기서 헷갈리지 말아야할 것은 비동기처리만 actions에서 하고 실제 값을 변경하는것은 mutations을 그대로 이용한다는 점이다.
그래서 actions안에 mutation을 호출하는 commit로직이 들어가 있다.

예를들어 비동기로 api호출후 성공하면 response state에 success를 실패하면 failed라는 값을 넣는다든지 actions안에 복수의 commit이 들어가 있는 경우가 많다.

mutations호출시 commit을 이용하는 것처럼 actions는 호출시 dispatch를 사용한다.

## 문법


### 등록

```js
// store.js
export const store = new Vuex.Store({
  // ...
  mutations: {
    setItem: function (state, item) {
      return state.item = item;
    }
    ...생략
  },
  actions: {
    getItemApi: function (context) {
      let response;
      try {
        response = await axios( {method: 'GET', url: apiUrl})
      } catch ( e ) {
        commit( 'changeApiStatus', { status: ApiStatus.FAILURE } )
      }
      commit( 'changeApiStatus', { status: ApiStatus.SUCCESS } )
      commit( 'setItem', { response.data } )
    }
  }
});
```

### 호출

```js
methods: {
  getItemApi() {
    this.$store.dispatch('getItemApi');
  }
},
```