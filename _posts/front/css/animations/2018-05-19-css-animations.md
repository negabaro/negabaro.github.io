---
layout: post
title:  "css animation기능"
author: negabaro kim
categories: css
tags:	css
---
{% highlight html %}
{% endhighlight %}


커스텀 애니메이션 메소드(?)를 만들어서 적용시키는 방법


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
      animation: 1.5s scaleAndRotateSquare infinite ease-in-out;
    }
    /*@keyframes scaleAndRotateSquare {
      from{
      }
      to{
      }
    }*/
    @keyframes scaleAndRotateSquare {
      0%{
        transform:none;
      }
      50%{
        transform: rotate(1turn) scale(.5, .5);
        color:white;
      }
      100%{
        transform: none;
        color:blue;
      }
    }
  </style>
</head>
<body>
  <div class="box">11</div>
</body>
</html>
{% endhighlight %}

#### 결과 화면

infinite이므로 해당 애니메이션을 무한반복함

![animation](https://user-images.githubusercontent.com/4640346/40279879-6be7a4fa-5c85-11e8-9c67-0d343801cd78.gif)