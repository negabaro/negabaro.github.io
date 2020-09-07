---
layout: post
title: "rails uniq와 distinct의 차이"
author: negabaro kim
tags: rails rails/model
---


# uniq와 distinct의 공통점

중복된 컬럼을 없애준다.

# uniq와 distinct의 차이점

uniq를 사용하면 오브젝트가 Array형태가 된다.

distinct는 `ActiveRecord_AssociationRelation`형태로 리턴된다.

```ruby
uu.organizations.joins(:organization_users).distinct.class
=> Organization::ActiveRecord_AssociationRelation
```


```ruby
uu.organizations.joins(:organization_users).uniq.class
=> Array
```