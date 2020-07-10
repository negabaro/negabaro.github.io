---
layout: post
title:  "ruby positive? negative? 메소드는?"
description: "0이상인지 0미만인지 판단할때 사용 "
tags: ruby
---

# positive?

slef가 0보다 높을때 true 아닐 경우 false를 리턴

```ruby
1.positive?    # => true
0.positive?    # => false
-1.positive?   # => false
```

`0 == var`대신에 `var.positive?`라는 코드를 발견

var이 0,1,2 만 들어온다고 가정할때  첫번째 빼고 1,2 에서만 뭔가를 실행하고 싶을때 사용
`unless var.positive?`이면 첫번째 행에서만 뭔가를 실행할 수 있음.

# negative?

self가 0미만 일때는 true 아닐경우 false를 리턴

자연수 판단할때도 사용가능할 듯?

```ruby
-1.negative?   # => true
0.negative?    # => false
1.negative?    # => false
```