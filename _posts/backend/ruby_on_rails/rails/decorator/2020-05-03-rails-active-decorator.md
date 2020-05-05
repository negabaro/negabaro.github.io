---
layout: post
title: "Rails6.0 active decorator 설정방법"
author: negabaro kim
categories: rails
tags: rails
---



# 설정방법


### install

```ruby
gem 'active_decorator'
bundle install
```
### generator

```ruby
bundle exec rails g decorator user
```

추가해줄 모델을 지정해서 실행



# decorator 설정

```ruby
#app/decorators/user_decorator.rb
module UserDecorator
  def full_name
    last_name + first_name
  end
end
```

`rails g decorator user`커맨드로 생성된`app/decorators/user_decorator.rb`파일에
메소드를 추가해준다.



# controller 설정

특별한 설정이 필요없다
인스턴스를 view로 넘겨주기만 하면된다

```ruby
def edit
  @user = User.find(param[:id])
end
```


# view 설정

```ruby
= @user.full_name
```

`app/decorators/user_decorator.rb`에 추가해준 메소드를
그대로 써주기만 하면됨


# devise사용시 문제점

devise와 같이 controller에서 인스턴스를 넘겨주지 않으면 메소드가 찾을 수 없다고 에러가 나온다
해결방법은 2가지

### 첫번째 방법. 컨트롤러에서 current_user를 @user에 넘겨준다

```ruby
def edit
  @user = current_user
end
```

이렇게만 해주면 `current_user.full_name`이 동작함
@user.full_name만 동작할 줄 알았는데..이유는 잘모르겠다

### 2번째 방법.

application_controller에서 재정의

```ruby
#app/controllers/application_controller.rb
def current_user
  ActiveDecorator::Decorator.instance.decorate(super) if super.present?
  super
end
```

컨트롤러에서 매번 인스턴스 넘겨주는게 귀찮으므로 2번째 방법을 선택


### reference:

```
https://qiita.com/yatmsu/items/2f05517d36267780aec2
https://github.com/amatsuda/active_decorator
```