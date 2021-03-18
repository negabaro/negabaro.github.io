---
layout: post
title:  "rails enum value값으로 key값 알아내는 법"
author: negabaro kim
tags:	rails/enum
---


key메소드 인자에 enum의 value값을 넣으면 된다.

```ruby
enum efficency: { High: 0, Medium: 1, Low: 2 }
Model.efficiencies.key(0) # => "High"
```

enum의 value값이 symbol일때는 `intern` `to_sym`과 같은 메소드로 변환해줘서 사용해야한다.

```ruby
enum roles: {
  "학생": :Student,
  "선생": :Teacher
}.freeze, _prefix: true
User.roles.key("Teacher".intern) # => "선생"
```

---

## 메모

enum에 국한된 얘기는 아니고 hash에서도 동일하게 적용된다.

```ruby
list = {a: 1, b: 2, c: 3}
list.key(1)
# => :a
```


### ruby1.9이하에서는 invert

ruby1.9이하에서는 invert가 사용되었고 1.9이후부터 key가 생겼다고 한다.

```ruby
list = {a: 1, b: 2, c: 3}
list.invert[1]
# => :a
list.key(1)  #1.9以降
# => :a
```