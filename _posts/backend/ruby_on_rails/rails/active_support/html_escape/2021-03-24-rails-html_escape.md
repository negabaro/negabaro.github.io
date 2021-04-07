---
layout: post
title:  "Rails html_escape에 대해서 알아보자"
author: negabaro kim
tags: rails/view
---

## html_escape

이스케이핑시 실행되는 코드

`<%= %>`코드로 실행하는 경우 html_escape가 실행되면서 이스케이핑 처리된다.


## 하는 일

[escape란]에서도 언급했지만 특수문자를 단순 문자열로 표기가능한 `new제네레이션한 특수문자열(?)`로 바꿔준다.

예를들면 아래와 같은식으로 특수문자를 치환해준다.

```
<  -->  &lt;
>  -->  &gt;
&  -->  &amp;
"  -->  &quot;
```


## 사용방법

```ruby
html_escape('is a > 0 & a < 10?')
# is a &gt; 0 &amp; a &lt; 10?
```

```ruby
pp ERB::Util.html_escape("<html>");
"&lt;html&gt;"
```

## html_escape = h


h는 html_ecape의 alias이다.

둘다 같은 결과가 나온다.

```ruby
h('is a > 0 & a < 10?')
# is a &gt; 0 &amp; a &lt; 10?
```



---

## 참고

[html_scape code]

[document]

[escape란]

[document]: https://api.rubyonrails.org/classes/ERB/Util.html

[html_scape code]: https://github.com/rails/rails/blob/main/activesupport/lib/active_support/core_ext/string/output_safety.rb#L19-L21

[escape란]: https://negabaro.github.io/archive/rails-view-escape
