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

아래쿼리 같이 like '%%' 사이에 `\n`을 넣어줘서 검색할 수 있다.

```bash
select * from audits where audited_changes like '%user_approve_status:\n- 0\n- 2%'
```


# 메모

`CHAR(13)`이 개행코드 이므로 CONCAT과 같이 아래와 같이도 사용가능하다고 한다.

```bash
SELECT
  *
FROM
  table_name
WHERE
  column_name LIKE CONCAT('%', CHAR(13), '%')
;
```