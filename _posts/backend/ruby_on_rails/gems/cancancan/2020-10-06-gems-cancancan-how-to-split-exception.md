
---
layout: post
title:  "rails cancancan에서 예외처리 분기하는 방법"
tags:	rails/gem/cancancan
---


# 개요

```ruby
def index
  authorize! :show, Organization
rescue CanCan::AccessDenied => e
rescue CanCan::NotFound => e
end
```

뭐 이런식으로 동작이 가능하길 기대했는데

찾아본 결과 cancancan에서 예외처리는 `CanCan::AccessDenied` 외로 보내는 방법은 없는거 같다.


아래와 같이 동작이 가능

```ruby
def index
  authorize! :show, Organization
rescue CanCan::AccessDenied => e
  if current_user.status
    render_403
  else
    render_404
  end
end
```





### reference:

[link](https://stackoverflow.com/questions/64188783/is-it-possible-to-raise-an-exception-other-than-access-denied-with-cancan)