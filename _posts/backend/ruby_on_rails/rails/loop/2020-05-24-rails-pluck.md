---
layout: post
title:  "rails pluck이란?pluck을 써야하는 이유"
author: negabaro kim
categories: rails
tags:	rails
---

# pluck이란?

rails에서 단순필드에 접근하기 위한 loop를 효율적으로 하기위해 만들어진 메소드

# pluck을 쓰는 이유

컬렉션 조작시 속도개선/메모리절약의 용도로 사용한다


레일즈에서 `ActiveRecord_Associations_CollectionProxy`의 리스트를 loop시켜서
해당 모델의 데이터에 접근할때 map을 자주 사용한다.

```ruby
Book.paperbacks.map { |book| book.title }
```

그런데 위와 같이 기술하면 `Book.paperbacks`의 숫자만큼 오브젝트를 메모리에 적제하게된다.
아래와 같은 축약형 기법도 동일

```ruby
Book.paperbacks.map(&:title)
```

이때 `ActiveRelation#pluck`메소드를 이용하면 loop안의 필드를 DB에서 직접 읽어옴으로
메모리절약이 가능하다

```ruby
Book.paperbacks.pluck(:title)
```


# 복수의 필드도 지정가능

단순 필드라면 복수지정도 가능

```ruby
Book.paperbacks.pluck(:title, :name)
```

# pluck사용시 주의사항1. pluck은 반드시 ruby의 배열형태로 리턴한다.


아래와 같이 해쉬 형태로 리턴하고 싶을때는 사용할 수 없다.

```ruby
@items.map { |i| { label: "#{i.name}", code: i.id, location: i.decorate.v_location  }
```

# pluck사용시 주의사항2. 단순 필드에만 접근 가능하다.

아래와 같이 컬렉션안의 오브젝트에서 decorate를 호출할 수 없다.



```ruby
orgs.map { |org| [org.decorate.v_org_name] }
```


# reference:

https://techracho.bpsinc.jp/hachi8833/2018_09_26/62333
https://qiita.com/k-o-u/items/31e4a2f9f5d2a3c7867f