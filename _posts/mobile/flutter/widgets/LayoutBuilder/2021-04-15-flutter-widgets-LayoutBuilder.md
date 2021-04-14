---
layout: post
title:  "Flutter LayoutBuilder란?"
author: negabaro kim
tags:	flutter/widgets
---

## Flutter LayoutBuilder Class란?

Widget 사이즈에 맞게 레이아웃의 크기를 유동적으로 변경시키고 싶을때 사용

`LayoutBuilder`의 build메소드안에서 `maxWidth`과 같은 widget의 사이즈 정보를 가져올 수 있음.


## example

아래 예제와 같이 `builder -> BoxConstraints -> constraints.maxWidth` 로 가져올 수 있다
```dart
return LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
            ...
            child: Stack(
          children: <Widget>[
            SizedBox(
              width: constraints.maxWidth,
              height: constraints.maxWidth,
        })
```


---

[LayoutBuilderの基本とサンプルコード]: https://bukiyo-papa.com/layoutbuilder/
[画面を横にしたときに、レイアウトエラーが起きないようにする]: https://qiita.com/ryota47/items/8b1a94bd7f6936aa7af4
[LayoutBuilder]: https://api.flutter.dev/flutter/widgets/LayoutBuilder-class.html