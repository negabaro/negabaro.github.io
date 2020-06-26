---
layout: post
title:  "rails escape_javascript란?"
description: "javascript코드안에서 레일즈의 변수나 render메소드 사용할때 사용"
tags:	rails rails/tip
---

# escape_javascript란?

rails에서 제공하는 헬퍼로
javascript코드안에서 레일즈의 변수나 render메소드 사용할 수 있다.

SSR에서 html돔과 js를 생성한후 클라이언트 사이드에 넘긴후 해당 js를 읽어 실행하는 방식
SSR은 rails의 세상이므로 rails의 헬퍼로 js를 지지고 볶는게 가능


# 사용예(erb)

```ruby
$("#follow_form").html("<%= escape_javascript(render('users/unfollow')) %>");
$("#followers").html('<%= @user.followers.count %>');
```

# 사용예(slim)

컨트롤러에서 변수로 modal_id를 넘기고 그걸 이용해서 특정 element를 취득하는 예제
slim에서는 `"#{}"`안에서 사용함.

```ruby
let modal = document.getElementById("#{escape_javascript(modal_id)}");
```

# escape_javascript의 실제코드 

[github 코드]를 참고

```ruby
def escape_javascript(javascript)
  javascript = javascript.to_s
  if javascript.empty?
    result = ""
  else
    result = javascript.gsub(/(\\|<\/|\r\n|\342\200\250|\342\200\251|[\n\r"']|[`]|[$])/u, JS_ESCAPE_MAP)
  end
  javascript.html_safe? ? result.html_safe : result
end
alias_method :j, :escape_javascript
```




[github 코드]: https://github.com/rails/rails/blob/033a738817abd6e446e1b320cb7d1a5c15224e9a/actionview/lib/action_view/helpers/javascript_helper.rb#L29-L39