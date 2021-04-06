---
layout: post
title:  "Flutter plugin not installed; this adds Flutter specific functionality. 에러"
author: negabaro kim
tags: flutter/error
---


`fvm flutter doctor`실행시 아래와 같은 에러가 발생했다.

#### 전체에러

```
fvm flutter doctor
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel unknown, v1.17.5, on Mac OS X 10.15.7 19H512, locale ko-JP)
[✓] Android toolchain - develop for Android devices (Android SDK version 30.0.3)
[✓] Xcode - develop for iOS and macOS (Xcode 12.4)
[!] Android Studio (version 4.1)
    ✗ Flutter plugin not installed; this adds Flutter specific functionality.
    ✗ Dart plugin not installed; this adds Dart specific functionality.
[!] Connected device
    ! No devices available

! Doctor found issues in 2 categories.
```

#### 문제가되는 에러

```
[!] Android Studio (version 4.1)
    ✗ Flutter plugin not installed; this adds Flutter specific functionality.
    ✗ Dart plugin not installed; this adds Dart specific functionality.
```

으잉..Flutter/Dart 인스톨했는디..?;;

## 해결방법

아래 커맨드를 실행후 재실행하니까 해결되었다.

```
ln -s ~/Library/Application\ Support/Google/AndroidStudio4.1/plugins ~/Library/Application\ Support/AndroidStudio4.1
```

Android Studio 4.1에서 plugin인식이 잘안되는 문제가 있다고 한다.

4.1부터 plugin관련 path설정이 변경되어서 flutter doctor커맨드에서 인식이 안된다고 

Flutter쪽에서 수정해준다고 하니 나중에 이 글을 보신 분들은 대응할 필요가 없을지도



---

[flutter doctorを実行するとAndroid Studioで「Flutter plugin not installed; this adds Flutter specific functionality.」と出る問題の対処方法]: https://travitu.hatenablog.jp/entry/2020/12/29/132805
[Flutterの環境構築]: https://qiita.com/mkosuke/items/7957e71968aefc6558be
