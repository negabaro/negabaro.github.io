---
layout: post
title:  "rails5.1에서 polymorphic관계형 모델 만들기"
author: negabaro kim
categories: rails
tags:	rails handson
cover:  "/assets/twice2.jpg"
#cover "http://images6.fanpop.com/image/photos/40100000/-TWICE-twice-jyp-ent-40176377-1920-1080.jpg"
---

### polymorphic이란

![image](https://user-images.githubusercontent.com/4640346/37501798-35346560-2913-11e8-9d16-a266a3f12c4c.png)


Article와 Event 모델에 각각 커맨트기능을 추가한다고 가정해봅시다.
각각에 기사용 커맨트 테이블과 이벤트용 커맨트 테이블을 만들게 되면 똑같은 처리를 두번 정의해야 되므로 Rails 의 DRY정신에 위배됩니다.

그래서 커맨트 테이블을 하나만 만들고 Article과Event모델에서 공동 사용하는형식을 띄게 만드는것이  폴리모픽 관계입니다.

실제로 만들어봅시다.


### 프로젝트 작성 

{% highlight ruby %}
rails new rails-relation-polymorphic
cd rails-relation-polymorphic
{% endhighlight %}


### 모델&테이블 작성

Event모델/테이블 작성

{% highlight ruby %}
rails g model event name:string content:text
{% endhighlight %}

Article모델/테이블 작성

{% highlight ruby %}
rails g model article title:string body:text
{% endhighlight %}


마지막으로 Comment모델/테이블 작성

※필수적으로 참조할 외부키와 모델명의 정보를 넣어줄 `xxx_id`와`xxx_type`컬럼이 필요합니다.


{% highlight ruby %}
rails g model comment content:text commentable_id:integer commentable_type:string
{% endhighlight %}


인덱스설정도 추가해줍니다.

{% highlight ruby %}
# db/migrate/yyyymmddhhMMss_create_comments.rb
class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :content
      t.integer :commentable_id
      t.string :commentable_type

      t.timestamps
    end

    add_index :comments, [:commentable_id, :commentable_type]  ##<<이 부분을 추가
  end
end
{% endhighlight %}


### 모델에 has_many와belongs_to추가


`belogns_to`과`polymorphic`옵션을 사용해서 기술합니다.
디폴트로 `belongs_to`에 지정한 `xx` 가 `xx_id` `xx_type`의 `xx`가됩니다.(`class_name`이나`foreign_key`옵션으로 변경도 가능)

`xx`에 `commentable`을 넣으면 해당 모델의 컬럼에 `commentable_id`와`commentable_type`가 없으면 에러가 나게됩니다.



{% highlight ruby %}
# app/models/comment.rb
class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true  ##<<<위에서 설명한것이 이부분!!
end
{% endhighlight %}


Event,Article모델에는 has_many와as옵션을 이용해줍니다.
comment모델에서 `belongs_to :commentable`이라고 선언해줬으므로 `as: :xxx`의`xxx`에`commentable`를 넣어줍니다.

{% highlight ruby %}
# app/models/event.rb
class Event < ActiveRecord::Base
  has_many :comments, as: :commentable
end
{% endhighlight %}

{% highlight ruby %}
# app/models/article.rb
class Article < ActiveRecord::Base
  has_many :comments, as: :commentable
end
{% endhighlight %}



### 사용가능해진 커맨드 일람

폴리모픽 관계 설정을 해주면 Comment테이블이 작성될떄 자동적으로 `commentable_id`와`commentable_type`에 해당 모델정보가 들어가는게 보입니다.

{% highlight ruby %}

event = Event.create name: "event1"
event_comment = event.comments.create content: "This event is awesome!"
event_comment
# => <Comment id: 1, content: "This event is awesome!", commentable_id: 1, commentable_type: "Event", created_at: ...>

article = Article.create title: "article1"
article_comment = article.comments.create content: "This article is great!"
article_comment
# => <Comment id: 2, content: "This article is great!", commentable_id: 1, commentable_type: "Article", created_at: ...>
{% endhighlight %}

Article에서도Event에서도 같은 방식으로 comment모델에 접근하는것을 알 수 있습니다.



### 폴리모픽관계시 화면작성 

덤으로 폴리모픽 관계설정시 Comments컨트롤러의 작성방법을 소개합니다.
이하와같은 루트 설정일 경우 커맨트 컨트롤에서 동적으로 Article클래스인지 Event클래스인지 판단할 필요가 있습니다.

{% highlight ruby %}
# config/routes.rb

resources :articles do
  resources :comments
end

resources :events do
  resources :comments
end
{% endhighlight %}


load_commentable메소드 안에서 리퀘스트의 URL에서 Article인지 Event인지 판별하고 폴리모픽 관계에 맞춰서 동적으로 모델을 읽어오는 형식입니다.

{% highlight ruby %}
# app/controllers/comments_controller.rb
class CommentsController < ApplicationController
  before_action :load_commentable

  def index
    @comments = @commentable.comments
  end

  def new
    @comments = @commentable.comments.new
  end

  def create
    @comment = @commentable.comments.new(comment_params)
    if @comment.save
      redirect_to @commentable, notice: "Completed!"
    else
      render :new
    end
  end

  private
    # URL로Event인지Article인지 확인
    # ex: /events/:id/comments
    # ex: /articles/:id/comments
    def load_commentable
      resource, id = request.path.split('/')[1, 2]
      @commentable = resource.singularize.classify.constantize.find(id)
    end

    # 다른방법
    # def load_commentable
    #   klass = [Event, Article].detect { |c| params["#{c.name.underscore}_id"] }
    #   @commentable = klass.find(params["#{klass.name.underscore}_id"])
    # end

    def comment_params
      params ...
    end
 {% endhighlight %}   


[reference]:  https://rubykr.github.io/rails_guides/association_basics.html#polymorphic
[reference2]:  http://ruby-rails.hatenadiary.com/entry/20141207/1417926599