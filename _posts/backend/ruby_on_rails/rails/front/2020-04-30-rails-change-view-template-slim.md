---
layout: post
title: "rails6.0 erb->slim으로 변경"
author: negabaro kim
categories: rails
tags: rails template
---

# slim이란?

rails의 디폴트 템플릿엔진은 erb다. 그 외에 slim,haml이 있다.

#### 특징/장점:

slim은 html태그 대신 인덴트로 html구조를 표현하므로 코드량을 줄일 수 있음
가독성이 높아짐
디폴트로 escape를 실행하므로 erb보다 세큐어
erb에 비교해서 퍼포먼스가 좋다고함

#### 단점: 

기술방법이 독특하기때문에 학습코스트가 발생함


# 설정방법(*필수)

```
gem 'slim'
bundle install
```

끝!!(진짜?)



# erb -> slim으로 변경

기존의 erb파일을 slim으로 변경해보자(필수설정은 아님)

#### gem install

```
gem install html2slim
```

#### 커맨드 확인

```
$ html2slim -h
$ erb2slim -h
```

#### 실행

app/views이하에 있는 파일을 일괄적으로 erb -> slim으로 바꾸는 커맨드

```
for file in app/views/**/*.erb; do erb2slim $file ${file%erb}slim && rm $file; done
```



#### erb -> slim변경시 devise에 에러가 나는 부분 


erb -> slim으로 변경이 100% 완벽하게 되는건 아닌 듯
변경후`localhost:3000`에 억세스하면 에러가 발생

```app/views/devise/shared/_error_messages.html.slim```
이하 설정을


```
- if resource.errors.any?
  #error_explanation
    h2
      = I18n.t("errors.messages.not_saved",
      -                  count: resource.errors.count,
      -                  resource: resource.class.model_name.human.downcase)
```

↓

```
      = I18n.t("errors.messages.not_saved", count: resource.errors.count, resource: resource.class.model_name.human.downcase)
```

로 변경하면 해결



## 메모1

erb -> slim 변경시 확장자가 `html.slim` 인데
`slim`으로만 기술해도 문제없이 동작함.


## 메모2

html.erb,slim 공존해도 정상적으로 동작하므로
무리해서 기존의html.erb파일을 바꿀 필요는 없음

## 메모3

html.erb안에서 slim확장자를 render해도 정상적으로 동작함


## 메모4

template에러를 자세히 보면 handlers에 읽어올 수 있는 확장자가 적혀있음.

```
Missing partial partials/_header with {:locale=>[:en], :formats=>[:html], :variants=>[], :handlers=>[:raw, :erb, :html, :builder, :ruby, :jbuilder]}. Searched in:
```

`gem slim`후에 다시 확인해보니 slim이 추가되어 있는걸 확인!


```
Missing partial partials/_header with {:locale=>[:en], :formats=>[:html], :variants=>[], :handlers=>[:raw, :erb, :html, :builder, :ruby, :slim, :jbuilder]}. Searched in:
```

## 메모5

참고한 글을 보면 slim-rails로 인스톨하고 `config/application.rb`에도 설정할 필요가 있다고 하는데
`gem slim`하나로 문제없이 동작했다.

```
Rails 5.1.2
gem 'slim-rails', '3.1.3'
```

#### config/application.rb설정

```
class Application < Rails::Application
  config.generators.template_engine = :slim  
end
```

아무래도 rails6에서는 자동적으로 설정되는 듯?

#### 참고

```
https://qiita.com/moriyaman/items/c0d60406422677bcb398
```