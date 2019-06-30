---
layout: post
title:  "css transformation에 대해서"
author: negabaro kim
categories: css
tags:	css
---
{% highlight html %}
{% endhighlight %}

트랜스포메이션은 html문서의 element들을 변경,모습이 변하는 효과를 줄 수 있음


#### 코드

box의 각도를 살짝 꺾는 코드

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Transformations</title>
  <style>
    .box{
      width: 100px;
      height: 100px;
      background: red;
      transform: rotate(20deg);
    }
  </style>
</head>
<body>
  <div class="box"></div>
</body>
</html>
{% endhighlight %}

#### 결과화면

![image](https://user-images.githubusercontent.com/4640346/40279802-15df0612-5c84-11e8-8079-1336662de4fd.png)


#### 코드2

회전과 동시에 transofrm-sacle을 이용해 사이즈를 줄이는 코드



{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Transformations</title>
  <style>
    .box{
      width: 100px;
      height: 100px;
      background: red;
      transition: transform .5s ease-in-out;
    }
    .box:hover{
      transform: rotate(1turn) scale(.5, .5);
    }
  </style>
</head>
<body>
  <div class="box"></div>
</body>
</html>
{% endhighlight %}

#### 결과화면

![transformation](https://user-images.githubusercontent.com/4640346/40279818-666d1894-5c84-11e8-986c-f58a222fdf61.gif)