---
layout: post
title:  "Rails의 html_safe 대해 알아보자"
author: negabaro kim
tags: rails/active_support
---


## html_safe

rails에서 자동으로 이스케이핑 되는 상황을 탈출할때 사용하는 메소드이다.(이스케이프 사용하지 않을때 사용하는 메소드)

html태그등을 단순문자열이 아닌 본연의 태그로서 표현할때 사용한다.

이스케이프에 대해서는 [Rails의 escape(이스케이프)에 대해 알아보자] 를 참고

## 사용용도

게시판이나 블로그 상세 페이지에서 `<a href="xx">`이런 문자열이 있으면 a태그로서 보여줄때 사용한다.

## 사용방법

```ruby
str.html_safe
```


## 주의사항

html_safe를 사용하면 완벽하게 escape를 사용하지 않게되므로 세큐리티에 취약할 가능성이 있다.

상황에 따라서 특정 문자열만 치환해준다거나 위험한 태그들을 제어할 수 있는 `sanitize`를 사용하는것이 권장되고 있다.


예를들면

```ruby
- test_text = "<a href='http://example.com'>web site</a><script type='text/javascript'>$('#test').on('click',function(){ alert('out!')});</script>"
= test_text.html_safe
```

아래와 같은 코드는 script로 읽어들여버림


---

[Link1]: https://www.javadrive.jp/rails/template/index7.html

[Link2]: https://qiita.com/suketa/items/bf4f422d7797fae97406

[Link3]: https://www.javadrive.jp/rails/template/index7.html

[Rails의 escape(이스케이프)에 대해 알아보자]: https://negabaro.github.io/archive/rails-view-escape
