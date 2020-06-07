---
layout: post
title:  "정적타입언어와 동적타입언어에 대해서"
author: negabaro kim
categories: software type
tags:	software
---

# 정적타입 언어란?

컴파일시 변수의 타입이 결정되는 언어(런타임 이전에 시행된다고 하는게 맞는 표현일지도)

## 장점

컴파일시 에러가 뜨기 때문에 더 편하고 빠르게 에러확인이 가능(실행하기전에 발견가능하므로
)

심리적인 편안함이 있음.

IDE사용시 매우편함(타입을 알고있는 상태면 IDE에서 자동완성 기능을 지원할 수 있음.)


## 단점

타입 지정으로 코드의 양이 많아짐


# 동적타입 언어란?

런타임시 변수의 타입이 결정되는 언어


## 장점

타입 지정할 필요가 없으니 그만큼 코드의 양이 줄어듬(개발속도 향상)

타입에 대한 결정을 런타임까지 지연시킬 수 있으므로 선택의 여지가 생김


## 단점

타입이 멋대로 결정되므로 실행이되지 않으면 오류(잠재적)를 발견하기 어려움(예상치 못한 Type Error등)

정적타입언어에 비해 IDE로 얻을 수 있는 장점이 적음.

# 정적타입,동적타입 개념이해시 주의할점

정적타입언어는 동적타이핑이 안된다는 등 상호 배제적인 개념이 아님을 주의해야함

예로 정적타입 검사를 시행하는 많은 언어가 런타임시에도 어느정도의 타입검사를 시행함.
런타임에만 존재하는 정보를 통해서 그 적법성을 판단할 수 있는 경우도 존재하기 때문임
타입 B가 타입 A의 서브타입일 때, A 타입의 객체를 B 타입으로 형변환하는 다운캐스팅downcasting이 그런 예이다.

haskel이나 typescript는 동적/정적타입 검사가 둘다 가능하다고 한다.


# 동적타입언어 관련 논문

동적타입의 글이라기 보다는 정적타입언어에 대한 부정적인 논문.

정적 타입 언어가 생산성 향상에 도움이 된다는 실증적 증거가 아직은 없다라는 내용

16개의 논문중 단 3개 연구만이 타입이 어느 정도 생산성/유지보수성 향상에 도움이 되있다는 실질적 데이타를 제시하고 있긴 하지만, 그것이 그리 강력한 증거는 되지 못하며, 나머지 연구들은 타입이 생산성/유지보수성 향상에 아무런 영향을 미치지 못한다는 연구 결과를 나타냈다고.

2014/8월이면 예전글이긴하네..

[Static vs. Dynamic Languages: A Literature Review ]



# 정적타입언어 관련 논문

ICSE(International Conference on Software Engineering) 2017에 발표 된 [To Type or Not to Type: Quantifying Detectable Bugs in JavaScript] 이란 논문에서는 
js의 코드 버그중 15%가 정적 타입 시스템이 있었다면 커밋전에 해결되었을것이라고 결론을 지었다고



# 팀 운영관점에서의 정적언어와 동적언어

필자의 주관적인 견해가 들어가 있음을 밝힌다.!

## 정적언어를 선택하는 경우

엔지니어의 레벨차이가 크거나 팀이 자주 바뀌는 경우
코드의 품질을 일정수준이상 유지시키기 위해 사용
주로 대기업이나 금융쪽에서 많이 사용하는 경향이 있다.

## 동적언어를 선택하는 경우

빠르게 프로토타입을 개발하고 피드백을 받아 수정하는 스타트업에서 많이 사용

코드의 품질보다 비지니스관점을 우선시 생각하는 개발자들이 많이 선택하는 경향이 있다.

# 정적/동적타입 언어 리스트

## 정적타입 언어 리스트

Ada, C, C++, C#, JADE, Java, Fortran, ML, Pascal, Scala

## 동적타입 언어 리스트

Groovy, JavaScript, Lisp, Lua, Objective-C, PHP, Prolog, Python, Ruby, Smalltalk, Tcl


## 정적/동적타입이 둘다 가능한 언어 리스트

Haskell,typescript(라고 들음..)

# 메모1. 

기본적으로 정적타이핑을 할려면 컴파일은 필수인듯?
인터프리터언어중에 정적타이핑이 되는 예는 아직 발견하지 못함.

### reference: 

```
https://ahnheejong.name/articles/types-basic-concepts/?fbclid=IwAR1acV23XLHxDu60-hzQW-k4V02QLMHxr6kFwrNCtT_ZI1Zi-1pJkOntmXM
https://okky.kr/article/304342
```

[To Type or Not to Type: Quantifying Detectable Bugs in JavaScript]: http://earlbarr.com/publications/typestudy.pdf 
[Static vs. Dynamic Languages: A Literature Review ]: http://danluu.com/empirical-pl/