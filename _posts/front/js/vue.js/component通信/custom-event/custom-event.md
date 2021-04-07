<app-header v-on:" 하위컴포넌트에서 발생한 이벤트" = " 상위 컴포넌트의 메서드"></app-header>

 <child-component v-on:이벤트 명="상위 컴포넌트의 실행할 메서드 명 또는 연산"></child-component>

 https://joshua1988.github.io/vue-camp/vue/event-emit.html#%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%B0%9C%EC%83%9D-%EC%BD%94%EB%93%9C-%ED%98%95%EC%8B%9D
 
컴포넌트 및 props와는 달리, 이벤트는 자동 대소문자 변환을 제공하지 않습니다. 대소문자를 혼용하는 대신에 emit할 정확한 이벤트 이름을 작성하는 것이 권장됩니다. 예를 들어, 아래와 같이 camelCase로 작성된 이벤트를 emit하는 경우,

this.$emit('myEvent')
아래와 같이 kebab-case로 이벤트를 작성하게 되면 아무 동작도 하지 않습니다.

<!-- 이벤트가 동작하지 않음 -->
<my-component v-on:my-event="doSomething"></my-component>
컴포넌트 및 props와는 다르게 이벤트 이름은 자바스크립트 변수나 속성의 이름으로 사용되는 경우가 없으며, 따라서 camelCase나 PascalCase를 사용할 필요가 없습니다. 또한, (HTML의 대소문자 구분을 위해) DOM 템플릿의 v-on 이벤트리스너는 항상 자동으로 소문자 변환되기 때문에 v-on:myEvent 는 자동으로 v-on:myevent로 변환됩니다. – 즉, myEvent 이벤트를 들을 수 없습니다.

이러한 이유 때문에, 이벤트 이름에는 kebab-case를 사용하는것이 권장됩니다.

```js
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

https://kr.vuejs.org/v2/guide/components-custom-events.html

https://kr.vuejs.org/v2/guide/components-custom-events.html