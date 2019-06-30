---
layout: post
title:  "Rails 팔로우(Follow) 기능 만들기"
author: negabaro kim
categories: rails
tags:	handson
cover:  "/assets/twice.jpg"
---


![follow](https://user-images.githubusercontent.com/4640346/39975910-25a29d88-576c-11e8-9244-d275bb2bc36d.gif)


Rails에서 팔로우 기능을 만들어 봤다.
사전에 [Rails devise인스톨 방법]에서 만든 User모델과 [rails로 퀴즈어플 만들어보기(CRUD편)]에서 만든 WritingQuiz모델이 필요하다.

※이때까지 공부한내용중 이해하기가 가장 어려웠던것 같다.
이유로는 관련용어의 의미를 이해하기 어려웠던점과 특수한 N:N형모델링 이라는점이다.

### 특수한 N:N형모델링에 대해서

[rails5.1에서 N:N 관계형 모델 만들기]에서 공부한 N:N형 모델링에는 A와B라는 모델 그리고 중간 테이블이 존재했는데
팔로우 기능 같은 경우는 User모델 하나로 N:N형을 구현해야한다는 점이 특이한점이다.


### 팔로우 관련 용어설명

자주 등장하는 용어에 대한 설명이다.

1. 팔로우(Follow)는 어떤 유저를 팔로우했을때 쓰는 의미
2. 팔로워(Follower)는 나를 팔로우한 사람을 칭함
3. 팔로잉(Following)은 내가 누군가를 팔로잉한것을 의미


보통 인스타그램이나 트위터에서

내 정보가 

```
Follower 127 Following 467
```

이면

나를 팔로잉 하고 있는 사람이 127명이고
내가 팔로잉 하고 있는 사람이 467명이라고 말한다.

한국어로 보면 둘다 팔로잉 하다라서 살짝 위화감이 있는데
Follower가 수동태고 Following이 능동태이다.


나말고 다른 유저의 프로필에

```
Follower 5960 Following 420
```

이라고 적혀있으면 

이 유저를 팔로우한 사람은 5960명이고 
이 유저가 팔로우 한 사람은 420명인것 이다.

User모델 입장에서는 위에 적은대로 이해하면 되는데
이뒤에 설명할 Relationship의 모델입장에서는 나라는 주체가 아닌 중립입장 이기에
팔로우 한사람 팔로우 된사람으로 표현된다.
이때는 Follower를 팔로우 한사람으로
Following을 팔로우 당한사람,된사람으로 표현한다.




### 중간테이블 Relationship생성

본격적으로 팔로우 기능을 만들어보자.
제일 먼저해야할것은 누가 누구를 팔로우 했는지에 대한 정보를 알수 있는 중간테이블을 만드는것이다.
컬럼에는 팔로우 한사람의 user.id가 들어있는 follower_id와 
팔로우 된사람의 user.id 가 알 수 있는 following_id를 추가해준다.

이하 커맨드를 실행해준다.

{% highlight ruby %}
rails generate model Relationship follower_id:integer following_id:integer
{% endhighlight %}

만들어진 migrate파일에 이하와 같이 인덱스 파일을 추가해준다.

{% highlight ruby %}
#db/migrate/20180509020125_create_relationships.rb
class CreateRelationships < ActiveRecord::Migration[5.1]
  def change
    create_table :relationships do |t|
      t.integer :follower_id
      t.integer :following_id

      t.timestamps
    end
    add_index :relationships, :follower_id
    add_index :relationships, :following_id
    add_index :relationships, [:follower_id, :following_id], unique: true
    #follower_id와followed_id의 조합은 반드시 유니크임을 의미하는 설정
    #이 설정에 의해 어떤 유저가 똑같은 유저를 2회이상 팔로우하는것을 막습니다.
  end
end
{% endhighlight %}

#### db에 반영

{% highlight ruby %}
rake db:migrate
{% endhighlight %}




### 동작확인용 데이터 추가

먼저 동작확인을 위한 데이터를 추가해보자.


##### 동작확인용 데이터1(5번 유저가 6번을 팔로우)

{% highlight ruby %}
rs = Relationship.new(follower_id: 5, following_id: 6)  
rs.save
{% endhighlight %}

##### 동작확인용 데이터2(8번 유저가 9번유저를 팔로우)


{% highlight ruby %}
rs = Relationship.new(follower_id: 8, following_id: 9)
rs.save
{% endhighlight %}

##### 동작확인용 데이터3(8번 유저가 5번유저를 팔로우)

{% highlight ruby %}
rs = Relationship.new(follower_id: 8, following_id: 5)
rs.save
{% endhighlight %}


여기까지 동작확인용 데이터추가가 끝나면 
아직 화면은 없지만 이하와 같은 상태가 된다.


##### 5번 유저

```
follower 1   following 1
```

##### 6번 유저
```
follower 1   following 0
```

##### 8번 유저
```
follower 0   following 2
```

##### 9번 유저
```
follower 1   following 0
```





### 관계만들기 


서두에 설명한대로 Relationship모델은 팔로우 한사람(follower_id)과  팔로우 된사람(following_id)의 정보가 있다.
누가 팔로우했고 누가 팔로잉 당했는가의 관계에 대한 설명을 쉽게 할 수 있게
팔로우 한사람에  대한 정보를 얻는것을 능동적 관계  (Active Relationship)라고 하고 
팔로우 당한사람(된사람)에 대한 정보를 얻는것을 수동적 관계  (Passive Relationship)라고 부르도록 하자.


예)

```
내가 아이유를 팔로우한것은(나 -> 아이유) 능동적 관계이고 
아이유 입장에서 나에게 팔로우 당한것이므로(아이유 -> 나) 수동적 관계이다.
```

```
G드레곤이 아이유를 팔로우한것은(G드레곤 -> 아이유) 능동적 관계이고 
아이유입장에서 G드레곤에게 팔로우 당한것이므로(아이유 -> G드레곤) 수동적 관계이다.
```




#### 능동적 관계에 대한 모델 

Relationship에 능동적 관계 시점으로 접근할 수 있는 설정을 추가해보자. 이하 설정을 User모델에 추가해준다.

{% highlight ruby %}
#app/models/user.rb
has_many :active_relationships, foreign_key: "follower_id", class_name: "Relationship", dependent: :destroy
{% endhighlight %}



#### 동작확인

위 설정으로 능동적 관계 시점으로 Relationship에 접근이 가능해졌다.
Rails console에서 동작확인을 해보자


{% highlight ruby %}
user = User.find_by(id:5)
user.active_relationships
{% endhighlight %}


5번유저의 능동적 관계시점으로  Relationship에 접근한다.


##### result

{% highlight ruby %}
  Relationship Load (9.9ms)  SELECT  `relationships`.* FROM `relationships` WHERE `relationships`.`following_id` = 6 LIMIT 11
=> #<ActiveRecord::Associations::CollectionProxy [#<Relationship id: 2, follower_id: 5, following_id: 6, created_at: "2018-05-09 02:23:06", updated_at: "2018-05-09 02:23:06">]>
{% endhighlight %}

위와같이 팔로우 한사람(follower_id) 5번의 정보가 나왔다. following_id가6번이므로 5번은 6번은 팔로우 했다는걸 알 수 있다.




#### 동작확인2

user = User.find_by(id:8)
user.active_relationships
=> #<ActiveRecord::Associations::CollectionProxy 
[#<Relationship id: 4, follower_id: 8, following_id: 5, created_at: "2018-05-09 02:52:38", updated_at: "2018-05-09 02:52:38">, 
#<Relationship id: 3, follower_id: 8, following_id: 9, created_at: "2018-05-09 02:43:20", updated_at: "2018-05-09 02:43:20">]>

8번 유저의 능동적 관계시점은 어떨까.

2행이 있는걸 알 수 있다.
각각 5번과 9번유저를 팔로우 하고 있다는걸 알 수 있다.




#### 수동적 관계에 대한 모델 

이번엔 반대로 팔로우 된사람을 기준으로 Relationship에 접근하는 수동적 관계시점이다.

이하 설정을  똑같이 User모델에 추가해준다.

{% highlight ruby %}
#app/models/user.rb
has_many :passive_relationships, class_name:  "Relationship", foreign_key: "following_id", dependent:   :destroy
{% endhighlight %}



#### 동작확인1

{% highlight ruby %}
user = User.find_by(id:6)
user.passive_relationships
{% endhighlight %}

6번 유저의 수동적 관계시점에서의 결과를 확인해보자.
누구에게 팔로우 되었을까.

##### result

{% highlight ruby %}
  Relationship Load (9.9ms)  SELECT  `relationships`.* FROM `relationships` WHERE `relationships`.`following_id` = 6 LIMIT 11
=> #<ActiveRecord::Associations::CollectionProxy [#<Relationship id: 2, follower_id: 5, following_id: 6, created_at: "2018-05-09 02:23:06", updated_at: "2018-05-09 02:23:06">]>
{% endhighlight %}

6번유저는 follower_id:5번인 유저에게 팔로우 됬다는걸 알 수 있다.







### 특정 유저가 누구를 팔로우 했는지 확인하는 로직 추가  

여기까지 유저가 능동적,수동적 관계시점으로  Relationship에 접근하는 설정을 추가했다.
passive_relationships은 following_id를 기준으로 active_relationships은 follower_id 기준으로
where문을 실행하므로 위에서 본 결과가 나오는것이다.


지금부터는 JOIN문을 실행해서 실제 능동적,수동적 관계시점에서 본 User정보를 표시하는 설정을 추가해보자.


### 능동적 관계 JOIN

Relationship과User모델에 각각 이하의 설정을 추가해준다.


{% highlight ruby %}
#app/models/relationship.rb
belongs_to :following, class_name: "User", foreign_key: :following_id, primary_key: :id
validates :following_id, presence: true
{% endhighlight %}


{% highlight ruby %}
#app/models/user.rb
has_many :active_relationships, foreign_key: "follower_id", class_name: "Relationship", dependent: :destroy
has_many :followings, through: :active_relationships, source: :following  #<<< 추가 해주는 부분
{% endhighlight %}


[rails5.1에서 N:N 관계형 모델 만들기]에서 공부한 설정과 비교해보면 능동적 관계시점으로 중간테이블에 접근하는 active_relationships
설정을 경유하는것을 알 수 있다.

#### 동작확인 

8번유저가 팔로우 하고 있는 유저의 정보 확인해보자.

{% highlight ruby %}
rails c
user = User.find_by(id:8)
user.followings
  User Load (0.7ms)  SELECT  `users`.* FROM `users` INNER JOIN `relationships` ON `users`.`id` = `relationships`.`following_id` WHERE `relationships`.`follower_id` = 8 LIMIT 11
=> #<ActiveRecord::Associations::CollectionProxy [
#<User id: 5, email: "kaka2@naver.com", created_at: "2018-04-28 15:26:27", updated_at: "2018-05-07 05:46:30", nickname: "kaka2", avatar_file_name: "2pWUcQg.png", avatar_content_type: "image/png", avatar_file_size: 2297463, avatar_updated_at: "2018-05-03 00:19:39">,
#<User id: 9, email: "kaka7@naver.com", created_at: "2018-04-28 15:39:17", updated_at: "2018-04-28 15:39:17", nickname: "kaka7", avatar_file_name: nil, avatar_content_type: nil, avatar_file_size: nil, avatar_updated_at: nil>
]>
{% endhighlight %}


8번 유저가 팔로우 한사람인 5,9번 유저의 정보가 표시되는걸 알 수 있다.

### 수동적 관계 JOIN 

수동적관계 시점에서도 똑같이 JOIN을 이용해 유저정보를 취득하는 방법이다.

{% highlight ruby %}
#app/models/relationship.rb
belongs_to :follower, class_name: "User"
validates :follower_id, presence: true
{% endhighlight %}


{% highlight ruby %}
#app/models/user.rb
has_many :passive_relationships, foreign_key: "following_id", class_name: "Relationship", dependent: :destroy
has_many :followers, through: :passive_relationships, source: :follower #<< 추가 해주는부분 
{% endhighlight %}




#### 동작확인 

8번 유저가 어떤 유저에게 팔로우 되어있는 확인해보자.


{% highlight ruby %}
rails c
user = User.find_by(id:8)
user.followers
 User Load (0.8ms)  SELECT  `users`.* FROM `users` INNER JOIN `relationships` ON `users`.`id` = `relationships`.`follower_id` WHERE `relationships`.`following_id` = 8 LIMIT 11
=> #<ActiveRecord::Associations::CollectionProxy [#<User id: 5, email: "kaka2@naver.com", created_at: "2018-04-28 15:26:27", updated_at: "2018-05-07 05:46:30", nickname: "kaka2", avatar_file_name: "2pWUcQg.png", avatar_content_type: "image/png", avatar_file_size: 2297463, avatar_updated_at: "2018-05-03 00:19:39">>

{% endhighlight %}

8번 유저는 5번유저에게 팔로우 되어 있는것을 알 수 있다.


여기까지 설정이 끝나면 팔로우의 핵심설정은 끝났다.
다음은 실제 화면을 만들기 위한 설정을 추가해보자.


### 화면 설계

화면설계에서 필요한 요건들은 이하와 같다.

1. 각 유저의 팔로워/팔로잉 정보를 알 수 있는 프로필 페이지가 존재한다.
2. 팔로워/팔로잉한 유저의 일람을 확인 가능한 페이지가 존재한다.
3. 프로필 페이지에는 유저를 팔로우하는 버튼이 있다.
4. 팔로우한 상태일경우 언팔로우 버튼이 보이게 한다.
5. 자신을 팔로우 하지 않도록 자신의 프로필 페이지에는 팔로우/언팔로우 버튼을 보이지 않게한다.



### 루트설정

루트 설정은 이하와 같다.

{% highlight ruby %}
scope module: :front do
  scope module: :users do
    resources :relationships,       only: [:create, :destroy] #팔로우/언팔로우시 처리로직 (화면설계 5에 해당)
  end
   resources :users, constraints: { nickname: /[^\/]+/ }, only: [] do
      scope module: :users do
        resources :top,       only: [:index], as: "top", path: "" # 프로필 페이지TOP(화면설계 1,3,4에해당)
        resources :followers,  only: [:index] # Follower일람 페이지(화면설계 2에해당)
        resources :followings, only: [:index] # Following일람 페이지(화면설계 2에해당)
      end
    end
end

{% endhighlight %}

##### rake routes결과

{% highlight ruby %}
          relationships POST   /relationships(.:format)                  front/users/relationships#create
          relationship DELETE /relationships/:id(.:format)              front/users/relationships#destroy
          user_top_index GET    /users/:user_id(.:format)                 front/users/top#index
          user_followers GET    /users/:user_id/followers(.:format)       front/users/followers#index
          user_followings GET    /users/:user_id/followings(.:format)      front/users/followings#index
{% endhighlight %}

http://xxx.com/users/user_id
에 억세스하면 각 유저의 프로필 페이지가 표시되게 된다.


### User모델에 메소드 추가

화면을 완성하기 위해 User모델에 추가 설정이 필요하다.
이하와 같은설정을 추가해주자.

{% highlight ruby %}
#app/models/user.rb

 #해당유저가 other_user를 팔로우 하고 있는지 true/false(화면설계 4에서 설명한 팔로우한 상태일경우 언팔로우 버튼을 보여주기 위해)
 def following?(other_user)
   active_relationships.find_by(following_id: other_user.id)
 end

 #특정유저가 other_user를 팔로우(팔로우 버튼을 클릭시 Relationship에 해당 정보를 insert하는 로직)
 def follow!(other_user)
   active_relationships.create!(following_id: other_user.id)
 end

 #특정유저가 other_user를 언팔로우(언팔로우 버튼을 클릭시 Relationship에 해당 정보를 delete하는 로직)
 def unfollow!(other_user)
   active_relationships.find_by(following_id: other_user.id).destroy
 end
{% endhighlight %}


#### 여기까지의 설정 정리

여기까지의 설정을 바탕으로
팔로우,언팔로우 기능과 팔로잉 중인지를 판별하기 위한 순서는 이하와 같다.


##### 팔로우/언팔로우 기능

```
relationships_controller(create,destroy) -> 
```

```
create -> follow! -> active_relationships.create!(following_id: other_user.id) #팔로우 기능 
destroy -> unfollow! -> active_relationships.find_by(following_id: other_user.id).destroy #언팔로우 기능
```

##### 팔로잉중인지 판별

```
following? -> active_relationships.find_by(following_id: other_user.id)
```

다음은 뷰페이지에 대한 설명이다.

### 프로필 페이지

유저간의 프로필 페이지에 html설정은 이하와 같다.

{% highlight ruby %}
#app/views/front/users/top/index.html.erb
<div class="main user-show">
  <div class="container">
    <div class="user">
      <%= image_tag @user.avatar(:thumb) %>
      <h2><%= @user.nickname %></h2>
      <p><%= @user.email %></p>
      <p><%= render 'follow_form' %></p>
      <p><%= render 'stats' %></p>
    </div>
  </div>
</div>
{% endhighlight %}


각 render의 역할은 이하와 같다.

```
follow_form -> 팔로우 /언팔로우 버튼을 표시
```

```
stats -> 
-> 해당유저의 팔로우/팔로워 카운트수를 표시
-> 해당 버튼을 클릭시 팔로우/팔로워한 유저의 일람을 표시하는 링크
```

#### _stats.html.erb

팔로잉/팔로워 카운트수 표시와 팔로잉/팔로워한 유저 일람을 표시하는 링크

{% highlight ruby %}
#app/views/front/users/top/_stats.html.erb
<% @user ||= current_user %>
<div class="stats">
  <a href="<%= user_followings_path %>">
    <strong id="following" class="stat">
     <%= @user.followings.count %>
    </strong>
    following
  </a>
  <a href="<%= user_followers_path %>">
    <strong id="followers" class="stat">
       <%= @user.followers.count %>
    </strong>
    followers
  </a>
</div>
{% endhighlight %}


#### _follow_form.html.erb

해당 유저를 팔로우/언팔로우하는 버튼을 표시하고 있다.
현재 로그인한 유저가 팔로잉한 유저인지 판별해서 true일 경우,
언팔로우 버튼을 false일경우 팔로우 버튼을 표시한다.


{% highlight ruby %}
#app/views/front/users/top/_follow_form.html.erb
<% unless current_user == @user %>
  <div id="follow_form">
  <% if current_user.following?(@user) %>
    <%= render 'unfollow' %>
  <% else %>
    <%= render 'follow' %>
  <% end %>
  </div>
<% end %>
{% endhighlight %}

_follow_form에서 다시 2개의 파일을 render하고 있다.
각 render의 의미는 이하와 같다.

```
unfollow -> 언팔로우 버튼,클릭시 Relationship에 delete가 실행됨  
follow ->  팔로우 버튼,클릭시 Relationship에 insert가 실행됨 
```

#### _follow.html.erb

{% highlight ruby %}
#app/views/front/users/top/_follow.html.erb
 <%= form_for(current_user.active_relationships.build(following_id: @user.id)) do |f| %>
  <div><%= f.hidden_field :following_id %></div>
  <%= f.submit "Follow", class: "btn btn-large btn-primary follow-btn" %>
<% end %>
{% endhighlight %}

#### _unfollow.html.erb

{% highlight ruby %}
#app/views/front/users/top/_unfollow.html.erb
<%= form_for(current_user.active_relationships.find_by(following_id: @user.id), html: { method: :delete }) do |f| %>
  <%= f.submit "Unfollow", class: "btn btn-large follow-btn" %>
<% end %>
{% endhighlight %}



#### relationships_controller.rb

{% highlight ruby %}
#app/controllers/front/users/relationships_controller.rb
class RelationshipsController < ApplicationController

   def create
    @user = User.find(params[:relationship][:following_id])
    current_user.follow!(@user)
    redirect_to @user
  end

  def destroy
    @user = Relationship.find(params[:id]).following
    current_user.unfollow!(@user)
    redirect_to @user
  end
end
{% endhighlight %}



_follow.html.erb,_unfollow.html.erb에서 relationships_controller.rb의 create,destroy를 실행하는 부분이 이해하기 어려운데

active_relationships의model설정에 ```class_name: "Relationship"```에 의해서 relationship컨트롤러를 실행하는것이 아닌가 생각해 본다.





### 팔로워/팔로잉한 유저 리스트 페이지 만들기

마지막으로 _stats.html.erb에서 각 유저의 팔로워/팔로잉 링크를 클릭하면 팔로워/팔로잉한 유저의 정보를 표시해보자.
이하의 설정을 추가하기만 하면된다.

##### 팔로워 일람 컨트롤러

{% highlight ruby %}
#app/controllers/front/users/followers_controller.rb
class Front::Users::FollowersController < ApplicationController
  def index
    #@user  = User.find(params[:id])
    @user  = User.find_by(nickname: params[:user_id])
    @users = @user.followers
  end
end
{% endhighlight %}

##### 팔로잉 일람 컨트롤러

{% highlight ruby %}
#app/controllers/front/users/followings_controller.rb
class Front::Users::FollowingsController < ApplicationController
  def index
      @user  = User.find_by(nickname: params[:user_id])
      @users = @user.followings
  end
end
{% endhighlight %}

##### 팔로워 일람 뷰

{% highlight ruby %}
#app/views/front/users/followers/index.html.erb
<div class="main users-index">
  <div class="container">
    <h1 class="users-heading">followers일람</h1>
    <% @users.each do |user| %>
      <div class="users-index-item">
        <div class="user-left">
          <%= user.id %>
          <img src="<%= user.avatar(:thumb) %>">
        </div>
        <div class="user-right">
          <%= link_to(user.nickname, "/users/#{user.nickname}") %>
        </div>
      </div>
    <% end %>
  </div>
</div>
{% endhighlight %}

##### 팔로잉 일람 뷰

{% highlight ruby %}
#app/views/front/users/followings/index.html.erb
<div class="main users-index">
  <div class="container">
    <h1 class="users-heading">followings일람</h1>
    <% @users.each do |user| %>
      <div class="users-index-item">
        <div class="user-left">
          <%= user.id %>
          <img src="<%= user.avatar(:thumb) %>">
        </div>
        <div class="user-right">
          <%= link_to(user.nickname, "/users/#{user.nickname}") %>
        </div>
      </div>
    <% end %>
  </div>
</div>
{% endhighlight %}

http://xxx.com/users/:user_id/followers
http://xxx.com/users/:user_id/followings

와 같은 페이지에 억세스하면 해당 유저가 팔로우 한/된 유저정보를 확인할 수 있다.
  
  
  
  




### 그외 


#### 복수의 행이 존재할때 belongs_to에 정의한 메소드를 사용할 수 없음.

{% highlight ruby %}
class Relationship < ApplicationRecord
  belongs_to :following, class_name: "User"
  validates :following_id, presence: true
end
{% endhighlight %}

상태에서 이하 커맨드를 실행시 에러가 났다.

{% highlight ruby %}
rs = Relationship.where(follower_id: 8)
rs.following
NoMethodError:   Relationship Load (1.1ms)  SELECT  `relationships`.* FROM `relationships` WHERE `relationships`.`follower_id` = 8 LIMIT 11
undefined method `following' for #<Relationship::ActiveRecord_Relation:0x007f0d28d127e8>
        from (irb):80
{% endhighlight %}

##### 원인

8번유저는 두명을 팔로우했기에 복수의 행이 존재한다.
그리고 Relationship모델에서는 belongs_to로 설정되어 있기때문에 한행만을 특정해서 사용해야한다.

고로 where을 사용할 경우 복수행이 존재하면 그대로 가져오므로 first등으로 한행을 제한하든지

{% highlight ruby %}
rs = Relationship.where(follower_id: 8).first
{% endhighlight %}
또는 find_by를 사용해야한다.

{% highlight ruby %}
rs = Relationship.find_by(follower_id: 8)
{% endhighlight %}

다시 
{% highlight ruby %}
rs.following
{% endhighlight %}

해주면 유저 정보가 표시되는걸 알 수 있다.


#### has_many옵션에 대해서

{% highlight ruby %}
has_many :active_relationships, foreign_key: "follower_id", class_name: "Relationship", dependent: :destroy
{% endhighlight %}
 
class_name에 해당하는 테이블에 forien_key에 지정한 컬럼을  이용해 where를 실행한다.


#### 이너 조인을 위해서는 조인할 모델에 belongs_to설정이 있어야한다.


{% highlight ruby %}
#app/models/relationship.rb
belongs_to :following, class_name: "User"
{% endhighlight %}

위 설정을 지우고

{% highlight ruby %}
user.followings
{% endhighlight %}

해보면 이하의 에러가 발생한다

{% highlight ruby %}
irb(main):002:0> user.followings
ActiveRecord::HasManyThroughSourceAssociationNotFoundError: Could not find the source association(s) "following" or :followings in model Relationship. Try 'has_many :followings, :through => :following_relationships_xx, :source => <name>'. Is it one of ?
        from (irb):2
{% endhighlight %}

Relationship모델에 following혹은followings가 존재하지 않는다는 얘기

고로 이너조인을 사용하려면 조인할 모델에 belongs_to설정이 있어야된다는계 규칙같다.

{% highlight ruby %}
belongs_to :followings, class_name: "User"
{% endhighlight %}
위와같이 일부로 복수형을 넣고```user.followings```을 실행하면 다른 에러가 나온다.

{% highlight ruby %}
  User Load (3.7ms)  SELECT  `users`.* FROM `users` INNER JOIN `relationships` ON `users`.`id` = `relationships`.`followings_id` WHERE `relationships`.`follower_id` = 8 LIMIT 11
ActiveRecord::StatementInvalid: Mysql2::Error: Unknown column 'relationships.followings_id' in 'on clause': SELECT  `users`.* FROM `users` INNER JOIN `relationships` ON `users`.`id` = `relationships`.`followings_id` WHERE `relationships`.`follower_id` = 8 LIMIT 11
{% endhighlight %}

followings_id아이디가 없다고 나온다.


이 결과를 보면 알 수 있듯이 belongs_to의 첫번째 옵션은 실제컬럼명에  의존한다는것을 알 수 있다.
belongs_to의 첫번째 옵션명 + _id를 relationship테이블에서 찾는다.

#### has_many,belongs_to의 첫번째 옵션명은 자유롭게 변경가능하다.

{% highlight ruby %}
#app/models/user.rb
has_many :active_relationships_xx, foreign_key: "follower_id", class_name: "Relationship", dependent: :destroy
{% endhighlight %}

위와 같이
active_relationships
부분을 
active_relationships_xx
로 변경해도 동작상 문제가 없다.


{% highlight ruby %}
#app/models/relationship.rb
#belongs_to :following, class_name: "User"
belongs_to :following22, class_name: "User", foreign_key: :following_id, primary_key: :id
validates :following_id, presence: true
{% endhighlight %}


{% highlight ruby %}
#app/models/user.rb
has_many :active_relationships, foreign_key: "follower_id", class_name: "Relationship", dependent: :destroy
has_many :followings33, through: :active_relationships, source: :following22
{% endhighlight %}

이렇게 써도 문제가 없었다.

#### belongs_to의 옵션에 대해서

belongs_to에 있는 foreign_key와class_name옵션은 실제 SQL에서 어떻게 사용될까?

{% highlight ruby %}
#app/models/relationship.rb
belongs_to :following, class_name: "User", foreign_key: :following_test_id, primary_key: :test_kaka_id
{% endhighlight %}

위처럼 멋대로 foreign_key와 primary_key설정을 바꾼후 SQL쿼리를 확인해봤다.

{% highlight ruby %}
ActionView::Template::Error (Mysql2::Error: Unknown column 'users.test_kaka_id' in 'on clause': 
SELECT COUNT(*) FROM `users` 
INNER JOIN `relationships` 
ON `users`.`test_kaka_id` = `relationships`.`following_test_id` 
WHERE `relationships`.`follower_id` = 4):
{% endhighlight %}

조인시 class_name.primary_key를 user.id로 사용하고 foreign_key는 join할 중간테이블 Relationship의 컬럼명으로 사용하는걸 알 수 있다.



여기까지 Rails에서 팔로우 기능을 만드는 방법에 대해서 알아봤다.



[참고1]: https://qiita.com/kitaokeita/items/59b625e0c43a62f5fe6a
[참고2]: http://flearning-blog.tistory.com/m/62
[참고3]: https://teratail.com/questions/73195
[참고4]: http://hydro-pump.hatenablog.com/entry/rails-follow-function
[참고5]: https://railstutorial.jp/chapters/following_users?version=4.2#cha-following_users
[참고6]: https://railstutorial.jp/chapters/following_users?version=4.2#cha-following_users
[Rails devise인스톨 방법]: https://negabaro.github.io/rails/2018/04/27/devise-install.html
[rails로 퀴즈어플 만들어보기(CRUD편)]: https://negabaro.github.io/rails/2018/04/13/quiz-crud.html
[rails5.1에서 N:N 관계형 모델 만들기]: https://negabaro.github.io/rails/2018/03/15/rails-relation-N-N.html