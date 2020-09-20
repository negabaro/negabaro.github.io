---
layout: post
title:  "vue-awesome-swiper의 옵션에 대해 알아보자"
author: negabaro kim
tags:	vue.js
---

# 개요

이 포스트에서는 `vue-awesone-swiper`의 주요옵션에 대해 알아보자.

설치 방법은 아래 포스트를 참고

[vue-awesome-swiper를 이용해 vue에서 swiper(Carousel)를 사용해보자]

----

# initialSlide(디폴트 0)

슬라이드의 시작 index번호 지정이 가능(디폴트는 0이다)


# direction(디폴트 horizontal)

슬라이드 방향을 정한다.

디폴트는 horizontal(수평)이다.

수직으로 변경할때 vertical을 지정해주면 된다.

수직시에는 height,max-height값을 지정해야한다.


# speed(디폴트 300)

슬라이드의 속도 밀리초로 지정

디폴트는 300이다.

# autoHeight(디폴트 false)

true을 지정하면 현재 슬라이드 크기에 알맞은 높이로 자동조절 해준다.


# efect(디폴트 slide)

슬라이드의 이팩트 효과를 지정한다.

지정가능한 이펙트는 "slide", "fade", "cube", "coverflow" "flip"이다.


# spaceBetween(디폴트 0, 사용빈도 높음★★★★★)

슬라이드간의 여백을 px를 지정

요소에 마진을 지정하는경우, 나비게이션이 정상적으로 기동하지 않을 가능성 있음

# slidesPerView(디폴트 1, 사용빈도 높음★★★★★)

한번에 보여지는 슬라이드의 숫자를 의미한다.

Number값말고 'auto'로도 지정이 가능

`loop: true + auto` 지정시 loopedSlides를 지정할 필요가 있음.


# slidesPerGroup(디폴트 1)

동시에 슬라이드하게 하는 슬라이드의 숫자를 지정

# centeredSlides(디폴트 false)

true을 지정하면 액티브한 슬라이드를 중앙에 배치(통상 액티브한 슬라이드는 왼쪽편으로 배치)

# loop(디폴트 false)

true로 지정하면 슬라이드를 루프모드로 한다.(슬라이드가 끝나면 처음으로 돌아감)

# loopedSlides(디폴트 null)

slidesPerView를 auto로 지정하는 경우, 이 파라메터를 복제한 슬라이드수를 지정

# breakpoints(사용빈도 높음★★★★★)

화면 크기마다 다른 파라메터 지정이 가능

레스폰시브한 컴퍼넌트 구현시 필수

```js
breakpoints: {
  1024: {
    slidesPerView: 3,
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
```

--------




# pagination(swiper-pagination, 사용빈도 높음★★★★★)

slide 중간 밑 부분에 위치한다.(아래 그림 참고)

![image](https://user-images.githubusercontent.com/4640346/93692661-e9ef5680-fb30-11ea-8137-a1ba24c11cb4.png)


아래와 같이 swiper태그 전에 `swiper-pagination`를 추가해준다.

```html
...생략
<div class="swiper-pagination"></div>
</swiper>
```

옵션을 아래와 같다. 위에 지정한 클래스와 이름을 맞춰줘야한다.

```js
pagination: {
  el: ".swiper-pagination",
  clickable: true
},
```

`clickable true`를 지정하면 페이지네이션의 아이콘을 클릭한경우 해당한 슬라이드로 표시


# swiper-button-prev

이전 슬라이드로 넘기는 버튼

![image](https://user-images.githubusercontent.com/4640346/93692707-5cf8cd00-fb31-11ea-8ef4-8d9862fb1e32.png)

```html
<div class="swiper-button-prev"></div>
```

# swiper-button-next

다음 슬라이드로 넘기는 버튼

![image](https://user-images.githubusercontent.com/4640346/93692712-6a15bc00-fb31-11ea-800a-11ffbc827c6d.png)


```html
<div class="swiper-button-next"></div>
```

# swiper-scrollbar

슬라이드 스크롤바

```html
<div class="swiper-scrollbar"></div>
```

### reference:

[주요 옵션들 설명 일본어](https://www.kabanoki.net/4783/)
[주요 옵션들 설명2 일본어](https://qiita.com/nakanishi03/items/c12221be7645b84016c8)
[주요 옵션들 설명3 일본어 가장김](https://www.webdesignleaves.com/pr/plugins/swiper_js.html)

[vue-awesome-swiper를 이용해 vue에서 swiper(Carousel)를 사용해보자]:https://negabaro.github.io/archive/vue-awesome-swiper