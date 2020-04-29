---
layout: post
title: "Rails decorator란"
author: negabaro kim
categories: rails
tags: rails
---

### Rails decorator란?

특정 모델클래스에 종속된 로직을 view에 반복적으로 기술하지 않고 모델과 뷰사이에 새로운 영역을 만들어 관리하는 방법

ViewModel이란 패턴의 일종(decorator의 상위개념)
Rails에서는 `drapper`와`ActiveDecorator`를 사용한다.

### decorator의 장점

뷰에 기술하는 로직적인 부분을 반복적으로 기술하지 않아도 된다.
모델,뷰 양쪽 코드량을 줄일 수 있음
모델과 관련된 뷰로직 부분을 집약할 수 있어 가독성이 높아지고 멘테넌스가 용이

### view helper와의 차이는?

소규모 개발이면 view helper로 충분할지도 모르나

view helper는 글로벌 스코프를 사용하므로 사용목적을 명확하게 정의하기 어려움

이하 예제를 보자.

```
<%= format_event_datetime(@event.start_at) %>
## event모델용 helper인데 popup모델에서 사용이가능
<%= format_event_datetime(@popup.start_at) %>
```

이러한 목적의 불명확함은 규모가 커질수록 버그발생률을 높히므로 
특정 모델에서만 동작하는 decorator영역에 정의하는게 좋음


### Presenter

Decortaor는 단일 모델클래스에 사용되는 뷰로직을 정의하는데
복수 모델에서 사용되는 뷰로직은 Presenter를 이용함.


### decorator의 단점

몇달간 사용해봤는데 모델이 decorater를 사용하기 위해서

`모델인스턴스.decorate`

이런식으로 선언을 해줘야하는데
view와 컨트롤러 어느부분에서 선언 해야할지 고민되는 경우가 있음

필자의 경우 rolify라는 gem을 이용해서 특정모델에 속해 있는 role을 체크하는데
decorate로 선언후에는 해당 모델인스턴스를  has_role로 확인하면 제대로 동작하지 않았음.

rolify의 문제일지도 모르지만 이럴땐 decorate를 선언하지 않고 view로 넘겨주고 decorate가 필요한 뷰로직에만 일일이 decorate를 정의해줘서
통일성이 없어짐

decorate선언한 부분을 취소하는 기능이 있으면 좋겠는데..

#### reference:
https://tech.kitchhike.com/entry/2018/02/28/221159