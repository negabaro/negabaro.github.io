---
layout: post
title:  "Autoprefixer Rails로CSS의 벤더프리픽스를 자동생성하기"
author: negabaro kim
categories: rails
tags:	css
cover:  "/assets/twice.jpg"
---


### 벤더프릭스란


CSS 권고안에 포함되지 못한 기능이나, CSS 권고안에는 포함되어 있지만 아직 완벽하게 제정된 상태가 아닌 CSS의 기능을 사용하고자 할 때
각 브라우저마다 고유의 벤더 프리픽스를 부여해서 사용하게 된다


#### 주요 브라우저의 벤더프릭스

```
-moz-　　…… Firefox
-webkit-　…… Google Chrome、Safari
-o-　　　　…… Opera
-ms-　　　…… Internet Explorer
```


이 벤더프릭스를 신경쓰면서 프로젝트를 진행하는것은 상당히 귀찮다.
레일즈에서는 ```autoprefixer-rails```라는 Gem을 이용하면 자동으로 벤더프릭스를 생성해준다.



#### Gemfile

{% highlight ruby %}
gem 'autoprefixer-rails'
{% endhighlight %}

#### config/autoprefixer.yml



{% highlight ruby %}
browsers:
  - "> 5%" #상위5%의 브라우저를 대상으로함 
  - "last 2 versions" #이하에 정의한 부분이외에는 최신 메이저브라우저의 2version만 서포트
  - "IE >= 11" # IEは11이상
  - "Android >= 4" # Android는4계열을 서포트
{% endhighlight %}

위와 같은 설정을 하면
상위 5%이상의 브라우저에 한해서 해당 브라우저의 과거 2version을 서포트하고
IE11이상 Android4이상도 서포트한다는 의미가 됩니다.


#### 캐쉬삭제

도큐맨트에서는 캐쉬삭제를 권하고 있기때문에 실행
development환경에서는 안해도 될듯

{% highlight ruby %}
bin/rake tmp:clear
{% endhighlight %}

#### 컴파일 결과

asset:precimpile을 실행하거나 development환경에서 ```config/application.rb```에 ```config.assets.compile: true```인경우 
이하와 같은 결과가 나옴.


##### 컴파일전 SCSS

{% highlight ruby %}
.sample {
  animation: spin 1s infinite linear;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
}
{% endhighlight %}


##### 컴파일후 SCSS

{% highlight ruby %}
.sample {
  -webkit-animation: spin 1s infinite linear;
          animation: spin 1s infinite linear;
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
{% endhighlight %}




[참고1]: https://qiita.com/kon_yu/items/fbda370f22d953b64062
[참고2]:http://neos21.hatenablog.com/entry/2017/03/17/000347
[참고3]:http://www.htmq.com/csskihon/603.shtml