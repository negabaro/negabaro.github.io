---
layout: post
title:  "Rails 상태관리 gem StatefulEnum 소개"
author: negabaro kim
tags:	rails
---

## stateful_enum

레일즈에서 상태관리를 구현할때 유용한 gem이다.

[stateful_enum]말고도 aasm이라는 gem도 유명

두 gem의 차이점에 대해서는 뒤에서 다뤄본다.



## 설치방법


```ruby
gem 'stateful_enum'
bundle install
```

## 설정

Twice모델에 status컬럼이 있다는 전제하에

```ruby
class Twice < ApplicationRecord
  enum status: {active: 0, inactive: 1, closed: 2} do

    #컴백 -> 휴식
    event :disable do
      transition :active => :inactive
    end

    #휴식 -> 컴백
    event :enable do
      transition :inactive => :active
    end

    #컴백/휴식 -> 은퇴
    event :close do
      transition [:active, :inactive] => :closed
    end
  end
end
```

## 상태변경

Twice의 상태를 컴백에서 휴식으로 바꿔보는 예제이다. 

```ruby
> twice = Twice.create

> twice.status
=> "active"

> twice.active?
=> true

> twice.inactive!
=> true

> twice.status
=> "inactive"
```



## 커스텀

상태변경시 before,after와 조건 분기등을 넣을 수 있다.

```ruby
event :close do
  before do
    p "소속사 불화"
  end

  after do
    p "Jyp와 계약해지"
  end
  transition [:active, :inactive] => :closed, if: -> { twice.scandel? }
end
```


## AASM vs StatefulEnum

둘다 웰메이드 Gem으로 사용하기 불편한것은 없음

### StatefulEnum gem장점

1. enum설정에 이어 상태변경 로직을 심플하게 작성
2. Gem코드량이 적음


### AASM gem장점

1. 모델내에서 상태의 초기시 설정이 가능
2. include AASM한 모델에서만 사용이가능(scope?)
3. 상태의 값을 string으로도 가질 수 있음(StatefulEnum에서는 불가능)
4. 콜백/lock/트랙잭션등 커스텀 기능이 많음

### 결론

심플하게 상태 변경만 구현할때는 StatefulEnum 보다 복잡한 상태 관리를 할때는 AASM을 추천

요건에 의해 상태의 값을 String으로 저장하고 싶을때는 AASM을 사용

---

[Rails の 有限オートマトン]: https://qiita.com/ogomr/items/0dd9df4f340ee83b8f66
[stateful_enum]: https://github.com/amatsuda/stateful_enum
[Ruby on Railsで状態を扱うStatefulEnum gem]: https://ngmt83.hatenablog.com/entry/2019/02/12/174048