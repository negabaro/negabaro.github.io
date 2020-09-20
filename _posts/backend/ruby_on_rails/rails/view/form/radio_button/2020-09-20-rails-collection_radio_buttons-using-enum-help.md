---
layout: post
title:  "rails6 collection_radio_buttons에서 enum값을 사용하는 방법"
author: negabaro kim
tags:	rails/view
---

# 개요 

이 포스트에서는 collection_radio_buttons에서 enum값을 사용하는 방법에 대해 알아보자.

enum_help도 사용할것이므로 enum_help를 인스톨 해두자(설정 방법은 아래 포스트를 참고)

[Rails enum_help gem을 이용해 enum 설정에 다국어 기능을 대응하는 방법]


# collection_radio_buttons 문법

collection_radio_buttons메소드의 문법은 아래와 같다.

```ruby
collection_radio_buttons(오브젝트명, 콜랙션명, 메소드명, 밸류값 [, 옵션])
```

이때까지 콜랙션명은 ActiveRecord를 이용한 결과(CollectionProxy)여야 한다고 오해하고 있었는데 enum으로 가져올 수 있었다.

메소드명과 벨류값에는 `:first, :last`를 넣어주면 
enum의 키값을 text에 벨류값을 그대로 value에 지정해준다. (엄청 편리)
 

# 실제 사용예제

## 뷰 로직

```ruby
= f.label :item_type, class: 'label is-small'
= f.collection_radio_buttons :item_type, Item.item_types_i18n, :first , :last do |b|
  = b.radio_button(class: "is-checkradio is-rtl")
  = b.label 
```

## 모델에 정의한 enum로직

```ruby
#app/models/item.rb
enum item_type: {
  'type0': 0,
  'type1': 1,
},  _prefix: true
```

## locale설정

[Rails enum_help gem을 이용해 enum 설정에 다국어 기능을 대응하는 방법] 에서 소개한 
`enum_help`에 의해 enum의 키값에 해당하는 값을 `config/locales/xx.yml`에 지정해주면 I18n에 의해
국가별 언어를 가지고 온다.


```yml
en:
  enums:
    item:
      item_type:
        type0: public
        type1: private
```


```yml
ja:
  enums:
    item:
      item_type:
        type0: 公開
        type1: 非公開
```

```yml
kr:
  enums:
    item:
      item_type:
        type0: 공개
        type1: 비공개
```


### reference:

[Link](https://qiita.com/tanutanu/items/ee18ed0ab13dcbe50864)
[Link2 도큐멘트](https://railsdoc.com/page/collection_radio_buttons)

[Rails enum_help gem을 이용해 enum 설정에 다국어 기능을 대응하는 방법]: https://negabaro.github.io/archive/rails-enum-help
