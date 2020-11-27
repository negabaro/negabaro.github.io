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

YouTube Autoplay not working, It's not working since April of 2018 because Google decided to give greater src​="https://www.youtube.com/embed/-SFcIUEvNOQ?autoplay=  If autoplay is not working for you the next time you’re trying to watch videos on YouTube, then try one of the methods that follow. Make sure that Autoplay is enabled Regardless of all of the other settings and options that you tweak and play with, if you haven’t enabled the autoplay feature on YouTube then it simply will not work.

Why does my YouTube video not autoplay?, If autoplay is not working for you the next time you're trying to watch videos on YouTube, then try one of the methods that follow. Make sure that  It's not working since April of 2018 because Google decided to give greater control of playback to users. You just need to add &mute=1 to your URL.

https://www.xspdf.com/resolution/53158319.html