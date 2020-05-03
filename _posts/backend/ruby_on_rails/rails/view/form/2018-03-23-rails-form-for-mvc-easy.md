---
layout: post
title:  "rails form_for이용해서 MVC모델 이해하기"
author: negabaro kim
categories: rails
tags:	rails handson
cover:  "/assets/twice3.jpg"
---

### 동작확인 

```
rails 5.1.5
```

### rails에서의 MVC Flow

```
 1. Controller의new,edit메소드에서 Model오브젝트를 생성해서 인스턴스 변수(ex: @user)에 값을 설정
 2. View에서는 form_for메소드를 이용해서 Model오브젝트의 컬럼을 사용해서 폼을 작성/표시 해줌.
 3. 유저가 submit버튼을 누르면 params변수에 입력된 hash형식의 파라메터가 Controller에 도착 
 4. Controller의 create/update메소드에서 params변수를 받아서 Model오브젝트를 작성/갱신 
```


### 사전준비 

{% highlight ruby %}
rails new form-for-mvc-easy
cd form-for-mvc-easy

rails g controller users
rails g model user name:string email:string 
rake db:migrate
{% endhighlight %}

##### routes설정

config/routes.rb
{% highlight ruby %}
Rails.application.routes.draw do
  resource :users
end
{% endhighlight %}

##### rails 기동
{% highlight ruby %}
rails s
{% endhighlight %}


### 신규등록(new)


#### Controller작성

{% highlight ruby %}
# app/controllers/users_controller.rb
... 
def new
  # 빈 모델오브젝트를 작성하고 인스턴스 변수@user에 대입 
  # @user안에 데이터는 없지만 테이블 구조가 담겨져 있어서 View에서 해당 테이블의 구조를 form화 시킬 수 있음.
  @user = User.new
end
{% endhighlight %}


#### View작성

{% highlight ruby %}
# app/views/users/new.html.erb
...
# form_for에@user값을 넘겨줌으로 인해 User테이블의name과email컬럼의
# 라벨과 텍스트필드등을 input요소에 간단하게 작성이 가능해짐 
<%= form_for @user do |f| %>

  <div class="field">
    <%= f.label :name, "이름" %>
    <%= f.text_field :name %>
  </div>

  <div class="field">
    <%= f.label :email, "메일" %>
    <%= f.text_field :email %>
  </div>
  
  <div class="actions">
    <%= f.submit "등록" %>
  </div>
<% end %>
...
{% endhighlight %}


페이지 소스를 보면 아래와 같이 표시됨.

{% highlight html %}
<form class="new_user" id="new_user" action="/users" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="authenticity_token" value="+MguATfivs9mf2ENDzMtk5uizbD0FOldbzuv3st9e5Ilf5o9MAPkH0J5LyEhEWuJqfPMoqdO5/xOvWAPBvi7ow==" />

 <div class="field">
   <label for="user_name">이름</label>
   <input type="text" name="user[name]" id="user_name" /> 
 </div>
 
  <div class="field">
    <label for="user_email">이메일</label>
    <input type="text" name="user[email]" id="user_email" />
  </div>
 
 <div class="actions">
   <input type="submit" name="commit" value="등록" data-disable-with="등록" />
 </div>

</form>
{% endhighlight %}




### 화면에서 submit버튼을 누른후의 동작

유저가 등록버튼을 누르면 params변수에 입력되어진 파라메터가 hash형식으로 설정되어서 Controller로 넘겨짐
이하와 같은 형식으로 params가 설정되어짐.


![image](https://user-images.githubusercontent.com/4640346/37824374-b442ca92-2ecf-11e8-8bd7-941da4fc1e4c.png)



{% highlight ruby %}
params =
  {
    user: {
      name: "쯔위",    
      email: "tzuyu@twice.com"   
    }
  }
{% endhighlight %}


#### 해당 params을 이하와 같은 방법으로 접근가능

{% highlight ruby %}
 params[:user][:name]  -> 쯔위
 params[:user][:email] -> tzuyu@twice.com
 params[:user]   ->  { name: "쯔위", email: "tzuyu@twice.com" } 
{% endhighlight %}


#### Controller 설정 (create)

{% highlight ruby %}
# app/controllers/users_controller.rb
... 
def create
  @user = User.new(user_params)
  if @user.save
    # @user는user_path(@user) 로 자동변환됨
    #redirect_to @user, notice: "유저 등록완료!"
  else
    # Validation에러등으로 DB저장 실패시 new.html.erb을 재표시
    render 'new'
  end

  private
    # Rails4에서부터 생긴StrongParamater라는 기능을 이용
    # permit메소드에 허가 된  파라메터 이외에는 접근하지 못하게해서 sql injection등의 공격을 막아줌
    def user_params
      params.require(:user).permit(:name, :email)
    end
end
{% endhighlight %}

[original]:  http://ruby-rails.hatenadiary.com/entry/20140727/1406448610