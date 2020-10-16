---
layout: post
title:  "rails enum사용시 실제 DB에 저장되는 값 가져오는 방법"
author: negabaro kim
tags:	rails/model
---

# 개요 

rails에서 enum을 사용하면 실제DB에는 integer값으로 보존하되 코드상에서는 개발자가 알기쉬운 언어를 사용해
데이터 생성/수정/삭제/검색등이 가능해 매우 유용하게 쓰인다.

그런데 가끔 enum으로 변환된 값이 아닌 실제 DB에 저장된 값을 가져오고 싶을경우가 있다.

이 포스트에서는 그 방법에 대해 소개해본다.


# 상황

우선 아래와 같은 enum이 user모델에 있고

```ruby
GENDER_MALE   = '남성'
GENDER_FEMALE = '여성'
enum gender: { "#{GENDER_MALE}": 0, "#{GENDER_FEMALE}": 1}.freeze
```

첫번째User의 gender는 남성(0)이라고 가정해보자.

`User.first.gender`실행시 `남성`이라는 결과가 나올것이다.

이 결과를 남성이 아닌 실제DB에 저장된 0으로 출력하는것이 이 포스트의 목표다.

# 방법

필자가 찾아본 결과 아래와 같은 세가지 방법이 있었다.

## 방법1 xx_before_type_cast

```ruby
User.first.gender_before_type_cast
=> 0
```


## 방법2

```ruby
User.first.class.genders[user.gender]
```

## 방법3

```ruby
User.genders[User.first.gender]
```

방법2,3은 거의 흡사한 원리이고 방법1이 레일즈에서 제공해준 메소드로

enum으로 지정해준 컬럼명 뒤에 `_before_type_cast`를 추가해주는 방식이다.


아직 실무에서 사용은 못해봤지만 아래와 같은 방식을 사용하면 범용적으로 사용이 가능할것 같다.
(아 모델이 복수일경우 동작안하겠네..)

```ruby
def origin_enum(key)
  send("self.#{key}_before_type_cast")
end
```

```ruby
User.first.origin_enum("gender")
```




### reference

[Link](https://qiita.com/yusuke-matsuda/items/df05c8165e2f084023b0)