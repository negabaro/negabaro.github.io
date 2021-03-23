---
layout: post
title:  "ruby merge merge!메소드에 대해 알아보자"
author: negabaro kim
tags:	ruby tip rails
---

## merge메소드란

merge는 복수의 조건을 결합하는 메소드


```ruby
@twice = {"dahyun" => 100, "chayoung" => 99}
pp @twice.merge({"IU" => 98})
pp @twice
```

merge메소드는 결합할 대상과(레시버)에 영향을 끼치지 않고 참조만해서 새롭게 결합한 값을 더한 결과를 리턴한다.

결합할 대상에 영구적으로 영향을 끼치게하려면 파괴적 메소드(!) 를 사용해야한다.

merge의 경우 `merge!`를 사용하면 된다.

## merge!

```ruby
@twice = {"dahyun" => 100, "chayoung" => 99}
pp @twice.merge!({"IU" => 98})
pp @twice
```

아래와 같이 해도 된다.

```ruby
pp @twice = @twice.merge({"IU" => 98})
```

---


[ruby hashにhashを繰り返し挿入]: https://teratail.com/questions/50153