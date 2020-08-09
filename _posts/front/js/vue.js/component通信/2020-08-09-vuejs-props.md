---
layout: post
title:  "vue.js props에 대해 알아보자"
author: negabaro kim
tags:	vue.js
---

# props란


부모 컴퍼넌트가 자식 컴퍼넌트에게 특정 값을 넘겨줄때 사용한다.


# props 사용시 주의사항


props기술이 많다는것은 부모 컴퍼넌트에 많은 속성을 전달받는다는 의미이고
그것을 받는 자식 컴퍼넌트는 부모컴퍼넌트에 그만큼 종속된 것을 의미한다.

이러한 종속은 시스템에 복잡해질수록 가독성을 떨어뜨리고 버그를 일으킬 가능성이 높아지므로 지양해야한다.


# props값을 넘겨받아서 직접 변경은 불가능(기본적으로)


```js
props: ["cat-crying"],
created(){
  this.catCrying = text; //<< Vue warn이 뜸
}

```
직접변경시 아래와 같은 에러를 만나게된다.

```
[Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "catCrying"
```

경고는 발생했지만 실제로 값은 바뀌긴 바뀐다.


# 자식 컴퍼넌트에서 전달받은 props의 값을 바꿔야한다면 props를 전달한 부모에 변수를 바꿔라

props로 전달받은 값은 자식 컴퍼넌트에서 안바꾸는게 좋겠지만
굳이 바꿔야한다면 자식컴퍼넌트가 아니고 props를 전달한 부모 컴퍼넌트의 값을 바꿔줘야할것이다.

방법으로는 watch와 같은 감시자를 만들고 상위 컴퍼넌트에 이벤트를 전달하는 $emit을 이용해 부모 컴퍼넌트에서 넘긴 props의 값을 재바인딩한다.

이러한 로직이 늘면 가독성이 매우 떨어져 보수가 힘드므로 주의해서 사용하자.


# 부모에게 받은 props를 자식컴퍼넌트안에서 사용하는 데이터의 초기값으로 사용할 경우

이 경우는 로컬 데이터 속성을 따로 선언하고, props의 값을 해당 속성의 초기값으로 대입하는것이 바람직하다.

아래 예제는 prop값을 local data인 counter에 대입하는 예제이다.

```js
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

# 전달된 prop의 형태를 바꾸어야 하는 경우

이 경우는 computed 속성을 사용하는 것이 가장 바람직하다.

```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```


# 변수에 담긴 값을 자식 컴퍼넌트에 props로 넘겨줄때(동적 props)


```js
<CatChild cat-crying="catCrying" />
```

이런식으로 넘겨주면 "catCrying"이라는 문자열을 props로 넘겨준다는 의미이다.

catCrying이라는 변수값을 넘기기 위해서는 `:`를 props의 변수명앞에 붙여주면 된다.

```js
<CatChild :cat-crying="catCrying" />
```

아래의 축약형이다.

```js
<CatChild v-bind:cat-crying="catCrying" />
```



# props로 받은 값을 template에서 그대로 사용가능

```js
<template>
  <span>
    Cat Child: {{{ crying }}}
  </span>
</template>

<script>
export default {
  props: ["crying"]
}
</script>
```


# props로 받은 변수명과 data에 정의한 변수명이 같으면 에러

```js
  props: ["crying"],
  data() {
    return {
      crying: "mew"
    };
  },
```

props로 넘긴 crying과 똑같은 이름이 data에도 존재할때
아래와 같은 에러가 발생한다.

```
[Vue warn]: The data property "crying" is already declared as a prop. Use prop default value instead.
```

# kebab-case = CamelCase 자동매핑

kebab-case = CamelCase 자동매핑이 되어있어

props값을 kebab-case로 넘겨도 CamelCase로 받아 사용할 수 있다.

```js
<template>
  <span>Cat Child: {{cryingText}} </span>
</template>
<script>
export default {
  props: ["crying-text"]
}
</script>

```

# props options


옵션을 지정하지 않을때 props는 문자열 배열을 열거하지만
옵션 지정시 오브젝트 배열을 이용한다.
옵션에는 type형태,필수항목,디폴트값등 지정이 가능하다.

아래에서는 몇가지 props의 옵션에 대해 알아보자.

## required: true

`required: true`지정시 해당 props를 넘겨받지 않으면 아래와 같은 에러를 발생시킨다.

```
[Vue warn]: Missing required prop: "catCrying"
```

### 코드 예제

```js
props: {
  catCrying: {
    required: true // 필수항목으로 지정
  }
},
```



## type

`type: Number`지정하고 문자열 값을 넘기면 아래와 같은 에러가 발생한다.

```
[Vue warn]: Invalid prop: type check failed for prop "catCrying". Expected Number with value NaN, got String with value "hhhhhhhhhhh".
```

### 코드 예제

```js
props: {
  catCrying: {
    type: Number, // Number type지정
  }
},
```

### 그 외

type에는 String, Number, Boolean, Array, Object, Date, Function, Symbol이 있다.

type지정시 부모 컴퍼넌트는 정적인 값일때도 v-bind 해줘야함을 기억하자




### multiple type

복수의 타입을 지정하는것도 가능

```js
type: [String, Number]
```


## validator

validator를 `"meow", "mew"`지정후 그 외 문자열을 props로 넘기면 아래와 같은 에러가 발생한다.

```js
[Vue warn]: Invalid prop: custom validator check failed for prop "catCrying".
```

### 코드 예제

```js
props: {
  catCrying: {
    ...
    validator: function(value) {
      return ["meow", "mew"].indexOf(value) !== -1;
    }
  }
},
```


prop은 초기값만 전달하고, 자식 컴포넌트는 그 초기값을 로컬 데이터 속성으로 활용하고 싶은 경우
해당 경우에는 로컬 데이터 속성을 따로 선언하고 그 속성의 초기값으로써 prop을 사용하는 것이 가장 바람직합니다.

props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
전달된 prop의 형태를 바꾸어야 하는 경우
해당 경우에는 computed 속성을 사용하는 것이 가장 바람직합니다.

props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}


### reference:

```
https://kr.vuejs.org/v2/guide/components-props.html
https://www.e-loop.jp/knowledges/3/
```