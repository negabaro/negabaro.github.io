---
layout: post
title: "Youtube Iframe에서 유투브 무한 반복재생 구현하는 방법"
author: negabaro kim
tags: js/youtube
---

이 포스트에서는 Youtube Iframe을 이용해 유투브 무한 반복재생을 구현하는 방법에 대해서 알아보자.

필자가 생각한 어프로치는 아래 4가지 였다.


## 1. ended event에서 seekTo 호출

ended event는 유부트 재생이 끝나면 호출되는 이벤트이다.

재생이 끝나면 seekTo를 호출해서 시작시간으로 돌리는 방식이다.

```js
    ended() {
      this.player.seekTo(this.start);
    },
```

### 장점

가장 간단히 구현이 가능하다.

### 단점

웹에서 정상작동 하는데 모바일(safari)에서 동작하지 않았다.

아마도 모바일에서는 ended이벤트시에 player 오브젝트가 사라지는듯?



## 2. playing event에서 setTimeout을 설정하는 방법

재생시에 setTimeout에 `종료시간 - 시작시간`를 걸어줘서 seekTo를 호출하는 방식이다.

```js
setTimeout(this.seekTo, this.loopTrigerMilliSecond);
seekTo() {
  this.player.seekTo(this.start);
},
loopTrigerMilliSecond() {
  return (this.end - this.start) * 1000;
},
```

### 장점

모바일에서도 실행이 가능(고려사항이 있긴함)

### 단점

고려사항이 많았다. (영상을 멈췄을 경우 clearTimeout을 해줘야 하는등)

외부요소로 버그들이 발생(seekTo후에 1초후 재실행된다거나)


## 3. ended event에서 loadVideoById 호출

기존의 player 오브젝트를 seekTo로 재활용하는 방식이 아닌 영상이 끝나면 새로운 player를 띄어주는 방식이다.

### 장점

꽤 심플하다.
모바일도 움직인다..(문제점 있음)

### 단점

Youtube는 iframe실행시 인라인 재생이 불가능하다.(vimeo같은 경우는 가능)

이 사양에 의해 모바일에서는 반드시 autofullscreen이 되는데 

영상이 종료된후 재실행 하므로 fullscrren이 켜졌다 꺼졌다하는 현상이 발생한다.

뭐 반복재생이 되기만 하면됐지 라고 생각 하면 이 방법으로도 문제는 없긴함.


## 4. playing event + setInterVal + 종료시간에 1초 더하기

[youtube-api-event-on-a-specified-time]에서 소개된 방법을 응용한 방법이다.

위 방법을 이용하면 실행되고 있는 영상의 time을 알 수 있는데 이 방법을 통해 
ended event가 호출되기전에 종료시간이 되면 seekTo를 호출하는 방식이다.

필자는 종료시간에 + 1을 더해서 일단 실행하고 위 방법으로 실제 종료시간이 되었을때 seekTo를 호출했다.

이렇게 하면 setInterval시간을 1초단위로 실행해도 문제없이 동작함.



### 장점

3번에서 언급한 단점 해결

### 단점

2번의 단점이 존재(현재까지 버그는 없어보임)


## 그 외

그 외 iframe을 포기하고 video태그를 이용하는 방법(실제 유명 반복재생 사이트인 listenonrepeat의 경우 video태그를 이용하고 있었다.)

requestAnimationFrame을 이용해서 youtube의 재생 슬라이드 돔을 워치해서 시간을 특정하는 방법들이 있었는데 실제 검증은 해보지 못했으므로 이 포스트에서는 다루지 않았다.

----------

# 메모

아래 옵션들이  Youtube iframe에서 Looping을 위해 필요한 옵션이라는 글들이 있었는데 `무한 반복재생`과는 관계 없었다.

`muted: 1` `playlist: xx` `loop: 1`



## muted: 1

관계없는 옵션이다. autoplay하고 관계 있는 옵션인데 그것도 아닌거 같다.

필자가 테스트한 결과 `setVolume(0)`시에만 autoplay가 가능했다.

자세한건 [Youtube iframe 자동재생(autoplay)옵션에 대해서] 을 참고

## loop: 1

1회 루프는 가능한데 `무한 반복재생` 을 위해서는 불필요한 옵션이다.

## rel: 0

```
Also note that you need to set rel=0 as well.
```

라는데 `무한 반복재생`과는 관계없었다.


## playlist

필자의 환경에선 제대로 동작하지 않았다.  `무한 반복재생`을 위해서는 불필요한 옵션인거 같다.

※ 1회 loop를 위해서는 필요한 옵션인건가??

```
Only a playlist can loop.
As such, there is a workaround by creating a playlist of the video.

https://www.youtube.com/embed/X03jlFijeQ0?playlist=X03jlFijeQ0&autoplay=1&controls=0& modestbranding=1&rel=0&showinfo=0&loop=1
```
[youtube-embed-feature-for-looping-single-videos-isnt-working] 참고


-----------

[youtube-api-event-on-a-specified-time]: https://stackoverflow.com/questions/10175367/youtube-api-event-on-a-specified-time

[youtube-embed-feature-for-looping-single-videos-isnt-working]: https://stackoverflow.com/questions/44087897/youtube-embed-feature-for-looping-single-videos-isnt-working

[Youtube iframe 자동재생(autoplay)옵션에 대해서]: https://negabaro.github.io/archive/why-does-not-working-autoplay