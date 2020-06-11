---
layout: post
title:  "rails okcomputer를 이용한 healthcheck url만들기"
tags:	rails rails/tip
---

# okcomputer란?

healthcheck용 url을 간단히 만드는 gem이다.

# 설정방법

```ruby
gem 'okcomputer'
bundle install
```

만 해주면 설정이 끝난다.

# 확인방법

레일즈 재기동후 이하 path에 억세스가 되는지 확인


/okcomputer
/okcomputer/all
/okcomputer/default
/okcomputer/database


레일즈의 컨트롤러 동작여부와 데이터베이스 접속여부 둘다 체크하려면 `okcomuter/all`
을 사용한다. 
필자는 이걸로 ALB에서 ec2인스턴스의 healthcheck를 하고있다.

## 그외

/okcomputer path 이외에는 .json을 추가하면 JSON포맷을 리턴한다.


# 메모1. i18n에러 translation missing: ja.okcomputer.check.passed


필자가 테스트한 프로젝트는 `config.i18n.default_locale = :ja`
설정이 들어가 있어서 i18n에서 ja설정이 없다는 에러가 발생했다.
(gem을 보면 en.yml을 기준으로 만들어져있음)


해결방법으로 아래와 같이 ja에 해당하는 locales설정을 추가해줬다.

```ruby
translation missing: ja.okcomputer.check.passed
```

```yml
#config/locales/okcomputer.ja.yml
ja:
  okcomputer:
    check:
      passed: "%{registrant_name}: PASSED %{message} (%{time})"
      failed: "%{registrant_name}: FAILED %{message} (%{time})"
```


### reference:

https://qiita.com/dany1468/items/3b2f9c38d859d0fcd9b2
https://github.com/sportngin/okcomputer