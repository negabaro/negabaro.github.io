---
layout: post
title:  "rails6 cookie_store를 이용한 session관리시 유효기간에 대해"
description: "브라우저 종료시 해당 cookie는 사라진다."
tags: rails/security
---


# 개요

rails6에서 session값은 디폴트로 cookie_store 방식을 사용해 저장한다.

cookie_store는 rails의 secret_key_base라는 키값을 이용해 session정보를 암호화해
클라이언트에 전송후 브라우저의 cookie에 저장하는 방식이다.

cookie에 있는 session값을 제3자에게 탈취당해도 서버의 secret_key_base값을 모르므로 복호화 할 수 없는 구조이다.

이렇게 브라우저의 cookie에 저장된 session정보의 유효기간을 보면 Session이라고 적혀 있는것을 확인할 수 있는데
이는 디폴트설정으로 `브라우저 종료시 Session값을 쿠키에서 삭제`한다는 의미이다.

> By definition, sessions will expire after the browser is closed, they do not have timeout. If you open Chrome dev tools and look at the expiration date, it will say "Session" there instead of the date/time.

https://stackoverflow.com/questions/16214800/does-rails-provide-default-session-time-out-duration-if-yes-where-is-it-specif


# 유효기간을 설정하는 방법

cookie에 저장된 Session정보의 유효기간을 두기 위해서는 Rails의 설정에 expire_at을 추가할 필요가 있다.

# 삽질한 부분

이렇게 cookie에 저장된 Session값은 브라우저 종료시 사라지는게 맞는데
필자가 만든 서비스는 브라우저를 닫아도 cookie값이 지워지지 않았다.

이상하다 생각하고 회사의 선배에게 물어봤더니 브라우저를 종료했다가 열어보라해서 그대로 해보니
cookie가 삭제된것을 확인했다.

필자의 PC는 맥북인데 브라우저를 닫았다고 생각했는데 실제로는 닫기지 않았던것이다..


# 메모


## 레일즈에서 session정보를 저장하는 방법


```ruby
session[:user_id] = user.id
```

## cookie_store 방식의 우수한 가성비

cookie_store 방식은 가성비가 좋은 인증방법이라고 생각한다.

세큐리티 부분도 어느정도 걱정이 없고 cookie를 이용함으로 개발하기도 편하다.

같은 도메인이라면 && 같은 포트라면 API서버에서 따로 토큰방식으로 인증을 만들 필요없이
cookie를 사용해 인증이 가능하기 때문이다.
