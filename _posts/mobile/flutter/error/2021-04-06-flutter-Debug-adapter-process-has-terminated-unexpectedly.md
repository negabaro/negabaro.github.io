---
layout: post
title:  "flutter Debug adapter process has terminated unexpectedly (exit code: 1)　에러"
author: negabaro kim
tags: flutter/error
---


## 에러

VSCode에서 에뮬레이터를 실행하면 아래와 같은 에러가 발생했다.

```
flutter Debug adapter process has terminated unexpectedly (exit code: 1)
```


## 해결방법


`.vscode/settings.json`에 아래 설정을 추가해주고 VSCode를 재실행해줘서 해결

```
{
    "dart.flutterSdkPaths": [
        ".fvm/flutter_sdk",
    ],
}
```


프로젝트마다 fvm을 이용해 Flutter SDK를 설치했을때 자주 발생하는 에러인것 같다.

위 설정의 의미에 대해서는  [Flutter버전관리툴 fvm에 대해 알아보자.]를 참고 바란다.



[Flutter버전관리툴 fvm에 대해 알아보자.]: https://negabaro.github.io/archive/flutter-fvm
