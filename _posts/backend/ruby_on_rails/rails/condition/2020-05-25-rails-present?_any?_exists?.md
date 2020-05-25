---
layout: post
title:  "Rails6.0 present? any? exits?차이"
author: negabaro kim
categories: rails
tags:	rails
---

# present? vs (any? exits?)

`AR(ActiveRecord)의relationships`이 존재하는지에 대한 로직을 체크할때 쓰이는데
발행되는 쿼리가 다르다.

present?는 해당 레코드를 전체 읽어오므로 퍼포먼스가 좋지 않은반면
any?,exits?는 LIMIT을 사용하므로 전체를 읽어오지 않아 퍼포먼스가 좋다.

N건인지 확인할려면 애초에 present?를 써서는 안되고
존재여부 확인은 LIMIT걸어도 문제없으니 any?,exits?를 쓰면 될거 같다.(예외사항 있음)


# any? vs exits?

예전에는 any?보다 exits?의 퍼포먼스가 좋았다는 글들이 많은데
Rails 5.1부터 개선이되서 any?와 exits?의 퍼포먼스 차이는 같다고 함.
고로 아무거나 사용해도 될듯


# 테스트

4000건정도의 데이터를 갖고 있는 모델에 쿼리를 실행해봤다.

```ruby
[5] pry(main)> Organization.all.count
   (2.1ms)  SELECT COUNT(*) FROM `organizations`
=> 4442
```

## present?

```ruby
[7] pry(main)> Organization.all.present?
  Organization Load (26.5ms)  SELECT `organizations`.* FROM `organizations`
=> true
```


## exists?

```ruby
[4] pry(main)> Organization.all.exists?
  Organization Exists? (0.5ms)  SELECT 1 AS one FROM `organizations` LIMIT 1
=> true
```

## any?


```ruby
[11] pry(main)> Organization.all.any?
  Organization Exists? (0.5ms)  SELECT 1 AS one FROM `organizations` LIMIT 1
=> true
```


exits?와 any?는 실행할때마다 속도차이가 있었는데 평균적으로 같다고 보면될거 같다.


# present?를 사용할때

존재여부에 사용된 쿼리를 가지고 그대로 loop를 돌리는 로직이 있다면 캐쉬기능 덕분에 present?를
사용하는게 더 빠를 수 있다.

```ruby
 if @work.episodes.present?
  - @work.episodes.each.with_index(1) do |episode, i|
```

`@work.episodes`가 present?에서 실행되었으므로 한번의 쿼리만 실행된다.


```ruby
- if @work.episodes.exists?
  - @work.episodes.each.with_index(1) do |episode, i|
```

반면 exists?는 전체로드 하지 않으므로 2개의 쿼리가 발생한다.

어짜피 전체로드가 필요하다면 판별로직에서 present?를 써서 전체로드후 캐쉬사용해서 쿼리해도 된다는 얘기



reference: 

```
https://www.ombulabs.com/blog/benchmark/performance/rails/present-vs-any-vs-exists.html
http://mikamisan.hatenablog.com/entry/2017/09/26/223137
```