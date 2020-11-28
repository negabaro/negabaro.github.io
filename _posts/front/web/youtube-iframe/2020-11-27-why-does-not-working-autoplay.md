---
layout: post
title: "Youtube iframe 자동재생(autoplay)옵션에 대해서"
author: negabaro kim
tags: js/youtube
---


# 선 결론

2018년 4월부터 autoplay옵션은 동작하지 않음.

단 영상이 음소거 상태일경우 동작함.


# autoplay 옵션이란

Youtube를 iframe으로 재생할때 autoplay라는 옵션이 있다.

player를 읽어온후 영상을 자동재생하는 옵션이다.
디폴트는 0으로 자동재생하지 않는다. 1일 경우 자동재생이 가능하다.


라고 도큐멘트에 설명되어있지만 실제로는 동작하지 않는다고 한다.

아래 stackoverflow에서 발췌

```
Note:autplay is not working since April of 2018 because Google decided to give greater control of playback to users. You just need to add &mute=1 to your URL I have updted my answer please check!! 
```


# mute=1일경우 autoplay

`mute=1`일 경우 동작한다고 하는데 필자가 테스트한 결과 동작하지 않았음.


# setVolume(0)하면 autoplay유효

`setVolume(0)`을 설정하면 autoplay가 동작했다.

```js
ready(){
  this.player.mute();
  this.player.setVolume(0);
}
```


# 메모
 
## event ready에서 setVolume(0)하고 playing에서 setVolume(100)하면 어떻게 될까


귀신같이 알아서 정지시킴..

playing이 불려진 시점에서 영상이 정지된 상태가됨


## 왜 autoplay가 동작하지 않는가?

```
YouTube Autoplay not working, It's not working since April of 2018 because Google decided to give greater src​="https://www.youtube.com/embed/-SFcIUEvNOQ?autoplay=  If autoplay is not working for you the next time you’re trying to watch videos on YouTube, then try one of the methods that follow. Make sure that Autoplay is enabled Regardless of all of the other settings and options that you tweak and play with, if you haven’t enabled the autoplay feature on YouTube then it simply will not work.
```

```
Why does my YouTube video not autoplay?, If autoplay is not working for you the next time you're trying to watch videos on YouTube, then try one of the methods that follow. Make sure that  It's not working since April of 2018 because Google decided to give greater control of playback to users. You just need to add &mute=1 to your URL.
```

## 모바일에서도 autoplay가 동작하지 않는 이유

의도치 않은 네트워크 트래픽으로 인한 과도한 요금 청구등을 막기 위한


```
"Warning: To prevent unsolicited downloads over cellular networks at the user’s expense, embedded media cannot be played automatically in Safari on iOS — the user always initiates playback."
```

```
모바일 고려사항
자동 재생 및 스크립트 재생
특정 모바일 브라우저(예: Chrome 및 Safari)의 HTML5 <video> 요소는 사용자 상호작용(예: 플레이어에서 탭하기)으로 시작되는 경우에만 재생되도록 허용합니다. 다음은 Apple의 도움말에서 발췌한 내용입니다.

'경고: 데이터 네트워크에서 사용자에게 비용이 부과되는 원하지 않는 다운로드가 발생하는 것을 방지하기 위해 삽입된 미디어는 iOS의 Safari에서 자동으로 재생될 수 없습니다. 항상 사용자가 재생을 시작합니다.'

이러한 제한으로 인해 autoplay, playVideo(), loadVideoById()와 같은 매개변수 및 함수는 모든 모바일 환경에서 작동하지 않습니다
```

[PlayVideo Document]

[Link]

[Link]: https://www.xspdf.com/resolution/53158319.html

[Link2]: https://www.evoworx.co.jp/blog/video-autoplay/

[PlayVideo Document]: (https://developers.google.com/youtube/iframe_api_reference#playVideo)


[chrome-vimeo-iframe-autoplay-not-working-anymore]: (https://stackoverflow.com/questions/50236646/chrome-vimeo-iframe-autoplay-not-working-anymore/50510766)

[youtube-autoplay-not-working]: (https://stackoverflow.com/questions/40685142/youtube-autoplay-not-working)