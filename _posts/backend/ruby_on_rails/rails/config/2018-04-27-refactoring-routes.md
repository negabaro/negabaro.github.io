---
layout: post
title:  "rails config/routes.rb설정 리팩토링"
author: negabaro kim
categories: rails
tags:	rails handson
cover:  "/assets/twice3.jpg"
---

Rails에서URL과 어플리케이션의 파라메터를 연결해주기 위해서는 `config/routes.rb`에 `resources`등을 이용해
설정을 해주어야한다.

그런데 Rails로 프로젝트가 진행되면 될수록 config/routes.rb의 양이 늘어남에 따라 config/routes.rb설정이 지저분해져 보기 불편할때가 많았다.
또한 파일이 하나뿐이다 보니git에서 conflict가 자주  발생했다.

이러한 문제를 해결하기 위해 용도에 따라`config/routes.rb` 설정을 분해하는 방법을 알아보자.


필자의 경우, 웹(front),API(api),관리페이지(admin) 이 3개의 레이어를 `config/routes` 이하 디렉토리에 나눠봤다.


핵심 설정은 매우 간단하다. 하기의 설정을 넣어주기만 하면된다.

#### config/application.rb


{% highlight ruby %}
config.paths['config/routes.rb'].concat Dir[Rails.root.join('config/routes/*.rb')]
{% endhighlight %}


#### 나눌 routes파일이 있는 디렉토리인 config/routes/를 생성

```
mkdir config/routes
```

### 각각의 routes파일 설정

#### config/routes/admin.rb

{% highlight ruby %}
#vim config/routes/admin.rb
Rails.application.routes.draw do
  #여기에 route설정을 정의
end
{% endhighlight %}

#### config/routes/front.rb
{% highlight ruby %}
Rails.application.routes.draw do
  #여기에 route설정을 정의
end
{% endhighlight %}

#### config/routes/api.rb

{% highlight ruby %}
Rails.application.routes.draw do
  #여기에 route설정을 정의
end
{% endhighlight %}


#### config/routes.rb
{% highlight ruby %}
Rails.application.routes.draw do
  #여기에 route설정을 정의
end
{% endhighlight %}


위 설정에 의해 전혀다른 이슈였던 관리페이지와 api간의 설정이 conflict발생이 사라졌고 
각 레이어(web,api,front)의 routes설정을 확인하기 수월해졌다.


### 다른 방법

`config/application.rb`의 설정을 지우고 
이하와 같이 `config/routes.rb`에 `instance_eval`메소드를 통한 구현도 가능하다.

{% highlight ruby %}
class ActionDispatch::Routing::Mapper
  def draw(routes_name)
    instance_eval(File.read(Rails.root.join("config/routes/#{routes_name}.rb")))
  end
end

Rails.application.routes.draw do

    draw :admin
    draw :front
    draw :api

end
{% endhighlight %}


[reference]: http://www.hassansan.me/entry/2017/12/03/021616
