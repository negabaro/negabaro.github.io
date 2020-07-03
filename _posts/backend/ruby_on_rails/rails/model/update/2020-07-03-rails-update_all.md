---
layout: post
title:  "rails update_all이란?"
description: DB레코드의 일정 영역을 일괄적으로 update할때 사용
author: negabaro kim
tags:	rails rails/model
---

# update_all이란?

DB레코드의 일정 영역을 일괄적으로 update할때 사용

update_all을 사용하지 않으면 loop해서 update를 실행하므로 
transaction도 늘어나고 퍼포먼스가 떨어짐

# 사용방법

```ruby
User.update_all(sex: 'female')
```

이라고 하면 User안에 모든행을 update시킴

특정 조건에 해당하는 레코드를 일괄 업데이트시 아래와 같이 사용

```ruby
User.where(role: '관리자').update_all(sex: 'female')
```

