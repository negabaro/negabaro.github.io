---
layout: post
title: "CSS Framework Bulma사용시 자주사용하는 설정 모음"
tags: css
---

Bulma사용시 자주 사용하는 설정들을 정리해봤다.

상시 업데이트 예정


## List of all spacing helpers


[spacing-helpers]를 참고

mb = margin-bottom

margin-bottom을 0으로 하고 싶다면 mb-0클래스를 추가해주면 된다.

숫자가 늘어나면 0.25rem씩 증가한다.

자세한 표는 아래를 참고

![image](https://user-images.githubusercontent.com/4640346/111597578-a50f5880-8811-11eb-9251-58b1da264662.png)




## 색

```
is-primary
is-link
is-info
is-success
is-warning
is-danger
```

## 크기

```
is-small
is-medium
is-large
```

## 스타일/상태

is-outlined
is-loading
[disabled]
Float
is-clearfix
is-pulled-left
is-pulled-right

## 클리어

```
is-marginless
is-paddingless
is-radiusless
is-shadowless
```

## 헬퍼 클래스

```
is-overlay
is-clipped
is-unselectable
is-invisible
is-hidden
is-sr-only
is-relative
```

## Display 클래스

```
is-block
is-flex
is-inline
is-inline-block
is-inline-flex
```

## 하나 표시/숨기기


```
is-**-mobile
is-**-tablet-only
is-**-desktop-only
is-**-widescreen-only
is-hidden-mobile
is-hidden-tablet-only
is-hidden-desktop-only
is-hidden-widescreen-only
```

## 두개 이상 표시/숨기기

```
is-**-touch
is-**-tablet
is-**-desktop
is-**-widescreen
is-**-fullhd
is-hidden-touch
is-hidden-tablet
is-hidden-desktop
is-hidden-widescreen
is-hidden-fullhd
```

## 텍스트/배경 색

has-text-** has-background-**

```
has-text-white … 白
has-text-black … 黒
has-text-light … ライト
has-text-dark … ダーク
has-text-primary … エメラルド
has-text-info … 明るい青
has-text-link … 青
has-text-success … 緑
has-text-warning … 黄
has-text-danger … 赤
has-text-black-bis … 暗い
has-text-black-ter …
has-text-grey-darker …
has-text-grey-dark …
has-text-grey …
has-text-grey-light …
has-text-grey-lighter …
has-text-white-ter …
has-text-white-bis … 明るい
```

## Size

```
is-size-1 …
is-size-7
```

3rem 에서 0.5rem 씩 작게 표시

![image](https://user-images.githubusercontent.com/4640346/111597062-2d412e00-8811-11eb-897e-ba358c5885a6.png)


## Alignment

```
has-text-centered
has-text-justified
has-text-left
has-text-right
```

## 대문자/소문자

```
is-capitalized
is-lowercase
is-uppercase
is-italic
```

## 텍스트weight

```
has-text-weight-light
has-text-weight-normal
has-text-weight-medium
has-text-weight-semibold
has-text-weight-bold
```

## Font-family

```
is-family-sans-serif
is-family-monospace
is-family-primary
is-family-secondary
is-family-code
```



## Columns

form작성시 자주사용

columns안에 복수의 column을 추가

```html
<div class="columns">
  <div class="column">
    First column
  </div>
  <div class="column">
    Second column
  </div>
  <div class="column">
    Third column
  </div>
  <div class="column">
    Fourth column
  </div>
</div>
```


## Sizes

다른 열은 자동으로 스페이스를 채워줌

```
is-full 4/4
is-three-quarters 3/4
is-half 2/4
is-one-quarter 1/4
is-two-thirds 2/3
is-one-third 1/3
is-four-fifths 4/5
is-three-fifths 3/5
is-two-fifths 2/5
is-one-fifths 1/5
```

## offset사용시

is-offset-**

```html
<div class=”columns is-mobile”> <div class=”column is-half is-offset-one-quarter”></div> </div>
```


## Narrow System

스페이스를 넣고 싶을때 is-narrow이용

```html
<div class="columns">
  <div class="column is-narrow">
	  <div class="box" style="width: 200px;"></div>
	</div>
	<div class="column"></div>
</div>
```

## is-mobile

모바일 단말에 ON하고싶을때 is-mobile사용

데스크톱도 대응하고싶을때는 is-desktop

```html
<div class=”columns is-mobile”> … </div>
```

## is-gapless

columns간의 간격(스페이스)를 없애줌


## is-multiline

으로 복수행에 적용이 가능

```html
<div class=”columns is-gapless　is-multiline”> … </div>
```

## Container

```html
<div class="container">
  <div class="notification">
    This container is <strong>centered</strong> on desktop.
  </div>
</div>
```

## 그외

```
.navbar
.hero
.section
.footer
Level
level: main container
level-left for the left side
level-right for the right side
level-item for each individual element
```


## Media Object

```html
<article class="media">
  <figure class="media-left">
  </figure>
  <div class="media-content">
    <div class="content">
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item"></a>
        <a class="level-item"></a>
        <a class="level-item"></a>
      </div>
    </nav>
  </div>
  <div class="media-right">
    <button class="delete"></button>
  </div>
</article>
Hero
https://bulma.io/documentation/layout/hero/#full-height-hero
hero
hero-head (always at the top)
hero-body (always vertically centered)
hero-foot (always at the bottom)
full width banner が作れる

<section class="hero">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Hero title
      </h1>
      <h2 class="subtitle">
        Hero subtitle
      </h2>
    </div>
  </div>
</section>
is-bold グラデーション

<section class="hero is-medium is-primary is-bold">
</section>
大きさ変えられる

is-medium
is-large
is-fullheight
navbarを併用して

is-fullheight-with-navbar
Section
body の直接の子供

<body>
  <section class="section">
    <div class="container">
    </div>
  </section>
</body>
Footer
<footer class="footer">
</footer>
Tile
<div class="tile">
  <!-- The magical tile element! -->
</div>
is-ancestor 水平にtileを並べる <div class=”tile is-ancestor”> <div class=”tile”></div> <div class=”tile”></div> </div>
is-vertical 要素を目一杯に広げる <div class=”tile is-ancestor”> <div class=”tile is-4 is-vertical is-parent”> <div class=”tile is-child box”> <p class=”title”>One</p> </div> <div class=”tile is-child box”> <p class=”title”>Two</p> </div> </div> <div class=”tile is-parent”> <div class=”tile is-child box”> <p class=”title”>Three</p> </div> </div> </div>


## 전체크기 버튼만들기

```js
<button type="submit" class="button is-primary is-fullwidth">
      <span class="icon"><i class="fa fa-sign-in"></i></span>
      <span>Login</span>
</button>
```

[전체크기 버튼만들기 참고링크]

## 마우스 오버시 색깔 바뀌는 버튼만들기


is-outlined을 사용

```slim
.button.is-danger.is-fullwidth.is-outlined
  span  멤버삭제
  span.icon.is-small
    i.fas.fa-times
```

---

[![Image from Gyazo](https://i.gyazo.com/425dc9114fccde239a48646a7e1e145a.gif)](https://gyazo.com/425dc9114fccde239a48646a7e1e145a)

[전체크기 버튼만들기 참고링크]: https://stackoverflow.com/questions/41506165/how-can-i-make-a-bulma-button-goes-full-width

[Bulmaチートシート]: https://blog.proglearn.com/2019/08/19/562/

[syntax]: https://bulma.io/documentation/modifiers/syntax/

[spacing-helpers]: https://bulma.io/documentation/helpers/spacing-helpers/
