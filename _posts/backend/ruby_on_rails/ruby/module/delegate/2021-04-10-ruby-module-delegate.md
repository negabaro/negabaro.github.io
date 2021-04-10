---
layout: post
title:  "Rails,ruby에서 delegate를 사용하는 이유"
author: negabaro kim
tags:	software
---

## delegate란?

delegate는 영어로 `위임하다`라는 의미를 가지고 있다.

이러한 의미에서 알 수 있듯이 다른 클래스에 있는 메소드명을 위임받아서 사용할때 delegate를 사용한다.


## 사용방법

아래와 같은 문법으로 사용이 가능

```ruby
delegate :위임받을컬럼1, :위임받을컬럼2, to: :위임받을모델명
```


## 왜 사용하나?

모델 설계를 심플하게 할 수 있고 DRY하게 작성이 가능하다.

예를들어 아이돌들의 정보를 다루는 `Idols`과 각 아이돌의 정보를 다루는 `Idol::Profile`로 모델을 나눴다고 생각해보자.

※이런식으로 똑같은 Idol의 정보지만 복수와 단수의 개념으로 모델을 쪼갬으로 각 모델간의 단수/복수 별 역할 분담을 정의할 수 있어서 가독성이 높아진다.

한편 `Idol::Profile`에서는 팬들이 누른 좋아요,싫어요를 카운트해서 DB에 저장해 아래와 같은 정보가 담겨있다고 가정하자.

```
사나: {good_count: 3억, bad_count: 500}
정국: {good_count: 30억, bad_count: 5000}
제니: {good_count: 10억, bad_count: 2500}
```

이때 `Idols`는 Idol들의 리스트를 다루는 모델인데 리스트 화면에 각 아이돌들의 좋아요,싫어요 정보를 담고 싶다는 의뢰가 들어왔다. 이때 어떤식으로 구현해야할까?

먼저 아래와 같이 `idols`에서 `self.profile`로 접근하는 방식의 구현이 가능하다.

```ruby
##app/models/idols.rb
has_one :profile, inverse_of: :idol, dependent: :destroy, class_name: 'Idol::Profile'
def good_count
  self.profile.good_count if self.profile
end

def bad_count
  self.profile.bad_count if self.profile
end
```

위 코드를 `delegate ... to`로 바꿔보면 아래와 같다.


```ruby
## app/models/idols.rb
has_one :profile, inverse_of: :idol, dependent: :destroy, class_name: 'Idol::Profile'
delegate :good_count, :bad_count, to: :profile, allow_nil: true
```


self를 이용한 참조 메소드를 기술할 필요없이 다른 모델의 메소드를 가져와 쓸 수 있어서 코드량도 줄어들었고 가독성도 높아졌다.

여기까지 `delegate to`를 사용하는 이유에 대해 알아봤다.




---

[delegate]: https://apidock.com/rails/Module/delegate
[Rails -delegateってなに。　solidus]: https://qiita.com/ozipi/items/3a5d39ff693c7c051a74