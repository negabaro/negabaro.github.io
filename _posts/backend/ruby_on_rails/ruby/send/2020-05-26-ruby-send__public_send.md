---
layout: post
title:  "ruby send vs __send__ vs public_send의 차이는? "
author: negabaro kim
categories: ruby
tags:	ruby
---
```ruby
```

# send메소드란?

레시버에 존재하는 특정 메소드를 실행할때 사용하는 메소드

# send메소드를 사용하는 이유는?

크게 2가지다.

1. 동적으로 메소드명을 만들어서 호출할때
2. private메소드에 접근하기 위한 용도

필자가 생각하기에는 1번이 80%인것 같다.

# 기존의 메소드 체인으로 부르면 되잖아..차이는?

```ruby
class Twice
  def member_count
    pp 9
  end
end
```

맞다. 메소드 체인으로 호출하는것과 똑같다.

```ruby
Twice.new.member_count # 메소드 체인 사용 >> result: 9
Twice.new.send(:member_count) #send사용  with hash >> result: 9
Twice.new.send('member_count') #send사용 string도 가능 >> result: 9
```

다만 위에서 설명한 동적으로 작성해서 메소드를 호출하고 싶을때 유용하다.

```ruby
class Twice
  def sana_birth_date
    pp "1996/12/29"
  end
  def jihyo_birth_date
    pp "1997/2/1"
  end
end
```


```ruby
  member = sexy_cuty ? 'sana' : 'jihyo'
  Twice.new."#{member}_birth_date" # 기존의 메소드체인 방식으로는 syntax error발생
  Twice.new.send("#{member}_birth_date") # result -> 1996/12/29
```


# send vs __send__의 차이는?

메소드의 재정의(오버라이드)가 가능하냐 안가능하냐의 차이다.
처음에는 send메소드만 있다가 나중에 `__send__`가 추가되었다.
send는 메소드 오버라이드가 가능하지만 __send__를 오버라이드하면 에러가 발생(즉 오버라이드 불가능)

레일즈의 경우 다른 사람이 내 레일즈 프로젝트를 오버라이드할 걱정이 없으므로 4바이트 절약할 수 있는 send메소드를 쓰면되고
gem과 같은 ruby의 라이브러리 작성시에는 오버라이드 하지 못하도록 __send__를 이용해야한다.


# (send,__send__) vs public_send 차이는?

send메소드에 문제가 하나 있었는데 private메소드를 불러올 수 있다는것이다.
메소드체인으로 호출시 정상적으로 `NoMethodError: private method`에러가 발생함

그래서 public method만 호출할 수 있게끔 강제하는 기능을 가진게 `public_send`이다.
예제를 살펴보자

```ruby
class Twice
  private
  def boyfriend
    pp 'xx'
  end
end
```

```ruby
Twice.new.boyfriend # private method `boyfriend' called 
Twice.new.send(:boyfriend) # private인데 접근이 가능.. result: ->"xx"
Twice.new.send('boyfriend') # private인데 접근이 가능..  result: ->"xx"
Twice.new.public_send('boyfriend') #private method `boyfriend' called
Twice.new.public_send(:boyfriend) #private method `boyfriend' called
```

위 실행결과와 같이 public_send를 이용하면  private메소드 접근시 에러를 발생시킬 수 있어
개발자의 의도와 가깝게 메소드를 실행할 수 있게된다.


그러나 `public_send + instance_eval`이면 private에 접근 가능하다..

```ruby
Twice.new.public_send(:instance_eval, 'boyfriend')
```

instance_eval의 변수에 호출할 메소드를 적으면 뚫림.

참고로 심볼으로는 동작안한다.

```ruby
Twice.new.public_send(:instance_eval, :boyfriend) #`instance_eval': no implicit conversion of Symbol into String (TypeError) 
```


여기까지 send vs __send__ vs public_send의 차이,사용하게된 배경에 대해서 알아봤다.




# 그외

```ruby
class Twice
  attr_accessor :name
  def initialize name
    @name = name
  end

  def age(num)
    puts "#{@name}의 나이는 #{num}살입니다."
  end
end
```


## 메모1. 변수가 있는 메소드 호출 방법은?

```ruby
t = Twice.new('sana')
t.send(:age, 23)
# sana의 나이는 23살입니다.
```

## 메모2. 인스턴스 변수에 값을 대입하는 방법


```ruby
t = Twice.new('sana')
t.send("name=", 'dahyun')
t.send(:age, 21)
# dahyun의 나이는 21살입니다.
```

## reference:

```
https://docs.ruby-lang.org/ja/latest/method/Object/i/public_send.html
https://qiita.com/okuramasafumi/items/178006b9adb17a96cea8
https://qiita.com/ngron/items/05d3a9624c2c3ec5dbb6
http://capm-network.com/?tag=Ruby-__send__%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6
```
