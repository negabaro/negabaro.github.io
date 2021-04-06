---
layout: post
title:  "Flutter doctor실행시 [!] Connected device ! No devices available는 에러가 아니다."
author: negabaro kim
tags: flutter/error
---


## 결론

`flutter doctor` 실행시  

```
[!] Connected device
    ! No devices available
```

에러가 발생해도 쫄지말자. 단순히 에뮬레이터가 실행이 안되어있을 뿐이므로 


[IOS 시뮬레이터만 기동하는 방법]를 참고해서 실행해주자.



---

## 에러가 발생한 경위

필자의 경우 Flutter SDK 2.0.3버전과 fvm을 이용해 설치한 1.17.5의 두가지 버전이 있다.

특정 프로젝트의 경우 1.17.5에서 밖에 돌아가지 않아 이러한 환경구축을 했는데

이상하게 flutter doctor실행시 2.0.3에는 에러가 나지 않는데 1.17.5환경일때만 아래 경고가 발생했다.

```
[!] Connected device
    ! No devices available
```


## Flutter 1.x와 2.x의 큰 차이


이것은 필자가 Flutter1.x와 2.x의 차이에 대해 잘 몰랐기 때문에 착각한 부분이었다.

`Connected device ! No devices available`는 단순히 현재 사용가능한 에뮬레이터가 없다는 메시지일뿐 에러는 아니다.

그런데 왜 2.x에서는 에러가 나지 않았냐하면 2.x부터는 web과 mac을 서포트해줬는데 이때 브라우저에서 빌드결과를 확인할 수 있는 기능이 늘어나서다.

즉, 1.x이든 2.x이든 에뮬레이터는 올라가 있지 않지만 2.x에서는 chrome 에뮬레이터가 존재하기에 해당 메시지가 발생하지 않던것이었다.

flutter doctor커맨드의 결과를 자세히보면

### 1.x의 경우

```
fvm flutter doctor
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel unknown, v1.17.5, on Mac OS X 10.15.7 19H512, locale ko-JP)
[✓] Android toolchain - develop for Android devices (Android SDK version 30.0.3)
[✓] Xcode - develop for iOS and macOS (Xcode 12.4)
[✓] Android Studio (version 4.1)
[✓] Connected device (1 available)
```

### 2.x의 경우

`Chrome - develop for the web`이라는게 추가되어있는걸 확인할 수 있다.

```
flutter doctor
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 2.0.3, on Mac OS X 10.15.7 19H512 darwin-x64, locale ko-JP)
[✓] Android toolchain - develop for Android devices (Android SDK version 30.0.3)
[✓] Xcode - develop for iOS and macOS
[✓] Chrome - develop for the web
[✓] Android Studio (version 4.1)
[✓] Connected device (2 available)
```


## 메모

### flutter devices

한편 `flutter devices`커맨드를 실행하면 현재 사용가능한 디바이스들을 확인가능하다.

---

[참고]: https://stackoverflow.com/questions/49045393/message-flutter-run-no-connected-devices

[참고2]: https://qiita.com/ys_works/items/f9ed7a5516f97a467915

[IOS 시뮬레이터만 기동하는 방법]: https://negabaro.github.io/archive/how-to-open-only-ios-simulator
