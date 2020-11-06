---
layout: post
title:  "vue.js로 작성한 SPA에 head설정(메타태그등) 해주는 법(using vue-head)"
description: "vue-head package를 이용하면 간단히 설정이 가능하다."
author: negabaro kim
tags:	vue.js
---

# 개요

이 포스트에서는 vue에서 SPA구성시 head요소를 간단히 추가할 수 있는 `vue-head`라이브러리에 대해 알아보자.


# 설치


```js
npm install vue-head --save
```

npm install후 사용할 컴퍼넌트에 아래와 같이 추가만 해주면 된다.

```js
import Vue from 'vue'
import VueHead from 'vue-head'

Vue.use(VueHead)
```

# 설정

data함수와 같은 인덴트에 head를 설정하고 title,meta,link,script,style태그등을 추가해서 설정할 수 있다.

아래의 정적인 값을 넣는 예제이다.

```js
data: function () {
  return {
    ...
  }
},
head: {
  title: {
    inner: 'title',

    separator: '|',
    complement: 'subtitle'
  },
  meta: [
    { name: 'description', content: 'description hoge' },
    { name: 'viewport', content: 'width=device-width,initial-scale=1.0,user-scalable=no' }
    { charset: 'utf-8' },
    { property: 'og:type', content: 'website' },
    // ... 
  ],
  link: [
    { rel: 'stylesheet', href: '외부css파일' },
    { rel: 'shortcut icon', href: 'fabicon' },
    // ... 
  ],
  script: [
    { type: 'text/javascript', src: '외부js파일', async: true},
    // body内に挿入したい場合は「body: true」を入れましょう
    { type: 'text/javascript', src: '외부js파일', async: true, body: true},
    // ... 
  ]
},
```

# 동적인 설정

위 예제는 정적인 값을 넣는 예제였고 동적인 값을 넣기 위해서는 

data의 값들을 this로 참조해 사용해야하는데 이때 그냥 변수를 넣는것으로는 동작하지 않으므로
function함수를 사용해야한다.

예제는 아래와 같다.

```js
head: {
  title: function () {
    return {
      inner: this.title,
      separator: '|',
      complement: 'subtitle'
    }
  },
  meta: function () {
    return [
      { property: 'og:title', content: this.title + ' | subtitle' },
      { property: 'og:description', content: this.description },
      { name: 'description', content: this.description },
      { name: 'keywords', content: this.keywords },
      // ... 
    ]
  },
```

# 공통 head설정과 component별 설정 나누기

상위 컴퍼넌트에 공통적으로 사용하는 head설정을 하고 하위 개별 컴퍼넌트에서 다른 head설정을 해주면 된다.

즉, 상위 컴퍼넌트를 우선사용하고 하위 컴퍼넌트에 재정의 되어있을시 해당 설정이 덮어쓰기 된다는 의미이다.


# 메모

## vue-head로 OGP설정시 문제점

google bot은 javascript를 실행해 크롤링해주지만 twitter,facebook은 javasscript을 실행해주지 않기때문에 vue-head로 OGP(meta tag)를 추가해준들 의미가없음.

아래 캡쳐와같이 설정해줘도 설정되지 않은걸로 나옴.

![image](https://user-images.githubusercontent.com/4640346/98397233-610d8980-20a2-11eb-89de-092b380af671.png)

### reference:

[Link1](https://www.sky-limit-future.com/entry/2017/09/19/131736)

[Link2](https://qiita.com/yuta-38/items/1fc2d1f5b4add2c0ed2c)

[Github Document](https://github.com/ktquez/vue-head)

[Link3](https://ti-tomo-knowledge.hatenablog.com/entry/2018/06/21/104519)

[SPA with AWS]:(https://www.slideshare.net/rs_wisteria/spaogp)

