---
layout: post
title:  "ruby,rails에서 추상클래스 만드는 법"
tags: ruby rails
---

# rails에서 추상클래스 만드는법

class에 `self.abstract_class = true` 를 선언해주면 된다.
추상클래스이므로 class명과 DB테이블을 자동매핑하는 기능이 OFF된다.

```ruby
class Idol < ActiveRecord::Base
  self.abstract_class = true
end
```

# ruby에서 추상클래스 만드는법

ruby에서는 java와 같이 추상클래스/메소드를 서포트하지 않으므로
추상 메소드를 선언하지 않으면 예외를 발생시키는 로직으로 추상클래스와 흡사한 기능을 만든다.

```ruby
class AbstractClass
  def my_print
    puts_string
  end

  # 抽象メソッド
  def puts_string
    raise "Called abstract method: my_print"
  end
end

class SuperClassA < AbstractClass
  def puts_string
    puts "a"
  end
end

class SuperClassB < AbstractClass
  def print_string
    print "a\n"
  end
end


c = SuperClassA.new
c.my_print

c = SuperClassB.new
c.my_print  # puts_string이 없으므로 에러 발생
```

[추상클래스란?]: https://negabaro.github.io/archive/oop-abstract_class

