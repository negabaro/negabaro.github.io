---
layout: post
title:  "rails save메소드와 create메소드의 차이에 대해"
description: "리턴값에 차이가 있다. save는 성공시 true 실패시 false를 리턴하지만 create메소드는 성공/실패 여부에 관계없이 모델을 리턴한다."
author: negabaro kim
tags:	rails/model
---

# create는 new와 save메소드의 단축버전

create메소드의 내부에서 new와 save를 사용하고 있다.

실제 코드는 아래와 같다.

```ruby
def create(attributes = nil, &block)
  if attributes.is_a?(Array)
    attributes.collect { |attr| create(attr, &block) }
  else
    object = new(attributes, &block) #<< new메소드 사용
    object.save # <<save메소드 사용
    object
  end
end

(생략)

def create!(attributes = nil, &block)
  if attributes.is_a?(Array)
    attributes.collect { |attr| create!(attr, &block) }
  else
    object = new(attributes, &block) #<< new메소드 사용
    object.save! # <<s ave메소드 사용
    object
  end
end
```

-----------

# save메소드와 create메소드의 차이1


save의 경우 param정보를 new에 넣어주고 해당 오브젝트를 save로 실행한다.

create의 경우 직접 param정보를 받게 된다.

각각 아래와 같이 사용한다.

## create

```ruby
@user = User.create(name: 'xx')
```

## save

```ruby
@user = User.new(user: 'xx')
@user.save
```

# save메소드와 create메소드의 차이2

또다른 차이로 `리턴값`이 있다.

save메소드는 오브젝트가 DB에 정상적으로 저장되었는가 여부에 따라 `true/false를 리턴`한다.

성공했을때와 실패했을때의 액션에 따라 로직을 나눌때 해당값을 자주 이용한다.

반면 create메소드는 오브젝트의 저장/실패 여부와 관계없이 해당 모델을 리턴한다.


save메소드 사용시 아래와 같은 분기를 자주 이용한다.

```ruby
if @user.save
  flash[:notice] = 'success'
else
  flash[:alert] = 'failed'
end
```


# save! 메소드와 create! 메소드


메소드뒤에 느낌표(!)를 붙여주면 save여도 create여도 레코드 저장 실패시 예외를 발생시켜준다.

레코드 저장에 성공하면 save는 true create는 해당 모델을 리턴하는것은 변하지 않는다.


아래 코드를 보면 이해하기 쉬울거 같다.

```ruby
def save(*args)
  create_or_update(*args)
rescue ActiveRecord::RecordInvalid
  false
end

#예외 발생
def save!(*args)
  create_or_update(*args) || raise(RecordNotSaved.new("Failed to save the record", self))
end
```

실무에서는 save실패시 디버깅 목적으로 느낌표를 붙여서 실행해보거나
아에 save!를 사용해서 실패시 실행해야할 로직을 예외처리 부분에서 실행하는 식으로 사용한다.



[create메소드 도큐멘트]: https://github.com/rails/rails/blob/master/activerecord/lib/active_record/persistence.rb

### reference:

```
https://qiita.com/luccafort/items/677020b86f3dc240529b
https://woshidan.hatenablog.com/entry/2015/09/29/224750
```