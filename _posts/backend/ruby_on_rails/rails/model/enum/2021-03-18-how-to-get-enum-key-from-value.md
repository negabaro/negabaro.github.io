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

