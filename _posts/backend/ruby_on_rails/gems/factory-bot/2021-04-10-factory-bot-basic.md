---
layout: post
title:  "Rails FactoryBot이란? 설치에서 사용방법까지 알아보자."
author: negabaro kim
tags:	rails/factorybot
---

## factory-bot(FactoryBot)이란?

각 모델 인스턴스에 더미 데이터를 간단하게 만들어주는 Gem이다.

주요 목적으로는  SPEC테스트에서 더미데이터를 만들어줄때 사용하지만 필자의 경우 테스트 데이터 뿐만 아니라 develop환경에서 초기 데이터를 세팅할때도 사용하고 

시스템에서 만들어질 데이터셋 조합들을 FacotoryBot에 정의해두고 사양을 파악하는 용도로도 사용하고 있다.

예전에는 FactoryGril이라는 이름이었는데 FactoryBot으로 변경됨.


## 인스톨 방법


### bundle install

```ruby
## Gemfile
group :development, :test do
  gem 'factory_bot_rails'
end
bundle install
```


### incldue

※RSPEC기준의 설정이다.

```ruby
#spec/support/factory_bot.rb
RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
```

위 설정까지 끝나면 FactoryBot을 사용할 수 있다.

---

## 파일생성(FactoryBot 정의)

디폴트는 Rails 제네레이터 커맨드를 실행시 `spec/factories`이하에 파일이 생성된다.

```ruby
rails g model user name:string admin:boolean
```

아래와 같은 파일이 만들어지는걸 확인할 수 있다.

```ruby
#spec/factories/users.rb
FactoryBot.define do
  factory :user do
    name { nil }
    admin { nil }
  end
end
```

## 테스트 데이터 만들기

위에서 정의한 FactoryBot을 이용해 테스트 데이터를 만들어보자.

아래 커맨드로 데이터 생성이 가능하다.

```ruby
FactoryBot.create :user
```

여기까지 FacotryBot을 정의해서 테스트 데이터를 생성하는 방법에 대해 알아봤다.

이외 옵션들은 다른 포스트에서 다뤄보겠다.

## 메모

### 커스텀 방법

FactoryBot의 기본설정을 바꿔줄때 사용한다.(필자는 디폴트 그대로 쓰는편)

```ruby
#config/application.rb
config.generators do |g|

  # Rails제네레이터가 factory_bot파일을 자동으로 만들어주는 설정을 꺼줌(default: true)
  g.factory_bot false

  # 생성해주는 팩토리파일의 디렉토리 변경시 사용(default: spec/factories)
  g.factory_bot dir: 'custom/dir/for/factories'
end
```