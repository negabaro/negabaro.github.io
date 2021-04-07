---
layout: post
title:  "Flutter Another exception was thrown: Unable to load asset 에러"
author: negabaro kim
tags: flutter/error
---

아래와 같은 코드를 실행하려고 하자 에러가 발생했다.

```dart
import 'package:flutter_svg/svg.dart';

child: Container(
    child: SvgPicture.asset(
      'assets/images/icons/icon_logo.svg',
      width: 120,
    ),
  ),
```



#### 문제가된 에러

```
Another exception was thrown: Unable to load asset:
```

#### 전체에러

```
Picture provider: ExactAssetPicture(name: "assets/images/icons/icon_logo.svg", bundle: null,
  colorFilter: null)
Picture key: AssetBundlePictureKey(bundle: PlatformAssetBundle#26725(), name:
  "assets/images/icons/icon_logo.svg", colorFilter: null)
```


pubspec.yaml을 아래와 같이 설정하면 에러가 발생했다.

```
flutter:
  uses-material-design: true
  assets:
    - assets/
```

## 해결방법

아래와 같이 이미지파일이 있는 디렉토리를 직접 지정해주니 에러가 발생하지 않았다.

```
flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/images/icons/
```

