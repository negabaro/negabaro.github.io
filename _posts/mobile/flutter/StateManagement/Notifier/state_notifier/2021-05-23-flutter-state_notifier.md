---
layout: post
title: "flutter state_notifier란?"
author: negabaro kim
tags: flutter
---

## state_notifier(StateNotifer)란?

flutter에서 provider,riverpod등을 이용해 상태관리를 할때 코드를 심플하게 작성할 수 있게 해주는 패키지이다.

## 어떤점이 심플??

밑에서 설명하겠지만 기존에 대체로 사용되어왔던 `change_notifier`와 비교해서 심플하게 작성이 가능하다.

그 차이는 `change_notifier vs state_notifier`챕터에서 설명하도록 하겠다.

## 그 외 특징

`state_notifier`는`freezed`와 상성이 좋아 같이 사용한다.

Provider패키지를 만든 [Remi Rousselet]가 만들었다.

## state_notifier와 비슷한 역할을 하는 라이브러리

`state_notifier`와 비슷한 역할을 하는것들로는 `change_notifier`,`flutter_state_notifier`가 있다.

각 라이브러리의 차이점에 대해서는 아래에서 설명한다.

### state_notifier vs flutter_state_notifier

state_notifier자체는 flutter에 의존하지 않지만 flutter_state_notifer는 Flutter와 통합된형태(정확히는 Provider나 LocatorMixin을 결합해주는 부분)

그러므로 Flutter내에서 사용할 경우 `flutter_state_notifier`를 이용하자.

### change_notifier vs state_notifier

[change_notifier]와 state_notifier의 차이에 대해 알아보자.

#### 내부 vs 외부 라이브러리

[change_notifier]는 flutter(foundation)내부에 있는 클래스이고 state_notifier는 외부 라이브러리이다.

#### state_notifier가 더좋음

전반적으로 change_notifier의 개선판이 state_notifier라고 생각해도 무방하다.

크게 아래와 같은 부분이 개선되었다.

1. 작성해야할 코드량이 줄어듬.
2. Widget계층이 깊어지는 문제 개선
3. 사용하기 편함
4. 일일이 `notifyListener()` 선언해줄 필요가 없음
5. state,Notifier를 분리되어있음


#### 코드 비교

##### change_notifier를 사용한 경우

```dart
class CounterController extends ChangeNotifier {
  int count = 0;
  
  void increment() {
    count++;
    notifyListeners();
  }
}
```

##### state_notifier를 사용한 경우

```dart
class CounterController extends StateNotifier<int> {
  CounterController(): super(0)

  void increment() {
    state++;
  }
}
```

위에서 언급한대로 `state,Notifier를 분리되어있어서` 내부에서 변수선언을 할 필요없고 state라는 값만 가지고 있다.

`extends StateNotifier<int> `의 `<int>` 부분이 state의 type이 되는데 하나의 object를 상태로 정의하려면 아래와 같이 state로 사용할 클래스를 정의하고 해당 클래스를 `<int>`부분에 넣어주면 된다.

```dart
class CounterState {
  CounterState({
    this.count = 0,
    this.isEnabled = true,
  });
  int count;
  bool isEnabled;
}

class CounterController extends StateNotifier<CounterState> {
  CounterController(): super(CounterState())

  void increment() {
    state = state..count++;
  }

  void disableCounter() {
    state = state..isEnabled = false;
  }
}
```


## 메모

### flutter에서의 상태관리

flutter에서의 상태관리 패턴은 아래와 같은것들이 있다.

1. setState(StatefulWidget)
2. Redux
3. BLoC(Stream + InheritedWidget/Scoped Model)
4. provider(ChangeNotifier)
5. riverpod

이 포스트에서 소개한 `state_notifier`는 4,5패턴에서 조합해 사용이 가능하다


---

[change_notifier]: https://github.com/flutter/flutter/blob/master/packages/flutter/lib/src/foundation/change_notifier.dart
[Flutter state_notifierいい感じなので使ったほうが良いですよ]: https://qiita.com/_masaokb/items/fe77495db0aeba226d2a
[state_notifier と freezed を使って、Flutterのカウンターアプリをつくるよ]: https://qiita.com/karamage/items/4b1aff984b1af7541b73
[Remi Rousselet]: https://twitter.com/remi_rousselet


