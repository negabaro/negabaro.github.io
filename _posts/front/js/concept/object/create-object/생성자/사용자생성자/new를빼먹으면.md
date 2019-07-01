# 빼먹으면?

주의할 것은 new 연산자가 빠지면 안되는 점이다. 그냥 Person() 으로 호출하면 Person은 `일반 함수로서 동작`한다. 일반 함수의 this는 기본적으로 글로벌 객체를 참조하며 strict-mode에서는 undefined이 된다.

출처: https://heygyun.tistory.com/45 [haeguri]

그렇다면 생성자를 호출할 때 new를 빼먹으면 어떻게 될까?

문법 오류나 런타임 에러가 발생하지는 않지만, 논리적인 요류가 생겨 예기치 못한 결과가 나올 수 있습니다.

new를 빼먹으면 생성자 내부의 this가 전역 객체를 가리키게 되기 때문입니다.(브라워저에서라면 this가 window를 가리키게 된다)

생성자 내부에 this.member 와 같은 코드가 있을 경우 이 생성자를 new 없이 호출하면, 실제로는 전역 객체에 member라는 새로운 프로퍼티가 생성됩니다.

이 프로퍼티는 window.member 또는 그냥 member를 통해 접근할 수 있습니다. 알다시피 전역 네임스페이스는 항상 깨끗하게 유지해야 하기 때문에, 이런 동작 방식은 대단히 바람직하지 않습니다.

```
JAVASCRIPT
// 생성자
function Coffee() {
    this.tastes = 'dalcom';
}

// 새로운 객체
var morning_coffee = new Coffee();
console.log(typeof morning_coffee);  // 'object'
console.log(morning_coffee.tastes);  // 'dalcom'
JAVASCRIPT
// 안티 패턴
// 'new' 를 빼먹음
var morning_coffee = Coffee();
console.log(typeof morning_coffee);  // 'undefined'
console.log(window.tastes);  // 'dalcom'
```

ECMAScript5에서는 위와 같은 동작 방식의 문제에 대한 해결책으로, 스트릭트 모드에서는 this가 전역객체를 가리키지 않도록 했다. ES 5를 쓸 수 없는 상황이라면, 생성자 함수가 new 없이 호출되어도 항상 동일하게 동작하도록 보장하는 방법을 써야한다.

출처: https://webclub.tistory.com/309 [Web Club]

출처: https://webclub.tistory.com/309 [Web Club]

### Reference Link:

https://webclub.tistory.com/309
