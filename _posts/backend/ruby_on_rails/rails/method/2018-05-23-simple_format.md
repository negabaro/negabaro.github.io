---
layout: post
title:  "rails simple_format이란"
author: negabaro kim
categories: rails
tags:	rails
---

### simple_format이란

문자열을 html형식으로 표시해줄때 사용한다.

구체적으로 하는일은 이하와 같다.

문자열을 <p>로 묶는다
개행에는 <br />을 부여해준다
연속된 개행에는 </p><p>을 부여해준다


실제 예제를 살펴보자.

### simple_format을 사용안할경우

{% highlight ruby %}
<% text = "트와이스\n트와이스\n\n트와이스트와이스" %>
<%= text %>
{% endhighlight %}


#### 브라우저 출력결과

{% highlight ruby %}
트와이스 트와이스 트와이스트와이스
{% endhighlight %}

rails view에서 p태그등이 없으니 하나의행으로 인식해버린다.
이럴때 simple_format 을 사용하면 이하와 같다.

### simple_format 사용시

{% highlight ruby %}
<% text = "트와이스\n트와이스\n\n트와이스트와이스" %>
<%= simple_format text %>
{% endhighlight %}


이하와 같이 태그가 부여되므로 

{% highlight ruby %}
<p>트와이스
<br />트와이스</p>

<p>트와이스트와이스</p>
{% endhighlight %}

#### 브라우저 출력결과

브라우저에서 이하와 같이 표시된다.

{% highlight ruby %}
트와이스
트와이스

트와이스트와이스
{% endhighlight %}



### simple_format 사용시 주의사항

simple_format 사용시 텍스트안에 태그를 사용하면 해당 태그가 뷰에 적용되버린다.

{% highlight ruby %}
<% text = "<h1>트와이스\n트와이스\n\n트와이스트와이스</h1>" %>
<%= simple_format text %>
{% endhighlight %}

이렇게 적어주면 h1태그는 문자로 적은것인데 rails view에서 <h1>을 적용해서 문자를 크게 표시해버린다는 얘기
텍스트안에 태그가 들어가면 그걸 반영해버리게 되는데 그냥 문자로서 출력시키고 싶을때 곤란하다.



#### 해결책

#h을 사용하면 해결가능하다.

{% highlight ruby %}
<% text = "<h1>트와이스\n트와이스\n\n트와이스트와이스</h1>" %>
<%= simple_format h text %>
{% endhighlight %}


이하와 같이 이스케이프 처리를 해서 표시해준다.

{% highlight ruby %}
<p>&lt;h1&gt;트와이스
<br />트와이스</p>
<p>트와이스트와이스&lt;/h1&gt;</p>
{% endhighlight %}


화면에서도 정상적으로 문자열로 h1을 표시해준다.
{% highlight ruby %}
<h1>트와이스
트와이스

트와이스트와이스</h1>
{% endhighlight %}



[원문]: https://qiita.com/mojihige/items/c01682774e8ef29b361f