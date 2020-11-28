---
layout: post
title: "Youtube IFrame Player API란?"
author: negabaro kim
tags: js/youtube
---


# IFrame Player API란?

html에 유투브 영상을 랜더링 해주는 API이다.

일반적으로는 iframe src프로퍼티에 youtube링크를 넣어줌으로 구현이 가능하지만 IFrame Player API은 거기에 더해서 유투브 영상을 간단히 제어할 수 있는 옵션들이 제공된다.

예를들어 커스텀한 버튼을 만들어 해당 버튼을 클릭하면 영상을 재생한다든지 중지시킨다든지
현재 보고 있는 영상의 Time을 알아내는 getCurrentTime이나 해당 영상의 전체길이가 알 수 있는 getDuration도 사용가능하다.

필자가 개발하고 있는 영상반복재생 서비스인 [Loop Youtube]도 Youtube Iframe API를 사용해 구현했다.


# 동작방식

iframe태그를 javascript로 동적으로 생성하고 생성한 iframe태그는 하나의 오브젝트로서 사용된다.

그리고 해당 오브젝트에 IFrame Player API로 정의된 메소드를 실행하는 방식으로 제어가 가능한다.

정적으로 iframe태그를 만든후 해당 dom을 js로 제어하는거랑 똑같은거 아님? 이라고 할 수 있는데 이건 none-cross-origin문제로 브라우저 룰 위반이라 제어가 불가능


# 기본 코드

[YouTubeIFrame Player API공식 도큐멘트]에 기술되어있는 코드는 아래와 같다.


```html
<!DOCTYPE html>
<html>
  <body>
    <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
    <div id="player"></div>

    <script>
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '360',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
    </script>
  </body>
</html>
```


# vue.js 코드

필자는 vue.js에서 youtube-iframe를 이용해 아래와 같이 구현했다.

```js
<template>
  <div id="player2" />
</template>
<script>
  import YouTubeIframeLoader from "youtube-iframe";
  export default Vue.extend({
  methods: {
      player2() {
        YouTubeIframeLoader.load((YT) => {
          const player = new YT.Player("player2", {
            //startSeconds: '1999',
            //height: '390',
            //width: '640',
            videoId: this.videoId,
            //videoId: "Vw-tayLQLuQ",
            events: {
              onReady: () => {},
              onStateChange: e => {}
            }
          });
        });
      },
  }
  });
</script>
```



# vue-youtube를 사용한 예제

`vue-youtube`를 사용하면 더 심플하게 구현이 가능하다.



```js
<template>
  <youtube
    :video-id="videoId"
    :player-vars="playerVars"
    @ready="ready"
    @playing="playing"
    @ended="ended"
    @error="error"
    ref="youtube" />
</template>
<script>
  import Vue from "vue";
  import VueYoutube from "vue-youtube";
  Vue.use(VueYoutube);
  export default Vue.extend({
      computed: {
        playerVars() {
          return {
            //controls: 0,
            player3: Object,
            rel: 0,
            autoplay: 1,
            enablejsapi: 1,
            fs: 0,
            playsinline: 1,
            ivLoadPolicy2: 1,
            //playlist: this.videoId,
            //muted: 1,
            //loop: 1,
            start: this.start,
            end: this.end
          };
        },
      },
      methods: {
          ready(){},
          playing(){},
          ended(){},
          error(){}
      }
  });
</script>

```

---

[Link]: https://qiita.com/AkiponPlg/items/a201f0733312194dece0
[Loop Youtube]: https://l-youtube.com
[YouTubeIFrame Player API공식 도큐멘트]: https://developers.google.com/youtube/iframe_api_reference