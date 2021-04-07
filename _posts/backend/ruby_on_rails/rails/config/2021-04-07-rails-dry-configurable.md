---
layout: post
title: "Rails dry-configurable gem에 대해"
author: negabaro kim
tags: rails/config
---

## dry-configurable란?

[dry-rb]시리즈 중에 하나로 config/settings의 설정을 `Thread-safe`하게 선언이 가능한 gem이다.


> dry-configurable is a simple mixin to add thread-safe configuration behaviour to your classes. There are many libraries that make use of configuration, and each seemed to have their own implementation with a similar or duplicate interface, so we thought it was strange that this behaviour had not already been encapsulated into a reusable gem, hence dry-configurable was born.


## 사용방법

[document]를 참고

```ruby
#config/settings/default.rb
class App
  extend Dry::Configurable

  # Pass a block for nested configuration (works to any depth)
  setting :database do
    # Can pass a default value
    setting :dsn, 'sqlite:memory'
  end
  # Defaults to nil if no default value is given
  setting :adapter
  # Pre-process values
  setting(:path, 'test') { |value| Pathname(value) }
  # Passing the reader option as true will create attr_reader method for the class
  setting :pool, 5, reader: true
  # Passing the reader attributes works with nested configuration
  setting :uploader, reader: true do
    setting :bucket, 'dev'
  end
end
```


### 동작확인

```ruby
App.config.database.dsn
# => "sqlite:memory"

App.config.database.dsn = 'jdbc:sqlite:memory'
App.config.database.dsn
# => "jdbc:sqlite:memory"
App.config.adapter
# => nil
App.config.path
# => #<Pathname:test>
App.pool
# => 5
App.uploader.bucket
# => 'dev'
```

## 사용해본 감상

### 환경별 설정

문제 없었다.

config/settings/default.rb을 베이스로 선언해서 `config/settings/development.rb`을 재정의 하면 development환경에서는 development.rb의 정의를 우선참조 해줬다.

### 문자열 외에 값 선언시 유용

블록으로 선언이 가능해서 문자열 외의 값들을 다루기 편한 듯?

### Thread-safe

검증은 못해봤는데 뭐 잘 동작하겠지..


---

[dry-rb]: https://dry-rb.org/
[dry-configurable]: https://github.com/dry-rb/dry-configurable
[document]: https://dry-rb.org/gems/dry-configurable/0.11/
