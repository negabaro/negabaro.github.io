---
layout: post
title:  "Rails presence vs present?의 차이"
author: negabaro kim
categories: rails
tags:	rails ruby
---


# presence vs present?

rails에서 판별로직 구현시 자주사용하는 메소드
`present?`는 ruby core에 있는 메소드이므로 ruby에서도 사용가능
presence는 rails에서만 사용이 가능


## present? 

레시버 데이터가 존재하면 true 없으면 false를 리턴함

## presence

레시버 데이터가 존재하면 해당 레시버 데이터를 리턴(self) 없으면 nil을 리턴함

presence로직을 present?를  이용해 구현하면 아래와 같다.

```object.present? ? object : nil```


# 실제 코드 비교

실제 각각의 메소드의 로직을 살펴보면

### present?

```ruby
def present?
  !blank?
end
```

present? 메소드는 실제로 blank?를 부정식으로 구현

### presence

```ruby
def presence
  self if present?
end
```

presence는 present?를 이용해서 self를 리턴


# 퍼포먼스?

퍼포먼스의 차이는 없을거 같은데 굳이 따지자면 if문이 하나많은 presence가 느리다고 봐야될까?
거의 차이없으니 가독성 부분에서 필요에 따라 presence를 사용하면 될거 같다.



# present?보다 presence를 사용해야 할때

`if str str elsif str str else str`이런 로직을 구현할때는 present?보다 presence로 짜는게 가독성이 좋다
아래 예제를 살펴보자



## bad example

```
class User < ApplicationRecord
  validates :email, presence: true

  def friendly_name
    if nickname.present?
      nickname
    elsif given_name.present?
      given_name
    else
      email.split('@').first
    end
  end
end
```

문자열을 리턴할 뿐인데 판별로직에만 7행을 쓰고있다.

## better example


```ruby
Active Supportの#presenceメソッドを使う

class User < ApplicationRecord
  validates :email, presence: true

  def friendly_name
    nickname.presence || given_name.presence || email_local_part
  end

  private

  def email_local_part
    email.split('@').first
  end
end
```

한줄로 쓸 수있어 훨씬 알기쉽다.

2항 연산자에서 레시버값이 true시 해당 값을 리턴하고 싶을때도 마찬가지

```ruby
gohan.present? ? gohan : 'ofuro'
gohan.presence || 'ofuro
```




### reference:

[reference]: https://www.techscore.com/blog/2012/12/25/activesupport-%E3%81%AE%E4%BE%BF%E5%88%A9%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89-try-blank-present-presence/
[reference2]: https://qiita.com/kmagai/items/d23995dc769024beed61
[reference3]: https://techracho.bpsinc.jp/hachi8833/2018_09_27/62326


