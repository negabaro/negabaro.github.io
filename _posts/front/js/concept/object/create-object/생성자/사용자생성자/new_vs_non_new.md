---
layout: post
title: "xx"
author: negabaro kim
categories: xx
tags: xx
---

```
function MyConstructor(prop) {
    this.prop = prop;
}

var obj1 = MyConstructor("prop value");
var obj2 = new MyConstructor("prop value");

하지만 obj1과 obj2 할당된 값은 아래와 같은 차이가 있다.

console.log(obj1) // undefined
console.log(obj2) // MyConstructor
console.log(obj2.prop) // "prop value"
```

bj1은 값이 정의되지 않은 'undefined' 값이고, obj2는 정상적으로 MyConstructor의 객체와 prop 속성값인 "prop value" 문자열이 할당 된 것을 볼 수 있다.

'new' 키워드와 함께 사용된 생성자 함수는 묵시적으로 객체를 생성하여 'this' 에 바인딩한다.

그리고 동적으로 속성을 정의한 뒤에 역시나 묵시적으로 'this' 를 반환한다.

따라서 obj2에는 정상적인 객체가 생성되어 메모리에 할당 되는 것

하지만 생성자를 'new' 키워드와 사용하지 않으면 `일반 함수 처럼 호출`이 되고,

이때, 'this'는 브라우져의 자바스크립트 실행 환경에서 '머리객체(Head Object)'인 'window' 이다.

따라서 MyConstructor 생성자를 일반 함수로서 호출 하게 되면 머리객체인 'window'에 동적으로 'prop'속성이 생성되며, 아무것도 반환하지 않으므로 obj1는 'undefined'가 된다.

'window' 객체에 'prop' 속성이 생성되었는지 확인해보자.

```
for (var prop in window) {console.log(prop)}
```

window' 객체의 속성을 나열했더니 추가된 prop 이 보인다

이러한 생성자 함수를 'new'키워드와 사용하지 않을때 주의 사항은, 바로 위의 예제에서 'window' 머리객체에 'prop'이 추가 된 것처럼 절대 전역 유효범위를(global scope)를 어지럽혀선 안된다는 것이다.

이유는 자명하다. 전역 머리객체에 개발자가 의도하지 않은 속성이 추가 될 수 있고, 이는 찾아내기 어려운 버그 발생으로 이어지기 때문이다.

### Reference Link:

http://asuraiv.blogspot.com/2017/07/javascript.html
