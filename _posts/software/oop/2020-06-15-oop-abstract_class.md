---
layout: post
title:  "OOP 추상화 클래스란?"
author: negabaro kim
lastmod: "2020-06-15"
description: 자식 클래스에 추상 메소드의 구현을 강제시키기 위해 존재
tags: oop software
---

# 추상이란?

여러가지 사물이나 개념에 공통되는 특성이나 속성을 추출해 파악하는 행위

# 추상화란?

클래스간의 공통점을 찾아내서 공통의 부모를 설계하는 작업

# 구체화란?

상속을 통해 클래스를 설계,확장하는 작업

# 추상화 클래스(abstract class)란?

특정 오브젝트에 어떤 역할이 있는지 설계할때 사용
자식 클래스에 추상 메소드의 구현을 강제시키기 위해 존재

# 추상화 메소드란(abstract method)란?

메소드의 구현할 직접적인 대상

# 추상클래스 특징

인스턴스화 할 수 없다.
상속은 가능하다

추상클래스안에 추상메소드를 가지고 있을 수도 있지만 없을 수도 있다.
어떤 클래스가 추상메소드를 포함한다면 해당클래스는 추상클래스로 선언되어야 한다.
추상클래스안에 구현부를 정의할 수 있다.

# 추상클래스와 vs 상속의 차이

재정의를 강제하느냐 강제하지 않느냐의 차이가 있다.
단순 상속의 경우 재정의 하지않고 부모 클래스를 메소드를 그대로 쓸 수 있으나
추상클래스는 재정의(오버라이딩)을 강제한다.

물론 단순 상속에서 재정의를 하는것도 가능은 하다. 포인트는 강제하느냐 안하느냐의 차이다.


# 추상 클래스의 장점

1. 부모클래스에서 공통 부분을 구현과 설계가 완료되면 자식 클래스에서 상속받아 기능을 확장 시 이롭다.
2. 자식 클래스에서 추상메서드를 반드시 구현하도록 강요한다. 이는 프로그램의 표준화 정도를 높인다.
3. 공통 사항이 한곳에서 관리되어 개발 및 유지보수에 용이하다.



# 추상 클래스의 단점


## 추상 메소드 구현의 강제성

이 강제성 때문에 사용하는거긴한데 가끔은
자식 클래스에서 사용하지 않는 추상 메소드라도 객체 생성을 위해 반드시 구현해야하기 때문에
그러한 상태를 만들지 않기 위한 구성을 만들기 위한 설계 코스트가 늘어날 수 있다.


## 상속의 코스트

interface와 비교한 단점인데
상속 받은 정보를 부모 클래스로부터 Look-up 하여 살펴봐야 하기 때문에 인터페이스 보다 비싼 연산이 발생한다.
거기에 많은 수를 추상 메소드를 갖는 추상 클래스는 상속에 부담을 주게 된다.



## 단일 상속만이 가능

이 부분도 interface와 비교되는 단점인데
서브 클래스는 한 번에 한 개의 추상 클래스만을 상속 받을 수 있다는 점은
다중 상속이 가능한 인터페이스에 비해 유연하지 않는 계층구조이다.

또한 추상 클래스의 자식 클래스가 추상 클래스일때 추상 메소드 구현의 강제성을 자식 클래스에게
넘길 수 있어 해당 계층구조(하이라키)가 커지면 가독성이 떨어진다.

# 추상화는 절대적 first step인가?

일단 코드를 짜고 공통 분모를 찾아내서 추상화로 리팩토링 하느냐
코드를 짜기전에 추상화 클래스를 유출한 후 스타트할 것이냐

사양이 자주 바뀌는 경우 후자를 선택하는게 효율적인 선택이 될지도 모른다.

추상 클래스를 상속하는 자식 클래스가 어느정도 있느냐에 따라 메릿이 비례할것 같다.




### reference:
```
https://junyongs.wordpress.com/2014/07/29/abstract-class-%EC%B6%94%EC%83%81-%ED%81%B4%EB%9E%98%EC%8A%A4-vs-interface-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4-in-java/
https://sungwoon.tistory.com/58
https://asfirstalways.tistory.com/165
```