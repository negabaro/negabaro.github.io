---
layout: post
title:  "rails I18n으로 yaml사용시 개행하는 방법"
author: negabaro kim
tags:	rails/tip
---

# 개요

이 포스트에서는 I18n으로 yaml사용시 개행하는 방법에 대해 알아보자.

# 1. |을 사용 하는방법

|을 이용한 개행의 특징은 마지막행에도 개행이 들어가는점이다.

```yml
pet: |
  cat
  dog
```

## 결과

```ruby
{ "pet": "cat\ndog\n" }
```

# 2. |-을 사용 하는방법

1번과 같이 마지막행에 개행을 넣기 싫을때 `|-`를 사용한다.

```yml
pet: |-
  cat
  dog
```

## 결과

```ruby
{ "pet": "cat\ndog" }
```

# 3. html태그 + &nbsp; 로 개행하는 방법

필자는 최근에 이 방법을 사용했어서 소개해본다.

html태그를 직접넣고 안에 `&nbsp;`를 이용해 개행하는 방법이다.

```yml
kr:
  front:
    item:
      destroy:
        confirm: '<p>이 아이템을 정말 삭제 하시겠습니까?</p>&nbsp;<p>아이템을 삭제하면 해당 아이템에 속해있는 액션들도 삭제됩니다.</p>'
```

일반적으로 추천하는 방법은 아닌듯 하나 css관련해 디자인 조정이 필요한 경우 사용해보기 바란다.

필자의 경우 아래태그를 js경유해서 돔에 추가해줬다.

```ruby
message: t('front.action.destroy.confirm')
```

```js
var body = document.getElementById('custom-body');
body.innerHTML = message
```