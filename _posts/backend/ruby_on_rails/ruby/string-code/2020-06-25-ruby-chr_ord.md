---
layout: post
title:  "ruby 문자열에 해당하는 문자코드값 얻는방법(ord,chr,codepoints)"
author: negabaro kim
description: ord를 이용해서 문자열에 해당하는 문자코드값을 얻을 수 있다. 반대로 chr을 이용하면 문자코드값에 해당하는 문자열을 리턴받을 수 있다.
tags:	ruby
---

# 문자코드(character code)란?

컴퓨터상에 문자를 표시하기 위해 문자에는 고유의 숫자가 할당되어있다.
이것을 문자코드라고 부름.
ASCII코드,ShiftJIS(일본에서 사용),Unicode등이 있다.

예를들어 ASCII코드에서는 0의 문자코드는 48, A는 65이다.

# ord

ord를 이용하면 문자열에 해당하는 문자코드값을 리턴받을 수 있다.
디폴트로 ASCII코드로 변환된다.


```ruby
pp "-".ord # -> 45
```

# chr

chr은 ord의 반대로 문자코드값에 해당하는 문자열을 받을 수 있다.
문자코드값은 integer여야한다.

```ruby
pp "45".to_i.chr #-> -
```


# codepoints

문자코드 변환시 array형식으로 리턴 받고싶을때 codepoints를 사용함

```ruby
#coding:UTF-8
"hello わーるど".codepoints
# => [104, 101, 108, 108, 111, 32, 12431, 12540, 12427, 12393]
```

# 메모1. ASCII코드 범위 초과한 값을 chr사용시 파라메터에 Encoding::UTF_8를 넘겨줘야함.

ASCII코드 범위 초과한값을 chr사용시 파라메터에 Encoding::UTF_8를 넣어줘야한다.
안넣어주면 RangeError가 발생함.

```ruby
pp "8211".to_i.chr #2.rb:5:in `chr': 8211 out of char range (RangeError)
pp "8211".to_i.chr(Encoding::UTF_8)
```

### reference:

```
https://qiita.com/ryounagaoka/items/4cf5191d1a2763667add
https://maku77.github.io/ruby/number/ascii-char.html
https://techacademy.jp/magazine/19641
https://docs.ruby-lang.org/ja/latest/method/String/i/codepoints.html
```