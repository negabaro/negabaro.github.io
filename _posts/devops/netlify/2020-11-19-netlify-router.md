---
layout: post
title: "Netlify에서 vue-router사용하는 방법"
description: 
author: negabaro kim
tags: devops/netlify
---


vue-cli로 만든 프로젝트에 vue-router로 만든 루팅이 로컬에서 정상작동하더라도

Netlify에 디플로이하면 아래와 같이 Page Not Found(404)에러가 발생한다.

![image](https://user-images.githubusercontent.com/4640346/99679445-4e8e4980-2abf-11eb-9fde-3139f42c8a82.png)

이 문제를 해결하기 위해서는 Netlify에 Redirect설정을 해줄 필요가 있다.

public디렉토리 이하에 `_redirects` 파일을 만들어주고 아래와 같이 설정해주자.

`touch /public/_redirects`

```
/*    /index.html   200
```

이 설정으로 어떤 URL도 index.html을 참조하게 되므로 SPA에서 설정한 router설정이 동작할 것이다.


아래와 같은 디렉토리 구조가 전제

```
/public
├── _redirects
├── favicon.ico
└── index.html
```