---
layout: post
title:  "rails update_all이란?"
description: DB레코드의 일정 영역을 일괄적으로 update할때 사용
author: negabaro kim
tags:	rails rails/model
---

# update_all이란?

DB레코드의 일정 영역을 일괄적으로 update할때 사용한다.


# 장점

update_all은 빠르다. 대용량의 레코드를 update할때 특히 효과적이다.

update_all을 사용하지 않으면 loop를 이용해 반복적으로 update를 실행하므로 
transaction이 늘어나고 퍼포먼스가 떨어진다.


# 단점

단점이라기 보다는 특징일 수 있는데
update_all사용시 updated_at값은 자동갱신이 일어나지 않는다.

그러므로 updated_at을 갱신하기 위해서는 컬럼을 지정해줘야한다.

```ruby
target.update_all(approve_status: 1, updated_at: Time.current)
```


## update_all사용시 audited 레코드가 추가안되는 문제

필자는 유저의 행동로그를 남기기 위해 audited이라는 gem을 사용하는데 update_all 결과는 로그로 남기지 못한다.
audited는 Active Record callbacks을 전제로 동작하는 라이브러리인데
update_all자체가 Active Record callbacks을 거치지 않고 SQL를 직접발행하는 형태이기 때문이다.

그러므로 audited로그를 남기기 위해서는 update_all을 사용해서는 안된다.

자세한 내용은 [이슈]를 참고



# 사용방법

아래 코드는 User전체 레코드행의 sex컬럼을 female로 update시킨다.

```ruby
User.update_all(sex: 'female')
```


특정 조건에 해당하는 레코드를 일괄 업데이트시 아래와 같이 사용한다.

```ruby
User.where(role: '관리자').update_all(sex: 'female')
```


[이슈]: https://github.com/collectiveidea/audited/issues/352