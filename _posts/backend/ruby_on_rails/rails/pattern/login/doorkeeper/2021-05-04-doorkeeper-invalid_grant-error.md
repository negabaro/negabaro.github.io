---
layout: post
title:  DoorKeeper사용시 invalid_grant에러(The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client)
tags: rails/doorkeeper
---

## 에러 내용

영어로는 [invalid_grantエラーメッセージ英語]설정에 의해 아래와 같이 표시되었다.

```
The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.
```

## 에러 해결방법

필자의 경우 doorkeepr에서 유효성 검증을 하려했던 jwt토큰의 iat시간과 현재시간에 갭이 생겨
유효성 검증에 실패한것이 원인이었다.

사용하고 있는 맥OS의 시간을 정상적으로 고치니 제대로 동작함.


---

## 위 에러의 원인이 다양함

[mofmof]의 글을 보면
redirect_uri설정에 문제가 있을때도 발생했다고한다.

그도 그럴것이 에러내용 자체가 5개나 된다.

1. The provided authorization grant is invalid
2. expired
3. revoked
4. does not match the redirection URI used in the authorization request
5. or was issued to another client.


## 코드


코드로 보면 아래패턴에서  해당에러가 발생한다.


[code1]참고

```ruby
validate :grant,        error: :invalid_grant
# @see https://tools.ietf.org/html/rfc6749#section-5.2
validate :redirect_uri, error: :invalid_grant
validate :code_verifier, error: :invalid_grant
```

[code2]참고

```ruby
raise Errors::InvalidGrantReuse if refresh_token.revoked?
```

[code3]참고

```ruby
raise Errors::InvalidGrantReuse if grant.revoked?
```



---

## 메모



### 실제 API에러



```
Authentication failure! invalid_credentials: OAuth2::Error, invalid_grant: The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client
```


## 어플단 에러(flutter)

flutter:  www-authenticate: Bearer realm="Doorkeeper", error="invalid_grant", error_description="xx
flutter:  x-request-id: a5a054ed-7f5a-4416-ab8e-c8d174df9c3a
flutter:  x-download-options: noopen
flutter:  x-runtime: 0.069790
flutter:  x-frame-options: SAMEORIGIN
flutter:  x-content-type-options: nosniff
flutter: Response Text:
flutter: {"error":"invalid_grant","error_description":"指定された認可グラントは無効か、有効期限切れか、リダイレクトURIが異なるか、もしくは別のクライアントに適用されています。"}



[invalid_grantエラーメッセージ日本語]설정에 의해 아래 에러가 표시됨

```
指定された認可グラントは無効か、有効期限切れか、リダイレクトURIが異なるか、もしくは別のクライアントに適用されています。
```

---

[code1]: https://github.com/doorkeeper-gem/doorkeeper/blob/2418589bb3074a6bbcde4369dd18d0de93afcffc/lib/doorkeeper/oauth/authorization_code_request.rb#L8-L11


[code2]: https://github.com/doorkeeper-gem/doorkeeper/blob/2418589bb3074a6bbcde4369dd18d0de93afcffc/lib/doorkeeper/oauth/refresh_token_request.rb#L35

[code3]: https://github.com/doorkeeper-gem/doorkeeper/blob/2418589bb3074a6bbcde4369dd18d0de93afcffc/lib/doorkeeper/oauth/authorization_code_request.rb#L30


[mofmof]: https://tech.mof-mof.co.jp/blog/rails5-devise-doorkeeper/

[invalid_grantエラーメッセージ英語]: https://github.com/doorkeeper-gem/doorkeeper-i18n/blob/master/rails/locales/en.yml#L114

[invalid_grantエラーメッセージ日本語]: https://github.com/doorkeeper-gem/doorkeeper-i18n/blob/master/rails/locales/ja.yml#L114