---
layout: post
title:  Mysql 셀렉트시 개행검색하는 방법
tags: mysql
---


audited_changes컬럼에 아래와 같이 개행이 포함된 값을 검색하기 위해서

```
user_approve_status:
- 0
- 2
```

아래와 같이 like '%%' 사이에 `\n`을 넣어줘서 검색할 수 있다.

```bash
select * from audits where audited_changes like '%user_approve_status:\n- 0\n- 2%'
```