mapGetters
Vuex 에 내장된 helper 함수, mapGetters 로 이미 위에서 한번 가독성이 올라간 코드를 더 직관적이게 작성할 수 있다.

<!-- App.vue -->
<div id="app">
  Parent counter : {{ parentCounter }}
  <!-- ... -->
</div>
HTMLCopy
// App.vue
import { mapGetters } from 'vuex'

// ...
computed: mapGetters({
  parentCounter : 'getCounter' // getCounter 는 Vuex 의 getters 에 선언된 속성 이름
}),
JsCopy
또는 Vuex 의 getters 속성 이름과 컴포넌트의 computed 속성을 동일하게 하여 아래와 같이 간단하게 선언할 수도 있다.

<!-- App.vue -->
<div id="app">
  Parent counter : {{ getCounter }}
  <!-- ... -->
</div>
HTMLCopy
// App.vue
import { mapGetters } from 'vuex'

computed: mapGetters([
  'getCounter'
]),
JsCopy
여기서 주의할 점은 위 방법들은 컴포넌트 자체에서 사용할 computed 속성과 함께 사용할 수 없다는 점이다. 해결방안은 ES6 의 문법 ... 을 사용하면 된다.

// App.vue
import { mapGetters } from 'vuex'

computed: {
  ...mapGetters([
    'getCounter'
  ]),
  anotherCounter() {
    // ...
  }
}
JsCopy
다만 ... 문법을 사용하려면 Babel stage-2 라이브러리 설치 및 babel preset 에 추가가 필요하다. 상세한 설명은 여기를 참고한다.

https://joshua1988.github.io/web-development/vuejs/vuex-getters-mutations/