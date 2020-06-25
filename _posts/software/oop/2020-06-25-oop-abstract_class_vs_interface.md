---
layout: post
title:  "OOP 추상클래스와 인터페이스의 차이는?"
author: negabaro kim
lastmod: "2020-06-24"
description: 특정 오브젝트에 어떤 역할이 있는지 설계할때 사용. 추상화 클래스와 흡사한 역할을 한다.
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


