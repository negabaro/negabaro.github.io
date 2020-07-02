---
layout: post
title:  "ruby send 커맨드란"
description: 메소드명을 동적으로 변환시켜서 실행하고 싶을때 사용
author: negabaro kim
tags:	ruby
---

# send 커맨드란?

메소드명을 동적으로 변환시켜서 실행하고 싶을때 사용


## example

아래 예제를 살펴보자

before의 경우 거의 같은 내용에 `approved`와 `unapproved`의 차이일뿐인데
메소드를 2개로 나눴다.

### before


```ruby
def approved_list(year)
  self.organizations.approved
  .where(year: year).joins(sports_club: [:other_parent])
  .select("registered_organizations.entity_id as ro_entity_id,
             CONCAT(other_parents_organizations.name, ' ', organizations.name) as name,
             organizations.entity_id")
    .map{|v| {name: v.name, entity_id: v.entity_id, ro_entity_id: v.ro_entity_id} }
end

def unapproved_list(year)
  self.organizations.unapproved
  .select("registered_organizations.entity_id as ro_entity_id,
           CONCAT(other_parents_organizations.name, ' ', organizations.name)  as name,
           organizations.entity_id")
  .map{|v| {name: v.name, entity_id: v.entity_id, ro_entity_id:  v.ro_entity_id} }
end
```

### after

send를 사용하면 메소드를 하나로 줄일 수 있다.

```ruby
def org_list(year,status)
  method_name = status == 1 ? 'approved' : 'unapproved'
  self.organizations.send(method_name)
  .select("registered_organizations.entity_id as ro_entity_id,
           CONCAT(other_parents_organizations.name, ' ', organizations.name)  as name,
           organizations.entity_id")
  .map{|v| {name: v.name, entity_id: v.entity_id, ro_entity_id:  v.ro_entity_id} }
end
```

