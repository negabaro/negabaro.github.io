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