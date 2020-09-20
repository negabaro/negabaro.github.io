---
layout: post
title:  "vue-awesome-swiper를 이용해 vue에서 swiper(Carousel)를 사용해보자"
author: negabaro kim
tags:	vue.js
---

# vue-awesome-swiper란?

Swiper라는 인기 라이브러리를 vue에서 간단히 사용할 수 있게 만들어진 wrapper이다.

Swiper를 이용하면 아래와 같은 컴퍼넌트를 구현할 수 있다.

[![Image from Gyazo](https://i.gyazo.com/042e259664b8867099ec30f3363cae81.gif)](https://gyazo.com/042e259664b8867099ec30f3363cae81)


# swiper설치 방법

## 패키지 설치

```
yarn add swiper vue-awesome-swiper
```

※주의 swiper의 버전은 최신(6)이 아닌 `5.3.7`에서 동작확인했다.
6에서는 여러가지 버그가 있다고함. [Pagination is not working on Swiper6]관련 이슈


## 로드

사용하고자 하는 vue에서 아래 부분을 추가해주기만 하면 준비끝

```js
import Vue from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
//import "swiper/swiper-bundle.css"; << 6이상일 경우는 css를 이걸로 변경해야함
```


# 전체vue소스

```js
<template>
  <swiper
    class="swiper"
    :options="swiperOption"
  >
    <swiper-slide>Try</swiper-slide>
    <swiper-slide>resize</swiper-slide>
    <swiper-slide>the</swiper-slide>
    <swiper-slide>browser</swiper-slide>
    <swiper-slide>window</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide>
    <swiper-slide>Slide 7</swiper-slide>
    <swiper-slide>Slide 8</swiper-slide>
    <swiper-slide>Slide 9</swiper-slide>
    <swiper-slide>Slide 10</swiper-slide>
    <div
      class="swiper-pagination"
      slot="pagination"
    ></div>
  </swiper>
</template>

<script lang="ts">
import Vue from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
//import "swiper/swiper-bundle.css";

//import store from "@/src/store";
export default Vue.extend({
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 50,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      }
    };
  },
  created() {},
  methods: {},
  computed: {}
});
</script>
```


# 동작확인

실제 아래와 같이 동작한다.

[![Image from Gyazo](https://i.gyazo.com/042e259664b8867099ec30f3363cae81.gif)](https://gyazo.com/042e259664b8867099ec30f3363cae81)



#메모

## 용어정리

이 포스트에서 소개한 swiper와 유사한 의미로 Carousel라는 용어도 있다.


## swiper-pagination이 표시되지 않는 문제

swiper6 이상일때 swiper-pagination가 렌더링되지 않는 버그가 있는듯하다.
2020년9월19일 현재도 진행중이므로 swiper의 버전을 `"swiper": "^5.3.7"`으로 변경해서 해결

자세한건 아래 github issue를 참고

[Pagination is not working on Swiper6]


--------
[Pagination is not working on Swiper6]:https://github.com/surmon-china/vue-awesome-swiper/issues/684

### reference:

[공식 github](https://github.surmon.me/vue-awesome-swiper/)
[jsfiddle예제](https://jsfiddle.net/kabanoki/bvtz6n3u/)
[Carousel,Swiper용어 질문](https://teratail.com/questions/292656#reply-413979)
[주요 옵션들 설명 일본어](https://www.kabanoki.net/4783/)
[주요 옵션들 설명2 일본어](https://qiita.com/nakanishi03/items/c12221be7645b84016c8)
[주요 옵션들 설명3 일본어 가장김](https://www.webdesignleaves.com/pr/plugins/swiper_js.html)
[vue-awesome-swiper example](https://github.com/surmon-china/vue-awesome-swiper)