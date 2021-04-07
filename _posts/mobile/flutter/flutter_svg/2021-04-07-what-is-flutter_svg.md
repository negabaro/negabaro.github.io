---
layout: post
title:  "Flutter에서 svg파일 로드하는방법(with. flutter_svg)"
author: negabaro kim
tags: flutter/error
---

## flutter_svg

png파일 같은경우 `Image.asset`으로 로드가 가능한데 svg파일의 경우 로드가 불가능했다.

flutter에서 svg파일의 이미지를 로드할때 [flutter_svg]를 많이 사용하는것 같아 이 포스트에서는 flutter_svg의 사용방법에 대해 정리해본다.

상세내용은 [flutter_svg]를 참고


## 설치방법

`pubspec.yaml`에서 아래 버전의 패키지를 추가

```
flutter_svg: 0.21.0-nullsafety.0
```

## 사용방법

아래와 같은 방법으로 svg파일 로드가 가능했다.

```dart
import 'package:flutter_svg/svg.dart';

SvgPicture.asset(
      'assets/images/icons/icon_logo.svg',
      width: 200,
)
```

[Flutter Another exception was thrown: Unable to load asset 에러]에서 언급한대로 pubspec.yaml에서 assets설정도 해줘야함.


## 에러

위에서 소개한 `0.21.0-nullsafety.0` 버전을 사용하지 않을때 아래 두가지 에러에 부딪혔다.


### 에러1. Error: Type 'DiagnosticableMixin' not found.

`flutter_svg: ^0.17.2`일때 발생한 에러로 아래와 같은 에러가 나면서 빌드에 실패했다.

```
../../../development/flutter/.pub-cache/hosted/pub.dartlang.org/flutter_svg-0.17.4/lib/src/picture_stream.dart:88:26: Error: Type
'DiagnosticableMixin' not found.
class PictureStream with DiagnosticableMixin {
```


### 에러2. parameter with the name 'nullOk'에러

`flutter_svg ^0.18.0`일때 발생한 에러로 이것도 버그이다.

```
../../../development/flutter/.pub-cache/hosted/pub.dartlang.org/flutter_svg-0.18.1/lib/src/picture_provider.dart:50:59: Error: No named
parameter with the name 'nullOk'.
        context != null ? Localizations.localeOf(context, nullOk: true) : null,
                                                          ^^^^^^
../../../development/flutter/packages/flutter/lib/src/widgets/localizations.dart:413:17: Context: Found this candidate, but the arguments
don't match.
  static Locale localeOf(BuildContext context) {
```


위 에러 전부 `0.21.0-nullsafety.0`일때는 발생하지 않는다.


---

[flutter_svg で No named parameter with the name 'nullOk'. エラー]: https://qiita.com/ou-mori/items/2a5e1f81a0b6ec543460


[DiagnosticableMixin is removed in new Flutter versions (stable)]: https://github.com/dnfield/flutter_svg/issues/393


[Error: Type 'DiagnosticableMixin' not found]: https://github.com/dnfield/flutter_svg/issues/368

[FlutterでSVG画像を表示する]: https://qiita.com/ikemura23/items/5671bba76136d940b618
[flutter_svg]: https://github.com/dnfield/flutter_svg

[Flutter Another exception was thrown: Unable to load asset 에러]: https://negabaro.github.io/archive/flutter-error-Unable-to-load-asset