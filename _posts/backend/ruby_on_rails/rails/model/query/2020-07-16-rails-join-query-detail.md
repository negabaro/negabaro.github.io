---
layout: post
title: "rails joins 메소드의 특징에 대해 알아보자"
author: negabaro kim
tags: rails/model
---

# joins 메소드란?

rails에서 모델과 모델의 join할때 사용하는 ORM메소드

inner join이 실행됨.



아래는 joins메소드의 특징이다.


# join 대상의 테이블 레코드는 가져오지 않음

joins메소드는 모델의 레코드를 가져오지 않음.

집사와 고양이의 관계를 예로 들어보자

집사(Owner) -> 고양이(Cat) 관계일때 아래와 같이 실행이 가능한데

`res = Owner.joins(:cats)` 

res안에 cats의 정보가 없다는 얘기다.

join대상인 cats의 정보를 가져오기 위해서는 select메소드로 지정해줘야한다.

```ruby
Owner.joins(:cats).select('owners.*, cats.name')
```


# join대상의 테이블에 where조건을 주고 싶을때

우선 아무런 생각없이 

```ruby
Owner.joins(:cats).select('owners.*, cats.name').where(name: 'xx')
```
하면 join대상 테이블에 where조건의 타겟이 Owner인지Cats인지 판단이 안되므로(디폴트로는 Owner를 선택해버림)

join 대상 테이블에 조건을 걸고 싶을때는 아래와 같은 문법으로 실행해줘야한다.

```ruby
모델명.joins(:Assosication명).where(join대상테이블명: { 컬럼명: 값 })
```

아래 예제는 owner테이블의 name이 민영이고 cats테이블의 name값이 momo라는 조건을 추가해준 결과다.

```ruby
Owner.joins(:cats).where(cats: { name: "momo" }, name: "민영")
SELECT `owners`.* FROM `owners` INNER JOIN `cats` ON `cats`.`owner_id` = `owners`.`id` WHERE `cats`.`name` = 'momo'
```


# 복수의 테이블을 join하는 방법

`집사 -> 고양이,개`관계에서 고양이와 개에게 동시에 join을 거는 방법에 대해서 알아보자

모델의 관계는 아래와 같다.

```ruby
# owner.rb
class Owner < ActiveRecord::Base
    has_many :cats
    has_many :dogs
end

# cat.rb
class Cat < ActiveRecord::Base
    belongs_to :owner
end

# dog.rb
class Dog < ActiveRecord::Base
    belongs_to :owner
end
```

아래와 같은 문법으로 실행해준다.

```ruby
모델명.joins(:AssociationName1, :AssociationName2)
```

실제 실행결과는 아래와 같다

```ruby
Owner.joins(:cats, :dogs)
SELECT `owners`.* FROM `owners` INNER JOIN `cats` ON `cats`.`owner_id` = `owners`.`id` INNER JOIN `dogs` ON `dogs`.`owner_id` = `owners`.`id`
```


# nested한 관계의 테이블에 join을 거는법

`주인 -> 고양이 -> 새끼고양이`와 같은 관계의 모델에 join을 거는 법을 알아보자.

### 모델간의 관계

```ruby
# owner.rb
class Owner < ActiveRecord::Base
    has_many :cats
    has_many :dogs
end

# cat.rb
class Cat < ActiveRecord::Base
    belongs_to :owner
    has_many :cat_children
end

# cat_child.rb
class CatChild < ActiveRecord::Base
    belongs_to :cat
end
```

### 문법

```ruby
모델명.joins(AssociationName1: :AssociationName2)
```

### 실행결과

```ruby
Owner.joins(cats: :cat_children)
 SELECT `owners`.* FROM `owners` INNER JOIN `cats` ON `cats`.`owner_id` = `owners`.`id` INNER JOIN `cat_children` ON `cat_children`.`cat_id` = `cats`.`id`
```


## 좀 더 nested한 테이블에 join거는 법

nested한 관계가 3중이상일때는 어떻게 할까?
`집사 -> 고양이 -> 새끼고양이 -> 햄스터`와 같은 관계라고 하면 (현실적이지 않지만 새끼고양이가 햄스터를 죽이지 않고 키운다고 가정해보자..)
아래와 같은 방식으로 레코드를 가져올 수 있다.

```ruby
Owner.joins(cats: [cat_children: :hamster])
```



---

[Link1]: https://pikawaka.com/rails/joins
[Link2]: https://qiita.com/TeruhisaFukumoto/items/007ad22cc170d297dbcc


