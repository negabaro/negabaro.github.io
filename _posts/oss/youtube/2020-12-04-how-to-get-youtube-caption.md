---
layout: post
title: "Youtube get_video_info로 유투브 자막 정보가져오기"
author: negabaro kim
tags: youtube
---

Youtube Api에는 없는것 같지만 get_video_info를 이용해 가져올 수 있다.

[youtube-captions-scraper]라는 open source를 이용하면 간단히 언어별 자막정보를 가져올 수 있었다.


## 추출한 자막예


```
[{"start":"0.089","dur":"5.25","text":"hey everyone I'm Neil Patel and today is"},{"start":"2.55","dur":"5.79","text":"another QA Thursday where when you leave"},{"start":"5.339","dur":"5.641","text":"a comment we answer it I'm here with"},{"start":"8.34","dur":"5.1","text":"Adam from viewership hey guys and this"},{"start":"10.98","dur":"4.5","text":"week's question is so one question that"},
```

[자막이 있는 영상] 정보를 이용함

---

# 느낀점

유투브 검색은 썸네일이나 태그에 관련 검색어에 의존하기 때문에
특정 언어가 언급된 영상에 대한 검색이 불가능하다고 생각했는데
이 기능을 이용하면 해당 검색기능을 만드는것도 가능할것 같다.


## 문제점

모든 비디오가 자막정보를 가진것은 아니기 때문에

자막이 있는 비디오 리스트가 없는한 무작위의 검색은 어려워 보인다.

있더라도 거대한 인덱싱을 구현해야 하기에 특정 비디오에 대한 음성검색으로 국한될 수 밖에 없을듯..

다른 문제로 자막문자에 의존하므로 자막의 정확도에 따라 검색품질도 달라질 수 있을것 같다.


# 메모

## diaporama

[youtube-captions-scraper]를 이용해서 youtube자막 정보를 추출해주는 사이트인거 같은데
멘테넌스를 안해서 그런건지 정상작동 하지는 않았다.

github URL: [Github diaporama]

Site: [diaporama]

## get_video_info란?

youtube에서 제공하는 비디오의 정보가 알 수 있는 url

아래와 같다.

```
https://youtube.com/get_video_info?video_id=${videoID}
```

[youtube.get-video-info]이런 oss도 있는데 현재는 정상작동하지 않았다.

---

[youtube.get-video-info]: https://github.com/pste/youtube.get-video-info

[youtube-captions-scraper]: https://github.com/algolia/youtube-captions-scraper

[자막이 있는 영상]: https://www.youtube.com/watch?v=Uar2hXRrckY

[Github diaporama]: https://github.com/nicooprat/diaporama/blob/742c993b89a6000c4033f0752db7dc14fafad9a7/package.json

[diaporama]: https://www.diaporama.app/
