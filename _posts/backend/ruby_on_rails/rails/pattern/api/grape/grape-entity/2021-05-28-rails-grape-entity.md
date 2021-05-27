---
layout: post
title:  "rails Grape::Entity에 대해알아보자"
author: negabaro kim
tags:	rails
---

## Grape Entity(Grape::Entity)란?

`grape`를 보조해주는 라이브러리다.

`grape`가 요리사가 만든 요리라면 해당 요리를 데코레이팅 해주는 것이 `Grape::Entity`이다.

`grape`에서는 `present Object`로 api의 반환값을 나타내는데 이 값은 정제되지 않은 값으로

`Grape::Entity`로 해당 값에서 특정 부분만 표시하게 해준다든지 특정조건에만 보여주게 한다든지 하는것이 가능하다.

자세한 내용은 [grape-entity]를 참조

## Grape::Entity사용 방법


Gemfile에 grape-entity를 추가해주고 bundle install 해주자.

### Gemfile추가

```ruby
gem 'grape'
gem 'grape-entity' #< 추가
```

### entity파일 생성

`app/api/entities/v1/user_entity.rb`에 아래와 같은 파일을 만들어준다.(이것은 단순 예임)

```ruby
module Entities
  module V1
    class UserEntity < RootEntity
      expose :name, :email, :age
    end
  end
end
```


### 위에서 정의한 entity를 사용하는 방법

기존의 grape만 사용하던 부분인 `present 결과`을

`present 결과 with Entity클래스`로 정의해준다.

아래는 변경전과 변경후의 코드 예이다.(-가 변경전 +가 변경후)

```ruby
module Resources
  module V1
    class Users < Grape::API
      resource :users do
        # /api/v1/user
        desc 'user list'
        get do
-         present User.all
+         present User.all, with: Entities::V1::UserEntity
        end

        # /api/v1/user/{:id}
        desc 'user'
        params do
          requires :id, type: Integer, desc: 'user id'
        end
        get ':id' do
-         present User.find(params[:id])
+         present User.find(params[:id]), with: Entities::V1::UserEntity
        end
      end
    end
  end
end
```

## 동작확인

위에서 정의한 api에 억세스하면 결과값으로 `name, email, age`만 보여주는 결과로 바뀌어있을것이다.

```ruby
{
    "name": "Michael",
    "email": "michael@sample.com",
    "age": 33
}
```

여기까지 미니멈으로 grape entity를 사용하는 방법에 대해 알아봤고 아래에서 자주 쓰이는 옵션에 대해 알아보자.


### expose

노출하다라는 영어단어 의미 그대로 rails에서 발행한 쿼리의 결과값에서 어떤 부분을 보여줄지 지정해주는 부분이다.

```ruby
expose :name, :email, :age
```

### documentation

swagger와 같은 도큐멘트 툴에서 표기할 값들을 정의할때 사용

```ruby
expose :plans,
       documentation: { type: V1::Entities::Plans },
```

### if

특정조건이 true일때 노출하고 싶을때 사용한다.

예를들어 아래와 같은 조건을 정의했다면

```ruby
expose :plans,
       if: :with_plans_test,
       documentation: { type: V1::Entities::Plans },
```

이렇게 호출하지 않으면 위에서 정의한 expose는 보여주지 않는다.

#### 호출되는 예제

```ruby
present plans, with: V1::Entities::Plans, with_plans_test: true
```

#### 호출되지않는 예제

```ruby
present plans, with: V1::Entities::Plans
```




### as(expose에  alias설정)

expose에서 정의한 값은 실제 존재하는 attribute여야한다.

한편, expose에 정의한 내용은 실제 api반환값에 키로 반환이 되는데

api로 반환하고 싶은 값은 다른 내용으로 바꾸고 싶을때 as를 사용한다.

예를들어 user모델에서 `has_many :plans`로 정의한 값을 가져와서 보여주되 반환값의 key로는 items로 표시하고 싶을때 아래와 같이 사용한다.

```ruby
expose :plans,
       if: :with_plans_test,
       documentation: { type: V1::Entities::Plan },
       using: V1::Entities::Plan
       as: :items
end
```

[Apply alias for loop in grape entity]를 참고했다.

---

## memo


### expose에 존재하지 않는 attribute넣으면

아래와 같은 에러 발생

```ruby
caught error of type NoMethodError in after callback inside Grape::Middleware::Formatter : V1::Entities::Plans missing attribute `ttttt' on #<Plans:0x0000555ce877ac50>
```


---

[grape-entity]: https://github.com/ruby-grape/grape-entity
[Apply alias for loop in grape entity]: https://stackoverflow.com/questions/49647451/apply-alias-for-loop-in-grape-entity
