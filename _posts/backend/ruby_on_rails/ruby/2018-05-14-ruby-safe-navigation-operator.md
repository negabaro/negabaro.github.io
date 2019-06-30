---
layout: post
title:  "ruby2.3의 신기능 Safe Navigation Operator(&.)과 Rails의 try,try!메소드에 대해서"
author: negabaro kim
categories: ruby
tags:	ruby tip rails
---

### Safe Navigation Operator이란

Ruby2.3의 신기능 Safe Navigation Operator

메소드를 부를때 .앞에&를 붙이면 리시버가 nil이어도 NoMethodError가 발생하지 않고 nil을 돌려주는 기능이다.
이 부분은 rails의 try와 같은 기능인데 try와의 차이는 
리시버가 nil이 아닐경우 메소드를 부를때 발생한다.


##### try를 사용할 경우

{% highlight ruby %}
# 10 에는 hehe메소드가 존재하지 않기에 nil을 돌려준다.
irb(main):028:0> 10.try(:hehe)
=> nil
{% endhighlight %}

##### Safe Navigation Operator(&.)을 사용할 경우

{% highlight ruby %}
#리시버는 nil이 아니므로 hehe메소드를 불러오려고 하지만 hehe 메소드는 존재하지 않기에 에러가 발생한다.
irb(main):029:0> 10&.hehe
NoMethodError: undefined method `hehe' for 10:Integer
        from (irb):29
{% endhighlight %}



##### try! 는 Safe Navigation Operator와 완벽히 같다.

Rails의 try메소드는 위와 같이 리시버에 해당 메소드가 없어도 nil을 돌려주므로 에러를 찾기 힘들다는 문제가 있었다.
그후 try!라는 메소드가 rails4부터 도입되었다. 그후에 ruby쪽에서도 버전2.3부터 try!와 똑같은 기능을 하는  Safe Navigation Operator(&.)가 나왔다.
    

##### Safe Navigation Operator를 한국어로 하면?

Safe Navigation Operator을 한국어로 뭐라 하는지 모르겠다.
일본에서는 ぼっち演算子(의역: 외로운 연산자)라고 부른다.




### 예제)

Safe Navigation Operator를 사용하는 예제이다.

{% highlight ruby %}
irb(main):001:0> str = nil
=> nil
{% endhighlight %}



{% highlight ruby %}
str.upcase
NoMethodError: undefined method `upcase' for nil:NilClass
        from (irb):2
{% endhighlight %}

리시버가 nil이므로 upcase와 같은 메소드를 쓰면 에러가 발생


{% highlight ruby %}
irb(main):003:0> str&.upcase
=> nil
{% endhighlight %}


Safe Navigation Operator를 이용하면 에러가 발생하지 않음


#### 주의사항

「&」과「.」셋트로 적어줄것

{% highlight ruby %}
NG ->  str&upcase
{% endhighlight %}

#### 클래스 메소드에서 변수넘기는 예제

{% highlight ruby %}
class Foo
  def foo(x); x; end
end

Foo.new.foo(3)
#=> 3

Foo.new&.foo(3)
#=> 3

nil&.foo(3)
#=> nil
{% endhighlight %}


#### 배열 메소드에서 변수넘기는 예제

{% highlight ruby %}
foo = {a:1}

foo[:a]
#=> 1

foo&.[](:a)
#=> 1

nil&.[](:a)
#=> nil
{% endhighlight %}

[참고1]: https://qiita.com/taram/items/02dc68bf370cc3d8babb
[변수 보내는 예제]: https://qiita.com/mochizukikotaro/items/f42273bbc07fbb397b71
[이해하는데 엄청도움됨]: http://secret-garden.hatenablog.com/entry/2016/09/02/000000
