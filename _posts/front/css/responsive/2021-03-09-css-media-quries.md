---
layout: post
title:  "css Media-query에 대해서"
author: negabaro kim
categories: css
tags:	css
---
{% highlight html %}
{% endhighlight %}

브라우저가 큰지 작은지 알아내는 방법
레스폰시브한 페이지 만들때 자주사용


#### 코드예

디폴트로 배경화면이 초록색인 상태에서
320-640화면 일경우 배경화면을 파란색으로 바꿔보았다.

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Media Queries</title>
  <style>
  body{
    background-color: green;
  }
  @media screen and (min-width:320px) and (max-width:640px){
    body{
      background-color: blue;
    }
  }
  </style>
</head>
<body>
</body>
</html>
{% endhighlight %}

#### 결과화면

![media](https://user-images.githubusercontent.com/4640346/40279924-70212c84-5c86-11e8-833f-70867fbd3d47.gif)


---

## 문법

### 1. ~까지

```css
@media screen and (max-width: 768px)
```

최대 768px까지를 대상으로 한다.

### 2. ~부터

```css
@media screen and (min-width:1024px)
```

1024px부터

### 3. 에서 ~까지

```css
@media screen and (min-width: 321px) and (max-device-width: 920px) {
```

321px ~ 920px까지



## 메모

### 구분 기준

375px까지를 스마트폰

768px이상은 웹으로 간주(태블릿 영역이 겹침)

1024px이상은 확실한 웹.



### Viewport

Media Queries를 정상적으로 기동하기 위해서는 Viewport지정이 필요함.

Viewport는 최초에 읽어올 화면 사이즈, 핀치in,out의 제어 확대률 지정이 가능

```html
<meta name="viewport" content="width=device-width, maximum-scale=1.0, minimum-scale=0.5,user-scalable=yes,initial-scale=1.0" />
```