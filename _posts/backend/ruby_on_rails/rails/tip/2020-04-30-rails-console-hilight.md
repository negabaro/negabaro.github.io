---
layout: post
title:  "rails6.0 console에 하이라이트 설정(pry+hirb)"
author: negabaro kim
categories: rails
tags:	rails tip
---

console에서 모델정보 확인을 하기쉽게 하기위해
하이라이트 설정을 해보자


# pry-rails를 이용하는 방법

가장 간단한 방법은 `pry-rails`를 추가해서 대화식 커맨드를 irb에서pry로 바꾸는 방법이다.


```
gem 'pry-rails', :group => :development
```


pry에는 하이라이트 기능이 들어가져 있음


# pry + hirb

조금더 디테일한 하이라이트 기능이나 데이터 정보를 테이블 형식으로 보고 싶을때 `hirb`
를 사용한다. (그 외에도 `awesome_print`가 있음 참고로 github star수는 awesome_print가 3배정도 많음)

```ruby
group :development, :test do
  gem 'hirb'         # 모델출력결과를 표형식으로
  gem 'hirb-unicode' # 한국어,일본어등 멀티바이트 문자출력 대응
end
```

를 추가하고 `bundle install`



# hirb사용 방법

hirb를 사용하려면 이하와 콘솔에서 require + enable 커맨드를 실행해야하는데 

```ruby
rails c
require 'hirb'
Hirb.enable
```

매번 귀찮으니 `.irbrc`에 위설정을 정의해두면 콘솔 실행시에 자동으로 실행되므로 편하다.


# pry + hirb


위에서 설명한 pry와 hirb를 사용하려면 `.pryrc`에 설정이 조금 필요한데 이하와 같다.


```ruby
begin
  require 'hirb'
rescue LoadError
  # Missing goodies, bummer
end

if defined? Hirb
  # Slightly dirty hack to fully support in-session Hirb.disable/enable toggling
  Hirb::View.instance_eval do
    def enable_output_method
      @output_method = true
      @old_print = Pry.config.print
      Pry.config.print = proc do |*args|
        Hirb::View.view_or_page_output(args[1]) || @old_print.call(*args)
      end
    end

    def disable_output_method
      Pry.config.print = @old_print
      @output_method = nil
    end
  end

  Hirb.enable
end
```


참고로 pry사용하지 않고 irb일 경우

```ruby
if defined? Rails::Console
 
  if defined? Hirb
    Hirb.enable
  end
  
end
```

로 정상작동함


### memo

그 외에도 하이라이트 툴은 여러가지가 있는 듯(`awesome_rails_console`)
각각의 특징은 나중에 한번 알아보자.


#### 참고:

```
https://qiita.com/Ago0727/items/51716a8a14c60eb049e1
https://ruby-rails.hatenadiary.com/entry/20141024/1414160189
https://remonote.jp/rails-awesome-print-gem-console
https://github.com/awesome-print/awesome_print
https://github.com/cldwalker/hirb
```