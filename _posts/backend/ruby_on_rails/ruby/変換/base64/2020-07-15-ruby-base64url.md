---
layout: post
title: "ruby Base64URL encoding이란?"
description: "Base64 encoding후 +을-로 /를 _로 치환한것을 Base64URL encoding이라 부른다."
author: negabaro kim
tags: ruby security
---

# base64URL이란?

Base64는 `A–Z, a–z, 0–9, +, /`와 같은 64개의 문자를 사용해서 ASCII코드를 문자열(텍스트)로 엔코딩하는 방식이다.

그런데 `+,/`는 URL파라메터로서 사용하기에는 다루기 어려운 문자라 해당문자를 각각 `-,_`으로 변환해서
사용하는것을 Base64URL엔코딩이라고 부른다.

RFC4648에 규정됨.

url외에 파일명에 사용해도 안전하도록 설계되어있음.


# Ruby에서 Base64URL encoding하는 방법

## 방법1(encode -> tr)

```ruby
require 'base64'
binary = "ab?cd~"
text = Base64.encode64(binary) #<<Base64 Encoding
base64url_text = text.tr('+/', '-_')
```

## 방법2(pack -> tr)

```ruby
binary = "ab?cd~"
text = [binary].pack('m')
base64url_text = text.tr('+/', '-_')
```
## 방법3(urlsafe_encode64)

```ruby
binary = "ab?cd~"
base64url_text = Base64.urlsafe_encode64(binary)
```


# Ruby에서 Base64URL decoding하는 방법



## 방법1(tr -> decode64)

```ruby
base64_text = base64url_text.tr('-_', '+/' )
Base64.decode64(base64_text)  
```

## 방법2(tr -> unpack)

```ruby
base64_text = base64url_text.tr('-_', '+/' )
base64_text.unpack('m')[0]
```

## 방법3(urlsafe_decode64)

```ruby
Base64.urlsafe_decode64(base64url_text)
```


### reference:

```
http://blog.s21g.com/articles/319
https://qiita.com/awakia/items/049791daca69120d7035
```