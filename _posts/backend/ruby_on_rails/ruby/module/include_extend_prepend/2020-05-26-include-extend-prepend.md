---
layout: post
title: "ruby include,extend,prepend메소드에 대해서"
author: negabaro kim
categories: ruby
tags: ruby
---


# include、prepend、extend의 공통점

ruby에서 모듈을 import시 사용하는 include、prepend、extend를 사용함.

# include,prepend 의 공통점

include,prepend를 사용해서 모듈 임포트시 해당 모듈은 메소드는 인스턴스 메소드로 등록된다.

# include,prepend의 차이

계승관계가 반대이다.

# (include,prepend)와 extend의 차이

extend로 임포트시 클래스 메소드로 등록된다.

---


# include

## include 예제1)

```
module GirlGroup
end

class JYP
  include GirlGroup
end

puts JYP.ancestors
```

#### result:

`[JYP, GirlGroup, Object, JSON::Ext::Generator::GeneratorMethods::Object, Kernel, BasicObject]`

가장 무난한 패턴

`JYP -> GirlGroup -> ...`

## include 예제2)

예제1의 코드를 확장

```
module GirlGroup
  def popular
    puts "TWICE"
  end
end

class JYP
  include GirlGroup

  def popular
    puts "ITZY"
  end
end
```

#### result:

```
JYP.new.popular
-> ITZY
```

`JYP -> GirlGroup` 순이므로

JYP 클래스에서 선언된 popular메소드가 불려저서 `ITZY`가 표시됨

---

# prepend

include와 계승순서가 정확히 반대라고 생각하면 됨

## prepend 예제1)

```
module GirlGroup2
end

class JYP2
  prepend GirlGroup2
end

puts JYP2.ancestors
```

#### result:

`[GirlGroup2, JYP2, Object, JSON::Ext::Generator::GeneratorMethods::Object, Kernel, BasicObject]`

include와 반대로 되어있음.

`GirlGroup2 -> JYP2 -> ...`

## prepend 예제2)

```
module GirlGroup
  def popular
    puts "TWICE"
  end
end

class JYP
  prepend GirlGroup

  def popular
    puts "ITZY"
  end
end
```

#### result:

```
JYP.new.popular
-> TWICE
```

계승순서가`GirlGroup -> JYP` 순이므로

GirlGroup모듈에 선언된 popular메소드가 존재하므로 우선적으로 불려져 결과에 TWICE가 출력됨.

## prepend 예제3)

```
module GirlGroup
end

class JYP
  prepend GirlGroup

  def popular
    puts "ITZY"
  end
end
```

result:

```
JYP.new.popular
-> ITZY
```

당연한 얘기지만 prepend한 모듈에 동일 메소드가 없으면 클래스에 선언한 popular메소드가 불려짐

---

# extend

include와 prepend는 모듈을 계승관계에 넣었지만,
extend은 계승관계없이 클래스와 인스턴스의 관계로 사용함.

## extend 예제1)

```
module GirlGroup
end

class JYP3
  extend GirlGroup
end

puts JYP3.ancestors
```

#### result:

`[JYP3, Object, JSON::Ext::Generator::GeneratorMethods::Object, Kernel, BasicObject]`

모듈의 인스턴스 메소드가 self의 특이메소드로서 추가되었음.
`JYP2 -> ...`

계승관계에 GirlGroup이 존재하지 않음.

## extend 예제2)

```
module GirlGroup4
  def popular
    puts "TWICE"
  end
end

class JYP4
  extend GirlGroup4

  def popular
    puts "ITZY"
  end
end
```

#### result:

```
JYP4.popular
TWICE

JYP4.new.popular
ITZY
```

GirlGroup4모듈이 JYP4클래스의 인스턴스가 되어

`JPY4.popular`로 GirlGroup4모듈에서 정의한 popular메소드에 접근해 TWICE를 부를 수도 있고 `JYP4.new.popular`로 ITZY를 출력할 수도 있게 되었다

## extend 예제3)

JYP클래스의 메소드를 클래스 메소드로 선언하면 어떨지 예제를 통해 확인해보자

```
module GirlGroup5
  def popular
    puts "TWICE"
  end
end

class JYP5
  extend GirlGroup5

  def self.popular
    puts "ITZY"
  end
end
```

#### result:

```
JYP5.popular
ITZY
```

! 클래스 메소드인 경우는 GirlGroup5의popular메소드를 override한걸 확인할 수 있다.
클래스 메소드는 singleton_class(特異クラス=한국어로 뭐지..나만을 위한 클래스..?)에 정의되어 있으므로 이것이 오버라이드 되었다는것은 singleton_class의 부모클래스로서 모듈이 편입되어 있다는것을 의미한다.

실제 singleton_class의 계승관계를 보면

`JYP5.ancestors -> [JYP5, Object, JSON::Ext::Generator::GeneratorMethods::Object, Kernel, BasicObject]`

에 비해

`JYP5.singleton_class.ancestors -> [#<Class:JYP5>, GirlGroup5, #<Class:Object>, #<Class:BasicObject>, Class, Module, Object, JSON::Ext::Generator::GeneratorMethods::Object, Kernel, BasicObject]`

이런식으로 GirlGroup5가 부모 위치에 존재하는걸 확인할 수 있다.

---

### Reference Link:

```
https://www.techscore.com/blog/2013/03/01/rails-include%E3%81%95%E3%82%8C%E3%81%9F%E6%99%82%E3%81%AB%E3%82%AF%E3%83%A9%E3%82%B9%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%E3%81%A8%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%83%A1/s
http://qawsedrftgyhujiko.hatenablog.com/entry/2016/11/05/135008
https://qiita.com/leon-joel/items/f7c4643023f44def5ebd
https://ref.xaio.jp/ruby/classes/module/include
```
