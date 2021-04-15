---
layout: post
title: "Flutter TextOverflow란?"
author: negabaro kim
tags: flutter/widgets
---

## TextOverflow.ellipsis

`ellipsis`라는 뜻처럼 지정된 사이즈에 넘어갈때 글자 뒤에 `...`을 붙여 생략해준다.


```dart
Text(
  "This is a long text",
  overflow: TextOverflow.ellipsis,
),
```

![image](https://user-images.githubusercontent.com/4640346/114839065-4e953a00-9e10-11eb-99ad-f3c9c13e7601.png)



## TextOverflow.fade

```dart
Text(
  "This is a long text",
  overflow: TextOverflow.fade,
  maxLines: 1,
  softWrap: false,
),
```


![image](https://user-images.githubusercontent.com/4640346/114839070-50f79400-9e10-11eb-9f5e-16f9db615845.png)


## TextOverflow.clip

```dart
Text(
  "This is a long text",
  overflow: TextOverflow.clip,
  maxLines: 1,
  softWrap: false,
),
```

![image](https://user-images.githubusercontent.com/4640346/114839087-548b1b00-9e10-11eb-90d4-7821b013d3a4.png)

---

[Flutter - Wrap text on overflow, like insert ellipsis or fade]: https://stackoverflow.com/questions/44579918/flutter-wrap-text-on-overflow-like-insert-ellipsis-or-fade