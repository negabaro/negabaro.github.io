
---
layout: post
title:  "rails6.0 console에서 자주사용할만한 tip"
author: negabaro kim
categories: rails
tags:	rails tip
---


rails console에서 쓸만한 팁들을 몇가지 소개해본다.


# show-routes

보통 루팅확인시`rake routes`를 자주 사용하는데 굉장히 느리다. 
`show-routes`를 사용하면 고속으로 루팅설정을 확인할 수 있다.

```
rails c
show-routes
```

코드 변경시 콘솔에서 `reload!`로 갱신도 가능하므로 콘솔띄어놓고 show-routes로
확인해보길 강력 추천한다.

# sand-box모드

```
rails c --sandbox
```

콘솔에 들어가서 테스트로 데이터 생성하곤 하는데 더미 데이터를 일일이 지워주기 귀찮을때가 있다.
sandbox모드로 들어가서 작성한 데이터들은 exit후 자동 롤벡되므로 간편


# app오브젝트 활용

콘솔에서 app오브젝트를 이용해 여러가지 helper메소드를 불러올 수 있다.

## request

app.get을 이용해 간단히 콘솔에서 리퀘스트를 보내서 컨트롤러를 실행할 수 있다.

```ruby
[3] pry(main)> app.get "http://localhost:3000/api/hoge"
=> 200
[4] pry(main)> app.response.body
=> "{\"response\":\"hoge\"}"
```

## path/url확인

`app.xx_path`를 사용하면 자신의 루팅설정이 무슨 path로 변환되는지
알 수 있다.`app.xx_url`은 변환되는 url을 확인가능

```ruby
[1] pry(main)> app.api_hoge_path
=> "/api/hoge"
[2] pry(main)> app.api_hoge_url
=> "http://www.example.com/api/hoge"
```


# helper메소드 확인

개인적으로 가장 많이 쓰는 helper메소드
콘솔에서 미리 helper메소드를 사용해서 변환되는 값을 확인할때 용이하다.

```ruby
[8] pry(main)> helper.truncate("Testing", length: 6)
=> "Tes..."
[9] pry(main)> helper.link_to "home", app.root_path
=> "<a href=\"/\">home</a>"
```

# 인스턴스 변수의 값을 세팅

인스턴스 값이 필요한 메소드는 `Object#instance_variable_set`를 이용해 값을 넣어주는것도 가능하다

이런 헬퍼메소드가 있다면

```ruby
def say_hello
   "hello, #{@name}"
end
```

@name에다 hoge를 넣어주는 식

```ruby
[99] pry(main)> helper.instance_variable_set :@name, "hoge"
[99] pry(main)> helper.say_hello
 => "hello, hoge"
```

# params변수값을 세팅

마찬가지로 헬퍼안에서 param을 사용할때 OpenStruct클래스를 이용해 클래스를 위조하는걸로 param값 설정이 가능하다.

```ruby
def say_goodbye
  "goobye, #{params[:name]}"
end
```


```ruby
[2] pry(main)> helper.controller = OpenStruct.new(:params => { :name => "hoge" })
=> #<OpenStruct params={:name=>"hoge"}>
[3] pry(main)> helper.say_goodbye
=> "goodbye, hoge"
```

확인은 못했지만 param외에 session,flash값도 OpenStruct로 위조가 가능할듯!?



# reference:

```
https://qiita.com/snaka/items/eeb5dee96e44fca54a2e
```