---
layout: post
title: "js Function 특징과 관련 용어정리"
author: negabaro kim
categories: js
tags: js concept
---

자바스크립트의 함수를 특별하게 만드는 두 가지 중요한 특징이 있습니다.

첫째, 함수는 일급(first-class)객체입니다.

둘째, 함수는 유효범위(scope)를 제공합니다.

함수는 다음과 같은 특징을 가지는 객체입니다.

런타임(run time), 즉 프로그램 실행 중에 동적으로 생성할 수 있다.
변수에 할당할 수 있고, 다른 변수에 참조를 복사할 수 있으며, 확장이 가능하고, 몇몇 특별한 경우를 제외하면 삭제할 수 있다.
다른 함수의 인자로 전달할 수 있고, 다른 함수의 반환 값이 될 수 있다.
자기 자신의 프로퍼티와 메서드를 가질 수 있다.

출처: https://webclub.tistory.com/310 [Web Club]

출처: https://webclub.tistory.com/310 [Web Club]

## Javascript Function이란?

독립적으로 분리된 로직으로서 프로그램 수준에서 미리 정의되어 있거나 사용자정의에 의해 만들어진 실행단위를 일컫는 말

자바스크립트의 function은 Fisrt-Class-Object 로서 변수나 데이터 구조 안에 담을 수 있으며 인자로 전달할 수 있고 반환 값으로도 사용할 수 있으며 , 런타임에 생성할 수 도 있다

Javascript Function은 first-class object(1급 객체)이다.

또한, 함수는 변수의 스코프를 결정하고 private 변수 또는 메소드 뿐만 아니라 함수의 특징을 이용하여 public 속성과 메소드를 제공하며 자바스크립트 모듈을 작성하는 좋은 도구이기도 합니다.

함수에 대한 올바르고 정확한 이해는 자바스크립트를 이해하는 데 있어 핵심 중의 하나이며 대규모 웹 애플리케이션이나 Single Page Applications(SPAs)을 개발하는데 있어 가장 중요한 개념이 됩니다.

http://www.nextree.co.kr/p4150/

http://insanehong.kr/post/javascript-function/

https://deftkang.tistory.com/19

## first-class object(1급 객체)란?

변수나 데이터를 구조안에 담을 수 있음.
함수의 파라미터로 전달 가능
함수의 반환값으로 사용가능
무명 가능
동적으로 프로퍼티 할당 가능

위와 같은 조건들을 충족시키는 객체를 first-class object라 부른다.

Java에서 메소드는 위 조건들을 충족시키지 못하기 때문에 first-class citizen으로 취급되지 않음.

## 함수선언 3가지 방법

https://ssben.tistory.com/7
자바스크립트는 굉장히 근사한 언어입니다. 한 가지 독특한 특징은 함수를 여느 다른 값들과 같이 취급한다는 것입니다. 전문적인 표현으로 “함수는 일급 객체(first-class citizens)이다” 라고 합니다. 어떠한 함수도 변수에 할당할 수 있고, 다른 함수의 인자로 넘길 수 있다는 뜻입니다. 이미 이런 동작방식을 알고 있으리라 생각합니다. setTimeout, setInterval 같은 함수 혹은 다양한 이벤트 리스너가 콜백을 받는 것을 기억하시나요? 그런 방식이 함수를 인자로 사용하는 대표적인 예입니다

## 함수 특징

일급(first-class)객체
유효범위(scope)를 제공

런타임(run time), 즉 프로그램 실행 중에 동적으로 생성가능

변수에 할당할 수 있고, 다른 변수에 참조를 복사할 수 있으며, 확장이 가능하고, 몇몇 특별한 경우를 제외하면 삭제할 수 있다.
다른 함수의 인자로 전달할 수 있고, 다른 함수의 반환 값이 될 수 있다.
자기 자신의 프로퍼티와 메서드를 가질 수 있다.

따라서, 다음과 같은 상황도 가능합니다.

함수 A가 객체로서 프로퍼티와 메서드를 가지고, 이 중 하나가 또 다른 함수인 B입니다. 이 함수 B는 C라는 함수를 인자로 받아들이고, 실행 결과로 또 다른 함수 D를 반환한다.

이런 형태를 처음 보았을 때 관리할 함수가 많다고 느낄 수 있을 것입니다. 하지만 다양한 함수 응용 방법에 익숙해지면 함수가 제공하는 능력과 유연성 그리고 표현력의 진가를 인정하게 될 것입니다.

일반적으로 말하자면 자바스크립트에서 함수는 하나의 객체라고 생각하면 될 것입니다.

다만 이 객체는 호출하여 실행할 수 있는 특별한 기능을 가지고 있습니다.

# 함수 리터럴

힘수 리터럴이라는 용어도 자주 사용된다. 이 용어는 함수 표현식을 뜻할 수도 있고 기명 함수 표현식을 뜻할 수도 있다.

따라서 이러한 애매한 표현의 사용은 자제하는 편이 낫다.

출처: https://webclub.tistory.com/310 [Web Club]

### Reference Link:

```
https://deftkang.tistory.com/19
https://webclub.tistory.com/310
https://joshua1988.github.io/web-development/javascript/function-expressions-vs-declarations/
```

---
