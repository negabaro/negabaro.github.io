---
layout: post
title: "모바일 브라우저에서 인라인으로 비디오 재생하는 방법은?"
author: negabaro kim
tags: js/youtube
---


# 선 결론

video태그에서는 인라인 재생이 가능하다.

iframe이용시 Youtube를 인라인으로 재생하는 방법은 없다. (vimeo는 가능)

Youtube Iframe에서 전체화면을 제어하는 옵션인 playsinline는 IOS어플에서 웹뷰를 사용할때만 유효하다.


----

필자가 개발중인 유투브 반복재생 서비스 [Loop Youtube]는 전체화면으로 영상을 재생할 이유가 없어 비디오 재생시 인라인으로 재생하는 방법에 대해 찾아보았다.


# playsinline

현재 사용중인 Youtube Iframe에서는 playsinline이라는 옵션이 있는데 도큐멘트에는 아래와 같이 기술되어있다.

```
iOS상의 HTML5플레이어 영상을 인라인또는 전체화면으로 재생할지에 대한 제어가 가능하다.
0: 전체화면으로 재생한다.(현재 디폴트값이지만 변경될 가능성도 있다.)
1: UIWebViews（allowsInlineMediaPlayback 프로퍼티를 TRUE로 지정한 경우）는 인라인 재생한다.
```


UIWebViews의 allowsInlineMediaPlayback 프로퍼티가 true일 경우만 동작한다고 하니

iOS어플리케이션에서 한정된 옵션인듯 하다.

그리고 Iframe에 대한 언급은 없는것으로 보아 video태그에서만 가능한 옵션인것 같다.(미검증이므로 확실한것은 아님)

혹시나 몰라 Iframe에서 해당 옵션을 1로 해줘도 동작하지 않았다.


# vimeo영상은 디폴트로 인라인재생 서포트

vimeo는 유투브와 같은 영상을 공유하는 사이트인데 [vimeo 일본어 도큐멘트] 에 의하면
vimeo의 영상은 iframe에 넣어도 인라인 재생이 가능하고 한다. (디폴트가 인라인 재생)


아래 코드의 경우 인라인 재생이 가능했다.

```html
<iframe
  src="https://player.vimeo.com/video/342787403?playsinline=1"
  width="640"
  height="360"
  frameborder="0"
  webkitallowfullscreen
  mozallowfullscreen
  allowfullscreen
></iframe>
```

<iframe
  src="https://player.vimeo.com/video/342787403?playsinline=1"
  width="640"
  height="360"
  frameborder="0"
  webkitallowfullscreen
  mozallowfullscreen
  allowfullscreen
></iframe>

# html5 video태그를 이용

한편 video태그에는 inline재생이 가능한 옵션이 존재한다.

예를들어 html5-video를 사용하는 네이버 뉴스와 같은경우, 모바일 브라우저에서 악세스해도 인라인으로 비디오 재생이 가능하다.

찾아보다 알았는데 listenonrepeat는 비디오 태그를 사용하면서도 인라인 재생을 하지않고 전체화면으로 재생되었다.


---

[Loop Youtube]: https://l-youtube.com
[vimeo 일본어 도큐멘트]: https://vimeo.zendesk.com/hc/ja/articles/360000636368-%E3%83%A2%E3%83%90%E3%82%A4%E3%83%AB%E3%81%A7%E3%81%AE%E3%82%A4%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E5%86%8D%E7%94%9F