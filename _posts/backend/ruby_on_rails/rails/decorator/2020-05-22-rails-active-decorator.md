---
layout: post
title: "Rails6.0 active decorator 설정방법"
author: negabaro kim
categories: rails
tags: rails
---

# active decorator란

drapper보다 심플한 decorator
decorate한 로직들은 오직 뷰에서만 보세요~
라는 설정을 강제한게 특징이다.

decorate를 일일이 정의할 필요가 없다.


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

devise와 같이 controller에서 인스턴스를 넘겨주지 않으면 메소드가 찾을 수 없다는 에러가 나온다
해결방법은 2가지

### 첫번째 방법. 컨트롤러에서 current_user를 @user에 넘겨준다

```ruby
def edit
  @user = current_user
end
```

개인적으로는 컨트롤러를 보고 어떤 인스턴스를 뷰에 넘기는지 확실히 알 수 있기에 이방법을 선호
그러나 current_user같이 거의 모든 서비스에서 사용하는 경우 이방법이 오히려 일일히 컨트롤러에 선언해야 하므로 귀찮을 수 있다.

이렇게만 해주면 `current_user.full_name`이 동작함
@user.full_name만 동작할 줄 알았는데..이유는 잘모르겠다

### 두번째 방법.

application_controller에서 재정의

```ruby
#app/controllers/application_controller.rb
def current_user
  ActiveDecorator::Decorator.instance.decorate(super) if super.present?
  super
end
```

해당 메소드를 오버라이드에서 직접 decorate하는 방법이다.
컨트롤러에서 매번 인스턴스 넘겨주는게 귀찮으므로 2번째 방법을 선택

# 메모1. (view이외에서 사용하는법)

기본 view에서만 사용가능하지만 뷰이외에서 사용하게 하는방법은 존재한다

사용예

```ruby
user = ActiveDecorator::Decorator.instance.decorate(User.find(1))
user.full_name #decorate사용!!
```

# 메모2.

레이어를 나눌 수 있다면 모듈로 따로 정의해서 decorator fat되지 않게 하자


```ruby
module UserDecorator
  # 공통처리하는 부분
  # PeopleDecorator모듈을 임포트
  include PeopleDecorator
end
```

# 메모3.

decorator의 테스트파일 작성방법
decorate상태의 클래스 작성을 위해 ```모델명.extend Decorator클래스명```로 정의


```ruby
# spec/decorators/user_decorator_spec.rb
require "rails_helper"

describe UserDecorator do
　# 이 부분이 포인트
  let(:user) { create(:user).extend UserDecorator }
  subject { user }
  it { should be_a User }

  describe "full_name" do
    subject { user.full_name }
    it { is_expected.to eq "#{user.first_name} #{user.last_name}" }
  end

  # link_to등Viewhelper을 사용한 테스트를 사용시 ActionView도 extend
  let(:user_w_viewhelper) do 
    create(:user).extend(UserDecorator).extend(ActionView::Helpers)
  end　　
end
```

### reference:

```
https://kic-yuuki.hatenablog.com/entry/2019/07/07/164550
https://qiita.com/yatmsu/items/2f05517d36267780aec2
https://github.com/amatsuda/active_decorator
```