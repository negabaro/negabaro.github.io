---
layout: post
title:  "rails update_all 사용시 ActiveRecord::StatementInvalid: Mysql2::Error: You can't specify target table 'xx' for update in FROM clause 에러"
description: update_all 사용시 타깃 레코드에 join문이 들어가면 해당에러가 발생한다.
author: negabaro kim
tags:	rails rails/model
---

# rails update_all 사용시 ActiveRecord::StatementInvalid: Mysql2::Error: You can't specify target table 'xx' for update in FROM clause 에러


타깃 레코드에 join문이 포함되면 위와 같은 에러가 발생한다.


## 문제가되는 코드

아래 예제를 살펴보자.

```ruby
@organization = self.left_joins(:other_parent)

target = @organization.users.where(entity_id: entity_ids)
target.update_all(status: 1)
```

@organization이 join한 결과이므로 `target.update_all`을 실행하면
target table을 판단하지 못해  `You can't specify target table 'xx' for update in FROM clause` 에러가 발생하게된다.

## 해결방법1

join을 사용하지 않는다.

```ruby
@organization = self

target = @organization.users.where(entity_id: entity_ids)
target.update_all(status: 1)
```

## 해결방법2


```ruby
@organization = self.left_joins(:other_parent)

ids = @organization.users.where(entity_id: entity_ids).ids
target = @organization.organization_users.where(user_id: ids)
target.update_all(status: 1)
```

join한 오브젝트와 update_all을 분리시켜주면 된다.
@organization의 결과값의 id값을 받아서 target을 만들어주면 update_all이 실행가능하다.


# 레일즈의 密結合(tight coupling) 문제점이 들어나는 대표적인 부분인듯?

공통 모듈에서 params[:entity_id]값을 받아서 @organization을 만들어 주는데
다른 테이블의 값을 쓰고 싶다고  @organization에 join을 걸어버리면 
update_all이 실행안되는 문제가 발생할 수 있음.
테스트 코드가 없으면 눈치채기도 어렵고 tight coupling의 전형적인 문제점이 아닐까 싶다.



