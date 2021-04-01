---
layout: post
title:  "flutter [dart] Target of URI doesn't exist: 'package:xx/main.dart'. [uri_does_not_exist] 에러"
author: negabaro kim
tags: flutter
---

## 에러

기존 프로젝트를 VSCode에서 로드했을때 코드에 아래와 같은 빨간줄이 생겼다.

> [dart] Target of URI doesn't exist: 'package:xx/main.dart'. [uri_does_not_exist]


## 해결방법

VScode 재시작(이건 필요없을지도)후,

해당 프로젝트 루트 디렉토리에서 아래 커맨드를 실행하고 조금 있으니 빨간줄이 사라졌다.

```
fvm flutter pub get
```

※필자는 fvm을 사용해서 앞에 fvm을 붙였다.

---

[stackoverflow참고]

[stackoverflow참고]: https://stackoverflow.com/questions/44909653/visual-studio-code-target-of-uri-doesnt-exist-packageflutter-material-dart
