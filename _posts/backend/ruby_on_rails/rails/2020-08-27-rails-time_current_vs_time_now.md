---
layout: post
title:  "Rails Time.current와 Time.now의 차이"
author: negabaro kim
tags:	rails
---

Rails에서 현재시간을 설정할때 `Time.current`와 `Time.now`
를 자주 사용하는데 둘의 차이점에 대해 알아보자.

결론으로는 별다른 이유가 없다면 레일즈에서는 Time.current를 사용하는것이 좋다.


# Time.current 특징

1. Rails의 독자적인 메소드
2. TimeWithZone클래스를 사용
3. config/application.rb에 있는 타임존 설정에 따라 시간을 정함


# Time.now 특징

1. Ruby에 존재하는 메소드
2. Time클래스를 사용
3. 환경변수 ENV['TZ']의 설정을 보고 시간을 정함
4. ENV['TZ']가 없으면 시스템의 타임존 설정을 참고함


# Time.current이 좋아

위에서 설명한대로 Time.now는 환경변수가 없으면 시스템의 타임존을 보게되는데
docker와 같은 가상환경에서 타임존이 제대로 설정되어있지 않으면 의도치 않게 다른 시간으로 표기 될 수 있다.

프로그래밍에서 scope이 중요한것 처럼 레일즈의 설정외에 의존하는 형태는 피한다는 의미에서는 Time.current가 선택지가 될 수 있다.

# Time.now가 좋아

반대로 rails가 아닌경우 Time.current를 쓸 수 없으므로 Time.now를 사용해야할 것이다.
실제로 jwt같은 gem의 경우 토큰의 유효기간을 체크할때 Time.now를 사용한다.

이러한 gem을 rails에서 사용하게 될때 TZ환경변수 설정을 깜빡하면 시스템의 타임존에 의존될 가능성이 있다.
gem과의 의존성까지 생각하면 Time.now로 애초에 통일 시켜버리는것도 하나의 선택지가 될거같다.


참고로 타임존을 설정하는 방법은 아래와 같다.

# 설정방법

Tokyo시간을 기준

## Time.current


```ruby
config/application.rb
config.time_zone = 'Tokyo'
```

## Time.now

```
.envrc
export TZ = "Asia/Tokyo"
```



### reference:

```
https://qiita.com/kodai_0122/items/111457104f83f1fb2259
```