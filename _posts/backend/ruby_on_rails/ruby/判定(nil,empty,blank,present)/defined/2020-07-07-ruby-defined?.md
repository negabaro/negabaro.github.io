---
layout: post
title:  "ruby 로컬변수가 정의되어 있는지 확인하는 방법(defined?)"
description: "defined?를 사용 exam) defined?(hoge)"
tags: ruby
---

# defined?

정의되지 않는 로컬변수 `hoge`를 사용하려 할때 아래와 같은 에러가 발생한다.

hoge #=> NameError: undefined local variable or method `hoge' for main:Object

로컬 변수가 정의되어있는지 체크할때는 defined?를 사용한다.

### exam)

```ruby
p defined? hoge #=> nil
```

### nil이나 "" 이어도 정의되었다고 판단해줌 

```ruby
hoge2 = nil
p defined? hoge2 #=> "local-variable"

hoge3 = ""
p defined? hoge3 #=> "local-variable"
```


### 클래스 변수나 인스턴스 변수에 대한 체크도 가능

```ruby
@hoge4 = "xx"
p defined? @hoge4 #=>  "instance-variable"
@@hoge5 = "xx"
p defined? @@hoge5 #=> "class variable"
```

### reference:

```
https://qiita.com/anoworl/items/8d5ff9c95c2097d6b53b
```