---
layout: post
title:  "OOP 추상클래스와 인터페이스의 차이는?"
author: negabaro kim
lastmod: "2020-06-25"
description: 가장 큰차이는 추상클래스는 단일상속, 인터페이스는 다중상속이 가능하다는 것. 가독성면에서는 하이라이키가 클 우려가 있는 추상클래스보다 인터페이스가 좋음.
tags: oop software
---

# 공통점

## 추상화

추상적인 메소드를 정의한다는 의미에서 둘은 같다고 할 수 있다.

## 자식클래스에서 구현을 강제

### 추상클래스

abstract으로 시작하는 메소드는 자식클래스에서 필수적으로 구현해야함

### 인터페이스

인터페이스에 있는 메소드는 자식클래스에서 반드시 구현해야함.

## 다형성 관점

인터페이스가 다형성의 특성을 가지고 있다는 글들을 많이 보는데 잘 이해가 되지 않는다.

일단 현재 결론은 상속에 의한 다형성에 있어서는 추상화클래스에서도 인터페이스에서도 다형적일 수 있다는게 내 결론이다.
매개변수에 의한 다형성은 인터페이스만 가능한것 같다.(확실하지 않음)

자세한건 따로 포스팅 예정


# 차이점

이하는 인터페이스와 추상클래스의 차이점이다.


## 가독성면

인터페이스가 가독성면으로 뛰어남
왜냐면 추상클래스는 자식 클래스들에게 추상 메소드들의 구현을 강제하지 않으므로 자식클래스가 다시 추상 클래스가 되버릴 수 있음.

이렇게 되면 코드를 보는 입장에서는 부모의 부모의 부모의 조상 찾기로 시간을 허비하는 문제가 발생할 수 있음.
이렇게 부모 -> 자식 관계가 길어지는걸 `하이라키가 커진다`고라고 말함.


## 상속방법 측면(java,ts기준)

일반 클래스와 abstract 클래스는 extends를 이용해서 상속
interface를 상속시 implements를 사용


## 상속갯수 측면

interface는 복수의 상속이 가능
abstract은 단일상속만 가능

## 클래스간의 관련성

자식 클래스들이 서로간의 관련성이 높을때 추상 클래스를 사용하고 관련성이 낮으면 인터페이스를 사용하는 경향이 있다.

팁으로 먼저 추상 클래스를 만들어보고 자식 클래스에서 추상 메소드의 활용도가 높으면 그대로 추상 클래스를 사용하고
활용도가 낮으면 인터페이스로 바꿔보는 방법도 괜찮을듯 하다.

스타크레프트의 유닛을 추상화 한다고 생각해보자.

클로킹, 공중공격, 실드에너지, 에너지가 있다고 치면

에너지는 모든 유닛이 공통적으로 가지지만 실드에너지는 프로토스 유닛만 가지고
공중공격이나 클로킹은 각 유닛마다 제각각이다.

에너지의 경우 모든 유닛이 공통적으로 가지므로 추상화 클래스에 정의하는 편이 좋을거 같다.
실드에너지도 하이라이키가 늘어나겠지만 유닛 밑에 프로토스 유닛 추상화 클래스를 만들어 거기에 선언해줘도 괜찮다.
그러나 공중공격,클로킹 부분은 유닛마다 완전 다르므로 인터페이스에 정의하는게 좋다고 생각한다.
이런식으로 클래스간의 관련성이 낮은 부분들이 있다면 다른 부분들이 공통속성이라 해도 인터페이스로 가는게 타당하다고 생각한다.


# 메모1.

A bigger difference in TypeScript is that (abstract) classes are available at runtime, while interfaces are compile time only. This means that you cannot, for example, use instanceof with interfaces.

```js
let x: any;

if (x instanceof IPerson) { // Error: 'IPerson' only refers to a type, but is being used as a value here.

}

if (x instanceof Person) { // OK

}
```

If you don't really need runtime types, like the above example, or want to have implementations in the concrete classes only, go for interfaces. As they are compile time only, the size of the generated JS will be smaller.

typescript에서는 abstract class는 runtime에 실행되고
interface는 컴파일시에 실행된다고

runtime에 실행되어야할 특별한 이유가 없으면 interface를 쓰는게 맞다고 함


# 메모2

java에서 추상클래스에서는 구현 메소드를 넣을 수 있는데 인터페이스에 구현 메소드를 넣을 수 없어서
구현 메소드를 추가 가능 여부로 비교를 하기도 했는데 java8 이후부터 인터페이스에 default라는 기능으로 인해
구현 메소드를 추가할 수 있게됨.

## 메모3. 템플릿 메소드 패턴에서의 차이

템플릿 메소드 패턴에서는 템플릿 메소드와 hook 메소드를 분리하여 일정한 프로세스를 가진 기능을 hook 단위로 분리시킨다. 이때 추상클래스를 하나 만들고, 템플릿 메소드에서는 hook 메소드를 호출하고, 추상클래스를 상속받아 구현한 클래스에서 hook 메소드들을 구현하는 방식이다.
그런데 자바8 부터는 인터페이스도 default 키워드를 통해 구현체를 가질 수 있는데 왜 추상클래스를 사용해야 하는지에 대한 의문이 생겼다.

개인적인 생각으로, 인터페이스를 사용해도 구현은 똑같이 할 수 있지만 추상클래스를 사용하여 hook 메소드들에 대한 엄격한 접근제어를 사용할 때, 템플릿 메소드 패턴을 강제할 수 있다는 결론을 내렸다.

## 메모4. 퍼포먼스 차이?

언어 마다 다름. 만약에 차이가 있더라도 신경쓰지 않아도 될 정도로 크지 않음.

`premature optimization is the root of all evil`이라고 말해도 될 정도

https://stackoverflow.com/questions/12514131/which-one-is-fast-abstract-class-or-interface


### reference:

```
https://yaboong.github.io/java/2018/09/25/interface-vs-abstract-in-java8/#:~:text=%EC%B6%94%EC%83%81%ED%81%B4%EB%9E%98%EC%8A%A4%EB%8A%94%20abstract%20%EB%9D%BC%EB%8A%94,%EA%B5%AC%ED%98%84%EB%B6%80%EA%B0%80%20%EC%97%86%EB%8A%94%20%EB%A9%94%EC%86%8C%EB%93%9C%EC%9D%B4%EB%8B%A4.
https://junyongs.wordpress.com/2014/07/29/abstract-class-%EC%B6%94%EC%83%81-%ED%81%B4%EB%9E%98%EC%8A%A4-vs-interface-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4-in-java/
https://marobiana.tistory.com/58
https://meaownworld.tistory.com/97
```


