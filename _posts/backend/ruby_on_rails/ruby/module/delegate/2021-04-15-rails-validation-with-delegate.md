---
layout: post
title:  "Rails delegate사용시 validation설정"
author: negabaro kim
tags:	rails
---


이 포스트에서는 delegate사용시 validation설정을 어디에 정의해야할지 헷갈렸기에 내용을 정리해본다.

## 전제조건

Idol은 그룹별 하나의 팬클럽에 속해있고 팬클럽에는 복수의팬이 존재한다고 할때,

Rails에서 아래와 같은 모델 관계를 가지게 된다.

```
1:N = Idol -> FanClub
1:N = FanClub -> Fan
```

이 상태에서 아래 사양을 전제조건으로 생각해봤다.

1. Idol모델이 `delegate to`를 사용해 복수의 Fan 모델에 접근하고 싶음
2. 물관리를 위해 Fanclub안에 Fan은 1000명이 넘지않게 validation처리
3. Fan등록시 `idol.fans.create!(fan_params)`로직을 이용



## 코드

전제조건에서 설명한 상태를 코드로 표현하면 아래와 같다.

### Idol

```ruby
#app/models/Idol.rb
class Idol < ApplicationRecord
  belongs_to :fanclub, inverse_of: :idols, optional: true
  delegate :fans, to: :fanclub, allow_nil: true

  validate :fans_count_must_be_within_limit, on: :create

  private
  def fans_count_must_be_within_limit
    binding.pry
  end
end
```

### Fanclub

```ruby
#app/models/fanclub.rb
class Fanclub < ApplicationRecord
  has_many :fans, inverse_of: :present, dependent: :destroy
  validate :fans_count_must_be_within_limit, on: :create

  private
  def fans_count_must_be_within_limit
    binding.pry
  end
  
end
```

### Fan

```ruby
#app/models/handwritten_letter.rb
class Fan < ApplicationRecord
  belongs_to :fanclub, inverse_of: :fan

  validate :fans_count_must_be_within_limit, on: :create

  private
  def fans_count_must_be_within_limit
    binding.pry
  end

end
```


## validation설정을 어디에 걸어줘야할까

각 모델에 있는 `fans_count_must_be_within_limit` 메소드에 validation설정을 걸어놨다.

어떤 모델이 호출될지 불분명해서 테스트해봤는데 결과, `Fan모델 이외`에는 전혀 호출되지 않았다.

고로 Fan모델에 걸어줘야함

## fan모델에 validation설정

한편 fan모델에서는 `fans`에 접근할 수 없지만 `fanclub`에 접근할 수 있으므로

fanclub을 경유해 fans의 정보를 가져올 수 있다.

그 결과, 코드는 아래와 같다.


```ruby
def fans_count_must_be_within_limit
  MAX_FANS_COUNT = 1000
  errors.add(:base, "fans count limit: #{MAX_FANS_COUNT}") if self.fanclub&.fans.count >= MAX_FANS_COUNT
end
```


