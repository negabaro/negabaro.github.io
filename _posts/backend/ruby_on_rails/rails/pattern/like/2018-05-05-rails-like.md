---
layout: post
title:  "Rails 좋아요 기능 만들기"
author: negabaro kim
categories: rails
tags:	rails handson
cover:  "/assets/twice3.jpg"
---

이 포스트에서는 Rails에서 좋아요 기능을 만드는법을 정리해봤다.
[rails로 퀴즈어플 만들어보기(CRUD편)]에서 만든 WritingQuiz 모델과 [Rails devise인스톨 방법] 에서 만든 User모델을 
사전에 만들 필요가 있다.



### 좋아요(Like)모델 만들기

User모델의ID와WritingQuiz모델의ID값을 보관할
user_id와wq_id컬럼을 추가해서 Like모델을 만들어보자


{% highlight ruby %}
 rails generate model Like user_id:integer wq_id:integer
{% endhighlight %}

### 모델에 유효성 검사 설정추가 

{% highlight ruby %}
class Like < ApplicationRecord
  validates :user_id, {presence: true}
  validates :wq_id, {presence: true}
end
{% endhighlight %}

user_id와wq_id는 User,WritingQuiz모델과 이어질 중요한 정보이므로 어느하나 null이 되어서는 관계가 성립되지 않는다.
그러므로 validates설정으로 null일 경우가 없도록 명시해준다.

### 뷰 설정

위 설정이 끝나면 로그인한 유저가 해당 post(WritingQuiz)에 좋아요를 눌렀는지 안눌렀는지를
Like테이블에 데이터가 있느냐 없느냐로 판단 가능하다.
이하 설정은 기본적인 설정예이다.

{% highlight ruby %}
#app/views/writing_quizzes/show.html.erb
<% if Like.find_by(user_id: current_user.id, wq_id: @wq.id )%>
  좋아요를 눌렀습니다.
<% else %>
  좋아요를 누르지 않았습니다.
<% end %>
{% endhighlight %}

※여기서는 개념을 쉽게 잡기위해 뷰에서 바로 ```find_by```를 사용하고 있으나
뷰에  DB참조 로직이 있으면 멘테넌스하기 불편하므로 실제로는 helper나controller에서 선언하도록 하자.




### controller설정

Like모델의 컨트롤러 설정파일을 생성한다.

{% highlight ruby %}
rails g controller likes
{% endhighlight %}

Like컨트롤러에서는 좋아요를 눌렀을때 불리는 create와 좋아요 취소를 눌렀을때 불려지는 destroy메소드를 
이하와 같이 선언해준다.


{% highlight ruby %}
#app/controllers/likes_controller.rb
class LikesController < ApplicationController
    
  before_action :authenticate_user

  def create
    @like = Like.new(user_id: current_user.id, wq_id: params[:wq_id])
    @like.save
    redirect_to("/writing_quizzes/#{params[:wq_id]}")
  end
  
  def destroy
    @like = Like.find_by(user_id: current_wq.id, wq_id: params[:wq_id])
    @like.destroy
    redirect_to("/writing_quizzes/#{params[:wq_id]}")
  end
  
end
{% endhighlight %}


### 루트설정

{% highlight ruby %}
post "likes/:wq_id/create" => "likes#create"
post "likes/:wq_id/destroy" => "likes#destroy"
{% endhighlight %}


### 뷰설정2

다음은 실제 좋아요와 좋아요 취소 버튼을 만들어보자.

{% highlight ruby %}
#app/views/writing_quizzes/show.html.erb
<% if Like.find_by(user_id: current_user.id, wq_id: @wquiz.id) %>
  <%= link_to("좋아요 취소","/likes/#{@wquiz.id}/destroy",{method: "post"}) %>
<% else %>
  <%= link_to("좋아요！", "/likes/#{@wquiz.id}/create", {method: "post"}) %>
<% end %>
{% endhighlight %}

위 설정으로 좋아요,좋아요 취소 버튼이 생겼다.

![progate-login](https://user-images.githubusercontent.com/4640346/39747060-2bf26f94-52e7-11e8-8ad2-f78c794aad35.gif)




### 좋아요,좋아요 취소 버튼 꾸미기

Font-awesome을 이용해서 간단하게 좋아요 버튼을 꾸며보자.


#### application.html.erb 수정
외부 css를 불러오기 위해 이하 설정을 추가해주자.

{% highlight ruby %}
#app/views/layouts/application.html.erb
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
{% endhighlight %}



이하 css파일도 추가

{% highlight css %}
#app/assets/stylesheets/like.css

.like-btn {
  color: #8899a6;
}

.like-btn-unlike {
  color: #ff2581;
}
{% endhighlight %}


### 뷰설정3 

이하와 같이 텍스트 대신에 span태그를 넣어준다.

{% highlight ruby %}
      <% if Like.find_by(user_id: current_user.id, wq_id: @wquiz.id) %>
        <%= link_to("/likes/#{@wquiz.id}/destroy", {method: "post"}) do %>
        <span class="fa fa-heart like-btn-unlike"></span>
        <% end %>
          
      <% else %>
        <%= link_to("/likes/#{@wquiz.id}/create", {method: "post"}) do %>
          <span class="fa fa-heart like-btn"></span>
        <% end %>
        
      <% end %>
{% endhighlight %}


화면은 이하와 같이 바뀌었다.

![progate-login3](https://user-images.githubusercontent.com/4640346/39747614-bae9322c-52e8-11e8-9808-19571bd15804.gif)

### 좋아요 숫자 표시하기 

좋아요 버튼 옆에 좋아요를 누른 숫자를 표시해보자.
컨트롤러에 이하 설정을 추가해준다.

{% highlight ruby %}
#app/controllers/likes_controller.rb
  def show
     @likes_count = Like.where(post_id: @wquiz.id).count
  end
{% endhighlight %}


#### view
좋아요 버튼 바로 밑에 이하설정을 추가

{% highlight ruby %}
#app/views/writing_quizzes/show.html.erb
<%= @likes_count %>
{% endhighlight %}

화면을 확인하면 이하와 같이 표시된다.

![progate-login2](https://user-images.githubusercontent.com/4640346/39747068-32118784-52e7-11e8-9936-4807ec65a66d.gif)


### 그 외


이 포스트에서는 [rails5.1에서 1:1 관계형 모델 만들기],[rails5.1에서 1:N 관계형 모델 만들기]에서 배운 관계에 대한 정의를 하지 않았다.
user모델에 이하와 같이 ```has_may: likes```를 추가하면 user오브젝트에서 likes모델에 접근이 가능하다.


#### 모델 설정

{% highlight ruby %}
#app/models/user.rb
class User < ApplicationRecord
  has_many :likes, dependent: :destroy
end
{% endhighlight %}


#### 컨트롤러 설정

{% highlight ruby %}
#app/controllers/likes_controller.rb
class LikesController < ApplicationController

  def create
    @like = current_user.likes.create(wq_id: params[:wq_id])
    @like.save
    redirect_to("/writing_quizzes/#{params[:wq_id]}")
  end
  
  def destroy
    @like = current_user.likes.find_by(closet_id: params[:closet_id])
    @like.destroy
    redirect_to("/writing_quizzes/#{params[:wq_id]}")
     
  end
end
{% endhighlight %}


```current_user.likes```로 접근이 가능한걸 알 수 있다.


### 비동기 처리/Ajax처리

이 포스트에서는 기초적인 설명을 위해 Ajax기능을 사용하지 않고 좋아요 기능을 구현했다.
그래서 좋아요 버튼을 누르면 페이지가 새로고침 되는걸 알 수 있다.
실제 서비스에서는 Ajax통신을 이용해서 좋아요 버튼을 눌러도 페이지가 갱신되지 않게끔한다.

또한 순차적 처리를 하면 Like테이블에 데드록이 발생할 가능성이 있어
sidekiq과memcached,redis를 이용해 비동기 처리를 한다.

이 부분은 다른 포스트에서 정리해볼 예정이다.


여기까지 Rails에서 좋아요 기능을 만드는 법을 알아보았다.

P.S 조금 포동한 사람들이 사는 동네는? -> 정답: 반포동 이다..

[참고1]: https://qiita.com/taca10/items/36a863a1b4754e1136b9
[참고2]:https://qiita.com/mohira/items/9ae35773e6209adbf0a0
[참고3]:https://qiita.com/mohira/items/148c0f6ef89e8f62df72
[참고4]:https://qiita.com/YuitoSato/items/94913d6a349a530b2ea2
[rails로 퀴즈어플 만들어보기(CRUD편)]: https://negabaro.github.io/rails/2018/04/13/quiz-crud.html
[Rails devise인스톨 방법]: https://negabaro.github.io/rails/2018/04/27/devise-install.html
[rails5.1에서 1:N 관계형 모델 만들기]: https://negabaro.github.io/rails/2018/03/15/rails-relation-1-N.html
[rails5.1에서 1:1 관계형 모델 만들기]: https://negabaro.github.io/rails/2018/03/15/rails-relation-1-1.html