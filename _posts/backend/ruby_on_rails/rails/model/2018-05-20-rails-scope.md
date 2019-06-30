---
layout: post
title:  "rails model에서의 scope이란"
author: negabaro kim
categories: rails
tags:	rails gem
---


### rails model scope이란

[Rails의 scope,scope module,namespace의 차이]에서 배운 scope과는 다름. rails model에서만 사용가능

모델의 스콥기능이란 공통적인 사용하는 쿼리를 모델의 메소드와 같이 정의할 수 있는기능이다.
scope을 이용하면 복잡한 SQL을 몇번이고 쓰지 않아도 되서 코드의 가독성이 좋아짐

### rails scope의 정의방법

rails scope의 정의방법은 이하2가지가 있다.


#### 스코프 메소드를 사용하는 방법

{% highlight ruby %}
class Post < ActiveRecord::Base
  scope :published, -> { where(published: true) }
end
{% endhighlight %}


#### 클래스 메소드와 같이 정의하는 방법


{% highlight ruby %}
class Post < ActiveRecord::Base
  def self.published
    where(published: true)
  end
end
{% endhighlight %}


### 사용방법 

{% highlight ruby %}
rails c
Post.published
#select * from post where published = true;
{% endhighlight %}


{% highlight ruby %}
rails c
category = Category.first
category.posts.published
{% endhighlight %}


### scope에 변수넣기


{% highlight ruby %}
class Post < ActiveRecord::Base
  scope :created_before, ->(time) { where("created_at < ?", time) }
end

rails c
Post.created_before(Time.local(2011))
#select * from post where created_at < 2011;
{% endhighlight %}



### scope에서 복수의 AND문 

scope끼리 머지함으로 where and


{% highlight ruby %}
# app/models/user.rb
class User < ActiveRecord::Base
  scope :inactive, -> { where state: 'inactive' }
  scope :finished, -> { where state: 'finished' }
end

rails c
User.inactive.finished
# => SELECT "users".* FROM "users" WHERE "users"."state" = 'inactive' AND "users"."state" = 'finished'
{% endhighlight %}


### scope에서 join문

join문 사용을 위해서는 merge 라는 메소드를 사용한다.

{% highlight ruby %}
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
{% endhighlight %}


### default scope이란

모델에서 사용되는 모든 쿼리에 어떤 조건을 붙일때 사용
보통 유저탈퇴시 delete문으로 유저를 물리적으로 삭제하지 않고
어떤 스테터스를 둔다. 예를들면 removed_at = null이면 탈퇴하지 않은 유저이고
removed_at = 탈퇴한 날짜가 있으면 탈퇴한 유저라고 할때 이하와 같이 사용한다.

{% highlight ruby %}
# app/models/customer.rb
class Customer < ActiveRecord::Base
  default_scope { where("removed_at IS NULL") } 
end

rails c
Customer.all
# => SELECT "customers".* FROM "customers" WHERE (removed_at IS NULL)
{% endhighlight %}

이렇게 해주면 디폴트 스콥의 설정이 자동으로 부여된걸 알 수 있음


[참고1]: http://ruby-rails.hatenadiary.com/entry/20140814/1407994568

[Rails의 scope,scope module,namespace의 차이]: http://home.negabaro.com:4000/rails/2018/03/23/scope-module-namespace.html
