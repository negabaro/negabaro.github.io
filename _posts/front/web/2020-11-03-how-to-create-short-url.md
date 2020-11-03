---
layout: post
title:  "short url생성원리"
tags: web
---

# 개요

twitter등에서 자주 보이는 short url서비스는 어떤식으로 구축하는지 알아보자.

[![Image from Gyazo](https://i.gyazo.com/4a75c8ffac482b7f92a62fbd788ecde3.gif)](https://gyazo.com/4a75c8ffac482b7f92a62fbd788ecde3)

필자가 자주사용하는 [bitly]를 예로 설명하면 아래와 같이 동작한다.

1. 사용자 URL을 입력후 Shorten버튼을 클릭
2. 유니크한 키(7char)를 생성
3. 해당 키와 사용자가 입력한 original url을 특정 db컬럼에 저장
4. `bitly.com/유니크한 키`로 억세스시 해당키를 갖고 있는 컬럼의 original url로 리다이렉트


# 느낀점

리다이렉트전에 광고를 넣는다든지 피싱사이트로 사용할 우려가 있음을 주의해야할것 같다.

nosql + spa 로 간단한 사이드 프로젝트를 해보고 싶을때 해볼만한 서비스가 아닌가 싶다.

short url을 사용해도 open graph meta tag가 표시 안되는 문제는 생기지 않았다.

[bitly](https://bitly.com/)
[단축사이트 나무위키](https://namu.wiki/w/%EB%8B%A8%EC%B6%95%20%EB%8F%84%EB%A9%94%EC%9D%B8)