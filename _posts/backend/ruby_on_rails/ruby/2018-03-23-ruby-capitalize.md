---
layout: post
title:  "ruby capitalize메소드"
author: negabaro kim
categories: ruby
tags:	ruby tip
---

capitalize메소드는  제일 앞의 string값을 대문자로 바꿔주는 메소드

### 사용예)

{% highlight ruby %}
str = "twice"
puts str.capitalize # Twice
{% endhighlight %}


capitalize메소드를 안쓰면 이런식으로 지저분해짐


{% highlight ruby %}
str = "twice"
puts str[0].upcase + str[1..str.length].downcase
{% endhighlight %}

