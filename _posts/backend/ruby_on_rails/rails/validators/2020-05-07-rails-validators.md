---
layout: post
title:  "rails6 EachValidator을 이용해서 validators 커스텀 하는법"
author: negabaro kim
categories: rails
tags:	rails
---

# custom validator를 하는 이유

### 1. DRY

프로젝트 내에서 사용하는 유효성 검사(validation)는 대게 중복될 가능성이 높으므로
validators class로 분리시켜서 DRY하게 코드를 짤 수 있음

### 2. 테스트 용이

분리한 클래스만 테스트하면 되므로 테스트 코드짜기가 수월함

### 3. debug 용이

gem까볼 필요없이 커스텀한 메소드안에서 `binding.pry` 를 실행해서 
확인하는 편이 debug하기 쉬움

### 4. 커스텀 용이

이건 장점이랄까 validate를 커스텀하려면 필수다.


# custom validator설정방법

### app/validators 디렉토리 생성 

```ruby
mkdir app/validators
```

꼭 이 디렉토리일 필요는 없지만 암묵적으로 `app/validators` 많이사용함


```ruby
#app/validators/tel_validator.rb
class TelValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value.presence
      if (m = value.to_s.match(ModelConstants::TEL_REGEXP))
        #validation성공후 추가로 custom할 코드가 있으면 여기에 정의
      else
        record.errors[attribute] << (options[:message] || "의 형식이 다릅니다.")
      end
    end
  end
end
```

`ModelConstants::TEL_REGEXP` 부분은 정규표현을 직접 넣어줘도되는데 
다른곳에도 쓰일거 같아서 concern화해줌


```ruby
#app/models/concerns/form_confirmable.rb
module ModelConstants
  TEL_REGEXP = %r"\A[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}\Z"
end
```

# 모델쪽 설정

```ruby
#app/models/user.rb

#before
#validates :tel, format: {with: /\A[0-9]{2,3}-[0-9]{4}-[0-9]{4}\z/}
#validates :emergency_tel, format: {with: /\A[0-9]{2,3}-[0-9]{4}-[0-9]{4}\z/}

validates :tel, tel: true
validates :emergency_tel, tel: true
```

`tel: true` 부분이 핵심인데 tel이라고 적으면 자동으로 `TelValidator`라는 클래스를 찾음
(역시 규약의 레일즈..!!)`test: true`라고 적어주면 `TestValidator`를 찾음


여기까지 문제없이 설정했다면 정상적으로 validation이 동작함

# 테스트 코드

class로 분리한 validators를 어떻게 테스트하는지도 알아보자.

validators테스트는 암묵적으로 `spec/validators`에서 많이들 사용함

```ruby
#spec/validators/tel_validator_spec.rb
require 'rails_helper'

RSpec.describe TelValidator, type: :model do
  let(:validator_options) { true }
  let(:model_class) do
    options = validator_options
    Struct.new(:tel) do
      include ActiveModel::Validations
      def self.name
        "DummyModel"
      end
      validates :tel, tel: options
    end
  end

  describe '#validate' do
    let(:tel) { '000-2222-3333' }

    subject { model_class.new(tel) }

    it { is_expected.to be_valid }

    context 'when valid tel' do
      
      context do
        let(:tel) { '000-222-3333' }
        it { is_expected.to be_valid(:tel) }
      end

      context do
        let(:tel) { '000-2222-3333' }
        it { is_expected.to be_valid(:tel) }
      end

      context do
        let(:tel) { '00022223333' }
        it { is_expected.to be_valid(:tel) }
      end
      context do
        let(:tel) { '0002223333' }
        it { is_expected.to be_valid(:tel) }
      end
      context do
        let(:tel) { '00-2222-3333' }
        it { is_expected.to be_valid(:tel) }
      end
      context do
        let(:tel) { '0022223333' }
        it { is_expected.to be_valid(:tel) }
      end
    end

    context 'when not valid tel' do
      context do
        let(:tel) { 'foo' }
        it { is_expected.not_to be_valid(:tel) }
      end
      context do
        let(:tel) { '0000-2222-3333' }
        it { is_expected.not_to be_valid(:tel) }
      end
      context do
        let(:tel) { '0000-222-3333' }
        it { is_expected.not_to be_valid(:tel) }
      end
    end

  end
end
```



# 메모1

참고한 포스트를 보면 아래와 같은 설정도 필요하다고 하는데
rails6에서는 없어도 움직임

```ruby
#confing/application.rb
 config.autoload_paths += Dir["#{config.root}/app/validators"]
```

```ruby
app/models/user.rb
#include ModelConstants
```

# 메모2 

이번 포스트에서는 `ActiveModel::EachValidator`를 이용해서 validator를 커스텀해봤는데
`ActiveModel::Validator`를 이용하는 방법도 있다.
둘의 차이는 멀티 컬럼에 validation설정하는 경우 `ActiveModel::Validator`를 사용한다고 한다

### ex)

```ruby
# app/validators/multi_presence_validator.rb
class MultiPresenceValidator < ActiveModel::Validator
  def validate(record)
    record.errors.add(:base, 'bust be presence') if options[:attributes].all? { |c| record.send(c).blank? }
  end
end
```


```ruby
class Person
  include ActiveModel::Validations
  attr_accessor :email, :name

  validates_with MultiPresenceValidator, attributes: [:email, :name]
end
```

# 메모3

```ruby
%r"\A[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}\Z"
```

정규표현 부분 앞에 %r이 있는데 이게 없으면

```
A regular expression or a proc or lambda must be supplied as :with
```

에러가 남

`%r`에 대해 찾아보니 「/」나「[ 」와 같은 문자의 에스케이프를 생략해줘서 가독성을 올려주는 역할을 한다고



### reference

[link1]: https://waterlow2013.hatenablog.com/entry/2016/10/11/011312