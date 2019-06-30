---
layout: post
title:  "Rails devise custom 설정"
author: negabaro kim
categories: rails
tags:	rails handson
cover:  "/assets/twice.jpg"
---


[Rails devise인스톨 방법]에서 Rails devise인스톨 방법을 알아봤다.
그런데 devise에서 디폴트로 제공하는 로그인/회원가입 기능은 css가 적용 안되어있어서 볼품이 없다.

이 포스트에서는 devise의 은혜(?)를 받을건 받고 볼품이 없는 화면을 커스텀하는 방법을 알아보자.



### 로그인&회원가입 커스텀 

devise에서 제공하는 커맨드로 ```rails g devise:views```를 이용하면 현재 레일즈 디렉토리에 devise의 디퐅트 설정등을 가져와서 
수정하기 용이하다.

하지만 이 포스트에서는 필요한 부분만 추가하기위해 직접 컨트롤러를 만들었다.

#### 회원가입(registers),로그인(sessions)컨트롤러 추가

{% highlight ruby %}
rails g controller front/members/sessions
rails g controller front/members/registers
{% endhighlight %}




#### Routes설정(config/routes.rb)

```devise_for :users```에서 ```skip```을 이용해 ```sessions```,```registrations```의 디폴트설정을  사용하지 않게 하고
```devise_scope```에서 커스텀할 path로 재정의 해준다.

이 포스트에서는 회원가입과 로그인관련된 부분만 재정의 해봤다.


{% highlight ruby %}

devise_for :users, skip: [:sessions, :registrations]
  
devise_scope :user do
  get 'login' => 'front/members/sessions#new', as: :new_user_session #로그인 화면
  post 'login' => 'front/members/sessions#create', as: :user_session #로그인(POST)
  delete '/users/sign_out' => 'front/members/sessions#destroy', as: :destroy_user_session #로그아웃
  get '/users/sign_up' => 'front/members/registers#new', as: :new_user_registration #회원가입
  post 'users' => 'front/members/registers#create', as: :user_registration #회원가입(POST)
end
{% endhighlight %}
  
  
#### 회원가입 컨트롤러(app/controllers/front/members/registers_controller.rb)

```Devise::RegistrationsController```를 상속해서 재정의 하지 않은 부분은 디폴트 설정을 그대로 따르게 한다.
create부분도 아무것도 정의안해도 상관없지만 명시적으로 부모의 설정을 따른다는 의미로 ```super```를 넣어줬다.
 
{% highlight ruby %}
#app/controllers/front/members/registers_controller.rb
class Front::Members::RegistersController < Devise::RegistrationsController
    
  def new
      @user = User.new()
  end
    
  def create
    super
  end
  
end
{% endhighlight %}

#### 로그인 컨트롤러(app/controllers/front/members/sessions_controller.rb)

로그인 컨트롤러도 회원가입 컨트롤러의 설명과 동일

{% highlight ruby %}
#app/controllers/front/members/sessions_controller.rb
class Front::Members::SessionsController  < Devise::SessionsController

    def new
    end
    
    def create
      super
    end
    
    def destroy
      super
    end

end
{% endhighlight %}


#### 로그인 화면 View커스텀(app/view/front/members/sessions/new.html.erb)

{% highlight ruby %}  
#app/view/front/members/sessions/new.html.erb
<div class="main users-new">
  <div class="container">
    <div class="form-heading">로그인</div>
    <div class="form users-form">
      <div class="form-body">
        <% if @error_message %>
          <div class="form-error">
            <%= @error_message %>
          </div>
        <% end %>
        <%= form_tag("/login") do %>
          <p>메일어드레스</p>
          <input name="user[email]" value="<%= @email %>">
          <p>패스워드</p>
          <input type="password" name="user[password]" value="<%= @password %>">
          <input type="submit" value="로그인">
        <% end %>
      </div>
    </div>
  </div>
</div>
{% endhighlight %}
 
#### 회원가입 화면 View커스텀(app/view/front/members/registers/new.html.erb)



{% highlight ruby %}  
#app/view/front/members/registers/new.html.erb
<div class="main users-new">
  <div class="container">
    <div class="form-heading">회원가입</div>
    <div class="form users-form">
      <div class="form-body">
        <% @user.errors.full_messages.each do |message| %>
          <div class="form-error">
            <%= message %>
          </div>
        <% end %>
        <%= form_tag("/users") do %>
          <p>메일 어드레스</p>
          <input name="user[email]" value="<%= @user.email %>">
          <p>패스워드</p>
          <input type="password" name="user[password]" value="<%= @user.password %>">
          <input type="submit" value="신규등록">
        <% end %>
      </div>
    </div>
  </div>
</div>
{% endhighlight %}
 
여기까지 끝나고 로그인/회원가입 페이지에 억세스하면 커스텀한 화면이 보여지는걸 알 수 있다.
로그인,회원가입도 기존과 동일하게 가능

#### 회원가입 동작확인

```
http://localhost/users/sign_up
```

![image](https://user-images.githubusercontent.com/4640346/39397658-18b64398-4b3e-11e8-99f9-a31032ac2e40.png)

#### 로그인 동작확인

```
http://localhost/login
```

![image](https://user-images.githubusercontent.com/4640346/39397666-2cd5ee50-4b3e-11e8-9b26-699747c41a4a.png)


### 회원가입 모델 커스텀


회원가입의 경우 디폴트설정은 email,password밖에 없어 정보가 부족하므로 nickname이라는 컬럼을 추가해봤다.



#### Users테이블에 nickname컬럼을 추가

{% highlight ruby %} 
 rails g migration add_nickname_to_users nickname:string
 rake db:migrate
{% endhighlight %}
 


#### 회원가입View에 유저명 추가

위에서 커스텀한 회원가입 페이지의 이메일 위에 유저명 html설정을 추가해줬다.

{% highlight ruby %} 
<p>유저명</p>
<input name="user[nickname]" value="<%= @user.nickname %>">
{% endhighlight %}

회원가입 페이지에 다시 억세스 하면 이런식으로 나온다.

![image](https://user-images.githubusercontent.com/4640346/39399117-191ad01e-4b53-11e8-9773-c89e1f586599.png)

 
#### application_controller에 추가한 컬럼을 넣어준다.
 
{% highlight ruby %}
# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # devise컨트롤 사용시 하기의 메소드를 부름
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    added_attrs = [:nickname, :email, :password, :password_confirmation, :remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end
end
{% endhighlight %} 
    

    
만약 이부분에 닉네임이 없으면 어떻게 될까?

```
added_attrs = [ :email, :password, :password_confirmation, :remember_me]
```
으로 바꿔서 회원가입을 해봤다. 


``` 
"user"=>{"nickname"=>"kaka", "email"=>"kaka@a.com", "password"=>"[FILTERED]"}}
Unpermitted parameter: :nickname
 User Exists (0.9ms)  SELECT  1 AS one FROM `users` WHERE `users`.`email` = BINARY 'kaka@a.com' LIMIT 1
SQL (1.1ms)  INSERT INTO `users` (`email`, `encrypted_password`, `created_at`, `updated_at`) VALUES ('kaka@a.com', '$2a$11$rIuuqXtJDWU3zDZuUC73...TQKrHgWmsw4RBitOb6u0b.eyOnWYr.', '2018-04-28 15:40:19', '2018-04-28 15:40:19')
```  

로그를 보면 위와 같이 파라메터에서 nickname은 받았는데 ```Unpermitted parameter: :nickname```라고 하면서 DB에는 인설트 안되는걸 알 수 있다.



```
added_attrs = [:nickname, :email, :password, :password_confirmation, :remember_me]
```

으로 설정을 하면 이하와 같이 정상적으로  DB인설트가 되는걸 알 수 있다.


  
```
user"=>{"nickname"=>"kaka2", "email"=>"kaka2@a.com", "password"=>"[FILTERED]"}}
 User Exists (0.8ms)  SELECT  1 AS one FROM `users` WHERE `users`.`email` = BINARY 'kaka2@a.com' LIMIT 1
SQL (14.3ms)  INSERT INTO `users` (`email`, `encrypted_password`, `created_at`, `updated_at`, `nickname`) VALUES ('kaka2@a.com', '$2a$11$zE4IedqBtzbkPFsl16J5YuOxuS/t4mZDzUUdSMyoXkqbsba/4BrOW', '2018-04-28 15:39:17', '2018-04-28 15:39:17', 'kaka2')
```
  
여기까지 Rails devise의 회원가입/로그인 기능을 커스텀하는 방법을 간단히 알아봤다.

 
 
 [참고1]: https://qiita.com/yasuno0327/items/ff17ddb6a4167fc6b471
 [참고2]: https://github.com/plataformatec/devise/wiki/How-To:-Allow-users-to-sign-in-using-their-username-or-email-address
 [Rails devise인스톨 방법]: https://negabaro.github.io/rails/2018/04/27/devise-install.html