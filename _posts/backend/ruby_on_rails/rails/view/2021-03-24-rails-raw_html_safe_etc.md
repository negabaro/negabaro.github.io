---
layout: post
title:  "Rails 이스케이프 취소시 사용하는 html_safe, raw, == 메소드의 차이에 대해"
author: negabaro kim
tags: rails/view
---

## 결론

`「<%==」` > `raw` > `html_safe`

`「<%==」`를 쓰자.


## html_safe > raw

[RailsGuidesの「5.1 Output Safety」]를 보면 `To insert something verbatim use the raw helper rather than calling html_safe`이라고 기술되어있음.


```ruby
<%= @cms.current_template.html_safe %>
```

보다


```ruby
<%= raw @cms.current_template %>
```

raw를 쓰는걸 권장하고 있다.

## 왜?

명확한 이유는 도큐멘트에서 기술되어있지만 Rails Guild에서 권장한다면 뭔가 이유가 있긴 있을것이다.

필자가 생각하는 이유는 아래와 같다.

### 이유1. nil처리


`@cms.current_template`가 nil일때

```ruby
<%= @cms.current_template.html_safe %>
```

에러가 발생하지만

```ruby
<%= raw @cms.current_template %>
```

raw사용시에 에러가 발생하지 않으므로 에러처리 면에서 편하다.

물론 아래와 같이 적어주면 에러는 안나지만..

```ruby
<%= @cms.current_template&.html_safe %>
```


### 가독성

가독성면에서 raw가 보기편하다.

앞에 위치하니까 뒤에 위치하는거보다 코드 파악이 빠름


## `<%==` < raw


### 왜?

Rails Guilde에서는 `raw`와 함께 `<%==`도 권장되고 있다.

`raw`와 `<%==` 간에 위에서 서술한 nil처리라든가 기능적인 차이는 없는데
퍼포먼스적인 이점이 있다고 한다.

#### raw

```ruby
handler = ActionView::Template::Handlers::ERB.new
handler.call ActionView::Template.new('<p><%= raw val %></p>', '', handler, {})
# => "@output_buffer = output_buffer || ActionView::OutputBuffer.new;@output_buffer.safe_append='<p>';@output_buffer.append=( raw val );@output_buffer.safe_append='</p>';@output_buffer.to_s"
```

#### <%==

```ruby
handler = ActionView::Template::Handlers::ERB.new
handler.call ActionView::Template.new('<p><%== val %></p>', '', handler, {})
# => "@output_buffer = output_buffer || ActionView::OutputBuffer.new;@output_buffer.safe_append='<p>';@output_buffer.safe_append=( val );@output_buffer.safe_append='</p>';@output_buffer.to_s"
```
raw의 경우 `val#html_safe?`로직이 실행되고 `<%==`는 실행되지 않는 차이가 있다. 그래서

`@output_buffer.append=( raw val )`보다 `@output_buffer.safe_append=( val )`가 조금 빠를것이다.(큰 차이는 없고..)

---

[RailsGuidesの「5.1 Output Safety」]: https://guides.rubyonrails.org/active_support_core_extensions.html#output-safety

[html_safe、raw、「<%==」の比較]: https://qiita.com/iwamot/items/74c2bd9ebd3ac6458837
