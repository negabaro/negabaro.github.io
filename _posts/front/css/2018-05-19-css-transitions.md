---
layout: post
title:  "css transtion에 대해서"
author: negabaro kim
categories: css
tags:	css
---

transtion을 이용하면 애니메이션 같은 효과를 얻을 수 있음.


[css state에 대해서]에서 배운 hover를 이용해 마우스 오버시 배경화면을 빨간색으로 바꿨는데
애니메이션 효과를 줘서 빨간색으로 바뀌는 부분을 입체적으로 만들 수 있음


보통  box -> box:hover 이런식으로 기존의 설정에서 state에 지정한 설정으로 액션이 이동하게 되는데
이동하려 할때 주는 애니메이션 효과이므로 box:hover가 아닌 변화하기 전의 설정인 box에 transition설정을 정의 해준다.


#### transition문법


transition: 변화의 대상 변화의 시간 변화방법;

예)
{% highlight html %}
transition: all 1s;
transition: all .5s ease-in-out;
{% endhighlight %}

#### 코드

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Transitions</title>
  <style>
  .box{
    background-color: green;
    color:white;
    transition:all .5s ease-in-out;
  }
  .box:hover{
    background-color: red;
    color:blue;
  }
  </style>
</head>
<body>
  <span class="box">
    Text
  </span>
</body>
</html>
{% endhighlight %}

#### 화면 결과

![transition](https://user-images.githubusercontent.com/4640346/40279690-cb54fe82-5c81-11e8-85d4-c4d63f14dcc8.gif)




[css state에 대해서]: https://negabaro.github.io/css/2018/05/19/08css-state.html