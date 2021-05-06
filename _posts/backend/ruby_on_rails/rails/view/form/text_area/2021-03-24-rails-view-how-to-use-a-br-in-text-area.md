---
layout: post
title: "Rails text_area에서 개행과 링크주소(a태그,a href)를 html코드로 만들기(with. Rinku)"
author: negabaro kim
tags: rails/view
---


## 결론

```ruby
a = safe_join(content.split("\n"),tag(:br))
b = Rinku.auto_link(a)
c = b.html_safe
```

로 해결


---

클라이언트로부터 게시판 상세페이지 정보를 기본 이스케이핑하되 http or https로 시작하는 url문자열은 이스케이핑 없이 a링크로 표시하고 `개행(\n)`도 이스케이핑 없이 `<br />`태그로 바꿔달라는 요건이 있었다.


## 이 요건을 클리어 하기위해 한것들


### 1. 개행을 <br />로 치환

safe_join을 사용했다.

```ruby
safe_join(content.split("\n"),tag(:br))
```

[Rails simple_format에 대해 알아보자] 과 [Rails safe_join에 대해 알아보자] 에서 살펴보았듯이 
simple_format과 달리 safe_join은 연속된 개행도 `<br />`태그로 바꿔줄 수 있어 safe_join을 선택


### 2. http,https로 시작되는 문자열은 a링크로 변환

이 부분은 2가지 방법이 있었는데 [Rinku]라는 Gem을 사용하는 편이 간단해서 이 방법을 이용

Gemfile에 rinku추가해주고

```ruby
gem 'rinku'
```

bundle install후 


view단에서 아래와 같이  기술하기만 하면된다.

```ruby
Rinku.auto_link(a)
```


---

## 메모


### rinku옵션

자세한건 [Rinku]를 참조

두번째 인자에는  mode라고 해서 url만 대상으로 할지 email도 대상으로 할지 타깃을 정할 수 있다.

> mode is a symbol, either :all, :urls or :email_addresses, which specifies which kind of links will be auto-linked.


3번째 인자에 html옵션을 넣을 수 있는데 예를들어 style이나 target값 조정을 할때 쓴다.

아래는 예제

```ruby
Rinku.auto_link(sj, nil, 'style="color: #8fd1ea;" target="_blank"')
```



### rinku를 사용하지 않는 방법


applcation_helper.rb에 아래와 같은 파일을 추가하고

```ruby
module ApplicationHelper
  require "uri"

def text_url_to_link text

  URI.extract(text, ['http','https'] ).uniq.each do |url|
    sub_text = ""
    sub_text << "<a href=" << url << " target=\"_blank\">" << url << "</a>"

    text.gsub!(url, sub_text)
  end

  return text
end
end
```

아래와 같이 호출해주면 된다.

```ruby
text_url_to_link(text)
```



---

[Rails simple_format에 대해 알아보자]: https://negabaro.github.io/archive/rails-view-simple_format

[Rails safe_join에 대해 알아보자]: https://negabaro.github.io/archive/rails-view-safe_join

[Rinku]: https://github.com/vmg/rinku
