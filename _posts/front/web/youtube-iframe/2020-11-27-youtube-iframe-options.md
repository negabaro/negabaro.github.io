---
layout: post
title: "Youtube iframe에서 사용하는 옵션에 대해"
author: negabaro kim
tags: js/youtube
---


이 포스트에서는 Youtube iframe에서 자주 사용하는 옵션에 대해 알아보자.


여기서 말하는 `옵션`은 아래 코드에 쿼리파라메터에 기술되어있는 `옵션`을 말한다.

전체 옵션은 [Document]를 참고



```html
<iframe
  src="https://www.youtube.com/embed/xx?옵션"
  allow="autoplay; fullscreen"
></iframe>
```


# 유투브 플레이어 데모

[유투브 플레이어 데모]에서 여러가지 옵션을 테스트해볼 수 있다.

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

# color

동영상 플레이어의 색상변경시 사용
디폴트가 red인데 white로 변경이 가능하다.(선택지가 적구나..)

```
이 매개변수는 시청자가 동영상에서 이미 시청한 부분을 강조표시하기 위해 플레이어의 동영상 진행률 표시줄에서 사용할 색상을 지정합니다. 유효한 매개변수 값은 red 및 white이며 기본적으로 플레이어는 동영상 진행률 표시줄에서 빨간색을 사용합니다. 색상 옵션에 대한 자세한 내용은 YouTube API 블로그를 참조하세요.

참고: color 매개변수를 white로 설정하면 modestbranding 옵션이 사용 중지됩니다.
```

# modestbranding

```
이 매개변수를 통해 YouTube 로고를 표시하지 않는 YouTube 플레이어를 사용할 수 있습니다. 매개변수 값을 1로 설정하면 YouTube 로고가 컨트롤바에 표시되지 않습니다. 하지만 사용자가 마우스 포인터를 플레이어 위에 올려놓으면 작은 YouTube 텍스트 라벨이 일시중지된 동영상의 오른쪽 상단에 표시됩니다.
```

# theme

예전엔 이런 옵션이 있었다고 하는데 현재는 사용되지 않는다고 한다.

```
The theme parameter has been deprecated for the HTML5 player. HTML5 players now always use the dark theme.
```

# controls

Another example is the controls parameter that indicates whether the video player controls are displayed. For IFrame embeds that load a Flash player, it also defines when the controls display in the player as well as when the player will load.

Supported values are:

controls=0 – Player controls do not display in the player. For IFrame embeds, the Flash player loads immediately.
controls=1 (default) – Player controls display in the player. For IFrame embeds, the controls display immediately and the Flash player also loads immediately.
controls=2 – Player controls display in the player. For IFrame embeds, the controls display and the Flash player loads after the user initiates the video playback.

https://stackoverflow.com/questions/38332421/customise-youtube-controls-title-and-the-whole-iframe

### reference:

[유투브 플레이어 데모]: https://developers.google.com/youtube/youtube_player_demo
[Document]: https://developers.google.com/youtube/player_parameters?hl=ja

[Youtube iframe 자동재생(autoplay)옵션에 대해서]: https://negabaro.github.io/archive/why-does-not-working-autoplay