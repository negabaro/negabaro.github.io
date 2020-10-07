---
layout: post
title:  "rails6 has_many를 has_one처럼 사용하는 방법"
author: negabaro kim
tags:	rails/model/association
---

# 개요

이 포스트에서는 1:N,N:N관계여서 has_many를 사용해야하지만 
has_one으로 쓰고 싶을때 사용하는 방법에 대해 알아보자.

# 왜 has_many를 has_one처럼 쓰고싶은가?

예를들어보자. 아래와 같은 모델관계가 있다고 하자.

1. user모델은 복수의 organization모델에 소속된다.

2. 그러므로 user모델과 organization모델 사이에 org_user라는 모델이 존재해 N:N구조를 만들고 있다.

3. org_user모델에는 user_id와 organization_id의 정보를 갖고 있다.

이때 아래와 같이 has_many로 접근할시 몇가지 문제점이 생겼다.

```ruby
uu = User.first
uu.org_users
```

### 문제점1.

화면단에서 복수등록 요건자체가 없음.

모델관계는 has_many인데 화면단에서 has_one한 동작 밖에 없음.


### 문제점2.

모델1에 기인한 문제인데 `accepts_nested_attributes_for` 사용시 has_many처리되어
화면단에 복수의 폼을 등록하는 형태가 되어버림.




# 해결방법

org_id 정보를 억세서 메소드(attr_accessor)로 정의해 user인스턴스에 넣고
아래와 같은 모델관계를 정의하면 has_one으로 사용이 가능했다.


```ruby
has_one :org_user, ->(object) { where(organization_id: object.org_id) }
```

실제 코드는 아래와 같다.


## 모델단

```ruby
class User < ApplicationRecord
  attr_accessor :org_id
  #has_many :org_users, :conditions => proc { "organization_id = #{self.org_id}" }
  #has_many :org_users, ->(object) { where(organization_id: object.org_id) }
  has_one :org_user, ->(object) { where(organization_id: object.org_id) }
end
```

## 사용시

```ruby
 uu = User.first
 org = Organization.second
 uu.org_id = org.id
 uu.org_user
  OrgUser Load (1.5ms)  SELECT `org_users`.* FROM `org_users` WHERE `org_users`.`user_id` = 1 AND `org_users`.`organization_id` = 2 LIMIT 1
=> #<OrgUser:0x00007fa2ad367a70 id: 2, user_id: 1, organization_id: 2, status: nil, created_at: Sun, 04 Oct 2020 16:56:22 UTC +00:00, updated_at: Sun, 04 Oct 2020 16:56:22 UTC +00:00>
```

### reference:

[link1](https://teratail.com/questions/295781#reply-417880)
[link2](https://stackoverflow.com/questions/32508600/how-can-i-access-a-models-instance-variable-within-a-has-many-association-scope)