---
layout: post
title:  "rails new메소드와 build메소드의 차이에 대해"
description: "new메소드와 build메소드의 차이는 없다."
author: negabaro kim
tags:	rails/model
---

# new메소드와 build메소드의 차이

`new메소드와 build메소드의 차이는 없다.`


조금 의외였던것은 build메소드의 alias가 new메소드이다.(반대인줄)

아래 코드를 참조

```
def build(attributes = {}, &block)
  @association.build(attributes, &block)
end
alias_method :new, :build
```

--------

# 예전에는 차이가 있었다고

지금은 차이가 없었지만 예전에는 

관련모델에서 오브젝트 생성시 xx_id가 들어가냐 안들어가냐의 차이가 있었다고 한다.

```ruby
user = User.first
user.comments.new
=> #<Comment id: nil, body: nil, user_id: 1, created_at: nil, updated_at: nil>
user.comments.build
=> #<Comment id: nil, body: nil, user_id: 1, created_at: nil, updated_at: nil>
```

현재는 차이가 없다.



### reference:

```
https://qiita.com/sukechansan/items/6bae532b4f678fdcf87d
```