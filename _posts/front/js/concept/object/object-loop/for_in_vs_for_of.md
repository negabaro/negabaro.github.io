# foreach 반복문

foreach 반복문은 `오직 Array 객체에서만 사용가능한 메서드`입니다.(ES6부터는 Map, Set 등에서도 지원됩니다) 배열의 요소들을 반복하여 작업을 수행할 수 있습니다. foreach 구문의 인자로 callback 함수를 등록할 수 있고, 배열의 각 요소들이 반복될 때 이 callback 함수가 호출됩니다. callback 함수에서 배열 요소의 인덱스와 값에 접근할 수 있습니다.

```
var items = ['item1', 'item2', 'item3'];

items.forEach(function(item) {
    console.log(item);
});
// 출력 결과: item, item2, item3
```

# for …in 반복문

for in 반복문은 객체의 속성들을 반복하여 작업을 수행할 수 있습니다. `모든 객체에서 사용이 가능`합니다. for in 구문은 객체의 key 값에 접근할 수 있지만, value 값에 접근하는 방법은 제공하지 않습니다. 자바스크립트에서 객체 속성들은 내부적으로 사용하는 숨겨진 속성들을 가지고 있습니다. 그 중 하나가 [[Enumerable]]이며, for in 구문은 이 값이 true로 셋팅되어 속성들만 반복할 수 있습니다. 이러한 속성들을 열거형 속성이라고 부르며, 객체의 모든 내장 메서드를 비롯해 각종 내장 프로퍼티 같은 비열거형 속성은 반복되지 않습니다.

```
var obj = {
    a: 1,
    b: 2,
    c: 3
};

for (var prop in obj) {
    console.log(prop, obj[prop]); // a 1, b 2, c 3
}
```

# for …of 반복문

for of 반복문은 `ES6에 추가된 새로운 컬렉션 전용 반복 구문입니다. for of 구문을 사용하기 위해선 컬렉션 객체가 [Symbol.iterator] 속성을 가지고 있어야만 합니다`(직접 명시 가능).

```
var iterable = [10, 20, 30];

for (var value of iterable) {
  console.log(value); // 10, 20, 30
}
```

근래 인터뷰에서 reduce() 라는 powerful한 방법을 놔두고 forEach나 map을 왜쓰냐고 털린 경험이 있네요. 같이 익혀놓으시면 좋을거 같아요 저도 이젠 장 쓰고 있습니다 ㅋㅋ

여기 테스트 케이스가 있네요 ㅎㅎ 크롬, 파폭 다 리듀스가 속도가 좋네요 ㅋㅋ

https://jsperf.com/native-map-reduce-vs-for/2

https://jsperf.com/native-map-reduce-vs-for/2

https://jsdev.kr/t/for-in-vs-for-of/2938
