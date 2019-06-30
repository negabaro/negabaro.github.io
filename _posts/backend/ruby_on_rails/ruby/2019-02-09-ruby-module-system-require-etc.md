---
layout: post
title: "ruby 모듈 시스템이란?require과 주변 메소드들 소개"
author: negabaro kim
categories: ruby
tags: ruby
---

## 모듈 시스템이란?

A라는 파일이 다른 파일의 기능을 가져와서 동작 시키는 형태를 일컬음
루비에서는`Kernel.#require` 메소드를 이용해서 구현하고 있다.
이 포스트에서는 require메소드와 주변기능들에 대해 소개하고자 한다.

## require

require은 외부파일의 기능을 현재 파일에서 사용할때 사용한다.
기본적으로 사용하고 싶은 파일을 확장자없이 적어서 불러준다.

```
require "./sub"
```

위 예제는 현재 디렉토리에서 sub.rb라는 외부파일을 읽어오겠다는 의미

## LOAD_PATH

현재디렉토리 이외에 있는 파일들이나 시스템에 인스톨된 gem등을 읽어오기 위해서는 어떻게 해야할까??
require가 읽어오는 대상은 사실 현재 디렉토리 뿐만이 아니다.
`$LOAD_PATH`에 저장되어 있는 내용들을 차례대로 읽는다.

```
ruby -e 'puts $LOAD_PATH'
```

필자의 환경에서 실행한 결과는 이하와 같다.

```
$ ruby -e 'puts $LOAD_PATH'
/usr/local/Cellar/rbenv/1.1.1/rbenv.d/exec/gem-rehash
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/gems/2.6.0/gems/did_you_mean-1.3.0/lib
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/site_ruby/2.6.0
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/site_ruby/2.6.0/x86_64-darwin18
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/site_ruby
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/vendor_ruby/2.6.0
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/vendor_ruby/2.6.0/x86_64-darwin18
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/vendor_ruby
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/2.6.0
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/2.6.0/x86_64-darwin18
```

위 패스를 순서대로 읽어서 sub.rb가 존재하지 않으면 현재디렉토리에 있는 sub.rb를 읽어오게 된다.

## require_relative

require은LOAD_PATH를 기점으로 파일을 검색하지만
상황에 따라 require을 호출한 파일패스를 기점으로 파일을 검색(상대패스)하고 싶을때가 있다.
그때 사용하는게 require_relative이다.

```
require_relative "../../sub"
```

## load

require과 거의 비슷한 기능으로 `Kernel.#load`가 있다.
require과 결정적 차이는 require는 한번 읽은 파일은 다시 읽어들이지 않는것에 비해
load는 몇번이고 읽어들인다는 점이다.
develop환경에서 irb/pry등의 대화형 쉘 실행시에 유효할 수 있다.
읽고 싶은 파일을 변경하고 다시 읽어오고 싶을때 require같은 경우 반영되지 않지만 load로 불러들일 경우 성공하게 된다.

## require/load를 이용시 변수사용 여부

### 로컬변수

```
# sub.rb
local_var = "hoge"
```

위 파일을 require해도 local_var은 스코프 밖이므로 참조할 수 없다.

```
$ pry
[1] pry(main)> require "./sub"
=> true
[2] pry(main)> puts local_var
NameError: undefined local variable or method `local_var' for main:Object
Did you mean?  local_variables
from (pry):2:in `__pry__'
```

### 클래스 변수

클래스 변수일경우 참조가 가능하다.

```
# sub.rb
@local_var = "hoge"
```

```
$ pry
[1] pry(main)> require "./sub"
=> true
[2] pry(main)> puts @local_var
hoge
=> nil
```

하지만 require를 이용해서 변수를 넘겨주는것은 캡슐화 관점에 좋은 방법은 아니다.

## autoload

require은 바로 파일을 읽어오지만 퍼포먼스의 이유로 실제 지정한 클랫스나 모듈이 처음으로 사용될때
require하고 싶은 경우도 있을것이다.
그럴 경우`Kernel.#autoload`를 사용한다.

```
# sub.rb
class Dog
  def cry
    puts "멍멍"
  end
  puts "Dog has loaded"
end
```

```
$ pry
[1] pry(main)> autoload :Dog, "./sub"
=> nil
[2] pry(main)> Dog.new.cry
"Dog has loaded"
멍멍
=> nil
```

## Bundler과require

Bundler는 루비용 라이브러리 관리 툴이다. 특별한 경우를 제외하고는
거의 모든 시스템이 Bundler를 경유해서 라이브러리를 관리한다.

bundler로 인스톨한gem은 어떤식으로 require하면 좋을까?
Bundler에서는 인스톨한gem들을 일괄적으로 require하기 위한
`Bundler.require`라는 메소드가 있다.
따라서 이하와 같은식으로 사용하면 Gemfile에 지정한 gem을 간단히 require할수가 있다.

```
require 'bundler'
Bundler.require

employee = Hashie::Mash.new
```

## include

require가 헷갈릴수 있는데 include와require은 전혀 다른기능을 가지고 있다.

include는 지정한 Module의 기능을 Class or Module에 Mix-in하는 기능을 가지고 있다.
반면 require은 읽어올 외부파일의 내용을 가져오기만할 뿐이다.

include의 경우 정의한 Module안의 메소드와Class를 호출처에 합성하는 처리가 움직인다.
당연한 얘기지만 include할 모듈이 다른 파일에 정의되어 있다면(거의 그렇지만)먼저 require를 해줄 필요가 있다.

Reference Link:

```
http://system.blog.uuum.jp/entry/2016/08/10/110000
https://qa.atmarkit.co.jp/q/2034
```
