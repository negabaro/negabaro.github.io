---
layout: post
title:  "Rails devise인스톨 방법"
author: negabaro kim
categories: rails
tags:	rails handson
cover:  "/assets/twice3.jpg"
---


#### Gemfile추가
{% highlight ruby %}
gem "devise"
{% endhighlight %}

#### bundle install

{% highlight ruby %}
bundle install --path=vendor/bundle
{% endhighlight %}

#### devise인스톨(초기 설정파일이 만들어짐)

{% highlight ruby %}
rails g devise:install
{% endhighlight %}

##### result:
{% highlight ruby %}
Running via Spring preloader in process 12695
     create  config/initializers/devise.rb
     create  config/locales/devise.en.yml
{% endhighlight %}

#### User모델 작성

{% highlight ruby %}
rails g devise User
{% endhighlight %}

특별한 이유가 없다면 모델명은 User로하자.

##### result:
{% highlight ruby %} 
Running via Spring preloader in process 18945
      invoke  active_record
      create    db/migrate/20170724100358_devise_create_users.rb
      create    app/models/user.rb
      invoke    test_unit
      create      test/models/user_test.rb
      create      test/fixtures/users.yml
      insert    app/models/user.rb
       route  devise_for :users
{% endhighlight %}

#### 테이블 생성

{% highlight ruby %} 
rake db:migrate
{% endhighlight %}

여기까지 끝내면 devise를 사용할 준비는 끝났다.


#### 동작확인 

이하와 같은 URL에 접근하면 devise의 초기 로그인&회원가입 폼을 확인가능하다.

```
http://localhost:3000/users/sign_up
http://localhost:3000/users/sign_in
```

routes설정을 확인해보자.


#### routes설정확인

{% highlight ruby %} 
rake routes
{% endhighlight %}

##### result:

{% highlight ruby %} 
                    Prefix Verb   URI Pattern                               Controller#Action
          new_user_session GET    /users/sign_in(.:format)                  devise/sessions#new
              user_session POST   /users/sign_in(.:format)                  devise/sessions#create
      destroy_user_session DELETE /users/sign_out(.:format)                 devise/sessions#destroy
         new_user_password GET    /users/password/new(.:format)             devise/passwords#new
        edit_user_password GET    /users/password/edit(.:format)            devise/passwords#edit
             user_password PATCH  /users/password(.:format)                 devise/passwords#update
                           PUT    /users/password(.:format)                 devise/passwords#update
                           POST   /users/password(.:format)                 devise/passwords#create
  cancel_user_registration GET    /users/cancel(.:format)                   devise/registrations#cancel
     new_user_registration GET    /users/sign_up(.:format)                  devise/registrations#new
    edit_user_registration GET    /users/edit(.:format)                     devise/registrations#edit
         user_registration PATCH  /users(.:format)                          devise/registrations#update
                           PUT    /users(.:format)                          devise/registrations#update
                           DELETE /users(.:format)                          devise/registrations#destroy
                           POST   /users(.:format)                          devise/registrations#create
{% endhighlight %}                       


#### 자주사용하는 설정

| Prefix |URI | Description | 
|-------|--------|---------|---------|
|new_user_session_path | /users/sign_in | 로그인   | 
|destroy_user_session_path | /users/sign_out | 로그아웃 | 
|new_user_registration_path | /users/sign_up | 회원가입 |
|new_user_password_path | /users/password/new  | 새 패스워드 발행 |




#### 회원가입&로그인/로그아웃 링크만들기

이제view에서 로그인전 페이지와 로그인후 페이지를 구현해보자.
보통 로그인전에는 회원가입&로그인 링크가 들어가고 로그인후에는 로그아웃 링크가 들어간다.

로그인을 했는지 판별하는 방법은 여러가지가 있지만 devise에서 제공해주는 
`user_signed_in`를 자주 사용한다.


##### 사용예:

{% highlight ruby %} 
 #app/views/layouts/application.html.erb
 <% if user_signed_in? %>
    <%= render "front/header_authenticated" %>
    #회원가입&로그인 링크를 여기에 추가한다.
 <% else %>
    <%= render "front/header" %>
    #로그아웃 링크를 여기에 추가한다.
 <% end %>
{% endhighlight %}



#### 로그아웃 링크 예)

{% highlight ruby %} 
<li><%= link_to "Logout", destroy_user_session_path, method: :delete %></li>
{% endhighlight %}

#### 로그인&회원가입 링크 예)

{% highlight ruby %} 
<li><%= link_to "로그인", new_user_session_path %></li>
<li><%= link_to "회원가입", new_user_registration_path %></li>
{% endhighlight %}                                                   
                                                              



[reference]: https://www.sejuku.net/blog/27603
[reference2]: https://qiita.com/higeaaa/items/df8feaa5b6f12e13fb6f
[reference3]: https://qiita.com/kanpe777/items/c5154b58c852855deefc
[reference4]: https://qiita.com/youcune/items/12b153c08db695952e47
[reference5]: http://to-developer.com/blog/?p=1866
[reference6]: http://ruby-rails.hatenadiary.com/entry/20141127/1417086075
[reference7]: http://to-developer.com/blog/?p=1866