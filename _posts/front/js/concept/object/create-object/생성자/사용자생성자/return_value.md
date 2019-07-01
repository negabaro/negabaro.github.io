# 생성자의 반환값

생성자 함수를 new와 함께 호출하면 `항상 객체가 반환`됩니다.

기본값은 this 로 참조되는 객체입니다.

생성자 함수 내에서 아무런 프로퍼티나 메소드를 추가하지 않았다면 '빈'(즉, 생성자의 프로토타입에서 상속된 것 외에는 '비어있는') 객체가 반환될 것입니다.

함수 내에 return문을 쓰지 않더라도 생성자는 암묵적으로 this를 반환합니다.

그러나 반환 값이 될 객체를 따로 명시적으로 정할 수도 있습니다.

다음 예제에 새로운 객체를 생성하여 this로 참조하고 반환되는 것을 볼 수 있습니다.

```
JAVASCRIPT
var Objectmark = function () {
// 생성자가 다른 객체를 반환하기로 결정했기 때문에
// 다음의 'namme' 프로퍼티는 무시된다
this.name = 'This is it';

// 새로운 객체를 생성하여 반환한다.
var that = {};
that.name = "And that's that";
return that;
};

// TEST
var o = Objectmark();
console.log(o.name); // "And that's that"
```

이와 같이 생성자에서는 어떤 객체라도 (객체이기만 한다면)반환할 수 있습니다. 객체가 아닌 것(예를 들면 문자열이나 false 갑)을 반환하려고 시도한다면, 에러가 발생하진 않지만 그냥 무시되고 this에 의해 참조된 객체가 대신 반환됩니다.

출처: https://webclub.tistory.com/309 [Web Club]

출처: https://webclub.tistory.com/309 [Web Club]

https://webclub.tistory.com/309
