---
layout: post
title:  "flutter build ios실행시 error: "Runner" requires a provisioning profile with the Push Notifications feature 에러"
author: negabaro kim
tags: flutter/error
---

기존 누군가 만든 프로젝트에 `fvm flutter build ios`실행시 아래와 같은 에러가 발생했다.

#### 문제가된 에러

```
error: "Runner" requires a provisioning profile with the Push Notifications feature. Select a provisioning profile in the Signing & Capabilities editor. (in target 'Runner' from project 'Runner')
```

#### 전체에러

```
Downloading ios tools...                                            9.1s
Downloading ios-profile tools...                                    6.6s
Downloading ios-release tools...                                   46.1s
Building com.xx.app for device (ios-release)...
Automatically signing iOS for device deployment using specified development team in Xcode project: YTGT8WXCB2
Running pod install...                                            496.2s (!)
Running Xcode build...
Xcode build done.                                           12.8s
Failed to build iOS app
Error output from Xcode build:
↳
    ** BUILD FAILED **
...
    error: "Runner" requires a provisioning profile with the Push Notifications feature. Select a provisioning profile in the Signing & Capabilities editor. (in target 'Runner' from project 'Runner')
```


## 해결방법

위 에러는 범용적인 에러는 아니고 프로젝트 내부에서 쓰이는 `Push Notifications feature`에 관련한 에러 였다.

필자가 한가지 놓친게 빌드환경이었는데 Flutter에서는 

```--flavor production --dart-define=FLAVOR=production```와 같이 development,staging,production환경별 빌드를 나누는 방법이 있는데 필자가 이번에 빌드한 프로젝트내에서는 이 환경값이 지정이되있지 않을때 위 에러가 발생하는듯 했다.

아래 커맨드로 에러는 사라졌다.

```
flutter build apk --release --flavor production --dart-define=FLAVOR=production
```

다른 문제가 있어 최종적으로 아래와 같은 커맨드로 빌드/에뮬실행에 성공했다.

```
fvm flutter run --flavor development --dart-define=FLAVOR=development 
```

다른 문제에 대해서는 별도 포스트예정


---


[link]: https://stackoverflow.com/questions/61605862/missing-provisional-profile-feature-when-building-using-fastlane-jenkins
