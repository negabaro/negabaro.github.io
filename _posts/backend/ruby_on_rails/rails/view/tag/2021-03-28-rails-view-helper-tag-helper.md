---
layout: post
title:  "Rails tagHelper에 대해 알아보자."
author: negabaro kim
tags:	rails/view
---


## tagHelper란?

ruby코드로 html돔을 그릴때 사용하는 ViewHelper이다.

## 사용방법

```ruby
require "action_view"
include ActionView::Helpers::TagHelper
tag.br                            # => "<br>"
tag(:br)                          # => "<br />"
tag.p                             # => "<p></p>"
tag.p class: "a"                  # => "<p class=\"a\"></p>"
tag.p "content", class: "a"       # => "<p class=\"a\">content</p>"
tag.p(class: "a") { "content" }   # => "<p class=\"a\">content</p>"
tag.xxx                           # => "<xxx></xxx>"
```

## tag(:br)과 tag.br의 차이

기능적인 차이는 없지만

[tag(:br)은 deprecated될예정]

`tag.br`을 쓰면된다.


## content_tag와의 차이

content_tag는 레거지 코드도 아니고 tag와의 기능적 차이도 없다.

하지만 tag가 더 직관적이다.


```ruby
content_tag(:p, "xxx")            # => "<p>xxx</p>"
tag.p "xxx"                       # => "<p>xxx</p>"
```

class만 지정하고 싶을때도 tag가 쓰기편하고 가독성이 좋아보인다.

```ruby
content_tag(:div, "", class: "a") # => "<div class=\"a\"></div>"
tag.div class: "a"                # => "<div class=\"a\"></div>"
```

content_tag의 경우 인자순서를 바꿔쓰면 아래처럼 나와서 삽질하기 쉬운데 tag는 그런게 없어서 편하다.


```ruby
content_tag(:div, class: "a")     # => "<div>{:class=&gt;&quot;a&quot;}</div>"
```

---

## 헤맨부분

문자열에 `개행코드(\n)`가 있으면 `<br />`로 바꿔주고 `html_safe`로 escape하지않게 하는 로직을
데코레이터에서 작성하기 위해 아래와 같이 기술하면 tag메소드가 없다고 에러가 난다.

```ruby
safe_join(content.split("\n"),tag(:br)).html_safe
```

해결방법은 데코레이터에서 `TagHelper`를 로드해주면 되는데

```ruby
require "action_view"
include ActionView::Helpers::TagHelper
```

로드하는게 귀찮아서 아래와 같이 기술해줬다.

```ruby
safe_join(content.split("\n"),"<br />").html_safe
```

어짜피 `tag(:br)` 이 부분이 `<br />`이니 상관없다고 생각했는데 위와 같이 하면 정상적으로 개행이 되지않는다.(html_safe가 제대로 안먹힘)


왜일까?? 좀 찾아보니 tagHelper가 escape를 해주기 때문이었다.(단순문자열은 escape안해줌 view에서 `=` 뒤에오면 escape해줌)

escape를 안해준 상태의 문자열을 html_safe로 롤백해줬다 하더라도 단순문자열은 escape를 안해줬기때문에 롤백할 대상이 없는것

아래와 같이 h(html_escape)를 이용해 escape를 해줘도 정상작동 하는것을 확인했다.

```ruby
require "action_view"
include ActionView::Helpers::TextHelper
safe_join(content.split("\n"),h("<br />")).html_safe
```

잊지말자 tagHelper는 내부에서 escape를 해준다는것..!


코드는 [tag method]를 참고

---

[tag method]: https://github.com/rails/rails/blob/f33d52c95217212cbacc8d5e44b5a8e3cdc6f5b3/actionview/lib/action_view/helpers/tag_helper.rb#L236-L242

[tag(:br)은 deprecated될예정]: https://github.com/rails/rails/blob/9c35bf2a6a27431c6aa283db781c19f61c5155be/actionview/lib/action_view/helpers/tag_helper.rb#L193

[Rails 5.1 からは tag(:br) より tag.br を推奨]: https://qiita.com/akicho8/items/bd3fb6b78b1035053583

[tag document]: https://railsdoc.com/page/tag
