---
layout: post
title:  "Facebook,Twitter,Slack,KakaoTalk,Line에서 영상링크를 인라인으로 재생시키는방법"
tags: web/ogp
---

# Line

불가능

# Kakao Talk

불가능

# Facebook의 경우


현재는 불가능
페이스북에서 인라인 재생을 막아놈

인라인 재생외 동작확인시
[Facebook OGP debug tool]에서 디버깅이 가능


# Twitter의 경우

가능

<blockquote class="twitter-tweet"><p lang="und" dir="ltr"><a href="https://t.co/gzeMmT3NvZ">https://t.co/gzeMmT3NvZ</a></p>&mdash; negabaro (@negabaro) <a href="https://twitter.com/negabaro/status/1331468011899785217?ref_src=twsrc%5Etfw">November 25, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

필수meta tag설정은 아래와 같다.

```html
 <meta name="twitter:card" content="player">
 <meta name="twitter:site" content="@username">
 <meta name="twitter:title" content="テストタイトル">
 <meta name="twitter:description" content="テストです。">
 <meta name="twitter:image" content="https://xxxx/ki.png">
 <meta name="twitter:player" content="https://www.youtube.com/embed/xxxx?rel=0 amp;controls=0&amp;showinfo=0">
 <meta name="twitter:player:width" content="640">
 <meta name="twitter:player:height" content="360">
```


[vue-cli-vue-head-test] 에서 동작확인함.

디버깅은 여기서 [Card validator]


# Slack

유투브링크는 inline재생이 가능한걸로 보아서 가능할지도??

![image](https://user-images.githubusercontent.com/4640346/100186885-3fc5ed80-2f2a-11eb-82c4-5f61a49a33c4.png)


조사중..
단순og:video이나 twitter:xx설정만으로는  인라인 재생안됨

---

# 메모

## meta tag에 기술할 정보와 억세스 도메인명이 틀려도 문제없는가

https://l-youtube.com에 억세스시
meta tag정보가 https://youtube.com여도 문제 없이 동작함(twitter)

## twitter:player에 지정한 url에 있는 javascript코드는 동작하는가

조사중






### reference:

[vue-cli-vue-head-test]: https://negabaro.github.io/vue-cli-vue-head-test/

[Facebook OGP debug tool]: https://developers.facebook.com/tools/debug

[Card validator]: https://cards-dev.twitter.com/validator

[FacebookやTwitter上で動画をインライン表示させる ※現在使えません※]:(https://qiita.com/yumikokh/items/d6a49524837214758170)

[My question]: https://stackoverflow.com/questions/64968557/even-if-the-same-meta-tag-og-video-as-youtube-is-set-the-behavior-does-not-m?noredirect=1#comment114869380_64968557

[Slack integration]: https://stackoverflow.com/questions/38426714/slack-create-custom-embedded-video-or-audio-player-similar-to-the-youtube-int
