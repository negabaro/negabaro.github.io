---
layout: post
title:  "Rails에서 서브 디렉토리를 트리거로 다국어 기반 서비스 만드는 방법"
author: negabaro kim
tags: rails/i18n
---

# 개요

이 포스트에서는 Rails에서 다국어 기반 서비스를 만드는 방법에 대해 알아보자.

Rails에서 다국어 기반 서비스 구축시 언어 변경하는 트리거로는 아래 네가지 방법이 있다.

1. 서브 도메인을 이용([sub domain다국어 대응])
2. 서브 디렉토리를 이용
3. 파라메터값을 이용
4. HTTP헤더의 Accept-Language를 이용(브라우저 언어에 의존)

이 포스트에서는 2번째 방법인 서브 디렉토리를 이용하는 방법에 대해서 알아보자.

------


# 설정방법

전체적인 플로우가 심플하다.

루팅설정에서 서브 디렉토리에 들어오는 값을 받고 공통 컨트롤러에서 디폴트 I18n을 변경하는 방식이다.

설정은 아래와 같다.

# 컨트롤러 설정


```ruby
# app/controller/application_controller.rb
before_action :set_locale

def set_locale
    I18n.locale = locale
end

def locale
    @locale ||= params[:locale] ||= I18n.default_locale
end

def default_url_options(options={})
    options.merge(locale: locale)
end
```

# config설정(config/application.rb)

```ruby
#config/application.rb

# config/locales에 설정한 yml파일 로드를 위해
config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}').to_s

# 어플리케이션에서 대응할 언어 화이트리스트ト(kr = 한국어 ja = 일본어, en = 영어)
config.i18n.available_locales = %i(ja en kr)

# available_locales에 지정한 언어외에 지정되면 에러를 리턴할지에 대한 설정
config.i18n.enforce_available_locales = true

# 디폴트 언어설정
# config.i18n.default_locale = :en
config.i18n.default_locale = :ja
```


# 루팅설정(config/routes.rb)

```ruby
scope '(:locale)', locale: /#{I18n.available_locales.map(&:to_s).join('|')}/ do
  resources :item
end
```

# locale설정


## 영어

```ruby
#config/locales/views/front/item/en.yml
en:
  front:
    item:
      new: 'new item'
      index: 'item index'
      show: 'item detail'
      create: 'Add new item'
```

## 일본어

```ruby
#config/locales/views/front/item/ja.yml
ja:
  front:
    item:
      new: 'アイテム追加'
      index: 'アイテム一覧'
      show: 'アイテム詳細'
      create: 'アイテムを登録する'
```

## 한국어

```ruby
#config/locales/views/front/item/kr.yml
kr:
  front:
    item:
      new: '아이템 추가'
      index: '아이템 리스트'
      show: '아이템 상세'
      create: '아이템을 등록'
```

# view설정

아래와 같은식으로 사용한다.

```ruby
#app/view/front/item/new.slim
h1
  = t('front.item.new')
```

----------


# 동작확인

위 설정이 문제 없다면 재기동 후
아래와 같이 서브디렉토리에 `en,ja,kr`을 넣어서 억세스해서 locale에서 설정한 언어가 변경되는것을 확인할 수 있다.


localhost:3000/en/item/new

localhost:3000/ja/item/new

localhost:3000/kr/item/new

----------

# 메모

언어별로 다른 UI를 이용할 경우 아래와 같은 조건문을 사용한다.

```ruby
if I18n.locale.to_s == "en"
  = render(xx)
elsif I18n.locale.to_s == "ja"
  = render(yy)
elsif I18n.locale.to_s == "kr"
  = render(zz)
```


### reference:

```
https://kimuraysp.hatenablog.com/entry/2016/05/19/233144
https://qiita.com/tsunemiso/items/bedc7593c7ccd05c395b
https://qiita.com/lhside/items/52623ca8d09858fc7d6e
```

[sub domain다국어 대응]: https://blog.nakamu.life/posts/start-rails-translation
