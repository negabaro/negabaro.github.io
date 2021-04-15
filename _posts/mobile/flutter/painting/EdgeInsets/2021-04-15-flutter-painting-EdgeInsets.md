---
layout: post
title:  "Flutter EdgeInsets란?"
author: negabaro kim
tags:	flutter/painting
---

## Flutter EdgeInsets이란?

`padding`,`margin`과 같이 크기 조정할때 자주 사용하는 클래스이다.


이 포스트에서는 padding에서 사용한다는 기준으로 설명할예정(margin이라고 크게 다를건 없지만)

자세한 내용은 [EdgeInsets]을 참고


### EdgeInsets.all(xx)

전체여백을 지정하는 옵션

ex)

```dart
EdgeInsets.all(8.0)
```


## EdgeInsets.only

특정영역에만 여백을 지정하고 싶을때 사용

ex)


```dart
EdgeInsets.only(bottom: 5)
```

```dart
EdgeInsets.only(left: 40.0)
```

## EdgeInsets.fromLTRB

왼쪽,위,오른쪽,밑 순으로 지정이 가능

```
EdgeInsets.fromLTRB(double left, double top, double right, double bottom)
Creates insets from offsets from the left, top, right, and bottom.
```


```dart
return Padding(
      padding: const EdgeInsets.fromLTRB(4, 0, 4, 0),
```

## EdgeInsets.symmetric(vertical: 8.0)

`symmetric`은 `대칭적인` 이라는 의미로 `수평(horizontal)`, `수직(vertical)`을 기준으로 여백지정이 가능

`수직(vertical)` = 위,아래

`수평(horizontal)` = 왼쪽,오른쪽

```
EdgeInsets.symmetric({double vertical: 0.0, double horizontal: 0.0})
Creates insets with symmetrical vertical and horizontal offsets. [...]
```

---

[EdgeInsets]: https://api.flutter.dev/flutter/painting/EdgeInsets-class.html
[パディング(余白)を調整する]: https://nzigen.com/flutter-reference/2018-04-15-padding/
