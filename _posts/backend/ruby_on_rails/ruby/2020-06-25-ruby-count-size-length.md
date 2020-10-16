---
layout: post
title: "ruby count vs size,length 메소드의 차이는?"
author: negabaro kim
description: length,size는 같음. count는 length,size의 상위버전으로 파라메터를 받을 수 있음. 또한 count는 Enumerable안에 있는 메소드로 count사용시 each를 이용해 루프를 하므로 카운트할 행이 많을때 length,size보다 느림.
tags: ruby
---

# 결론

`length`와 `size`는 같다

웬만하면 count쓰지말고 2바이트 절약가능한 size를 사용하자.


# length=size

length,size는 alias 관계이므로 같다고 보면됨

size,length는 레시버에서 기본적으로 가지고 있는 요소정보를 참조하므로 속도가 빠르다.

후술할 count에 비해 심플하다.

문자열,해쉬,배열에 사용이 가능하다.

```
#배열
[1, 2, 3].size #=> 3

#해쉬
{name: "Taro", age: 20, occupation: "Student"}.length #=> 3

#문자열
"aiueo".size #=> 5
```


# count vs length,size

앞서 말한대로 length,size는 같다. 그렇다면 count와 무슨 차이가 있는지 알아보자.

## 퍼포먼스

count는 Enumerable안에 있는 메소드로 count사용시 each를 이용해 루프를 하므로 카운트할 행이 많을때 length,size보다 느림.
행이 적을때 퍼포먼스 차이는 크지 않음.


## 파라메터를 받음

count는 파라메터를 받을 수 있음

해당 파라메터에 카운트할 조건을 넘겨서 조건에 일치하는 행을 카운트할때 용이함

```ruby
{name: "Taro", age: 20, occupation: "Student"}.count([:name, "Taro"]) #=> 1

[1, 2, 3].count(3) #=> 1
```

### 문자열 카운트시 주의사항

문자열 카운트시 파라메터가 필수이다.
없으면 에러가 나므로 전체 문자열을 카운트할때 count메소드를 사용해서는 안된다.

```ruby
"aiueo".count("a") #=> 1
```

#### 파라메터가 없으면 ArgumentError발생

```ruby
"aiueo".count
ArgumentError: wrong number of arguments (given 0, expected 1+)
from (pry):7:in `count
```

## 블록을 받음

block을 받을 수 있다. 
예를 들어 아래와 같이 조건에 일치한 부분을 카운트할때 용이하다.

```ruby
a = [1,3,5,7,9,11,13,17,19,23].count { |i| i > 9 }
puts a # 5
```


# 메모1. ActiveRecord_Relation의 count

ActiveRecord_Relation에도 count라는 메소드가 있는데 
위에서 설명한 count와는 다른 친구

ORM에서 간단히`select count(*)`를 넣을 수 있게 하기위한 메소드

# 메모2. rails에서 select문 사용후 count하면 SQL syntax에러가 발생

rails에서 `Organization::ActiveRecord_Relation`형태로 select한 결과를 count하면 에러가남

```ruby
Organization.left_joins(:other_parent).select("organizations.*, other_parents_organizations.name as parent_name").count
   (0.8ms)  SELECT COUNT(organizations.*, other_parents_organizations.name as parent_name) FROM `organizations` LEFT OUTER JOIN `organizations` `other_parents_organizations` ON `other_parents_organizations`.`id` = `organizations`.`organization_other_parent_id`
ActiveRecord::StatementInvalid: Mysql2::Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '*, other_parents_organizations.name as parent_name) FROM `organizations` LEFT OU' at line 1
from /Users/sehwakim/docker/univas-com4/vendor/bundle/ruby/2.6.0/gems/mysql2-0.5.2/lib/mysql2/client.rb:131:in `_query'
Caused by Mysql2::Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '*, other_parents_organizations.name as parent_name) FROM `organizations` LEFT OU' at line 1
```

`select count(*)`와 `select organizations.*, other_parents_organizations.name as parent_name`가 공존할 수 없으므로 당연한 에러


# 메모3.(2020/10/16추가)

특정 쿼리결과에 first를 한후 count를 사용하면 에러가 발생함(length,size는 당연히 가능)

### 에러 안나는 코드

```ruby
@@members.count 
```

### 에러가 발생하는 코드

```ruby
@@members.first(5).count
```

```
ctiveRecord::StatementInvalid: Mysql2::Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near
from /shared/vendor/bundle/ruby/2.6.0/gems/mysql2-0.5.2/lib/mysql2/client.rb:131:in `_query'
```

그냥 count를 사용하지마..!!




### reference:

[Link1](https://qiita.com/motoki4917/items/ffc89d955e20b91d1014)

[Link2](https://qiita.com/tacumai/items/28100326874dae9e5f5c)

