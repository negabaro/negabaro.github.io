---
layout: post
title:  "Rails flash오브젝트에 대해서"
author: negabaro kim
categories: rails
tags:	rails handson
cover:  "/assets/twice3.jpg"
---


### 플래쉬 오브젝트란

Rails에서 간단한 메시지를 뷰에서 보여주게 하고 싶을때 사용되는 오브젝트입니다.
컨트롤러에서 보여질 메시지를 지정해서 뷰에 넘겨줍니다.
예를 들면 어떤 액션에 대해서 성공하거나 실패했을때 표시해줍니다.


### 기본

컨트롤러에서 flash오브젝트를 선언해주고 해당 뷰에서 그것을 표시합니다.

#### 컨트롤러

{% highlight ruby %}
def test1
  flash[:test] = "test 플래쉬입니다."
end
{% endhighlight %}

#### 뷰

{% highlight ruby %}
<%=   flash[:test]  %>
{% endhighlight %}


bootstrap등을 이용해 css설정을 해주지 않으면 
뷰에서는 test플래쉬입니다 라는 text message만 보여지게 됩니다.


### 실제 사용예

css를 적용후 flash메시지를 표시해봅시다.

#### css

{% highlight css %}
.flash {
  padding: 10px 0;
  color: white;
  background: rgb(251, 170, 88);
  text-align: center;
  position: absolute;
  top: 64px;
  z-index: 10;
  width: 100%;
  border-radius: 0 0 2px 2px;
  font-size: 14px;
}
{% endhighlight %}

#### 컨트롤러 설정


{% highlight ruby %}
flash[:notice] = "전체공개 했습니다"
{% endhighlight %}

#### 뷰 설정(application.html.erb)

보통은 해당뷰에 설정하는것보다  layout/application.html.erb에서 공통적으로 flash메시지를 표시하는 경우가 많습니다.

{% highlight ruby %}
#/app/views/layouts/application.html.erb
    <% if flash[:notice] %>
      <div class="flash">
        <%= flash[:notice] %>
      </div>
    <% end %>
{% endhighlight %}


#### 화면 캡쳐

이런식으로 화면에 표시가 되는걸 확인할 수 있습니다.

![image](https://user-images.githubusercontent.com/4640346/39665007-973a7b7e-50c7-11e8-9e52-2cd36299655b.png)


### 그외



#### 리다이렉트된 페이지에 flash메시지를 보여주는 로직을 넣을것.

```application.html.erb```와 같은 공통로직에 flash 메시지를 표시하는 로직을 넣으면 신경안써도 될부분이긴 하지만 
flash를 표시하는 메시지는 어떤 액션이 처리된후 리다이렉트 된 페이지에 선언해줘야합니다.

예를들면 등록 -> 등록완료 -> top페이지 라면 top페이지에 flash를 표시하는 로직이 있어야 된다는 얘깁니다.

#### 컨트롤러에서 리다이렉트할때 flash메시지를 보내기


리다이렉트시 flash를 자주 사용하므로,redirect_to메소드에서 flash메소드를 넘겨주는 것이 가능합니다.

이것을 이용하면 flash[:notice]나flash[:error]와 같은 의미로 사용가능합니다



##### 예제

{% highlight ruby %}
redirect_to @user, notice: '로그인에 성공했습니다.'
{% endhighlight %}

{% highlight ruby %}
redirect_to login_url, alert: '로그인에 실패했습니다.'
{% endhighlight %}

{% highlight ruby %}
redirect_to action: 'index', flash: {notice: '로그인에 성공했습니다.'}
{% endhighlight %}


#### flash의 종류별로 다른 css적용

위에서는 원초적으로 flash의 오브젝트를 넘겨서 그것을 표시하는 것에 포커스를 맞췄는데

flash에서는 flash[:notice],flash[:alert] 등 여러가지 변수를 지정가능합니다.

그 변수별로 보여지는 css를 조정하거나 html을 바꿔주고 싶을때는 이하와 같이 flash.each 를 
이용하면 간편합니다.

##### 예제1)

{% highlight ruby %}
    <% flash.each do |type, message| %>
<div class="flash" role="alert">
  <button class="close" data-dismiss="alert">×</button>
  <%= message %>
</div>
<% end %>
{% endhighlight %}

##### 예제2)

{% highlight ruby %}
<% if flash[:notice] %>
  <div class="alert alert-success">
    <%= flash[:notice] %>
  </div>
<% end %>
<% if flash[:alert] %>
  <div class="alert alert-danger">
    <%= flash[:alert] %>
  </div>
<% end %>
{% endhighlight %}

#### flash close버튼 만들기

{% highlight ruby %}
<div class="flash" role="alert">
  <button class="close" data-dismiss="alert">×</button>
  <%= message %>
</div>
{% endhighlight %}

[reference]: https://qiita.com/youcune/items/12b153c08db695952e47
[reference2]: http://to-developer.com/blog/?p=1866
[reference3]: http://ruby-rails.hatenadiary.com/entry/20141127/1417086075
[reference4]: ttp://to-developer.com/blog/?p=1866