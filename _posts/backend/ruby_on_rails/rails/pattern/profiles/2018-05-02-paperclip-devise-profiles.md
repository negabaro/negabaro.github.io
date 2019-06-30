---
layout: post
title:  "Rails devise,paperclip을 이용해서 프로필 이미지 업로드하기"
author: negabaro kim
categories: rails
tags:	rails devise
cover:  "/assets/twice.jpg"
---

[Rails devise인스톨 방법]에서 devise를 이용해 User모델을 만들어 봤다.
이 포스트에서는 devise로 만든 User모델에 paperclip을 이용해서 프로필 이미지를 업로드하는 방법을 정리해봤다.



### paperclip이란?

우선 간단히 paperclip에 대해서 소개하면
Rails에서 간단히 이미지를 업로드하고 여러 사이즈의 이미지를 가공해  이미지를 관리할 수 있는 Gem이다.

이미지를 가공하는건 뒷단에서 ImageMagick을 이용하고 있다. 그러므로 paperclip이 실행되는 환경에 ImageMagick을 인스톨해야 하는 번거러움이 있긴하다.
(이 부분은 docker를 이용해 개선 가능)



### paperclip을 인스톨해보자


#### ImageMagick인스톨 

mac일 경우

```
brew install imagemagick
```

로 간단히 인스톨 가능하다.
ImageMagick가 정상적으로 인스톨되면 convert라는 커맨드가 생기므로 확인해준다.

```
which convert
/usr/local/bin/convert

or
convert --version
```

#### paperclip인스톨 


Gemfile에 이하 설정을 추가하고 bundle install해준다.

{% highlight ruby %}
#Gemfile
gem "paperclip"
{% endhighlight %}


#### 기존의User모델에 프로필 이미지용 컬럼 추가

Users테이블에 avatar라는 컬럼을 추가했다.

{% highlight ruby %}
rails g paperclip users avatar
rake db:migrate
{% endhighlight %}

실제로는 이런식으로 컬럼이 추가된다.


```
    t.string "avatar_file_name"
    t.string "avatar_content_type"
    t.integer "avatar_file_size"
    t.datetime "avatar_updated_at"
```

컨트롤 단에서는 avatar라는 컬럼에 파일을 업로드 하기만 하면  paperclip에서 위의 컬럼의 내용을 전부 갱신해준다.


#### 모델 설정

마지막으로 기존의 user모델에 이하의 설정을 추가해줘야한다.

{% highlight ruby %}
#app/models/user.rb
has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/missing_profile_img.png"
validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
{% endhighlight %}

default_url부분은 기본적으로 사용되는 이미지파일을 설정해준다.
위의 설정대로라면```public/images/missing_profile_img.png```에 적당한 이미지파일을 업로드 해둘 필요가 있다.

여기까지 설정이 끝나면devise에서 ```current_user.avatar```와 같은 방법으로 접근할 수있게된다.



### 프로필 이미지 업로드하기

이어서 레일즈에서 프로필 이미지를 업로드하는 로직을 만들어보자.


#### config/routes.rb

{% highlight ruby %}
#config/routes.rb
scope module: :front do
    namespace :my do
      resource :profiles
    end
  end
{% endhighlight %}

#### rake routes결과

```
    edit_my_profiles GET    /my/profiles/edit(.:format)               front/my/profiles#edit
               my_profiles GET    /my/profiles(.:format)                    front/my/profiles#show
                           PATCH  /my/profiles(.:format)                    front/my/profiles#update
                           PUT    /my/profiles(.:format)                    front/my/profiles#update
```

#### View설정

{% highlight ruby %}
#app/views/front/my/profiles/edit.html.erb
<div class="main users-edit">
  <div class="container">
    <div class="form-heading">프로필 변경</div>
    <div class="form users-form">
      <div class="form-body">
        <% current_user.errors.full_messages.each do |message| %>
          <div class="form-error">
            <%= message %>
          </div>
        <% end %>
      
        <%= form_for current_user, url: my_profiles_path do |f| %>
          <p>유저명</p>
          <%= f.text_field :nickname, value: current_user.nickname %>
          <p>프로필 이미지</p>
          <%= image_tag current_user.avatar(:thumb) %>
          <%= f.file_field :avatar, lang: "ko" %>
          <p>메일어드레스</p>
          <%= f.text_field :email, value: current_user.email %>
          <%= f.submit "저장" %>
        <% end %>
      </div>
    </div>
  </div>
</div>
{% endhighlight %}


#### controller설정

{% highlight ruby %}
#app/controllers/front/my/profiles_controller.rb
class Front::My::ProfilesController < ApplicationController
    def edit
    end
    
    def update
      current_user.assign_attributes(user_params)
      if current_user.valid?
        current_user.save!
        flash[:success] = "saved!"
        redirect_to action: :edit
      else
        render :edit
      end
    end
    
  private
  def user_params
    params.require(:user).permit(:nickname,:avatar,:email)
  end
end
{% endhighlight %}


### 동작확인

http://localhost/my/profiles/edit
에 억세스해서 이미지를 업로드해봤다.



![image](https://user-images.githubusercontent.com/4640346/39555186-3fb8af9a-4eb2-11e8-8b60-2a3a70e66638.png)

정상적으로 업로드가 되면 

Rails Log에서 이하와 같이 update되었다고 표시된다.


```
 UPDATE `users` SET `avatar_file_name` = '2pWUcQg.png', `avatar_content_type` = 'image/png', `avatar_file_size` = 2297463, `avatar_updated_at` = '2018-05-03 00:19:39', `updated_at` = '2018-05-03 00:1 :40' WHERE `users`.`id` = 5
```


이하 캡쳐를 보면 ImageMagick에 의해서 크기별로 가공된 이미지가 업로드 되어있는것도 확인할 수 있다.

![image](https://user-images.githubusercontent.com/4640346/39555260-e3fd5254-4eb2-11e8-9faa-20215aa108f0.png)

paperclip에서 이미지 변경이 일어나면 이전 파일을 삭제해줘서 유저가 자신의 이미지를 몇번을 변경해도 dummy파일이 생기지 않는다.



여기까지 devise,paperclip을 이용한 프로필 이미지 업로드 방법에 대해서 알아봤다.

[참고1]: http://ruby-rails.hatenadiary.com/entry/20140716/1405443484
[Rails devise인스톨 방법]: https://negabaro.github.io/rails/2018/04/27/devise-install.html
