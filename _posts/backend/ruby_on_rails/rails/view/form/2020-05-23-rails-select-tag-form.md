---
layout: post
title:  "rails select_tag form을 알아보자"
author: negabaro kim
categories: rails
tags:	rails
---

rails view template에서 자주사용하는 select_tag에 대해 이해해보자.



# select_tag

모델에 의존하지 않고 폼을 정의가능

기본문법은 이하와 같다.

```ruby
select_tag(name, option_tags = nil, html_options = {}, options = {})
```

### name

값을 얻기위한 문자열
nameはparams -> 値を拾うための文字列

### option_tags

option태그를 이용해서 셀렉트태그를 표시하는 문자열 보내는 값을 설정
option_tags부분을 `options_for_select`을 사용하면 가독성이 올라간다.
(options_for_select를 안쓰는 예제를 본기억이 없음 필수라고 생각해버리자)

#### options_for_select 도큐멘트
https://apidock.com/rails/ActionView/Helpers/FormOptionsHelper/options_for_select


### html_options

class,id등을 정의 하는부분

### options

include_blank,selected등의 HTML돔 설정하는 부분


# 예제1

value랑 같이 쓰는 예제

```ruby
#erb
<%= select_tag('select_name',options_for_select((2000..2030), class:'option',selected: '2018'))%> 
```

# 예제2

내부/외부 value값을 나눌때 

```ruby
options_for_select([['---선택해주세요---', ''], ['참가', '1'], ['불참', '2'], ['보류', '3']])
```

```html
<option value="">---선택해주세요---</option>
<option value="0">참가</option>
<option value="1">불참</option>
<option value="2">보류</option>
```


### reference:
https://qiita.com/eeyore/items/3199b4d501eebe757d1d
https://qiita.com/ImpureSilver11/items/296fdea241fb0fbdfcf0