---
layout: post
title:  "OOP 인터페이스란?"
author: negabaro kim
lastmod: "2020-06-17"
description: 특정 오브젝트에 어떤 역할이 있는지 설계할때 사용. 추상화 클래스와 흡사한 역할을 한다.
tags: oop software
---

# 인터페이스란?

추상화 클래스와 흡사한 역할을 함
특정 오브젝트에 어떤 역할이 있는지 설계할때 사용

# 인터페이스 특징

다중상속이 가능
상속을 받을때 implements를 사용(java,typescript기준)
인스턴스화 하는 것이 불가능

# 인터페이스를 사용해야하는 경우(=다중상속을 사용하는 경우)

하나의 부모 밑에 있기에는 서로 너무 다른 속성을 가진 클래스들에게 자주 사용한다.

단일속성의 경우,댄싱과 예능감이라는 속성을 idol 추상클래스에 부여하면
예능감이 없는 twice가 idol을 상속받아 반드시 구현한다는 것에 위화감을 느낄때가 있다.

이럴때 예능감,댄싱을 각각 인터페이스로 정의해
twice는 댄싱만 implement받고 슈퍼주니어는 예능감,댄싱을 다중상속 받게끔 구현하는게
더 자연스러울때 인터페이스를 사용한다.



# 메모1

java8이전에는 interface에 구현부를 정의할 수 없었는데
이후부터 default라는 기능이 생겨 interface에서도 구현부를 정의할 수 있게 되었다.


### reference:

```
https://meaownworld.tistory.com/97
```