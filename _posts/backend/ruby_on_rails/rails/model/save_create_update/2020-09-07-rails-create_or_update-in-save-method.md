---
layout: post
title:  "rails create_or_update메소드에 대해"
author: negabaro kim
tags:	rails/model
---

# create_or_update 메소드

[rails save메소드와 create메소드의 차이에 대해]에서 언급한대로 create_or_update 메소드는 save안에서 호출되는 `private 메소드`이다.

save메소드는 create메소드 안에서도 호출되며 save메소드 자체를 호출해서 사용하기도 한다.

create_or_update의 [code]는 아래와 같다.

```ruby
#lib/active_record/persistence.rb
def create_or_update(**, &block)
  _raise_readonly_record_error if readonly?
  return false if destroyed?
  result = new_record? ? _create_record(&block) : _update_record(&block)
  result != false
end
```

# create_or_update메소드의 특징

메소드 이름만 봐도 알겠지만 create_or_update메소드는 해당 오브젝트가 신규라면 create를 아니라면 update를 실행 해준다.

코드로는 아래 부분이다.

```ruby
result = new_record? ? _create_record(&block) : _update_record(&block)
```

_update_record 부분이 update를 실행하는 로직이다.


# save시에만 사용

create메소드 안에 save메소드가 있고 save메소드 안에 create_or_update메소드가 있지만

create를 이용하면 `_update_record`은 실행되지 않는다.

즉 save시에만 `_update_record`가 실행된다.


아래 코드는 save메소드로 insert,update를 실행하는 예제이다.

### insert가 실행되는 예

```ruby
uu = User.first.organizations.new(name: 'xx')
uu.save # insert 실행됨
```

### update가 실행되는 예

```ruby
uu = User.first.organizations.new(name: 'xx')
uu.save
uu.name = 'yy'
uu.save # update 실행됨
```

# save를 이용한 insert,update 사용은 권장할만한가

여기까지 save메소드를 이용해 insert,update를 하는 방법에 대해 알아봤다.

그런데 save메소드를 이용해 insert,update를 실행하는 로직은 실제로는 많이 보지못했다.

아마 찾아보면 있겠지만, 단일책임 원칙으로 인해 insert하는 로직은 insert만 update로직은 update만 실행되게
하는편을 선호하는게 영향이 큰것 같다.


### reference:

```
https://woshidan.hatenablog.com/entry/2015/09/29/224750
https://qiita.com/luccafort/items/677020b86f3dc240529b
```

[code]: https://github.com/rails/rails/blob/939f76a77ed128bed9e6711eb8063957e8a6c14c/activerecord/lib/active_record/persistence.rb#L900-L905

[rails save메소드와 create메소드의 차이에 대해]: https://negabaro.github.io/archive/rails-save_and_create