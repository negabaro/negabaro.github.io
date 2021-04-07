---
layout: post
title: "ruby 콜론2개(::)로 시작하는 모듈의 의미"
author: negabaro kim
tags: ruby
---


## 결론

`절대경로`로 모듈을 가져올때 `::`을 사용한다.


## ::으로 시작하는 모듈

아래와 같은 모듈을 말함.

```ruby
::Twice.new
```


## 착각하지 말아야할것

`::`를 사용하는 경우는 class/모듈 명이 겹칠때 사용한다.

이름이 겹치지 않을떄는 `::`를 사용하지 않아도 루트에 있는 클래스명을 부를 수 있다.

## 사용예제


아래 코드를 살펴보자.

```ruby
class Twice
  def initialize
    p "root Twice"
  end
end

module Jyp
  class Twice
    def initialize
      p "in module Twice"
    end
  end

  ::Twice.new # => "root Twice"
  #Twice.new # => "in module Twice"
end
```

Jyp모듈 안에서 `Twice.new`를 부르면 Jyp모듈안에 있는 Twice가 불려진다.

만약에 module바깥에 있는 Twice클래스를 호출하려면??

이때 사용하는게 `::`이다.

`::`를 사용하면 절대경로를 이용해 상위에 있는 Twice클래스 호출이 가능하다.