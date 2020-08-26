---
layout: post
title:  "Rails6 google-oauth2 && google-api-client를 이용해서 YouTube Data API에 억세스 하는 방법"
author: negabaro kim
tags: rails devise
---

# 개요

이 포스트에서는 rails에서 google-api-client를 이용해  YouTube Data API에 억세스하는 방법에 대해 정리해본다.

devise,omniauth,google-oauth2의 설정이 끝났다는 전제로 설명한다.
자세한 내용은 [Rails6 devise && omniauth && google-oauth2를 이용해 인증로직을 구현해보자] 이 부분을 참고바란다.



# Gemfile

우선 Gemfile에 아래 gem을 추가해서 bundle install 해주자.

```ruby
gem 'google-api-client'
```

google-api-client의 스팩은 [google-api-ruby-client github]을 참고


# refresh_token 추가 

google-api-client이용해서 api취득시 반드시 필요한 refresh_token을 저장해놀 컬럼을 추가해주자
(컬럼명은 뭐든지 상관없음)

필자는 db migration에 refresh_token을 추가해줬다.

```ruby
#db/migrate/20200818194423_devise_create_users.rb
t.string :refresh_token
```

# user create시 refresh_token을 컬럼에 추가

User작성시 위에서 작성한 refresh_token에 값을 넣어준다.
추가라고 커맨트한 부분만 추가해주면 된다.

```ruby
  protected
  def self.find_for_google(auth)
    user = User.find_by(email: auth.info.email)

    unless user
      refresh_token = auth.credentials.refresh_token # <<추가
      user = User.create(email:         auth.info.email,
                         provider:      auth.provider,
                         uid:           auth.uid,
                         token:         auth.credentials.token,
                         refresh_token: refresh_token, # <<추가
                         #password: Devise.friendly_token[0, 20],
                         meta:     auth.to_yaml)
    end
    user
  end
```

# scope추가

google api사용시 사용범위를 정해주는 부분에 이번에 사용할 Youtube Data Api억세스에 필요한
범위를 추가해준다.

```ruby
#config/initializers/devise.rb
  config.omniauth :google_oauth2,
                  ENV['GOOGLE_APP_ID'],
                  ENV['GOOGLE_APP_SECRET'],
                  skip_jwt: true,
                  name: :google,
                  scope: %w(email https://www.googleapis.com/auth/youtube.readonly) # <<추가
```


여기까지 설정이 별문제없다면 Youtube Data Api에 억세스가 가능하다.

# api 예제

필자는 아래와 같은 api를 만들어서 정상동작하는것을 확인했다.


```ruby
class Api::YoutubeController < ApplicationController
  before_action :authenticate_user!
  require 'google/api_client/client_secrets.rb'
  require 'google/apis/youtube_v3'

  def video
    service = Google::Apis::YoutubeV3::YouTubeService.new #1. 인스턴스 생성
    service.authorization = google_secret.to_authorization #2. ClientSecrets 인스턴스 생성
    service.authorization.refresh! #3. 인증 refresh
    opt = {
      id: '9bZkp7q19f0', #싸이 강남스타일
    }
    res = service.list_videos(:snippet, opt) # 4. api취득
    render :json => res
  end

  private
  def google_secret
    Google::APIClient::ClientSecrets.new(
      { "web" =>
        { "access_token" => current_user.token,
          "refresh_token" => current_user.refresh_token,
          "client_id" => ENV['GOOGLE_APP_ID'],
          "client_secret" => ENV['GOOGLE_APP_SECRET'],
        }
      }
    )
  end
```


# 메모

## API Class: Google::Apis::YoutubeV3::YouTubeService

Youtube Data Api의 자세한 Document는 아래 URL을 참고하자.

https://www.rubydoc.info/github/google/google-api-ruby-client/Google/Apis/YoutubeV3/YouTubeService



## accessNotConfigured: YouTube Data API v3 has not been used in project xx

API유효화를 안시켜주면 아래와 같은 에러가 나온다.
해당 에러에 있는 링크를 클릭해서 API유효화를 해주자.

```
accessNotConfigured: YouTube Data API v3 has not been used in project xx before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/youtube.googleapis.com/overview?project=xx then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.
```



## Google::Apis::AuthorizationError (Unauthorized)

refresh_token설정이 없으면 에러가 발생한다.

특히 api실행시

```ruby
service.authorization.refresh!
```

이 부분이 없으면 첫 로그인후 문제없이 움직이다 token유효기간이 끝난후 
`Google::Apis::AuthorizationError (Unauthorized):`에러가 발생하므로 주의가 필요하다.



---

### reference:

[google-api-ruby-client github]: https://github.com/googleapis/google-api-ruby-client

[Rails6 devise && omniauth && google-oauth2를 이용해 인증로직을 구현해보자]: https://negabaro.github.io/archive/rails-devise-with-google-oauth2


```
https://medium.com/@amoschoo/google-oauth-for-ruby-on-rails-129ce7196f35
https://qiita.com/taptappun/items/a217b7017316881d6459

```