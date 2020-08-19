---
layout: post
title:  "Rails6 devise && omniauth && google-oauth2를 이용해 인증로직을 구현해보자"
author: negabaro kim
categories: rails devise
---

이번 포스트에서는 devise && omniauth google oauth2를 이용해 인증로직을 구현하는 방법에 대해 알아보자.

이 포스트에서는 devise의 기본설정이 끝난상태를 전제로 설명한다.

devise의 인스톨 방법은 [Rails devise인스톨 방법]를 참조바란다.


# Gemfile

```ruby
gem "devise"
gem 'omniauth' #add
gem 'omniauth-google-oauth2' #add
```

# User의 migrate설정

[Rails devise인스톨 방법] 설정후 아래의 컬럼을 추가해줘야한다.(meta는 필수아님)

```ruby
t.string :provider,
t.string :uid,
t.string :token,
t.text :meta
```

# controller설정


```app/controllers/users/omniauth_callbacks_controller.rb```패스에
아래와 같은 컨트롤러를 추가해준다.

`find_for_google`은 모델설정에서 후술


```ruby
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google
    @user = User.find_for_google(request.env['omniauth.auth'])

    if @user.persisted?
      flash[:notice] = I18n.t 'devise.omniauth_callbacks.success', kind: 'Google'
      sign_in_and_redirect @user, event: :authentication
    else
      session['devise.google_data'] = request.env['omniauth.auth']
      redirect_to new_user_registration_url
    end
  end
end
```

# config/routes.rb

루팅설정에서 위에서 추가해준 컨트롤러의 패스를 넣어준다.


```ruby
Rails.application.routes.draw do
  devise_for :users, controllers: {
    omniauth_callbacks: "users/omniauth_callbacks"
  }
end
```
# app/models/user.rb

모델은 아래와 같이추가 meta는 필수항목이 아니므로 삭제해도 좋다.

```ruby
class User < ApplicationRecord
  devise :omniauthable, omniauth_providers: %i(google)

  protected
  def self.find_for_google(auth)
    user = User.find_by(email: auth.info.email)

    unless user
      user = User.create(email:     auth.info.email,
                         provider: auth.provider,
                         uid:      auth.uid,
                         token:    auth.credentials.token,
                         meta:     auth.to_yaml)
    end
    user
  end
end
```

# config/initializers/devise.rb

google_oauth2를 위한 설정이다. `skip_jwt: true`넣어주지 않으면 `Invalid iat`에러 발생함.
에러내용은 마지막에 설명함.

```ruby
  config.omniauth :google_oauth2,
                  ENV['GOOGLE_APP_ID'], 
                  ENV['GOOGLE_APP_SECRET'],
                  skip_jwt: true,
                  name: :google,
                  scope: %w(email) 
```

# .envrc

환경변수 추가

GOOGLE_APP_ID와GOOGLE_APP_SECRET의 값은 [Google Developers Console]에서 프로젝트 생성 -> 인증정보를 추가함으로 얻을 수 있다. 자세한 설명은 생략


```ruby
GOOGLE_APP_ID='*************************************************'
GOOGLE_APP_SECRET='*****************'
```


# view

아무 view에서 `user_google_omniauth_authorize_path`링크를 클릭시 
google login을 진행한다.

존재하지 않은 email로 로그인을 하면 회원가입처리된후 `user_signed_in?`에 의해 logout라는 메시지가 나올것이다.


```ruby
= link_to 'Signin with Google', user_google_omniauth_authorize_path
- if user_signed_in?
  h1 logout
- else
  h1 no login
```


----------------------

# 메모

## meta컬럼은 필수가 아님.

google에서 받을 수 있는 정보를 yaml형태로 모두 meta정보에 넣고 있는듯
참고용도로 추가했으며 필수설정은 아니다.

## undefined method `current_sign_in_at' devise에러

`:trackable`을 삭제하면 위에러가 발생하지 않았다.


# Invalid iat에러

```
raise(JWT::InvalidIatError, 'Invalid iat') if !iat.is_a?(Numeric) || iat.to_f > Time.now.to_f
```

config설정에서 `skip_jwt: true`추가해주면 해결

```ruby
config.omniauth :google_oauth2, ENV["GOOGLE_ID"], ENV["GOOGLE_SECRET"], skip_jwt: true
```

https://github.com/zquestz/omniauth-google-oauth2/issues/197#issuecomment-148629219


[Rails devise인스톨 방법]: https://negabaro.github.io/archive/devise-install
[Google Developers Console]: https://console.developers.google.com/project