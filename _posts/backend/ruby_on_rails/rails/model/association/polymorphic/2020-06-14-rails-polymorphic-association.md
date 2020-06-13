---
layout: post
title:  "rails6 polymorphic association이란?"
author: negabaro kim
tags:	rails rails/model
---

# 용어정리

## 인터페이스 

rails의 belongs_to에 사용되는 컬럼을 얘기한다
통성적으로 `모델_id`이다.

## 선언모델

내가 만든용어인데 다형성을 선언한 모델을 의미한다.
선언모델은 하나만 존재한다.
복수의 모델이 사용하나의 하나의 모델이라고도 말할 수 있음

## 구현모델

다형성을 선언한 모델을 참조하는 모델을 말함.
구현 모델은 복수의 모델이다.


# polymorphic(다형성)이란?

[다형성(polymorphism)을 이해해보자]를 참고

# polymorphic association이란?

레일즈에서 복수의 모델들이 하나의 공통모델을 소속하고 있을때
해당 관계에 대한 정의를 할때 사용한다.

예를들어 이미지(picture)모델이 있고 사원모델과 상품모델에서 해당모델을 관련짓고 싶을때
polymorphic association을 사용한다.

여기서 이미지 모델은 선언모델이고 상품,사원모델은 구현모델이 된다.


ex)

```ruby
class Picture < ApplicationRecord
  belongs_to :imageable, polymorphic: true
end
 
class Employee < ApplicationRecord
  has_many :pictures, as: :imageable
end
 
class Product < ApplicationRecord
  has_many :pictures, as: :imageable
end
```

# polymorphic association을 사용하면 뭐가 좋은가?

아래 3가지 장점이 있다.

## 1. 복수의 인터페이스를 만들필요가 없어 확장성이 높아진다.

## 2. 선언모델 -> 구현모델 / 구현모델 -> 선언모델 접근시 인터페이스 신경쓸 필요가 없어서 편하다.

## 3. 관계선언이 명확하게 지정되므로 모델 관계에 대한 가독성이 높아진다.


# polymorphic association을 사용하지 않으면?

Picture테이블에 product_id,employee_id라는 컬럼(인터페이스)를 만들어서 

상품용 이미지를 가져올때와 사원용 이미지를 가져올때 프로그래밍 분기로 각 인터페이스를 선택해서 접근해야한다.

그런데 polymorphic association을 사용하면 해당 인터페이스를 2개 만들 필요도 없고
접근시도 사원용,상품용 이런걸 신경쓸 필요없이 접근이 가능해진다.

그리고 선언모델(사원,상품)이 늘었을 경우 해당 인터페이스(xx_id)를 또 추가해줘야하므로
이미지 모델에 alter table을 해줘야하는 등 확장성이 낮아지게된다.



# 설정방법

4년제 대학교/전문대학이 전공이라는 모델을 공통으로 가지는 로직을 구현해보자


## 전공테이블 작성

전공의 마스터 테이블을 작성해준다.

```ruby
rails g model majors name:string
```

만 해주면됨


## 선언모델(전공 중간 테이블) 작성

구현모델들이 참조할 전공의 중간테이블이다.
선언모델의 인터페이스명을 보통 able로 끝나게 지어주므로 org_majorable이라고 지어줬다.(의미가 이상하지만..)

```ruby
rails g model org_majors org_majorable:references{polymorphic} major:references
```

위와 같이 모델을 작성하면

아래와 같은 migration파일이 만들어진다.

```ruby
create_table :org_majors do |t|
     t.references :org_majorable, polymorphic: true
end
```

여기서 db:migrate하면
실제 컬럼에서 아래와 같은 2개의 컬럼이 생성됨

```ruby
  t.string "org_majorable_type"
  t.bigint "org_majorable_id"
```

`org_majorable_type` 에 어느 구현모델인지에 대한 정보가 있고
`org_majorable_id`가 인터페이스 역할을 한다.



모델은 아래와 같이 작성되어있다.

```ruby
class OrgMajor < ApplicationRecord
  belongs_to :org_majorable, polymorphic: true
end
```

## 구현모델(대학교/전문대학) 작성

college,university이라는 모델을 만들어준다.
구현모델에 특별한 컬럼은 없고

생성한 모델에 아래와 같이 사용할 선언부분의 인터페이스를 지정해준다. `:as => :org_majorable`

```ruby
class Organization::College < Organization
  has_many :org_majors, :as => :org_majorable
end
```

```ruby
class Organization::University < Organization
  has_many :org_majors, :as => :org_majorable
end
```

이걸로 `polymorphic association`설정은 끝났다.

## 데이터 추가


```ruby
Organization::University.new(name: '경북대학교', parent_id: 1).save
Organization::College.new(name: '영진전문대학', parent_id: 1).save

Major.new(name: '컴퓨터정보학과').save
```

## 사용방법

구현모델에서는 인터페이스 신경쓰지 않고 `org_majors`로 선언모델에 접근이 가능
선언모델에서도 인터페이스 신경쓸 필요없이 `org_majorable`로 구현모델에 접근이 가능

```ruby
oc = Organization::College.first
oc.org_majors.create(major: Major.first)
oc.org_majors
# -> 중간테이블
#  OrgMajor Load (0.3ms)  SELECT `org_majors`.* FROM `org_majors` WHERE `org_majors`.`org_majorable_id` = 3 AND `org_majors`.`org_majorable_type` = 'Organization'
#=> [#<OrgMajor:0x00007fcc34216530
#  id: 1,
#  org_majorable_type: "Organization",
#  org_majorable_id: 3,
#  k_code: "1",
#  major_id: 1,
#  created_at: Sat, 13 Jun 2020 17:01:02 UTC +00:00,
#  updated_at: Sat, 13 Jun 2020 17:01:02 UTC +00:00>,

ou = Organization::University.first
ou.org_majors.create(major: Major.first)
ou.org_majors
# -> 중간테이블
##  Organization::University Load (0.4ms)  SELECT `organizations`.* FROM `organizations` WHERE `organizations`.`type` = 'Organization::University' ORDER BY `organizations`.`id` ASC LIMIT 1
#=> #<Organization::University:0x00007fcc34676990
# id: 2,
# type: "Organization::University",
# name: "경북대학교",
# parent_id: 1,
# other_parent_id: nil,
# created_at: Sat, 13 Jun 2020 16:56:52 UTC +00:00,
# updated_at: Sat, 13 Jun 2020 16:56:52 UTC +00:00>
#[17] pry(main)> ou.org_majors
#  OrgMajor Load (9.2ms)  SELECT `org_majors`.* FROM `org_majors` WHERE `org_majors`.`org_majorable_id` = 2 AND `org_majors`.`org_majorable_type` = 'Organization'

OrgMajor.first.org_majorable
# -> 영진전문대학
#  OrgMajor Load (0.4ms)  SELECT `org_majors`.* FROM `org_majors` ORDER BY `org_majors`.`id` ASC LIMIT 1
#  Organization Load (0.4ms)  SELECT `organizations`.* FROM `organizations` WHERE `organizations`.`id` = 3 LIMIT 1
#=> #<Organization::College:0x00007fcc56b3e370
# id: 3,
# type: "Organization::College",
# name: "영진전문대학",
# parent_id: 1,
# other_parent_id: nil,
# created_at: Sat, 13 Jun 2020 16:57:27 UTC +00:00,
# updated_at: Sat, 13 Jun 2020 16:57:27 UTC +00:00>

OrgMajor.second.org_majorable
#  OrgMajor Load (0.5ms)  SELECT `org_majors`.* FROM `org_majors` ORDER BY `org_majors`.`id` ASC LIMIT 1 OFFSET 1
#  Organization Load (0.4ms)  SELECT `organizations`.* FROM `organizations` WHERE `organizations`.`id` = 2 LIMIT 1
#=> #<Organization::University:0x00007fcc14a47170
# id: 2,
# type: "Organization::University",
# name: "경북대학교",
# parent_id: 1,
# other_parent_id: nil,
# created_at: Sat, 13 Jun 2020 16:56:52 UTC +00:00,
# updated_at: Sat, 13 Jun 2020 16:56:52 UTC +00:00>
```



# polymorphic association의 단점?

루비에서의 다형성(duck typing)에 대한 문제점은 있지만 polymorphic association만 따지면 
단점이 딱히 없는듯..? polymorphic association로 구현가능하다면 꼭 하는게 좋다고 생각함


# STI vs polymorphic association

rails의 STI랑 비교되는 경우가 있는데
polymorphic association은 클래스를 계승하는게 아니고 관계를 나타내는 방식이므로 비교대상이 아님

※STI는 특정 데이터를 조작하는 모델을 계승해서
하나의 테이블에 복수의 모델들을 관리하는 용도

# 구현모델이 2개로 정해져있다면(3개이상은 절대안는다면..?)

확장성면 에서의 장점은 상쇄 되겠지만

그렇다고 해도 모델관계에 대한 가독성이 높아지는 메릿은 남아있으므로
polymorphic선언을 해주는게 좋다고 생각함.


# 메모1. xx::yy 이렇게 적어주면 org_majorable_type 안에 xx밖에 안들어감

`Organization::University.new(name: '경북대학교', parent_id: 1).save`이렇게하면
org_majorable_type 안에 `Organization::University` 부분이 다들어갈 줄 알았는데 
`Organization` 밖에 없음.

뭐 그래도 `org_majorable_id`하나만으로 참조가 가능하긴 함.


[다형성(polymorphism)을 이해해보자]: https://negabaro.github.io/archive/software-polymorphism
### reference:

```
https://railsguides.jp/association_basics.html#%E3%83%9D%E3%83%AA%E3%83%A2%E3%83%BC%E3%83%95%E3%82%A3%E3%83%83%E3%82%AF%E9%96%A2%E9%80%A3%E4%BB%98%E3%81%91
https://qiita.com/geshi/items/9e76f8d407dfd3e5211b
https://qiita.com/itkrt2y/items/32ad1512fce1bf90c20b
```