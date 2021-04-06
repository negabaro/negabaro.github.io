---
layout: post
title:  "IOS 시뮬레이터만 기동하는 방법"
author: negabaro kim
tags:	ios
---

터미널에서 아래 커맨드를 실행하면 ios 시뮬레이터 단독으로 실행이가능

```
open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app/
```


---


## 메모

### `open -a Simulator.app`로 기동실패

아래 커맨드로 실행이 가능하다고 하는데 필자의 환경에서는 동작하지 않음..

```
open -a Simulator.app
```


### android 에뮬레이터 기동


Android의 경우 `Android Studio -> Tools ->  AVD Manager`에서 Virtual Device를 작성해서 기동해야한다고


### PANIC: Missing emulator engine program for 'x86'에러

AVD는 처음에 x86으로 만들어지는데 Flutter프로젝트를 기동하면 

`PANIC: Missing emulator engine program for 'x86'`에러가 난다고..`x86_64`으로 바꿔주면 정상작동

[Flutterの環境構築]: https://qiita.com/mkosuke/items/7957e71968aefc6558be