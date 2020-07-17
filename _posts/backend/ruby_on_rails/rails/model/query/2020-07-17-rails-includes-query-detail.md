---
layout: post
title: "rails includes 메소드의 특징에 대해 알아보자"
author: negabaro kim
tags: rails rails/model
---

# N+1문제

`집사(owner) -> 고양이(cats)`관계에서


집사가 모시고 있는 고양이 리스트를 보야주고 싶을때 레일즈는 아래와 같이 구현한다.

```ruby
##controller
@owners = Owner.all
```


```ruby
## view
@owners.each do |owner|
  owner.cats.each do |cat| 
    puts cat.name
  end
end
```

이때 controller에서 실행한

관계가 있는 테이블 `Owner.includes(:cats)`에 의해 1번의 쿼리가 발행되었는데

view로직의 `owner.cats`에 의해 owner의 숫자만큼 쿼리가 추가 발행되게 된다.

owner가 5명이라면 5번의 쿼리만 발행되는데 owner가 10000명이라면 10000번의 쿼리가 발행되므로
퍼포먼스에 악영향을 준다. 이러한 문제를 N+1문제라고 부름.



# 해결방법 includes메소드를 사용하자.

이러한 N+1문제를 해결하기위해 includes를 사용한다.

아래와 같이 변경하는것만으로 N+1문제 해결이 가능하다.

```ruby
##controller
@owners = Owner.includes(:cats) # Owner.all에서 변경
```


# 쿼리만 보면 자식 레코드만 가져온거 같지만..

`@owners = Owner.includes(:cats)`를 실행하면 아래 2개의 쿼리를 발행한다.


```ruby
SELECT `owners`.* FROM `owners` 
SELECT `cats`.* FROM `cats`  WHERE `cats`.`owner_id` IN (1, 2, 3, 4)
```

발행된 쿼리를 보면 자식 레코드만 가져온거 같지만 `내부적으로는 owners테이블에 관계된 cats테이블의 레코드를 포함한 값을 가지게된다.
덕분에 view단에서 불필요한 SQL발행을 하지 않게된다.


# nested한 관계를 가진 테이블의 값을 가져오는 법

[rails joins 메소드의 특징에 대해 알아보자]에서 소개한 joins의 문법과 같다.

```ruby
모델명.includes(관계명1: :관계명2)
```


`집사(owner) -> 고양이(cats) -> 새끼(children)` 관계일때 아래와 같다.


## controller단

```ruby
@owners = Owner.includes(cats: :children)
```

## view단

```ruby
@owners.each do |owner|
  owner.cats.each do |cat| 
    cat.children.each do |child|
      puts child.name
    end
  end
end
```


컨트롤러단의 코드를 `@owners = Owner.includes(:cats)`만 해주면 
`owner.cats.each do |cat| `까지는 문제가 없지만 `cat.children.each do |child|` 로직부터 N+1문제가 일어나므로 꼭 nested한 문법을 사용해야한다.

### reference:

```
https://pikawaka.com/rails/includes
```

[rails joins 메소드의 특징에 대해 알아보자]: https://negabaro.github.io/archive/rails-join-query-detail