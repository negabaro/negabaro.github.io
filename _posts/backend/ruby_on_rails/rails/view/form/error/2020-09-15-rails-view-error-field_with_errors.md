---
layout: post
title:  "rails validation에러 발생시 폼에 에러 메시지를 표시해주는 부분을 커스텀해보자"
author: negabaro kim
tags:	rails/view
---

# 개요

이 포스트에서는 validation에러시 폼에서 에러 메시지를 표시해주는 부분을 커스텀하는 방법에 대해 알아보자.


# Rails디폴트 속성

Rails에서는 디폴트로 validation에러 발생시  `field_with_errors`라는 class를 가진 div를
label,input위에 생성한다.

그리고 해당 밸리에디션 에러 메시지를 input밑에 `error`라는 클래스를 가진 span에 표시해준다.

이러한 속성을 이용해 `div.field_with_errors`과`span.error` css디자인을 설정해 에러메시지를 사용자에게
알려주는 UI작성을 한다.


# 문제점

위 디폴트 속성을 이용해 빠른 개발이 가능하지만

오히려 이 설정에의해 레이아웃이 깨지는 문제가 생겨 개발속도가 느려지는 결과가 초래할때도 있다.

그래서 필자는 프로젝트 진행시 항상 커스텀해 사용하고 있다.


# 커스텀 하는 방법

크게 두가지 방법이 있다.

1. config설정에서 `action_view.field_error_proc`를 직접 수정해주는 방법
2. form_for의 builder옵션을 사용해 헬퍼를 추가하는 방법




# 1. action_view.field_error_proc를 직접 수정해주는 방법

첫번째 방법은 아래와 같이 action_view.field_error_proc에 커스텀한 Proc 블록을 설정해주는 방법이다.

else부분이 에러가 났을때 추가되는 tag이다.

```ruby
# config/application.rb
config.action_view.field_error_proc = Proc.new do |html_tag, instance|
  if instance.kind_of?(ActionView::Helpers::Tags::Label)
    # skip when label
    html_tag.html_safe
  else
    "<div class=\"has-error\">#{html_tag}<span class=\"help-block\">#{instance.error_message.first}</span></div>".html_safe
  end
end
```


# 2. form_for의 builder옵션을 사용해 헬퍼를 추가하는 방법

첫번째 방법보다 설정이 많지만 디버깅하기 편해 자주 사용하고 있다.

또한 한 프로젝트에서 속성이 다른 폼을 이용하고 싶을때 builder옵션만 변경해주면 되므로 유용하다.



## 헬퍼 생성

아래와 같은 헬퍼를 만들어준다.

```ruby
#app/helpers/common_form_builder.rb
class CommonFormBuilder < ActionView::Helpers::FormBuilder
  def common_error_message_on(method, options={} )
    options[:class] = :'help is-danger' if options.blank?
    @template.content_tag(:p, @object.errors.full_messages_for(method).first, options) if @object.errors.has_key?(method)
  end
end
```

## view설정

form_for에서 builder옵션에 위에서 만들어준 헬퍼를 추가해준 다음

헬퍼에서 만들어준 common_error_message_on메소드를 원하는곳에 위치시켜주면 끝이다.



```ruby
= form_for(@item, url: action_url_path, method: :post, builder: CommonFormBuilder ) do |f|
  .control
    = f.label :name, class: 'label is-small'
    = f.text_field :name, class: 'input'
    = f.common_error_message_on :name
```

----

## 모델설정

대충 validation을 걸어줘봤다.

```ruby
class Item < ApplicationRecord
  validates_format_of :name, :with => /\A[a-zA-Z0-9!"#$%&'()*+,-.\/:;<=>?@\[\]^_`{|}~]+\z/,
  :presence => true, :on => [:create, :update],
  :message => "테스트 validation에러입니다."
end
```


## css설정

필자는 bulma template을 사용했고 아래와 같은 css설정을 추가해주었다.

```
.field_with_errors
  .input
    border-color: $danger
.error
  display: block
  padding: 10px 0
  color: $danger
  font-size: 1rem

$danger: #a4243b
```


# 동작확인

설정이 문제가 없다면 validation에러시 아래와 같은 메시지를 확인할 수 있다.

![image](https://user-images.githubusercontent.com/4640346/93320085-9d173180-f84b-11ea-9c0f-826f39ff95fb.png)




# 메모


## form_with에서 동작실패

정확한 원인은 모르겠지만 똑같은 로직을 form_with으로 바꾸면
동작하지 않았다..


```ruby
#= form_with(model: @friend, url: create_item_index_path, method: 'post', builder: FrontFormBuilder ) do |f| #Failed..
#= form_for(@friend, builder: FrontFormBuilder) do |f|
#= form_with(model: @friend, url: new_friend_path, method: 'post', builder: FrontFormBuilder ) do |f|
#= form_with(model: @friend, builder: FrontFormBuilder ) do |f|
```

helper에 binding.pry를 추가해서 확인하면 입력된 값이 모델에 들어가지 않았다..


### reference:

```
https://qiita.com/youcune/items/76a50ae3a2863a8f8b00
```