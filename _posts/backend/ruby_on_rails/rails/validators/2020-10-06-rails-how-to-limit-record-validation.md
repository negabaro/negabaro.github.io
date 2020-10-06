---
layout: post
title:  "rails6 validation설정으로 레코드 숫자를 제한하는 방법"
author: negabaro kim
tags:	rails/model/validation
---


# 개요


item모델이 복수의 action모델을 가진 1:N관계라고 가정하고 item모델이 가지는 action모델의 레코드 수가

특정 갯수를 넘으면 validation error를 발생하는 방법에 대해 알아보자.



# 코드

item모델에 아래와 같이 메소드를 추가해주면 된다.

```ruby
#app/models/action.rb
class Action < ApplicationRecord
  belongs_to :item
  validate :check_number_of_actions

  def check_number_of_actions
   if item && item.actions.count > 3
    errors.add(:item, "3개 이상의 action은 만들 수 없습니다.")
   end
  end
end
```


### reference:

[link1](https://qiita.com/k0uh0t/items/888dfe39f6e07893de01)
[link2](https://stackoverflow.com/questions/4836897/validate-the-number-of-has-many-items-in-ruby-on-rails)