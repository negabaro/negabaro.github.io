---
layout: post
title:  "Rails enum_help gem을 이용해 enum 설정에 다국어 기능을 대응하는 방법"
author: negabaro kim
categories: rails/i18n
---

# enum이란

외부적으로 특정 문자열을 사용하고 내부에서는 Number의 값으로 이용할때 enum을 많이 사용한다.

예를들어 gender같은 경우 male로 레코드를 저장하면 DB내부에서는 0가 저장되는 식이다.

아래는 enum의 사용예이다.

```ruby
class User < ActiveRecord::Base
  enum gender: { male: 0, female: 1 }
end
```

이렇게 편리한 enum기능에 다국어 설정을 넣을때 `enum_help`를 사용하면 간단히 도입이 가능하다.

아래는 설정방법이다.

----

# enum_help 설정방법


## bundle install


```ruby
gem 'enum_help'
```

## local파일 추가


```yml
#config/locales/ja.yml
ja:
  enums:
    user:
      gender:
        male: 男性
        female: 女性
```

```yml
#config/locales/kr.yml
kr:
  enums:
    user:
      gender:
        male: 남성
        female: 여성
```



## model에 enum설정

```ruby
class User < ActiveRecord::Base
  enum gender: { male: 0, female: 1 }
end
```

모델명 -> enum선언명 -> enum key값과 locale설정을 매칭시켜줘야한다.

`enums`는 고정 값이다.

예를들어 Item모델에 type이라는 enum이 있고 type1,type1키 값이 있다면

local은 아래와 같이 설정해줘야한다.

```yml
en:
  enums:
    item:
      type:
        type1: xx
        type2: yy
```



# 사용방법

enum의 경우 `모델명.enum의 복수명`으로 enum리스트를 불러오는데

enum_help의 경우 뒤에 `_i18n`만 추가해주면 local값에 따른 값을 가져온다.


```ruby
 User.genders_i18n
=> {"male"=>"男性", "female"=>"女性"}
```

key,value를 반대로 가져올때 invert라는 유용한 기능이 있다.


```ruby
user.genders_i18n.invert
=> {"男性"=>"male", "女性"=>"female"}
```

더 자세한 사양은 [github enum help]을 참고바란다.
여기까지 enum_help에 대해 알아봤다.

[github enum help]: https://github.com/zmbacker/enum_help
