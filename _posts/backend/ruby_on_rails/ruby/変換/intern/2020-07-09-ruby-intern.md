---
layout: post
title: "ruby 문자열을 심볼로 변환하는 방법"
description: intern메소드를 이용
tags: ruby
---

# intern

intern메소드를 이용하면 문자열을 심볼로 변환이 가능

```ruby
p "foo".intern # => :foo
```

# exam

enum 사용시 특정 value의 key값을 가져오고 싶을때 아래와 같이 


```ruby
roles = {"지도자"=>:Leader, "스탭"=>:Staff, "학생"=>:Student, "운영자"=>:Manager, "팬"=>:Fan}
```

```ruby
role_list = ["Staff", "Fan"]
pp role_list&.map{|m| roles.key(m.intern)}.join(",") # => "스탭,팬"
```


### reference:

```
https://docs.ruby-lang.org/ja/latest/method/String/i/intern.html
```