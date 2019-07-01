화살표 함수는 자채 실행 문맥을 가지지 않기 때문에 외부 함수의 this를 상속 받는다.

아래의 예제는 문맥의 직관성을 보여준다.

```
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  log() {
    console.log(this === myPoint); // => true
    setTimeout(()=> {
      console.log(this === myPoint);      // => true
      console.log(this.x + ':' + this.y); // => '95:165'
    }, 1000);
  }
}
```

var myPoint = new Point(95, 165);
myPoint.log();
setTimeout은 log() 메소드처럼 myPoint 객체를 바라보는 화살표 함수를 호출한다. 보다시피 화살표 함수는 외부 함수의 문맥을 상속 받았다.

이 예제에서 만약 일반 함수를 사용하려 했다면, 그 함수는 새로운 문맥(window 혹은 undefined)을 만들게 된다. 그래서 일반 함수로 같은 결과를 얻기 위해서는 문맥을 지정해주는 작업이 따로 또 필요하다.

setTimeout(function() {...}.bind(this))은 장황하다. 하지만, 화살표 함수를 사용하면 깔끔하고 단어 길이도 훨씬 짧다.

# 만약 화살표 함수가 최상단 스코프에 정의 되었다면, 여기서의 문맥은 항상 전역 객체다.

```
var getContext = () => {
   console.log(this === window); // => true
   return this;
};
console.log(getContext() === window); // => true
```

# 화살표 함수의 문맥은 바뀔 수 없다. 문맥을 수정하는 메소드를 사용하더라도 절대 바뀌지 않는다.

```
var numbers = [1, 2];
(function() {
  var get = () => {
    console.log(this === numbers); // => true
    return this;
  };
  console.log(this === numbers); // => true
  get(); // => [1, 2]
  // 화살표 함수에 .apply() 혹은 .call()을 적용
  get.call([0]);  // => [1, 2]
  get.apply([0]); // => [1, 2]
  // Bind
  get.bind([0])(); // => [1, 2]
}).call(numbers);
```

함수 표현식이 .call(numbers)을 통해 간접 실행되었다. 여기서의 실행 문맥은 numbers다. get이라는 화살표 함수는 this를 numbers로 가리킨다. 왜냐하면 구성 문맥을 상속받기 때문이다.

get 함수가 어떻게 실행되던, numbers라는 초기 문맥을 유지한다. .call(), .apply(), .bind()로 문맥을 바꿔봐도 효과가 전혀 없다.

# 화살표 함수는 생성자 함수로 사용될 수 없다.

만약 new get()처럼 생성자 함수로 실행된다면, 자바스크립트는 TypeError: get is not a constructor라는 에러를 반환한다.
