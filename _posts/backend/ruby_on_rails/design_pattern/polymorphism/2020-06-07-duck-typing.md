---
layout: post
title:  "ruby로 배우는 duck typing개념"
author: negabaro kim
categories: software
tags:	software
---

# duck typing이란?

판별/상속 없이 특정 객체의 메소드나 속성을 보고 type을 결정(혹은 지연?)하는 행위

객체의 메소드나 속성의 집합이 객체의 타입을 결정하는 동적타이핑의 한종류.

다형성을 실현하기 위한 개념이기도 하다.

> If it walks like a duck and it quacks like a duck, then it must be a duck
> 만약 뭔가가 오리처럼 걷고 꽥꽥거리면 그것은 틀림없는 오리다.

라는 말에서 유래했다.


GOF 디자인패턴중 
["Program to an 'interface', not an 'implementation'."]: https://en.wikipedia.org/wiki/Design_Patterns#Introduction.2C_Chapter_1
을 실현시키는 방법중 하나이다.


## 다형성(polymorphism)이란?

다형성(polymorphism)이란 하나의 객체가 여러 가지 타입을 가질 수 있는 것을 의미

# ruby코드 예제

필자가 이해한 내용을 ruby코드로 만들어봤다.

```ruby
class Idol

  def initialize(skill)
    @skill = skill
  end

  def performance
    @skill.dance
  end

end
```

```ruby
class Twice

  def dance
    pp '큐티'
  end

end
```


```ruby
class Bts

  def dance
   pp '칼군무'
  end

end
```

### 실행결과 

```ruby
Idol.new(Twice.new).performance #=> "큐티"
Idol.new(Bts.new).performance  #=> "칼군무"
```

> 오리처럼 걷고 꽥꽥거리면 그것은 틀림없는 오리다.

처럼 `댄스가 가능하면(댄스 메소드가 있으면) 아이돌이다` 를 코드화한 예제다.

Twice와Bts는 다른 클래스지만 dance메소드를 가지고 있다는거 하나만으로
Idol오브젝트에서 Twice든Bts든 의식할 필요없이 dance메소드를 실행할 수 있게됐다. 
이것을 덕타이핑이라 부른다.

여기서 dance메소드는 특정액션/입출력의 용도로 사용되어 인터페이스라고도 부른다.

# 장점?

코드의 복잡성을 줄이고 유연성을 높여준다.

위에서 설명한 인터페이스가 클래스마다 다르게되면 여러가지 문제가 발생하는데 그부분을 상쇄할 수 있는게
덕타이핑의 장점이다.

예를들어 

bts는 dance가 그냥 dance가 아니라 칼군무여서 인터페이스명을 knife_group_dance
라고 했다고 가정하면

Idol클래스에서 아래와 같이 어떤 오브젝트로 만들어져있는지 판별해서 해당 인터페이스를 지정해줘야한다.

```ruby
  def initialize(skill)
    @skill = skill
  end

  def performance
    case @skill
    when Twice
      @skill.dance
    when Bts # Bts는 그냥 댄스가 아니라규!!
      @skill.knife_group_dance
    end
  end
```

이런식의 코드는 Twice,Bts와 유사한 클래스를 추가할때마다 Idol클래스에 판별로직을 수정해줘야 하므로
유연하지 않다.

인터페이스명을 공통으로 하는 규약을 지키는것만으로 Idol클래스를 수정할 필요없이 유사 class(mamamoo,아마추어아이돌등)를 추가할 수 있게된다.
이것이 코드의 scalibity가 높아지는 이유다.


# 단점?

컴파일언어라면 타입검사를 컴파일시 수행하므로 실행하지 않으면 타입이 맞는지 알 수 없는 문제가 있음

스크립트언어라면 어짜피 타입체크가 안되므로 위에서 서술한 단점은 없음.

다른 단점이라면 OOP에 친숙하지않은 엔지니어 입장에서는 코드파악이 어려울지도 모름.



# 어떤 언어가 duck typing을 제공하나?

메소드나 인자에 대한 형선언이 없는 객체지향 스크립트언어에서 많이 사용됨
C#,python,ruby,PHP,perl등등이다.


## 메모1 ruby에서 덕타이핑 적용해볼 여지가 있는 코드 찾는법

이하 코드가 있다면 덕타이핑을 적용할 여지가 있을 가능성이 있음

1. 오브젝트를 판별해서 분기하는 case문
2. kind_of,is_a?
3. responds_to?
