## include 예제3 with super)

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
    super
  end
end
```

super를 이용하면 부모클래스에서 오버라이드한 메소드를 부를 수 있음.
JYP 클래스의 부모 클래스에GirlGroup이 있으므로

ITZY
TWICE

라고 출력됨
