---
layout: post
title:  "rails에서switch_point를 이용한 모델별 복수 DB접근방법"
author: negabaro kim
categories: rails
tags:	rails gem
cover:  "/assets/twice1.jpg"
---


rails에서 각 모델별로 다른DB를 사용하고 싶을때가 있다.
예를들면 A모델은 메인RDS인mysql을 사용하는데 B모델은 외부시스템의 DB인redshift등을 참고한다거나할때다.
이럴때 유용하게 쓰는gem으로`switch_point`가 있다.

사용방법도 매우간단



### URL


https://github.com/eagletmt/switch_point



### Gemfile추가



{% highlight ruby %}
#Gemfile
gem 'switch_point'
{% endhighlight %}




#### config/database.yml


{% highlight ruby %}
default: &default
  adapter: mysql2
  encoding: utf8mb4
  pool: 5
  reconnect: false
  database: <%= ENV['DB_NAME'] %>
  username: <%= ENV['DB_USER'] %>
  password: <%= ENV['DB_PASSWORD'] %>
  host: <%= ENV['DB_HOST'] %>
  variables:
    sql_mode: ''
  redis:
    host: <%= ENV['REDIS_HOST'] %>
    port: <%= ENV['REDIS_PORT'] %>
    db: <%= ENV['REDIS_DB'] %>
    sidekiq_db: <%= ENV['REDIS_SIDEKIQ_DB'] %>

development:
  <<: *default

test:
  adapter: mysql2
  encoding: utf8mb4
  pool: 5
  reconnect: false
  database: <%= ENV['TEST_DB_NAME'] %>
  username: <%= ENV['TEST_DB_USER'] %>
  password: <%= ENV['TEST_DB_PASSWORD'] %>
  host: <%= ENV['TEST_DB_HOST'] %>
  variables:
    sql_mode: ''
  redis:
    host: <%= ENV['TEST_REDIS_HOST'] %>
    port: <%= ENV['TEST_REDIS_PORT'] %>
    db: <%= ENV['TEST_REDIS_DB'] %>
    sidekiq_db: <%= ENV['TEST_REDIS_SIDEKIQ_DB'] %>

beta:
  <<: *default

staging:
  <<: *default

production:
  <<: *default
  pool: 10

tableau_replica:
  adapter: mysql2
  encoding: utf8mb4
  pool: 5
  reconnect: false
  database: <%= ENV['TABLEAU_REPLICA_DB_NAME'] %>
  username: <%= ENV['TABLEAU_REPLICA_DB_USER'] %>
  password: <%= ENV['TABLEAU_REPLICA_DB_PASSWORD'] %>
  host: <%= ENV['TABLEAU_REPLICA_DB_HOST'] %>

redshift:
  adapter: redshift
  database: filmarks
  host: <%= ENV['REDSHIFT_HOST'] %>
  port: 5439
  username: <%= ENV['REDSHIFT_USER_NAME'] %>
  password: <%= ENV['REDSHIFT_PASSWORD'] %>
  encoding: utf8
  pool: 5
timeout: 30000
{% endhighlight %}

#### 모델설정

이하와같이 모델에서 use_switch_point 뒤에 config/database.yml에서 선언한 db설정을 넣어주기만 하면된다.

{% highlight ruby %}
class TableauReplica::Administrator < ApplicationRecord
  use_switch_point :tableau_replica
end
{% endhighlight %}


[switch_point]:      https://github.com/eagletmt/switch_point