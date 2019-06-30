---
layout: post
title:  "rails config/database.yml설정과 direnv를 이용한 환경변수관리"
author: negabaro kim
categories: rails
tags:	rails handson
cover:  "/assets/twice3.jpg"
---



### config/database.yml

`config/database.yml`는 rails에서 DB접속 관련 내용을 정의해주는 파일이다.
매번 새로운 rails프로젝트를 만들때 꼭 설정하는 부분이다.


필자가 자주쓰는 패턴은 이하와 같다.


#### postgresqlDB사용시 설정예1)

{% highlight ruby %}
default: &default
  adapter: postgresql
  encoding: utf8
  #encoding: unicode
  host: localhost
  # For details on connection pooling, see rails configuration guide
  # http://guides.rubyonrails.org/configuring.html#database-pooling
  pool: 5

development:
  <<: *default
  database: xx
  username: postgres
  password: xx

test:
  <<: *default
  database: xx_test


production:
  <<: *default
  database: xx_production
  username: xx
  password: <%= ENV['DB_PASSWORD'] %>
{% endhighlight %}
  

#### mysql사용시 설정예2)

  
{% highlight ruby %}
default: &default
  adapter: mysql2
  encoding: utf8mb4
  pool: 5
  reconnect: false
  database: 'xx'
  username: 'root'
  password: <%= ENV['DB_PASSWORD'] %>
  host: 'localhost'

development:
  <<: *default

test:
  <<: *default

staging:
  <<: *default
  database: db/production.sqlite3

production:
  <<: *default
  database: db/production.sqlite3
{% endhighlight %}





### direnv를 이용한 환경변수설정

위의 패턴에서 알 수 있듯 DB패스워드 정보는 코드에 바로적으면
세큐리티 리스크가 생기므로 `<%= ENV[xx] %>`이런식으로 환경변수명을 불러서 사용하고 있다.


해당 환경변수는 한개의 프로젝트만 있으면 ~/.bashrc에서 관리하기도 하지만
복수의 프로젝트가 있을때 ~/.bashrc에 환경변수를 관리하면 환경변수명이 중복된다든지 관리하기 불편하다.

이때 프로젝트마다 각각 격리된 환경변수 설정을 하고 싶을때 등장하는것이 direnv이다.

정확히는 디렉토리 마다 환경변수를 정의하고 해당 디렉토리에 이동했을때 정의한 환경변수를 유효화 시켜주는 방식이다.


### gem인스톨

mysql이나postgresql을 사용할 경우rails프로젝트의 Gemfile에 이하와 같은 설정을 추가할 필요가 있다.


#### mysql
{% highlight ruby %}
gem 'mysql2'
{% endhighlight %}

#### postgres
{% highlight ruby %}
gem 'pg'
{% endhighlight %}




### direnv인스톨 방법



```
git clone http://github.com/zimbatm/direnv
cd direnv
sudo make install
```

MAC의경우
```
brew install direnv
```
로 설치가능하다



### 설정방법


rails프로젝트의 root밑에

.envrc라는 파일을 만들어서 환경변수 설정을 해준다.

예)
```
rails new direnv_test
cd direnv_test
```

```
#vim .envrc
export DB_PASSWORD=password
```

그후 
```
direnv allow
```
를 실행하면 해당 환경변수가 적용이된다.



### direnv의 환경변수 설정시 재기동이 꼭필요

direnv의 환경변수를 기동중인 레일즈 프로젝트에 적용하기 위해서는 재기동이 필요하다.
재기동을 안하고 db에 접근하려하다 이하와같은 에러에 만났다.

```
irb(main):001:0> 
Mysql2::Error: Access denied for user 'root'@'localhost' (using password: NO)
```


direnv의 환경변수 설정시 rails 재기동을 꼭해주자.