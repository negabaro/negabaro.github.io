---
layout: post
title:  "Rails FactoryBot에서 initialize_with을 이용해 생성된 데이터를 재사용하는 방법"
author: negabaro kim
tags:	rails/factorybot
---

## 결론

`initialize_with`을 사용할때는 FactoryBot정의가 복잡해질 수 있으므로 주의해서 사용해야한다.


## initialize_with이란?

FactoryBot에서 제공하는 메소드로 한번 생성된 데이터를 재사용할때 사용된다.

build,create를 몇번을 하더라도 하나의 인스턴스를 사용한다.

## initialize_with를 사용하고 싶을때

필자의 경우 아래경우 initialize_with를 사용한다.

1. 시스템상에서 특정수 이상은 증가하지 않는 값일때
2. 똑같은 데이터를 무한대로 늘리기 싫을때


### 1. 시스템상에서 특정수 이상은 증가하지 않는 값일때

`시스템상 특정수 이상 증가하지 않는값`이라 하면

1. 광역시(6개를 넘을 수 없음)
2. 트와이스 멤버(9명을 넘을 수 없음)

등이 있을 수 있다.

※실제 validation이나 유니크 설정에 의해 Duplicate에러가 발생할 수 있다.


### 2. 똑같은 데이터를 무한대로 늘리기 싫을때

반복해서 써도 상관없는 데이터(각 인스턴스간 의존성이 없는전제)를 무한대로 늘려서 리소스 낭비나 실행시간을 늘리고 싶지 않을때 사용할 수 있다.


## 사용방법

`initialize_with`안에 `find_or_initialize_by`를 사용하는 방식을 많이 쓴다.

확실한것은 아니지만 `find_or_create_by`를 써도 문제가 없는것 같다.

```ruby
FactoryGirl.define do
  factory :twice do

    initialize_with do
      Twice.find_or_initialize_by(
        name: 'sana')
    end
  end
end
```

위와 같이 작성하고 `FactoryBot.crate :twice`를 몇번 실행해도 `sana`가 2명이 될일은 없다.

## initialize_with를 사용시 장점

1. 리소스 낭비X
2. 실행시간이 짦아짐
3. 시스템 사양에 맞는 데이터 구현이 가능


## initialize_with를 사용시 단점

### 더미 데이터 구현시 귀찮음(각종 에러에 시달릴 가능성이 있음)

외부키 제약에러에 걸린다든가..Duplicate Index에러에 시달린다.

또한 `initialize_with`를 사용한 모델에 관계된 다른 모델의 더미데이터 생성시 영향을 끼치므로 복잡한 관계모델 구현시 시간이 걸릴 수 있다.

`initialize_with` 관련해서 헤맨 부분이 있는데  그 부분은 따로 정리해서 포스트할 예정이다.


---

[FactoryGirlで固定されたデータを扱う]: https://qiita.com/port-development/items/a1c551f8e761204e5b2c