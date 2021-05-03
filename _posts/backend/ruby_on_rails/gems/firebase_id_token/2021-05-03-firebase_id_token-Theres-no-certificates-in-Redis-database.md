---
layout: post
title:  "FirebaseIdToken::Exceptions::NoCertificatesError: There's no certificates in Redis database. 에러"
author: negabaro kim
tags: infra/firebase/authentication
---

## 에러내용

firebase_id_token사용시 아래와 같은 에러가 발생

```
FirebaseIdToken::Exceptions::NoCertificatesError: There's no certificates in Redis database.
```

## 해결방법

아래 커맨드로 key를 발행해주면 된다.


```ruby
FirebaseIdToken::Certificates.request
or
FirebaseIdToken::Certificates.request!
```

## 생성한 키 확인하는 방법

만들어진 키는 아래 커맨드로 확인이 가능하다.

```ruby
FirebaseIdToken::Certificates.all
```



## 특정키가 존재하는지 확인하는 방법

```ruby
@kid= 'key-name'
FirebaseIdToken::Certificates.find(@kid)
```



## 메모

### 키 정기적으로 재발행(덮어쓰기) cron으로 만들어주기

rails프로젝트라면 whenever를 이용하면 편하다. 로직은 아래와 같다.

```ruby
every 10.minutes do
  rake 'firebase:certificates:force_request'
end
```




```ruby
# frozen_string_literal: true

namespace :firebase do
  namespace :certificates do
    desc "Request Google's x509 certificates when Redis is empty"
    task request: :environment do
      FirebaseIdToken::Certificates.request
    end

    desc "Request Google's x509 certificates and override Redis"
    task force_request: :environment do
      FirebaseIdToken::Certificates.request!
    end
  end
end
```