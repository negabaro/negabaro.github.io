---
layout: post
title:  "rails 레코드가 존재하면 update 존재하지 않으면 create하는 방법"
author: negabaro kim
tags:	rails/model
---

# 개요

이 포스트에서는 레코드가 존재하면 update 존재하지 않으면 create하는 방법에 대해서 알아본다.

[rails create_or_update메소드에 대해]에서 설명했듯이 save를 이용한 insert,update로직을 사용하는 방법도 있지만
로직이 길어지므로 [ActiveRecord: Update a record if exists else create?]를 참고해 아래와 같은 로직을 구현해보았다.


```ruby
self.organization_configs.first_or_create(organization_id: org_id).update(organization_id: org_id, user_approve_status: 0)
```

위 코드는 신규일경우 first_or_create를 실행하고 아니라면 해당 object가 리턴된다.

리턴했다는것은 기존에 존재하는 레코드를 의미하는것이므로 update를 실행한다.



[ActiveRecord: Update a record if exists else create?]: https://stackoverflow.com/questions/14599113/activerecord-update-a-record-if-exists-else-create/25497490

[rails create_or_update메소드에 대해]: https://negabaro.github.io/archive/rails-create_or_update-in-save-method