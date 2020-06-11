---
layout: post
title:  "Rails6 healthcheck url을 로그에서 제외하는 방법"
tags:	rails rails/log
---

# 경위

필자는 rails에서는 lograge로 json포맷으로 변경하고 해당 에러를 표준출력해서 내보내고
fargate/firelens 를 이용해 datadog에 보내 집약관리하고 있다.

가끔 staging,production환경에서 발생하는 버그해결을 위해
datadog의 live trail이라는 기능으로 로그를 체크하는데
정기적으로 들어오는 health check 로그가 필자의 디버깅 목적의 로그와 내마음을 오염시키고 있다.

그래서 health check log와 표준출력에서 제외시키로 결정.


# 설정방법

## lib에 Rails::Rack::Logger를 계승한 클래스 작성

어디든 autoload 되는곳이면 문제없다.

```ruby
# lib/custom_logger.rb
class CustomLogger < Rails::Rack::Logger
  def call(env)
    if ['/okcomputer/all'].include?(env['PATH_INFO'])
    #if env["REMOTE_ADDR"] =~ Rails.application.config.action_dispatch.trusted_proxies and !env["HTTP_X_FORWARDED_FOR"]
      Rails.logger.silence do
        super
      end
    else
      super
    end
  end
end
```

필자의 경우 okcomputer gem을 이용하기 때문에 
okcomputer/all에 억세스한 내용은 전부 healthcheck로 판단해서 제외시키기로함

그외에도 trusted_proxies를 보고 로드밸런스의 ip어드레스를 체크한다든지
X-Fowarded-For를 체크하는 방법이 있음.

위에 커맨트한 부분을 참고


## config/initializers 설정


```ruby
#config/initializers/custom_logger.rb
require "custom_logger"
Rails.application.config.middleware.swap Rails::Rack::Logger, CustomLogger
```


여기까지하고 레일즈를 재기동하면 /okcomputer/all에 억세스한 로그가 제외되는걸 확인할 수 있었다.


불필요한 로그가 사라져서 쾌적하게 로그분석이 가능해졌다.
오늘은 기분좋게 잠들 수 있을거 같다.
