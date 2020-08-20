---
layout: post
title:  "css pseudo-selector(가상셀렉터)에 대해서"
author: negabaro kim
categories: css
tags:	css
---


### 가상셀렉터란?

태그 이름이나,class,id를 사용하지 않고 elemnet를 선택하는 방법


가상 셀렉터란, 셀렉터인데 element가 아닌것을 뜻함

포인트는 가상 셀렉터의 종류가 많으므로 다 외운다기 보다는 태그이름이나 class,id를 사용하지 않고 element를 선택하는 방법이 있다는걸 이해하는게 중요


### 가상셀렉터 적용예

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Selectors and Pseudo Selectors</title>
</head>
<body>
<div class="container">
  <div class="box">
    <input type="password" required="required" />
    <input type="submit" required="required" />
  </div>
</div>
</body>
</html>
{% endhighlight %}

위 코드중 submit버튼의 배경색에 빨간색을 넣고 싶을때
기존에 알고 있던  방법으론 클래스를 이용했다.


#### 클래스를 이용해서 css적용하는 형태

{% highlight html %}
<input type="submit" required="required" class="submit" />
  <style>
  .submit{
    background-color: red;
  }
  </style>
{% endhighlight %}

요런식으로 submit버튼에 class명을 넣어줌.

다음은 가상셀렉터를 사용하는 예를 알아보자.

#### 가상셀렉터 사용예1

{% highlight html %}
  <style>
  input[type="submit"]{
    background-color: red;
  }
  </style>
{% endhighlight %}

가상 셀렉터는 해당 element에 class,id같은 식별자를 넣어주지 않아도 되기에 어떤의미서 편하다.
근데 코드가 수정되서 submit이 2개가 되거나 하면 갑자기 안움직이는 등 문제 요소가 있다.



#### 가상셀렉터 사용예2

input전체에 어떤 설정을 넣어줄때는 이렇게

{% highlight html %}
  <style>
  input {
    border:1px solid yellow;
  }
  </style>
{% endhighlight %}


#### 가상셀렉터 사용예3(같은 이름의 클래스중 가장마지막 class를 선택하는 방법)

{% highlight html %}
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
{% endhighlight %}


이런식으로 box라는 class가 3개 있을때 마지막 box class에만 css를 적용시키고 싶을땐

{% highlight html %}
  <style>
  .box:last-child {
     background-color: pink;
  }
  </style>
{% endhighlight %}


첫번째일 경우 ```last-child```를 사용

#### 가상셀렉터 사용예4


{% highlight html %}
input + .box {
    border: 1px solid black;
}
{% endhighlight %}


input과box가 서로가 형제인 element만 선택

#### 가상셀렉터 사용예5



{% highlight html %}
input > .box {
    border: 1px solid yellow;
}
{% endhighlight %}

input -> box가 직계 부모,자식 관계라는 뜻
input밑에box가 아닌 다른것이 있다면 걔내들에게는 적용안됨