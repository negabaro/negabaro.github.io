---
layout: post
title:  "rails template안에서 vue component에 props넘길시 코딩 컨벤션에 주의"
tags:	rails/vue
---

# 선 결론

rails template상에서 vue.js component에 props값을 넘길때 카멜케이스 변수에 담아 넘기고 카멜케이스로 받을 수 없다.

vue공식도큐멘트에서 권장한대로 캐밥으로 넘기고 카멜로 받으면 정상적으로 props값을 받을 수 있다.

스네이크케이스 변수에 담아서 스네이크케이스로 받아도 정상적으로 받아진다.

vue안에서도 사용하고 rails template에서도 사용하는 컴퍼넌트에 props을 넘길때는 

캐밥으로 넘기고 카멜로 받도록 로직을 짜도록하자

스네이크로 넘기고 받아도되지만 vue에서 스네이크로 받는건 규약을 어기는것이므로 되도록 하지말자.

# 개요

rails에서는 아래 예제와 같이 javascript가 필요한 특정부분만 vue컴퍼넌트화 해서 사용할때가 있다.

### vue설정

```js
//app/javascript/views/sub_form.js
document.addEventListener("DOMContentLoaded", e => {
  new Vue({
    el: "#vvv-test",
    data() {
      return {
      };
    },
    components: {
      "select-form-address": SelectFormAddress,
    },
    methods: {
      onChange(e) {
        //console.log("onChange", e.target.value);
      }
    }
  });
});
```

### rails view template

```slim
= javascript_pack_tag 'views/sub_form'
#vvv-account-registers-others-information
  select-form-address // << vue.js 에서 정의한 컴퍼넌트를 사용
```

이렇게 rails에서 vue component를 사용할때와

vue.js안에서 component를 사용할때 props넘기는 방법에 차이가 있으므로 주의가 필요하다.

우선 js안에서 props를 넘길때 vue공식문서에서는 캐밥케이스를 넘겨서 카멜케이스로 받는걸 권장하고 있지만

그 외 방법도 정상적으로 동작은한다.

아례는 Good/Bad코드 예제


### 넘길때

```html
<MyComponent my-prop="value"/>  // Good
<MyComponent myProp="value"/>  // Bad
```

### 받을때

```js
props: {
  myProp: String,  // Good
  'my-prop': String,  // Bad
}
```

반면 rails템플릿에서 vue component에 props을 넘길때 카멜케이스를 넘기고 받을 수 없다.

동일코드를 rails에 템플릿에서 실행한 결과와 js안에서 실행한 결과가 다르다는 얘긴데 검증해보자.

아래 코드를 양쪽 패턴에서 실행해봤다.

```html
select-form-address(form_test='keke' form-test2='keke2' formTest3='keke3')
```

### vue쪽 코드

```js
export default {
  props: {
    form_test: "",
    formTest2: "",
    formTest3: ""
  },
  created() {
    console.log("스네이크케이스로 넘긴경우:", this.form_test);
    console.log("캐밥으로 넘겨서 카멜케이스로 받은경우:", this.formTest2);
    console.log("카멜케이스로 넘겨서 카멜케이스로 받은경우:", this.formTest3);
  }
}
```

위 코드를 실행해 나온 console.log의 차이를 살펴보자.

## rails 템플릿에서 실행한 결과

```
스네이크케이스로 넘긴경우: keke
캐밥으로 넘겨서 카멜케이스로 받은경우: keke2
카멜케이스로 넘겨서 카멜케이스로 받은경우: undefined
```

위 결과와 같이 `카멜케이스로 넘겨서 카멜케이스로 받는건은 불가능했다.`


vue공식 도큐멘트대로 캐밥으로 넘겨서 카멜로 받으면 rails템플릿에서 정상작동하며
rails변수의 표준인 스네이크케이스로 넘겨서 vue에서 받을시도 정상작동하는걸 알 수 있다.


## js안에서 실행한 결과

js안에서는 어떤방법으로든 정상적으로 값을 받아옴

```
스네이크케이스로 넘긴경우: keke
캐밥으로 넘겨서 카멜케이스로 받은경우: keke2
카멜케이스로 넘겨서 카멜케이스로 받은경우: keke3
```
