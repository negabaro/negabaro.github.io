---
layout: post
title:  "ruby URI.parse메소드에 대해서"
description: "문자열을 URI형태로 변환할때 사용"
author: negabaro kim
tags:	ruby ruby/parse
---

문자열을 URI형태로 바꿀때 사용
scan이나test등 정규표현을 이용해서 URI의 특정 문자열을 가져오는 로직이 많은데
정규표현을 이용하는거보다 코드가 심플해짐.


## 사용가능한 메소드

parse후 아래와 같이 4개의 메소드를 가진다.

```ruby
require 'uri'
p uri = URI.parse("http://www.ruby-lang.org/")

# => #<URI::HTTP:0x201002a6 URL:http://www.ruby-lang.org/>
p uri.scheme    # => "http"
p uri.host      # => "www.ruby-lang.org"
p uri.port      # => 80
p uri.path      # => "/"
```


## 특정 확장자를 가진값을 가져오는 예제

```ruby
url = "http://example.com/hello/how/are/you.png"
file = File.basename(URI.parse(url).path, ".png")
```


