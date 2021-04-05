---
layout: post
title: "Rails Rails.application.config.filter_parameters설정에 대해"
author: negabaro kim
tags: rails/config
---

## filter_parameters

```ruby
#config/initializers/filter_parameter_logging.rb
Rails.application.config.filter_parameters += ['password', 'card_number']
```

와 같이 선언하면 로그에서 해당 key를 가진 값들을 [FILTERED]로 표기해준다.

```
{
  email: 'test@test.test',
  password: '[FILTERED]',
  card_number: '[FILTERED]'
}
```


## 메모


`gem 'grape_logging'`사용시 include에 `GrapeLogging::Loggers::FilterParameters.new,`를 추가해주면 디폴트로 filter_parameters설정을 참고해서 로그필터가 가능하다.


```ruby
require 'grape_logging'
use GrapeLogging::Middleware::RequestLogger,
    logger: Rails.logger,
    include: [GrapeLogging::Loggers::FilterParameters.new]
```



---


[Railsのlogに出したくない情報をちゃんと出さないようにする]: https://qiita.com/kakkunpakkun/items/4639bc653924e2dc8dbe