---
layout: post
title:  "Rails6 bullet으로 N+1쿼리문제 체크해보자"
author: negabaro kim
tags:	rails/gem
---


# bullet이란?

N+1문제 검출시 사용하는 gem


# bullet 인스톨

```ruby
#Gemfile
group :test, :development, :staging do
  gem 'bullet'
  gem 'slack-notifier' # slack통지시 사용
end
```

# .envrc추가 (필수 아님)

```
#.envrc
export N1_DEBUG_MODE=true
```

# bullet설정

```ruby
#config/initializers/bullet.rb
if ENV['N1_DEBUG_MODE'].present?
  Rails.application.configure do
    config.after_initialize do
      Bullet.enable        = true # Bullet유효화
      Bullet.alert         = true # JavaScript의 팝업 alert유효화
      Bullet.bullet_logger = true # Rails.root/log/bullet.log에 로그 출력
      Bullet.console       = true # 브라우저의 console.log에 출력
      #Bullet.growl         = true
      Bullet.rails_logger  = true # Rails로그에 결과를 출력
      Bullet.add_footer    = true # 페이지 왼쪽 하단결과에 표시

    end
  end
end
```


# slack통지시 이하 추가

```ruby
Bullet.slack = { webhook_url: 'https://hooks.slack.com/services/xx' }
```


# 특정로직에 bullet 무효화 하는 방법

아래와 같은식으로 무효화할 로직 앞에서 `Bullet.enable = false` 해준다.

```ruby
previous_value = Bullet.enable?    
Bullet.enable = false
xxx # 무시할 로직
Bullet.enable = previous_value
```

# 동작확인

rails 기동후 N+1문제가 있는 페이지에 억세스하면 dialog나 slack 화면하단에 
해당 내용이 표시되는것을 확인 


### reference:

```
https://wonderwall.hatenablog.com/entry/2015/08/16/171622
https://github.com/flyerhzm/bullet/
https://github.com/flyerhzm/bullet_test
```