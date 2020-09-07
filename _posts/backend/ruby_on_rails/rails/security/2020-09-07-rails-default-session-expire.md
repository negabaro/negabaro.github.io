---
layout: post
title:  "rails6 cookie_store를 이용한 session관리시 유효기간에 대해"
tags: rails/security
---

# 일시적 Session(Session의 디폴트 유효기간은 브라우저 종료시)

rails6에서 session값은 디폴트로 cookie_store 방식을 사용해 저장한다.

cookie_store는 rails의 secret_key_base라는 키값을 이용해 session정보를 암호화해
클라이언트에 전송후 브라우저의 cookie에 저장하는 방식이다.

cookie에 있는 session값을 제 3자에게 탈취당해도 서버의 secret_key_base값을 모르므로 복호화 할 수 없는 구조이다.

이렇게 브라우저의 cookie에 저장된 session정보의 유효기간을 보면 Session이라고 적혀 있는것을 확인할 수 있는데
이는 디폴트설정으로 `브라우저 종료시 Session값을 쿠키에서 삭제`한다는 의미이다.

이러한 상태를 `일시적 Session`이라고 부른다.

> By definition, sessions will expire after the browser is closed, they do not have timeout. If you open Chrome dev tools and look at the expiration date, it will say "Session" there instead of the date/time.

[stack over flow]


# 유효기간을 설정하는 방법

cookie에 저장된 Session정보의 유효기간을 두기 위해서는 Rails의 설정에 expire_at을 추가할 필요가 있다.

아래는 유효기간을 20년으로 설정한 예이다.

```ruby
# config/initializers/session_store.rb
Rails.application.config.session_store :cookie_store, key: '_appname_session', expire_after: 20.years
```

# 영구성 Session(parmant메소드)

위에서 20년의 유효기간을 설정하는 방법에 대해 소개했는데
실제로 이러한 설정이 많이 사용되어 `parmant`라는 전용메소드가 만들어져 버렸다.

그리고 20년의 유효기간은 실제 영구적인 효과를 가지므로 `영구성 Session`이라고도 부른다.

이 메소드를 이용하면 위에서 `config/initializers/session_store.rb`설정한 것과 같은 효과를 볼 수 있다.

코드는 아래와 같다.

```ruby
cookies.permanent[:remember_token] = remember_token
```

실무에서는 아래와 같이 signed를 이용해 암호화 하는 작업도 많이 쓰인다.

```ruby
cookies.permanent.signed[:user_id] = @user.id
```

위에서 설정한 cookie값을 추출하는 방법은 아래와 같다.

```ruby
User.find_by(id: cookies.signed[:user_id])
```

# 유효기간 설정에 관한 문제점

위에서 설명한 유효기간 설정은 문제점이 존재한다.

바로 cookie자체가 브라우저에 설정되어 있어 해당 값에 억세스만 가능해지면 누구라도 간단히 cookie의 기한을 연장할 수 있다는 것이다.

https를 도입해 cookie값이 중간에 탈취되지 않게하는 대책이 있지만 이것은 중간 탈취 방지에 대한 대책일 뿐 근본적인 해결책은 아니다.

# 서버에 세션정보를 저장

cookie자체가 브라우저에 설정되어 있어 생기는 문제점을 해결하는 방법으로 Session값을 서버에 보관하는 방법이 있다.

사용자는 쿠키를 사용하되 서버에서 해당 쿠키를 받아 서버에 저장한 세션값과 대조하는 방식이다.
유효기간과 같은 설정은 서버에 있으므로 브라우저에 있는 쿠키가 털린다 해도 문제가 없다.


이러한 내용은 레일즈의 공식 도큐멘트 [레일즈 세큐리티 가이드]에도 설명되어있다.

# 서버에 Session값을 저장하는 방법

이 포스트에서 자세히 설명하지는 않겠지만 서버에 Session값을 저장하는 장소로
RDS,memcached,redis등이 있다.

각각의 장단점이 있지만 대체적으로 memcached를 이용하는 방법이 일반적이다.


# 메모

## 삽질한 부분

rails의 디폴트 설정으로 cookie에 저장된 Session값은 브라우저 종료시 사라지는게 맞는데
필자가 만든 서비스는 브라우저를 닫아도 cookie값이 지워지지 않았다.

이상하다 생각하고 회사 선배에게 물어봤더니 브라우저를 종료했다가 열어보라해 그대로 해보니
cookie가 삭제된것을 확인했다.

필자의 PC는 맥북인데 브라우저를 닫았다고 생각했는데 실제로는 닫기지 않았던것이다..

## 레일즈에서 session정보를 저장하는 방법


```ruby
session[:user_id] = user.id
```

## cookie_store 방식의 우수한 가성비

cookie_store 방식은 가성비가 좋은 인증방법이라고 생각한다.

세큐리티 부분도 어느정도 걱정이 없고(문제가 없진 않다) cookie를 이용함으로 개발하기도 편하다.

같은 도메인이고 같은 포트라면 API서버에서 따로 토큰방식으로 인증을 만들 필요없이
cookie를 사용해 인증이 가능하기 때문이다.

[stack over flow]: https://stackoverflow.com/questions/16214800/does-rails-provide-default-session-time-out-duration-if-yes-where-is-it-specif


### reference:

```
https://techracho.bpsinc.jp/hachi8833/2018_10_23/62858
https://railsguides.jp/security.html#%E3%82%BB%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%B9%E3%83%88%E3%83%AC%E3%83%BC%E3%82%B8
```