---
layout: post
title:  "ruby에서 array인지 체크하는 방법(instance_of?)"
description: "instance_of를 사용한다. ex) obj.instance_of?(Array)"
tags: ruby
---

ruby에서 array인지 체크하는 방법에 대해 알아보자.


# instance_of?

instance_of?를 이용하면 array인지 체크하는것 뿐만아니라

object가 특정 클래스 인스턴인지 체크가 가능하다.


# example

```ruby
ary = []
str = "Hello world."
p ary.instance_of?(Array)　　#=> true
p str.instance.of?(String)　　#=> true
p ary.instance_of?(String)　　#=> false
p str.instance_of?(Array)　　#=> false
```


# .class 메소드를 이용(리턴되는 문자열로 판단하는 방법)


```ruby
ary = []
str = "Hello world."
p ary.class　　#=> Array
p str.class　　#=> String
```

class보다는 instance_of?가 가독성이 높아보인다.
