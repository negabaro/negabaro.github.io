---
layout: post
title:  "Rails resource vs resources 차이"
author: negabaro kim
tags:	rails/routing
---


### `resources :users`인 경우

resources는 복수의 리소스를 위한 CRUD처리를 하는 루팅설정을 만들어줌.


{% highlight ruby %}
Rails.application.routes.draw do
#config/routes.rb
  resources :users
end
{% endhighlight %}


##### rake routes실행결과

{% highlight ruby %}

   Prefix Verb   URI Pattern               Controller#Action
    users GET    /users(.:format)          users#index
          POST   /users(.:format)          users#create
 new_user GET    /users/new(.:format)      users#new
edit_user GET    /users/:id/edit(.:format) users#edit
     user GET    /users/:id(.:format)      users#show
          PATCH  /users/:id(.:format)      users#update
          PUT    /users/:id(.:format)      users#update
          DELETE /users/:id(.:format)      users#destroy
{% endhighlight %}  



`/users/:id`이부분 주목. 각각 유저의 id에 접속할 수 있도록 되어있는걸 알 수 있음.
리소스가 복수이므로 /users에 GET리퀘스트를 보내면 유저의 일람(index)에 접근하게됨.


### `resource :users`인 경우

resource인 경우 하나의 리소스에 대한 CRUD처리를 위한 루팅설정을 만들어줌.

예를들어 특정유저를 위한 CRUD처리를 하고 싶을때 사용

필자의 경우 실수로 `resource :users`로 설정해버려서 이하와 같은 결과가 나왔음.

{% highlight ruby %}
#config/routes.rb
Rails.application.routes.draw do
  resource :users
end
{% endhighlight %}


##### rake routes실행결과



{% highlight ruby %}
    Prefix Verb   URI Pattern           Controller#Action
 new_users GET    /users/new(.:format)  users#new
edit_users GET    /users/edit(.:format) users#edit
     users GET    /users(.:format)      users#show
           PATCH  /users(.:format)      users#update
           PUT    /users(.:format)      users#update
           DELETE /users(.:format)      users#destroy
           POST   /users(.:format)      users#create
{% endhighlight %}


하나의 리소스 처리를 위한 CRUD이므로 /users에 id는 존재하지 않음
복수의 유저 일람을 확인할 수 있는 index페이지도 존재하지 않음.


rails에서 의도한 설정은 
resource에는 단수문자를 resources에는 복수문자를 설정하는것이므로`resource :user`이렇게 설정해주는것이 맞을것 같다.


### `resource :user`인 경우

{% highlight ruby %}
#config/routes.rb
Rails.application.routes.draw do
  resource :user
end
{% endhighlight %}


##### rake routes결과
{% highlight ruby %}
   Prefix Verb   URI Pattern          Controller#Action
 new_user GET    /user/new(.:format)  users#new
edit_user GET    /user/edit(.:format) users#edit
     user GET    /user(.:format)      users#show
          PATCH  /user(.:format)      users#update
          PUT    /user(.:format)      users#update
          DELETE /user(.:format)      users#destroy
          POST   /user(.:format)      users#create
{% endhighlight %}






### 공부하게된 계기



resource와resources의 차이를 몰라서 [rails form_for이용해서 MVC모델 이해하기] 글을 쓸때 user등록후 `redirect_to`를 선언하니  이하와 같은 에러가 났었다.


![image](https://user-images.githubusercontent.com/4640346/37827902-a16b43ba-2edc-11e8-8add-72c7ee2ce0b0.png)

조금 헤맸는데 원인은 `config/routes.rb`에 `resources :users` 가아닌 `resource :users`로 설정해놨었기 때문이었다.


`resource :users` 일때 `redirect_to @user`의 `@user`은 `user_url`이 되는반면
`resources :users` 인경우는 `users_url`이 되는것.


보통 `rails g controller users`이런식으로 컨트롤러를  복수형으로 지정하므로

`config/routes.rb`에서도`resources :users`이렇게 복수형으로 맞춰줘야
`@user`와 같은 값을 디폴트로도 쓸수 있을것 같다.

참고로 `redirect_to xx_url` 이면 해당 컨트롤러의 index페이지로 이동한다.


그당시는 이유를 몰라서 일단 에러를 회피하기 위한 방책으로 `redirect_to @user`를 이용하지 않고 `redirect_to users_url` 이런식으로 기술해서 에러를 회피했었음.
@user -> user(s)_url로 자동으로 바꿔주므로 바꿔진 부분을 현재 존재하는 컨트롤러에 맞게 적어주는 형식




[reference]: https://stackoverflow.com/questions/21617823/undefined-method-user-url-for-userscontroller0x007fda4c2c5208
[reference2]: https://teratail.com/questions/118753?modal=q-comp
[reference3]: https://rails-study.net/resources-resource/
[rails form_for이용해서 MVC모델 이해하기]:https://negabaro.github.io/rails/2018/03/23/rails-form-for-mvc-easy.html
