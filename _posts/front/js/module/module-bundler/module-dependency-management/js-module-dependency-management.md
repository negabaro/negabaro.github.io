
---
layout: post
title:  "vue.js"
author: negabaro kim
tags:	vue.js
---

module bundler라는 말만 보면 뭔가를 하나로 합쳐주는 역할만 느껴지는데

사실 의존성 문제 해결을 해준다.

이게 어떤거냐면

그냥 여러 모듈을 합쳐주기만 하면 어떤 의존성 문제에 의해 동작을 안할때가 있는데
그런 부분을 해결해준다는 의미가 있다

babel은 모던 코드를 예전방식으로 바꿔주는게 다 각각 흩어진 상태 그대로 코드만 바꿔준다
그러므로 흩어져있는 코드를 모아주고 코드간의 의존성 문제까지 해결해주는게

module bundler의 역할이라는 것

依存関係を解決してくれる <<-- module bundler + module dependency management

babel -> 変換してくれるが、ばらばらになる

webpack ->
.js はこれを css はこれみたいなファイルごとに命令をくだすことができる webpacker
