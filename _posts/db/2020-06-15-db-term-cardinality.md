---
layout: post
title:  카디널리티란?
description: 카디널리티는 전체 행에 대한 특정 컬럼의 중복 수치를 나타내는 지표이다.
tags: term
---

# 카디널리티(cardinality)란?

중복도가 ‘낮으면’ 카디널리티가 ‘높다’고 표현한다.

중복도가 ‘높으면’ 카디널리티가 ‘낮다’고 표현한다.

카디널리티는 전체 행에 대한 특정 컬럼의 중복 수치를 나타내는 지표이다.


# 셀 수 있는 카디널리티와 셀 수 없는 카디널리티

## 셀 수 있는 카디널리티

셀 수 있는 카디널리티로는 아래와 같은 것들이 있다.

성별 -> 남,여 이므로 카디널리티가 2이다.
요일 -> 요일에 들어갈 수 있는 값은 월,화,수,목,금,토,일 = 즉 카디널리티는 7이다.

## 셀 수 없는 카디널리티

셀 수 없는 카디널리티는 엄밀히 말하면 세기 어려운이 맞을거 같다.
대표적인 것이 주민등록번호 일것이다. 주민등록번호는 유니크하므로 현재 행을 count한 값이 카디널리티 값이 될것이다.

데이터가 추가됨에 따라 카디널리티가 늘어나므로 해당 컬럼에 카디널리티가 뭐다라고 단언하기 어렵다.
(현재 시점에서의 카디널리티는 구할 수 있긴하다.)

# 카디널리티는 상대적인 개념

당연한 얘기지만 카디널리티가 높다/낮다는 비교대상이 존재하고
그 대상에 비해 높다/낮다라고 말할 수 있으므로 상대적이다.

요일은 7이므로 2인 성별보다 카디널리티가 높다고 말할 수 있지만 셀 수 없는 개념은 주민등록번호 보다는
카디널리티가 낮다고 말할 수 있다.

# distinct값이 높으면 중복도가 낮다/카디널리티가 높다라고 말함

distinct한 결과 값이 높으면 커디널리티가 높다라고도 말할 수 있다.


# 멀티 인덱싱 전략

인덱스를 걸 때는 최대한 많은 데이터가 걸러져야 full scan을 피할 수 있다. 
카디널리티가 높은 컬럼을 우선순위에 두는 것이 인덱싱 전략에 유리하다.


주민등록번호와 성별이 있으면 1번 주민등록번호,2번 성별에 두는 식이다.


# 결론

카디널리티가 높다 -> 인덱싱에 적합함
카디널리티가 낮다 -> 인덱싱에 부적합함.


### reference:

```
https://itholic.github.io/database-cardinality/
```