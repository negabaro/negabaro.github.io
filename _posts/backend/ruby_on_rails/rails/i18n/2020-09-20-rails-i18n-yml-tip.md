---
layout: post
title:  "rails I18n으로 yaml사용시 여러가지 팁"
author: negabaro kim
tags:	rails/tip
---

# 개요

이 포스트에서는 I18n으로 yaml사용시 여러가지 팁에 대해 정리해보았다. 

주로 rails의 I18n사용시 얻은 팁들이나 yaml자체에서 사용가능한 것들도 있으니 참고바란다.


# 변수 사용하는 방법

I18n.t에서 아래와 같이 변수를 사용하는것이 가능하다.

```yml
#ko.yml
new: 신규%{smtg}
```

호출시 커맨드

```ruby
t(:new, smtg: t(:posts))
# => 신규포스팅
```


# array사용하는 방법

array를 사용하면 복수의 정보를 가져올 수 있다.

```ruby
t [:new, :posts]
# => ["신규","포스팅"]
```

다만 array상태로 리턴되므로 문자열로 사용하고 싶을때는 아래와 같이 join해주자

```ruby
(t [:new, :posts]).join
# => 신규포스팅
```

# 헬퍼 메소드 사용하는 방법

헬퍼 메소드를 경유해서 I18n.t를 호출하는 방법도 있다.

```ruby
def joined_t(*args)
    (I18n.t args).join
end
```

```ruby
= joined_t(:new, :posts)
# => 신규포스팅
```


# alias(별칭)

별칭 지정이 가능하다.

```ruby
Comment: &Comment 커맨트
Comments: *Comment
```

&로 별칭선언하고 *로 호출한다.

즉 Comment,Comments 어느쪽도 커맨트라는 값을 가져온다.

# create,update의 로케일 디폴트 설정 

create,update등 디폴트 로케일 설정은 `helpers: submit:`이하에 설정하면 자동으로 불러와진다.

```yml
#ko.yml
ko:
  helpers:
    submit:
      create: 등록
      update: 갱신
      submit: 저장
```


# 모델마다 다른값으로 변경할떄

모델에따라 변경하고 싶을때는 model_name이하에 재정의하면 해당모델의 버튼 텍스트가 model_name이하에 정의한 부분으로 적용된다.

```yml
#ko.yml
ko:
  helpers:
    submit:
      create: 등록
      update: 갱신
      submit: 저장
      model_name:
        create: 전송
        update: 변경
```

# post,update후 flash메시지 공통정의 하는방법

[responders] gem을 이용


# Yes,No는 더블 쿼테이션이 반드시 필요함

### 동작안함

```
"Yes": 예
"No": 아니오
```

### 동작함

```
"Yes": 예
"No": 아니오
```

### reference:

[Link](https://qiita.com/tomomomo1217/items/858f290a0dc1a817985c)
[Link2](https://stackoverflow.com/questions/2522422/converting-a-javascript-string-to-a-html-object)
[yaml에서 개행하는 방법](https://qiita.com/jerrywdlee/items/d5d31c10617ec7342d56)

[responders]:https://github.com/heartcombo/responders
