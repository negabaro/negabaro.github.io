---
layout: post
title: "ruby map메소드 한줄로 축약해서 사용하는 방법(with. &:)"
tags: ruby
---


```ruby
["RUBY", "PHP", "JAVA"].map { |s| s.downcase }
=> ['ruby', 'php', 'java']
```

위와 같은 코드를 아래처럼 사용할 수 있다.

↓

```ruby
["RUBY", "PHP", "JAVA"].map(&:downcase)
=> ["ruby", "php", "java"]
```


--

## 메모

※배열안에 값이 하나만 있을때 사용이 가능하다.
