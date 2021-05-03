---
layout: post
title:  "firebase_id_token gem에 대해 알아보자."
author: negabaro kim
tags: infra/firebase/authentication
---

## firebase_id_token gem이란?

ruby에서 `Firebase ID Token`이 정상적인 서명값을 가지고 있는지 검증(verify)해주는 gem이다.

이때 `Google's x509`키를 이용해 서명값을 검증하는데 해당 키들을 redis에서 관리한다.

즉 이 gem을 사용하기 위해서는 반드시 redis가 필요하다.

> A Ruby gem to verify the signature of Firebase ID Tokens. It uses Redis to store Google's x509 certificates and manage their expiration time, so you don't need to request Google's API in every execution and can access it as fast as reading from memory.


## 어디에서 쓰나?

필자는 클라이언트에서 보내온 firebase_id_token의 유효성을 서버단에서 검증할때 이 gem을 사용했다.

해당 검증이 끝나면 doorkeeper gem에서 백엔드 서버의 정보에 접근가능한 access_token을 발행해서 클라이언트에 넘겨주는 방식이다.

---


## OS의 타임존에도 의존함.

위에서 언급한 redis외에도 OS시간에 의존해 동작하는 부분이 있어 주의가 필요하다.

예를들어 mac에서 동작한다고 할때 맥OS의 시간설정이 1분 느린경우, 1분이 지날때까지 유효성 검증에 실패해 버린다.

이 부분은 firebase_id_token gem만의 문제는 아니고 `jwt`의 유효성검증시 나타나는 공통적인 문제로 주의가 필요하다.


## 주요 메소드


이하에서는 firebase_id_token 내부에서 사용하는 주요 메소드에 대해 알아보자


### 발행한 키 전체를 확인하는 방법

redis안에 저장되어있는 키이다.

```ruby
FirebaseIdToken::Certificates.all
```


```ruby
=> [{"cc3f4e8b2f1d02f0ea4b1bdde55add8b08bc5386"=>
   #<OpenSSL::X509::Certificate
    subject=#<OpenSSL::X509::Name CN=securetoken.system.gserviceaccount.com>,
    issuer=#<OpenSSL::X509::Name CN=securetoken.system.gserviceaccount.com>,
    serial=#<OpenSSL::BN 396438985964157741>,
    not_before=2021-04-30 09:20:20 UTC,
    not_after=2021-05-16 21:35:20 UTC>},
 {"4e9df5a4f28ad025064d66553bcb9b339685ef94"=>
   #<OpenSSL::X509::Certificate
    subject=#<OpenSSL::X509::Name CN=securetoken.system.gserviceaccount.com>,
    issuer=#<OpenSSL::X509::Name CN=securetoken.system.gserviceaccount.com>,
    serial=#<OpenSSL::BN 8324807083683462874>,
    not_before=2021-04-22 09:20:20 UTC,
    not_after=2021-05-08 21:35:20 UTC>}]
```

### 키가 없을때 새로 추가하는 방법

```ruby
FirebaseIdToken::Certificates.request
```


### 키를 새로 덮어쓰기하는 방법 

```ruby
FirebaseIdToken::Certificates.request!
```


※ 필자가 관리하는 프로젝트에서는 10분에 한번 새로운 키로 덮어쓰는 cron이 동작하고 있었다.
정기적 재발행이 반드시 필요한가에 대해서는 조사중



### id token체크하는 방법

아래와 같은 로직으로 id_token의 유효성을 검증하고 있다.

```ruby
@payload ||= FirebaseIdToken::Signature.verify(@id_token)
```

---

[firebase_id_token-signature]: https://github.com/fschuindt/firebase_id_token/blob/master/lib/firebase_id_token/signature.rb