---
layout: post
title: "Netlify Google Analytics 설정하는 방법"
description: 
author: negabaro kim
tags: devops/netlify
---

Netlify에서는 월$9 가격에 analytics기능도 제공하고 있지만
Google Analytics도 간단히 설정이 가능하다.

이 포스트에서는 Netlify에서 GA(Google Analytics)설정을 하는 방법에 대해 알아보자.


# GA의 트랙킹코드

먼저 아래와 같은 트랙킹 코드를 준비후

```js
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-xxxxxxxxxxxx"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-xxxxxxxxxxxxx');
</script>
```

다음으로

Netlify관리화면에서  -> Build & Deploy -> Snippet Injection -> Add snippet

를 클릭해준다.

![image](https://user-images.githubusercontent.com/4640346/99679599-78477080-2abf-11eb-883e-d09771e9a48c.png)

아래와 같이 트랙킹 코드를 넣어주고 SAVE해주기만 하면된다.

![image](https://user-images.githubusercontent.com/4640346/99679661-8b5a4080-2abf-11eb-972e-d8ae3c79b9b9.png)

해당 페이지에 몇번 억세스를 하고 2~3분 후에 GA화면을 보면 정상적으로 트랙킹하는것을 확인할 수 있었다. 