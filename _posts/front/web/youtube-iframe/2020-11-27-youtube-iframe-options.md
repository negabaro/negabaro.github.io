---
layout: post
title: "Youtube iframe에서 사용하는 옵션에 대해"
author: negabaro kim
tags: js/youtube
---


이 포스트에서는 Youtube iframe에서 자주 사용하는 옵션에 대해 알아보자.


여기서 말하는 `옵션`은 아래 코드에 쿼리파라메터에 기술되어있는 `옵션`을 말한다.

```html
<iframe
  src="https://www.youtube.com/embed/xx?옵션"
  allow="autoplay; fullscreen"
></iframe>
```

-----

# autoplay

디폴트 0, 1일 경우 자동재생

[Youtube iframe 자동재생(autoplay)옵션에 대해서]를 참고


# cc_load_policy

1일 경우 유저가 자막을 Off해도 강제로 띄어줌

0일 경우 디폴트로 유저설정에 따름.

# enablejsapi

1일 경우 IFrame또는  JavaScript Player의 호출을 제어가능해짐

디폴트값은 0 제어불가능


# rel

이 파라메터는 2018/9/25일에 변경됨

## 변경전

１일 경우, 첫 영상의 재생이 끝난뒤 유저에게 관련영상을 표시해줌(디폴트 1)

0일 경우, 관련영상은 표시되지 않음

## 변경후

관련영상을 비활성화 시키는건 불가능해짐

대신 0일 경우, 해당 영상의 채널내에 관련영상만 보여지게됨

# fs

디폴트 값은 1. 전체화면을 띄어주는 버튼을 표시

0일경우 해당 버튼을 비표시


# playsinline

```
iOS상의 HTML5플레이어 영상을 인라인또는 전체화면으로 재생할지에 대한 제어가 가능하다.
0: 전체화면으로 재생한다.(현재 디폴트값이지만 변경될 가능성도 있다.)
1: UIWebViews（allowsInlineMediaPlayback 프로퍼티를 TRUE로 지정한 경우）는 인라인 재생한다.
```

iOS에서 HTML5영상을 인라인을 재생시킬때 필요한 옵션

0일 경우 전체화면으로 재생되지만 1일 경우 인라인 재생
단 UIWebViews의 allowsInlineMediaPlayback 프로퍼티가 true일 경우만

이 옵션은 iOS로만든 어플리케이션안에서만 해당하는듯?



### reference:

[Document]: https://developers.google.com/youtube/player_parameters?hl=ja

[Youtube iframe 자동재생(autoplay)옵션에 대해서]: https://negabaro.github.io/archive/why-does-not-working-autoplay