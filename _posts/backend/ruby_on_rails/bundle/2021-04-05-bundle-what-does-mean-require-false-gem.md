---
layout: post
title: "Gemfile의 require => false는 무슨의미일까"
author: negabaro kim
tags: rails/bundle
---

## require => false

아래와 같이 Gemfile에서 사용할 gem을 선언후 두번째 인자에 `require: false`가 들어가 있는 코드는 무슨 의미일까?

```ruby
gem 'sinatra', require: false
```

## Gefmile 사용하지 않을때

먼저 Gemfile을 사용하지 않은 경우, 즉 Bundle을 사용하지 않은 경우, gem을 사용하려면 반드시 해당 gem을 `require`할 필요가 있다.


## 매번 require하기 귀찮아..


매번 require하는것은 상당히 귀찮으므로 Bundle을 사용할때는 Gemfile에 선언한 gem을 require없이 자동으로 로드할 수 있게 했다.

덕분에 우리는 일일이 require를 선언할 필요가 없는것이다.


## 본 질문으로 돌아가보자.

`require: false`를 선언하면 위에서 말한 자동 로드할 대상에서 제외된다.


Gemfile에 선언된 gem들은 모두 Rails어플리케이션의 운용에 사용되는건 아니다.


## Rails어플리케이션의 운용 이외에 사용하는 Gem의 예


생각나는 예를 적어보면

1. 개발에 도움을 주기 위한 document작성툴
2. erd를 pdf로 만들어주는 Gem
3. 배치에서만 사용하는 Gem
4. test에서만 사용하는 Gem


## 아래와 같은 gem은 require: false로

위와 같은 이유로 아래 gem들은 require: false로 설정하고 

테스트,배치 실행시 해당 gem을 수동으로 require해서 사용하는것이 Rails본체 어플리케이션에 불필요한 gem을 로드하지 않게 하는 방법이다.

```ruby
gem 'rubocop', require: false
gem 'rubocop-performance', require: false
gem 'rubocop-rails', require: false
gem 'rubocop-rspec', require: false
gem 'ruby-debug-ide', require: false
gem 'sinatra', require: false
gem 'whenever', require: false
```



## 테스트



```ruby
gem 'hoge'
gem 'fuga', :require => false
```

```ruby
Hoge #=> NameError
Fuga #=> NameError
```

```ruby
Bundler.require(:default)

Hoge #=> OK
Fuga #=> NameError
```

해도 Fuga는 로드하지 않음

```ruby
Bundler.require(:default)
require 'fuga'

Hoge #=> OK
Fuga #=> OK
```

require해주면 읽어옴


---

[Gemfileに書かれるrequire => false とはどういう意味でしょうか？]: https://teratail.com/questions/88151