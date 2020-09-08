---
layout: post
title:  "css position에 대해서"
author: negabaro kim
categories: css
tags:	css
---
{% highlight html %}
{% endhighlight %}

position에는 ```static,fixed,absolute,relative```라는 4가지 종류가 있음
relative는 독단적으로 쓰는게 아니라 absolute의 뒷바라지를 해주는 역할임
이떄도 부모 자식관계가 되겠네

1. static 디폴트 설정 
2. fixed 고정
3. absolute 는 포지션 relative에 상대적으로 포지션을 잡는것





### static

이하와 같은 부모 자식관계를 가진 코드로 동작확인을 해보자

녹색 할아버지(body) -> 노란색 아버지(abs-box) -> 파란색 아들(abs-child)




{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Position</title>
  <style>
    body,html{
      height: 100%;
      margin:0;
      padding:0;
    }
    body{
      height: 400%;
      background-color: green;
    }
    /* Absolute */
    .abs-box{
      width:400px;
      height: 400px;
      background-color: yellow;
    
    }
    .abs-child{
      width:100px;
      height: 100px;
      background-color: blue;
     
    }
  </style>
</head>
<body>
  <div class="abs-box">
    <div class="abs-child"></div>
  </div>
</body>
</html>
{% endhighlight %}

##### 화면결과

![image](https://user-images.githubusercontent.com/4640346/40265384-3b826c50-5b72-11e8-8072-5590dba8f352.png)


### absolute

absolute 는 포지션 relative에 상대적으로 포지션을 잡는것
absolute가 설정되면 html상에서 해당 element의 조상관계를 보고
조상중에  relative 포지션이 없을 경우, absolute는 문서의 본문body에 맞춰서 포지션을 잡음

relative가 존재할경우 해당 element를 기준으로 위치를 잡음



```css
    .abs-box{
      width:400px;
      height: 400px;
      background-color: yellow;
     
    }
    .abs-child{
      width:100px;
      height: 100px;
      background-color: blue;
      position: absolute;
      right:10px;
      top:10px;
    }
```

파란색 아들(abs-child) 속성에 postion absolute속성을 주고 right,top 10px를 줘봤다.

![image](https://user-images.githubusercontent.com/4640346/40265445-551198d4-5b73-11e8-87be-c0f4eaa14ef3.png)

파란색 아들이 중2병처럼 오른쪽 끝에 가 있다.
노란색 아버지(abs-box)에 relative속성이 없었으므로 녹색 할아버지(body)속성을 기준으로 위치를 잡은것

노란색 아버지(abs-box)에 relative속성을 줘보자

```css
    .abs-box{
      width:400px;
      height: 400px;
      background-color: yellow;
      position: relative;
     
    }
    .abs-child{
      width:100px;
      height: 100px;
      background-color: blue;
      position: absolute;
      right:10px;
      top:10px;
    }
```

![image](https://user-images.githubusercontent.com/4640346/40265482-008eb264-5b74-11e8-975c-a0dcd96eed5f.png)

노란색 아버지(abs-box)를 기준으로 오른쪽 위 10px지점에 위치한것을 볼 수 있다.
방황한 아들이 집에 컴백홈한 느낌이다.


### fixed

fixed를 주면 해당element의 위치가 고정된다.

이하 코드와 같이 파란색 아들(abs-child) 속성에 fixed설정을 넣어봤다.

```css
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Position</title>
  <style>
    body,html{
      height: 100%;
      margin:0;
      padding:0;
    }
    body{
      height: 400%;
      background-color: green;
    }
    .abs-box{
      width:400px;
      height: 400px;
      background-color: yellow;
      
    }
    .abs-child{
      width:100px;
      height: 100px;
      background-color: blue;
      position: fixed;
      right:10px;
      top:10px;
    }
  </style>
</head>
<body>
  <div class="abs-box">
    <div class="abs-child"></div>
  </div>
</body>
</html>
```


##### 화면결과 



![fixed](https://user-images.githubusercontent.com/4640346/40265596-380f908a-5b76-11e8-8e6f-6349fe0be3d6.gif)

드레그해도 파란색 아들(abs-child) 이 고정되어 표시되는걸 알 수 있다.

### 코드

[Source]: https://github.com/negabaro/kakao-clone-examples/blob/master/04-position/index.html
