# 특징

데이터 바인딩 과 화면 단위를 컴포넌트 형태로 제공하며, 관련 API 를 지원하는데에 궁극적인 목적이 있음
Angular 에서 지원하는 2 way data bindings 을 동일하게 제공
하지만 Component 간 통신의 기본 골격은 React 의 1 Way Data Flow (부모 -> 자식) 와 유사
다른 Front-End FW (Angular, React) 와 비교했을 때 훨씬 가볍고 빠름.
간단한 Vue 를 적용하는데 있어서도 러닝커브가 낮고, 쉽게 접근 가능

# 인스턴스 생성

Vue Instance 생성자

Vue 생성자를 만드는 방법은 아래와 같다.
// vm 은 ViewModel 을 뜻한다. (관행적인 코딩 컨벤션)

```js
var vm = new Vue({
  // options
});
```

JavaScriptCopy
Vue 객체를 생성할 때 아래와 같이 data, template, el, methods, life cycle callback 등의 options 을 포함할 수 있다.

```js
var vm = new Vue({
  template: ...,
  el: ...,
  methods: {

  },
  // ...
})
```

# Vue Instance 라이프싸이클 초기화

Vue 객체가 생성될 때 아래의 초기화 작업을 수행한다.

데이터 관찰
템플릿 컴파일
DOM 에 객체 연결
데이터 변경시 DOM 업데이트
이 초기화 작업 외에도 개발자가 의도하는 커스텀 로직을 아래와 같이 추가할 수 있다.

```js
var vm = new Vue({
  data: {
    a: 1
  },
  created: function() {
    // this 는 vm 을 가리킴
    console.log("a is: " + this.a);
  }
});
```

JavaScriptCopy
이 외에도 라이프싸이클 단계에 따라 mounted, updated, destroyed 등을 사용할 수 있다. 이 라이프싸이클 초기화 메서드로 커스텀 로직을 수행하기 때문에 Vue 에서는 따로 Controller 를 갖고 있지 않다.

https://joshua1988.github.io/web-development/vuejs/vuejs-tutorial-for-beginner/
