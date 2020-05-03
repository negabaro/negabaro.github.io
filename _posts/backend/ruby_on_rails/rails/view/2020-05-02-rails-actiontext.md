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


#### reference:

```
https://www.techscore.com/blog/2019/12/19/ruby-on-rails-6-action-text/
https://tech.mof-mof.co.jp/blog/rails6-actiontext/
```