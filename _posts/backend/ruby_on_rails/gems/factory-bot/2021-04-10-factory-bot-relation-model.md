---
layout: post
title:  "Rails FactoryBot에서 관계된 모델 데이터를 동시에 생성하는 방법"
author: negabaro kim
tags:	rails/factorybot
---

## 결론

1. belongs_to관계의 모델을 같이 만들어줄때는 association을 사용하자.

2. has_may관계의 모델을 같이 만들어줄때는 `after(:build) do` 콜백을 이용하자.

---

이 포스트에서는 rails에서 FactoryBot으로 더미데이터를 생성할때 해당 모델에 관계된 데이터를 동시에 생성하는 방법에 대해 알아보자.


아래 2가지 패턴에서 사용하는 방법을 소개한다.

1. belongs_to관계의 모델 동시생성
2. has_may관계의 모델 동시생성


## 1. belongs_to관계의 모델 동시생성

총 세가지 패턴을 소개하는데 가장 마지막에 소개하는
`1-3. 이 가장 권장되는 방법`이다. 

### 1-1. 같은 파일내 다른 팩토리 호출

파일 내에 다른 팩토리를 호출하는 방법이다.

```ruby
FactoryBot.define do
  factory :staff, class: Staff do
    name "Isaac Newton"
    role  "physicist"

    shop # 다른 팩토리 호출
  end

  factory :shop, class: Shop do
    name "shop"
  end
end
```

### 1-2. FactoryBot.create대입

다른 파일에 정의된 FactoryBot을 호출하는 방법이다.

파일을 분리할 수 있어 1-1보다 좋은 방법이다.

```ruby
FactoryBot.define do
  factory :staff, class: Staff do
    name "Isaac Newton"
    role  "physicist"

    shop { FactoryBot.create :shop }
  end
end
```

### 1-3. Association사용

belongs_to 관계 모델 생성시 가장 권장되는 방법이다.

```ruby
factory :staff, class: Staff do
  name "Isaac Newton"
  association :shop, factory: :shop, name: "Shop!!"
end

factory :shop, class: Shop do
  name "shop"
end
```


## 2. has_may관계의 모델 동시생성


### 2-1. block안에서 인자를 받아 생성하는 방법

```ruby
shop = FactoryBot.create(:shop) do |s|
  s.staffs.create(FactoryBot.attributes_for(:staff)) 
end
```

### 2-2. callback을 사용

```ruby
factory :shop, class: Shop do
  name "test shop"
  after(:build) do |shop|
    shop.staffs << FactoryBot.build(:staff, name: "sana")
    shop.staffs << FactoryBot.build(:staff, name: "dahyun")
  end
end

shop = FactoryBot.build :shop
```


callback을 사용할때 `after(:build) do`를 사용하는것이 무난핟.


`after(:create) do`를 사용할 경우, `Factorybot.build`시에는 해당 콜백이 실행이 안되는점을 주의하자

```ruby
factory :shop, class: Shop do
  name "test shop"
  after(:create) do |shop|
    shop.staffs << FactoryBot.create(:staff, name: "sana")
    shop.staffs << FactoryBot.create(:staff, name: "dahyun")
  end
end
```


## 메모

`belongs_to`관계의 모델은 의존성 문제로 필수로 생성해야 하기때문에 `Association`을 사용하는 경우가 압도적으로 많다.(필수))

has_many의 모델은 만들어주지 않아도 에러가 발생하지 않기때문에 테스트 케이스에서 셋트로 만들어주고 싶은 경우 사용한다.(옵셔널)

---

[FactoryBot（旧FactoryGirl）で関連データを同時に生成する方法いろいろ]: https://qiita.com/metheglin/items/47116ccbdb26aa00e034
