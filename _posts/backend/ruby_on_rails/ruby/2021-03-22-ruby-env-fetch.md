---
layout: post
title: "ruby ENV[]보다 ENV.fetch가 좋은 이유"
author: negabaro kim
tags: ruby
---

## 결론

ENV[]보다 ENV.fetch가 좋다.

## 사용방법

ENV와 ENV.fetch 사용법은 아래와 같다.


### ENV[]

```ruby
mysql:
  host: <%= ENV['MYSQL_HOST'] %>
```

### ENV.fetch()

```ruby
mysql:
  host: <%= ENV.fetch('MYSQL_HOST') %>
```


## ENV.fetch()가 좋은 이유

환경변수가 존재할때는 ENV[]와 ENV.fetch()의 차이는 전혀없다.

하지만 환경변수가 없을때 ENV[]는 nil을 리턴하는 반면 ENV.fetch()는 해당 환경변수가 없을때 에러를 발생시켜준다.

```
Cannot load `Rails.application.database_configuration`: key not found: "MYSQL_HOST"
```

보통 환경변수가 없을 경우 시스템이 오동작할 가능성이 높으므로 에러를 발생시켜주는 편이 장애를 빠르게 파악할 가능성이 높으므로 필자는 ENV.fetch()를 사용할것을 추천한다.


## ENV.fetch() 사용시 디폴트값 설정

아래와 같이 사용하면 MYSQL_HOST환경변수가 없을때 'localhost' 라는 문자열을 사용한다.

```ruby
mysql:
  host: <%= ENV.fetch('MYSQL_HOST', 'localhost') %>
```

디폴트값이 있으므로 MYSQL_HOST라는 환경변수가 없다고해도 당연히 에러는 발생시키지 않는다.


ENV일 경우는 아래와 같고 동작에 차이는 없다.

```ruby
host: <%= ENV['MYSQL_HOST'] || 'localhost' %>
```

---

[ENV.fetchのすすめ]: https://saiya-moebius.hatenablog.com/entry/2014/12/26/135041