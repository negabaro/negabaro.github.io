
---
layout: post
title:  "RSPEC실행시 DB에 데이터가 저장되지 않는 이유(feat. use_transactional_fixtures)"
tags: rails/debug
---

# 결론

RSPEC실행시 test db에 데이터가 저장되지 않는 이유는
`use_transactional_fixtures`의 설정이 `default true`이기 때문이다.


```ruby
#spec/rails_helper.rb
use_transactional_fixtures = true
```

# false로 바꿔주면 RSPEC에서 생성한 모델들을 test DB에서 확인할 수 있음.

```
use_transactional_fixtures = false
```

# 정리

## true일 경우

테스트내의 데이터조작이 transaction상태라 커밋처리를 하지않으면 데이터에 DB가 저장되지않음.


## false일 경우

transaction상태가 아님. insert한 타이밍에 DB에 레코드가 추가됨.



## true 장점

실제 DB에 저장되지않으니 RSPEC의 실행속도가 그만큼 빨라진다.

## true 단점

테스트시 에러가날떄 해당 데이터가 존재하지 않으므로 디버깅이 곤란한 상황이 존재한다.
특히 request spec에서 에러가 날때 가장 곤란하다.

예를 들어보자.
XX유저가 YY조직에 억세스할때 500에러가 발생했다.

500에러가 발생한 이유를 찾기 위해서는

테스트 데이터가 생성한 XX유저의 상태에 문제가 있거나
YY조직의 페이지안의 로직에 문제가 있거나 할텐데
필자가 생각하기에 가장 간단한 문제해결 방법은 해당 데이터를 가지고 직접 브라우저로 억세스해보는것이다.
그런데 데이터가 DB에 존재하지 않으면 해당 오브젝트가 존재했던 시점에 pry로 이동해서
여러 오브젝트를 확인해야하는등 디버깅 시간이 많이 소요된다.


## false 장점

DB에 저장이 되므로 위와 같은 

## false　단점

DB에 저장되므로 그만큼 RSPEC실행시간이 길어진다.


# 환경변수로 분기를 넣어주면 좋을듯

아래와 같이 분기를 넣어주고 필요에 따라 RSPEC실행시 DEBUG_MODE환경변수를 넘겨주는게
좋을거 같다.

```ruby
use_transactional_fixtures = ENV['DEBUG_MODE'] || true
```

### reference:

```
https://qiita.com/a_ishidaaa/items/b17ca8fa1a50ed5c3802
```