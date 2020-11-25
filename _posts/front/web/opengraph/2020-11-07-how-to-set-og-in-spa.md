---
layout: post
title:  "SPA에서 open graph(og)설정하는 방법"
tags: web/ogp
---


# 결론

기본적으로 불가능

SSR이나 prerendering을 사용해야한다.

AWS같은 서버리스 기반의 인프라를 활용하면 SPA에서도 가능한데 상당히 귀찮다.

# SPA에서 open graph(og)설정시 문제점

open graph설정을 위해서는 twitter,facebook기반(?)의 크롤링이 실행해줄 필요가 있는데
해당 크롤러는 Javascript를 실행해주지 않으므로 SPA기반에서 Javascript로 meta tag설정을 해주는 방법은 정상 동작하지 않는다.

그러므로 open graph설정을 위해서는 아래 세가지중 하나를 선택해야한다.

## 1. SSR

가장 정통적인 방법
nuxt.js,rails와 같이 억세스시 서버에서 렌더링을 해주는 방식

## 2. Prerendering

빌드시 생성될 페이지를 미리 만드는 방식이다.
블로그와 같이 어느정도 건수가 정해져있는 페이지일 경우 유용한 선택지가 될 수 있다.

[prerender-spa-plugin]을 많이들 사용하는듯하다.

※추가 Netlify의 prerendering기능을 사용하면 간단히 구현가능하다.

## 3. 서버리스 인프라툴을 이용한 아키텍처 구성

AWS의 API Gateway,lambda,lambda@edge등 서버리스 툴을 이용해 S3에 크롤링된 결과를 업로드하는 방식이다.
큰 의미로는 2번과 같은 방식이다.

필자의 견해로는 SSR을 사용하는게 가장 무난한 선택인것 같다.

------------

# 디버깅

open graph설정이 제대로 되었는지 확인하기 위해서 [디버깅]툴에서 확인이 가능하다.


### reference:

[SPA with AWS](https://www.slideshare.net/rs_wisteria/spaogp)

[디버깅]: https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fnegabaro.github.io%2Fclip-youtube%2F
[prerender-spa-plugin]: https://github.com/chrisvfritz/prerender-spa-plugin