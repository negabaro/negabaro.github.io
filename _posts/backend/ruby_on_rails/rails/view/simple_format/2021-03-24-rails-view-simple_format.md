---
layout: post
title:  "Rails simple_format에 대해 알아보자"
author: negabaro kim
tags:	rails/view
---

## simple_format

Rails ActionView의 헬퍼메소드로 단순문자열이나 개행을 html tag로 변환 해준다.

자세한 내용은 [simple_format] 를 참고

## 구체적인 기능

1. 문자열을 <p>태그로 감싸줌

2. 개행은 <br>로 바꿔줌

3. 연속개행은 <br /> <br />로 바꿔주지 않고 </p><p>로 바꿔줌


## safe_join과의 차이

구체적인 기능 1,3에 차이가 있다.

1. safe_join의 경우 문자열을 <p>태그로 묶어주지 않음
3. simple_format은 연속개행은 무시하는데 반해 safe_join은 연속개행도 태그로 바꿔준다.

safe_join가 더 친절한 느낌??


## 사용방법

```ruby
simple_format("text")
```


---

[simple_format]: https://apidock.com/rails/ActionView/Helpers/TextHelper/simple_format