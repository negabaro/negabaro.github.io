---
layout: post
title:  "Flutter android 빌드시 --stacktrace옵션을 실행하는 방법"
author: negabaro kim
tags:	flutter/error
---

## flutter android빌드시 아래와 같은 에러가 메시지가 발생

```
* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 2s
Exception: Gradle task assembleDebug failed with exit code 1
```


음?? 어디다가 `--stacktrace `옵션을 넣어서 실행하라는거지??

같은 고민을 하신 선지자분이 계셨다. 

[How to Run with --stacktrace option to get the stack trace]




## --stacktrace옵션을 실행하는법

flutter root디렉토리에서 아래 커맨드를 실행하라는 의미였다.

```
cd android
./gradlew assembleDebug --stacktrace
```

---

[How to Run with --stacktrace option to get the stack trace]: https://stackoverflow.com/questions/60186072/how-to-run-with-stacktrace-option-to-get-the-stack-trace