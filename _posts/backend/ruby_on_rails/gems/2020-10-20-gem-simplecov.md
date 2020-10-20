---
layout: post
title:  "rails rspec사용시 테스트의 coverage를 측정해주는 gem인 simplecov와 simplecov-rcov에 대해 알아보자."
author: negabaro kim
tags:	rails/gem
---

# 개요

이 포스트에서는 rails rspec사용시 테스트의 coverage를 측정해주는 gem인 simplecov와 simplecov-rcov에 대해 알아보자.

# simplecov

rspec실행하면 `root dir/coverage` 아래와 같은 coverage결과를 표시해준다.

![image](https://user-images.githubusercontent.com/4640346/96530988-9c970e00-12c3-11eb-8e9a-354d1cc60a37.png)

해당 파일을 클릭하면 아래와 같이 행단위로 확인이 가능

![image](https://user-images.githubusercontent.com/4640346/96531015-ae78b100-12c3-11eb-9941-78e01ab52d89.png)

rspec실행뒤에 아래와 같은 메시지도 추가되어있다.

```ruby
Coverage report generated for RSpec to /sample_app/coverage. 187 / 194 LOC (96.39%) covered
```


# 인스톨 방법

## gem추가 && bundle install

```ruby
group :test do
  gem 'simplecov', require: false
end
```

```ruby
bundle install
```

## simplecov설정

```ruby
#spec/supports/simplecov.rb
require 'simplecov'
SimpleCov.start 'rails'
```

설정이 이걸로 끝이다.


# Simplecov-rcov

simplecov와 다른 coverage툴중에 rcov라는 gem이 있는데 simplecov를 해당 포맷으로 변환시켜주는 툴이다.

Jenkins의 Ruby metrics plugin사용시 rcov포맷이 요구되어 사용한다고 한다.

rspec실행해보면 `root dir/coverage/` 이하에 `rcov`라는 디렉토리가 생기고 coverage용 파일이 있는걸 확인할 수 있었다. simplecov와 다르게 각 파일마다 하나의 파일이 만들어진다.


# simplecov-rcov설치 방법

```ruby
gem 'simplecov-rcov'
```

```ruby
#spec/supports/simplecov.rb
require 'simplecov-rcov'
SimpleCov.formatter = SimpleCov::Formatter::RcovFormatter
```

# Simplecov 옵션

주로 사용하는 옵션으로 
특정 파일을 하나의 그룹에서 모아놓을 수 있는 add_group과
특정 파일,디렉토리를 제외시킬 수 있는 add_filter가 있다.

자세한건 [simplecov github]을 참고 바란다.


```ruby
require 'simplecov'

SimpleCov.start 'rails' do
  add_group "Controllers/organization", "app/controllers/organization"
  add_filter "/channels/"
end
```

---------


# 메모1.

```ruby
SimpleCov.start 'rails'
```

대신

```ruby
SimpleCov.start
```

해주면 rails디렉토리별로 탭을 나누지 않았음.

# 메모2.

루트 디렉토리 이하에 `.simplecov`파일을 두고 거기에 simplecov설정을 해도 정상적으로 읽어온다.

# 메모3.

spec파일이 없으면 Coverage측정에 포함되지 않음.
(다른 테스트 케이스에서 호출될 경우 포함됨)

그러므로 테스트용 클래스를 처음부터 만들어 놓아야된다. 나중에 일일이 찾아서 만들기가 굉장히 번거러움




### reference:

[simplecov-rcov github](https://github.com/fguillen/simplecov-rcov)

[simplecov github]: https://github.com/simplecov-ruby/simplecov

[simplecov-rcov link1](https://gosyujin.hatenablog.com/entry/20120327/1332856400)

[rcov](https://www.ownway.info/Ruby/rcov/about)
