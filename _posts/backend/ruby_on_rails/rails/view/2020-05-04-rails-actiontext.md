---
layout: post
title: "Rails6.0 Action Text를 사용해보자"
author: negabaro kim
categories: rails
tags: rails
---

# Action Text?

rails6에서 디폴트로 추가된 리치 텍스트 편집기


# 설정방법


```ruby
rails action_text:install
rake db:migrate
```

## 모델 설정

`Action Text`를 추가할 컬럼이 있는 모델에 이하 설정(컬럼명은 content 다른거여도 상관없음)


```ruby
has_rich_text :content
```

## 뷰 설정

text_area대신 `rich_text_area`로 변경

```ruby
= form_with(model: @post, url: articles_path) do |f|
  = f.fields_for :articles do |b|
    = b.rich_text_area :content //<< 이부분을 추가
  = f.submit '등록'
```

여기까지 설정하고 해당 view를 확인하면 텍스트 편집기가 추가된 text_area를 확인할 수 있었음


### 메모1


크기가 큰 이미지등 업로드시 text_area 영역을 벗어나는 문제가 있었음


`app/assets/stylesheets/actiontext.scss` 에 이하 css설정을 추가해주자


```css
trix-editor {
  min-height: 20em;
  max-height: 20em;
  overflow-y: auto;
}
```


### 메모2

action text로 등록한 내용을 확인할때

slim은 자동으로 escape를 해버리므로 

아래와 같이 `==`를 사용해 escape가 안되도록 해야한다.

```ruby
== article.content
```

erb일 경우 신경안써도 됨

### 메모3

image 사이즈를 줄인다든지 가공하기 위해서 imageMagick을 사용할 필요가 있다.
rails6에서는 mini_magick과ruby-vips의 wrapper인 `image_processing`를 사용하라고
나와 있음

필자의 환경에서는 `image_processing`를 추가하지 않고도 이미지 업로드는 정상적으로 동작함(using active storage)



### 메모4 

업로드한 이미지의 사이즈를 임의적으로 줄이는 방법은 잘 모르겠다.

`rails action_text:install`실행시 자동생성된
`app/views/active_storage/blobs/_blob.html.erb`을 보면

```ruby
  <% if blob.representable? %>
    <%= image_tag blob.representation(resize_to_limit: local_assigns[:in_gallery] ? [ 800, 600 ] : [ 1024, 768 ]) %>
  <% end %>
```

이란 로직이 있는데 포스팅한 내용안에 이미지 파일이 있으면 전부 이로직에 의해 실행되게 된다.
(위 로직을 삭제하면 이미지파일은 안보여주게 됨)

이 부분을 어떻게 이용하면 전체 이미지 파일을 정량적으로 관리 하거나 특정조건을 넣어줄 수 있을지도..

참고로 후술할 메모5의 설정`has_rich_text :content`이 없으면 위 템플릿을 실행되지 않으므로 주의가 필요


### 메모5

```ruby
has_rich_text :content
```

이부분을 추가 안해주면 content에 직접 포스팅한 내용이 insert된다.
위 로직이 있음으로 content는 null인 상태가 되고 `action_text_rich_texts`라는 테이블의 body컬럼에 insert됨

### 메모6

특정 이미지 파일은 upload안되게 한다든지 파일크기를 제한하고 싶을때는 이하 링크에 글이 도움이 될듯

https://blog.saeloun.com/2019/11/12/attachments-in-action-text-rails-6.html


### 메모7

첨부파일 업로드시 디폴트로 캡션이 표시되는데
메모4와 같이
`app/views/active_storage/blobs/_blob.html.erb` 부분에서

```ruby
<figcaption class="attachment__caption">
    <% if caption = blob.try(:caption) %>
      <%= caption %>
    <% else %>
      <span class="attachment__name"><%= blob.filename %></span>
      <span class="attachment__size"><%= number_to_human_size blob.byte_size %></span>
    <% end %>
  </figcaption>
```

이 부분을 삭제해주면 해결된다

#### reference:

```
https://tech.libinc.co.jp/entry/rails6_action_text
https://www.techscore.com/blog/2019/12/19/ruby-on-rails-6-action-text/
https://tech.mof-mof.co.jp/blog/rails6-actiontext/
```