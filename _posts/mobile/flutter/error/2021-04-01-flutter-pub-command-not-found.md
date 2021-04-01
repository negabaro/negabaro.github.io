---
layout: post
title:  "flutter pub command not found 에러"
author: negabaro kim
tags: flutter
---


## 에러

fvm커맨드 설치를 위해

```
pub global activate fvm 
```

를 실행하려는데

> pub command not found

에러가 발생

## 해결방법

아래와 같이 실행하면 pub커맨드 사용이가능했다.

```
flutter pub global activate encrypt
```

`~/.bashrc`에 아래 커맨드도 추가해줬다.

```
export PATH="$PATH":"$HOME/development/flutter/.pub-cache/bin"
```

---

[pub command not found]: https://github.com/flutter/flutter/issues/34475

