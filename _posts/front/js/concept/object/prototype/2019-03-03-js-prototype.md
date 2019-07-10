---
layout: post
title: "javascript　Prototype이란?"
author: negabaro kim
categories: js
tags: js concept
---


#### 오브젝트를 만드는 예제

```js
var objectMadeByLiteral = {};
var objectMadeByConstructor = new Object();
```

다른 객체지향언어의 관점에서 위의 코드는 Object객체의 인스턴스를 만든것에 불과하므로 상속받았다고 표현하기는 힘듬
그러나 자바스크립트에서는 다른 개념으로 봐야한다.

지금 만들어진 객체가 Object타입의 인스턴스 객체인 것도 맞지만 <span style="color: red">__프로토타입을 이용한 상속을 지원하는 자바스크립트에서는 Object생성자의 프로토타입을 상속받은 객체라고 표현하는게 더 정확한 표현__</span>이다.

사실 상속이라는 표현도OOP의 관점에서 사용하는 단어로 표현한것일 뿐 실제로는 링크드리스트 형태의 참조를 통한
객체끼리의 연결에 가깝고 클래스 메커니즘 처럼 정적이지 않고 매우 동적이다.

이런 동적인 연결이 좋다는 뜻은 아니다. 상속 구조의 변경이 언어나 엔진 차원에서 아무 제약이 없다 보니 약속된 컨벤션 규칙 혹은 안티 패턴에 대한 이해가 없어 제대로 사용하지 않았을 때는 헬게이트가 열리게 되는 단점이기도 하다.

https://meetup.toast.com/posts/104

# 프로토타입

# Prototype은 왜 알아야 할까?

1. class라는게 존재하지 않는 javascript 세상에서 상속이라는 개념을 이해하기 위해

2. 더 좋은 코드를 짜기위해(prototype을 이용하면 더 좋은 코드를 짤 수 있음)

### 클래스가 없으면 상속도 없다.

프로그래밍 세계에서 기본적으로 클래스가 없으면 상속기능도 없음.
<span style="color: red">__javascript에서는 클래스라는 개념이 없으므로 이 프로토타입을 기반으로 상속을 흉내내도록 구현해 사용함__</span>
※주의: ECMA6에서 Class 문법이 추가되지만 이것은 문법이 추가되었다는 것이지, 자바스크립트가 클래스 기반으로 바뀌었다는 의미는 아님

# Prototype이란?

object의 부모라고 생각하자
prototype도 오브젝트다.

# Prototype의 쓰임새

범용적인 함수를 prototype으로 정의해서 불필요한 빈 오브젝트를 생성하지 않기 위해 사용

## prototype property

함수를 만들면 prototype이라는 프로퍼티가 자동으로 생성됨

```js
function proto() {} //proto.prototype 가 자동으로 생성됨
```

함수는 생성된 시점에서 prototype이라는 프로퍼티를 생성하고
해당 프로퍼티는 빈오브젝트를 가리키고 있음.

prototpye property는 자신의 부모를 참조하고 있다고 생각하면됨.(중요!)

예제를 한번 보자.

```js
function Dog() {}

Dog.prototype.bark = function() {
  console.log('멍멍!!');
};

var dog = new Dog();
dog.bark(); //'멍멍!!';
```

dog자체에는 어떠한것도 가지고 있지않지만 Dog의 부모(Dog.prototype)에게 bark함수를 정의시켰으므로
Dog도 그것을 사용할 수 있는것이다.

## function안에 선언하면 안됨??

이하 예제와 같이 Dog function안에 bark함수를 선언하는것과 뭐가 틀린겨??

```js
function Dog() {
  this.bark = function() {
    console.log('멍멍!!');
  };
}
var dog = new Dog();
dog.bark(); //'멍멍!!';
```

동작의 차이는 없지만 prototype을 사용한 예제가 더 좋은코드이다.
후자 코드의 경우 매번 bark함수가 생성되어서 비효율적이기 때문인데
이걸 이해하기 위해서는 new에 존재하는 암묵적인 룰을 알아야함

```js
function Dog() {
  // var this = {};
  this.bark = function() {
    console.log('멍멍!!');
  };
  // return this;
}
```

이런식으로 this를 리턴해주기 때문에
이함수는 매번 빈 오브젝트를 생성해
새로운 bark함수를 정의해버리는것

prototype을 이용하면 매번 빈 오브젝트를 생성할 필요가 없음.
한번 만들어진 오브젝트를 공유해서 사용가능

## prototype을 사용한 예제

```js
function Dog(cry) {
  this.cry = cry;
}
Dog.prototype.bark = function() {
  console.log(this.cry);
};

var shiba = new Dog('멍멍!!');
shiba.bark(); //'멍멍!!';

var shepherd  = new Dog('컹컹!!');
shepherd.bark(); //'컹컹!!';
```

bark를 어딘가에 있는 빈 공간에 넣어놓고 shepherd과 shiba가 공유해서 사용하고 있다.
위 처럼 코드를 짜면 new를 사용해도 이하와 같이

```js
function Dog(cry) {
  // var this = {};
  this.cry = cry;
  // return this;
}
```

리턴값인 this에 bark가 없어 bark함수를 위한 빈 오브젝트를 생성하지 않게됨.

※참고: new를 사용할때 this프로퍼티는 Dog프로포타입과 같은곳을 참조함.
이 말인즉슨 생성된 인스턴스는 bark함수를 사용할 수 있다는것을 의미

# 여기까지 결론

범용적인 함수는 prototype에서 정의해 효율적인 코딩을 하자!

prototype(부모)에게 범용적인 함수를 정의해
그이후로 인스턴스(자식)은 공통적으로 그 함수를 사용할 수 있다.

# Prototype에 대해 조금 자세히 들여보자

Prototype과 좀더 친해지기 위해서는
`Prototype Link` 와 `Prototype Object`의 의미에 대해 알 필요가 있다.
보통 이 둘을 통틀어 `Prototype`이라고 부른다.
`Prototype Object`안에 `Prototype Link`가 존재하는 이미지다.

# Prototype Object

객체는 언제나 함수로 정의되는데
함수가 정의될때 해당 함수에 `Prototype Object`가 생성 및 연결된다.
생성된 함수는 `prototype`이라는 속성을 통해 `Prototype Object`에 접근이 가능하다.
`Prototype Object`는 일반적인 객체와 동일하며
`Prototype Object`안에는 2가지 기본적인 속성을 가지는데
`constructor`와 `__proto__`다.

## Constructor(생성자)

Constructor 자격이 부여되면 new를 통해 객체를 만들어 낼 수 있게 된다.
이것이 함수만 new 키워드를 사용할 수 있는 이유다.

## `__proto__` === Prototype Link

`__proto__`가 바로 `Prototype Link`다.

위에서 설명한 Dog function에서 bark가 존재하지 않는데 어떻게 접근이 가능했을까?
`__proto__`가 그것을 가능하게 해준다.

prototype 속성은 함수만 가지고 있던 것과는 달리(Dog.prototype)
`__proto__`속성은 모든 객체가 빠짐없이 가지고 있다.

`__proto__`는 객체가 생성될 때 조상이었던 함수의 `Prototype Object`를 가리킨다.

shiba객체가 Dog함수로부터 생성되었으니 shiba객체의 `__proto__`는 Dog함수의 `Prototype Object`를 가리키게 된다.

```js
console.log(shiba);
console.log(shepherd);
```

![image](https://user-images.githubusercontent.com/4640346/53732911-ab4c6980-3ec2-11e9-9613-f5109e4aa975.png)

shiba객체는 bark함수를 직접 가지고 있지 않기 때문에 bark속성을 찾을 때 까지 상위 프로토타입을 탐색한다.
최상위 오브젝트인 Prototype Object까지 도달했는데도 못찾았을 경우 undefined를 리턴한다.
이렇게 `__proto__`속성을 통해 상위 프로토타입과 연결되어있는 형태를 `프로토타입 체인(Chain)`이라고 한다.

이런 프로토타입 체인 구조 때문에 모든 객체는 Object의 자식이라고 불리고, Object Prototype Object에 있는 모든 속성을 사용할 수 있다.
예를 들면 toString함수가 그러하다.

### Reference Link:

```
https://meetup.toast.com/posts/104
https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67
https://qiita.com/takeharu/items/809114f943208aaf55b3
```
