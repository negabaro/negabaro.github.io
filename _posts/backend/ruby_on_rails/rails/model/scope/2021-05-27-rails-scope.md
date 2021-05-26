---
layout: post
title:  "rails model에서의 scope이란"
author: negabaro kim
categories: rails
tags:	rails gem
---


### rails model scope이란

Rails에서는 루팅과 모델에서 scope이라는 용어를 쓰고있다.

루팅에서의 scope는 [Rails의 scope,scope module,namespace의 차이]를 참고 바라고

이 포스트에서는 모델에서의 scope에 대해 알아본다.

모델의 스콥기능이란 공통적으로 사용하는 쿼리를 모델의 메소드와 같이 정의할 수 있는 기능을 말한다.

scope을 이용하면 복잡한 SQL을 몇번이고 쓰지 않아도 되서 코드의 가독성이 좋아지는 장점이 있다.

### rails scope의 정의방법

rails scope의 정의방법은 아래 2가지가 있다.


#### 스코프 메소드를 사용하는 방법

```ruby
class Post < ActiveRecord::Base
  scope :published, -> { where(published: true) }
end
```


#### 클래스 메소드와 같이 정의하는 방법


```ruby
class Post < ActiveRecord::Base
  def self.published
    where(published: true)
  end
end
```


### 사용방법 

```ruby
rails c
Post.published
#select * from post where published = true;
```

```ruby
rails c
category = Category.first
category.posts.published
```


### scope에 변수넣기


```ruby
class Post < ActiveRecord::Base
  scope :created_before, ->(time) { where("created_at < ?", time) }
end

rails c
Post.created_before(Time.local(2011))
#select * from post where created_at < 2011;
```



### scope에서 복수의 AND문 

scope끼리 머지함으로 where and


```ruby
# app/models/user.rb
class User < ActiveRecord::Base
  scope :inactive, -> { where state: 'inactive' }
  scope :finished, -> { where state: 'finished' }
end

rails c
User.inactive.finished
# => SELECT "users".* FROM "users" WHERE "users"."state" = 'inactive' AND "users"."state" = 'finished'
```


### scope에서 join문

join문 사용을 위해서는 merge 라는 메소드를 사용한다.

```ruby
class Category < ActiveRecord::Base
  has_many :posts
  #post model에서 정의한 recent라는 스콥을 조인
  scope :with_posts, -> { joins(:posts).merge(Post.recent) }
end

class Post < ActiveRecord::Base
  belongs_to :category
  scope :recent, -> { where(created_at: Time.zone.now..3.days.ago) }
end

rails c
Category.with_posts
#=> SELECT "categories".* FROM "categories" 
#           INNER JOIN "posts" ON "posts"."category_id" = "categories"."id" 
#           WHERE ("posts"."created_at" BETWEEN '2015-04-20 16:55:08.237023' AND '2015-04-17 16:55:08.237228')
```


### default scope이란

선언할 모델에서 사용되는 모든 쿼리에 기본적으로 어떤 조건을 붙일때 사용한다.

유저탈퇴시 물리적으로 유저의 데이터를 삭제하지 않고 특정 flag를 만들어 해당 플래그를 만들고 default_scope에서는 논리삭제 대상이 아닌 부분만 쿼리하도록 디폴트로 지정할때 사용한다.


아래 예제는 `removed_at = null`이면 탈퇴하지 않은 유저이고
removed_at = 탈퇴한 날짜가 있으면 탈퇴한 유저로 분류한 코드이다.

```ruby
# app/models/customer.rb
class Customer < ActiveRecord::Base
  default_scope { where("removed_at IS NULL") } 
end

rails c
Customer.all
# => SELECT "customers".* FROM "customers" WHERE (removed_at IS NULL)
```

이렇게 해주면 디폴트 스콥의 설정이 자동으로 부여된걸 알 수 있음

참고로 논리삭제는 `discard`라는 gem을 이용하면 간단히 추가 가능하다.






---

[참고1]: http://ruby-rails.hatenadiary.com/entry/20140814/1407994568

[Rails의 scope,scope module,namespace의 차이]: http://home.negabaro.com:4000/rails/2018/03/23/scope-module-namespace.html
