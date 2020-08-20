---
layout:     post
title:      "css문법에 대해서"
subtitle:   "링크 참조"
author:     "negabaro"
comments: true 
tags: [css]
---

### 규칙


확장자는 반드시 .css여야함
프로퍼티 정의후에는 세미콜론 꼭붙일것



### property와 selector

css에는 property와 selector가 있음

#### property란 

{% highlight css %}
property-name: value;
{% endhighlight %}

#### selector란

{% highlight css %}
h1 {
    
}
{% endhighlight %}








{% highlight css %}
h1 {
}
{% endhighlight %}



#### ID를 지정하는 방법

{% highlight css %}
#name {
}
{% endhighlight %}


#### class를 지정하는 방법

{% highlight css %}
.name {
}
{% endhighlight %}


{% highlight css %}
h1 .name {
}
{% endhighlight %}

참고한사이트

https://academy.nomadcoders.co/courses/193412/lectures/3088214#/questions/1


#### id와class의 차이

id은 페이지 내에서 primary하다. 같은 이름으로 복수의id를 만들수 없음
거기에 반해class는 복수명이 지정가능하다.


### html과css연결  하는법

이하 2가지 방법이 있음.

```
1. inline한 방법
2. external한 방법
```

#### inline한 방법 예)

{% highlight html %}
<head>
<style>
body{
 background-color: red;
 
    }
}
</style>
</head>
{% endhighlight %}


#### external한 방법 예) 

{% highlight html %}
<link href="xx.css" rel="stylesheet">
{% endhighlight %}
