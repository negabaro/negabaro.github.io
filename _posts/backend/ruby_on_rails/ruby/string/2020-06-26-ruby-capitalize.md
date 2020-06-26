---
layout: post
title:  "ruby capitalize메소드"
author: negabaro kim
description: capitalize메소드는  첫번째 문자열값을 대문자로 바꿔주는 메소드
tags:	ruby tip
---

capitalize메소드는 첫번째 문자열값을 대문자로 바꿔주는 메소드

### 사용예)

{% highlight ruby %}
str = "twice"
puts str.capitalize # Twice
{% endhighlight %}


capitalize메소드를 안쓰면 이런식으로 코드가 지저분해짐


{% highlight ruby %}
str = "twice"
puts str[0].upcase + str[1..str.length].downcase
{% endhighlight %}


## reference:

```
https://docs.ruby-lang.org/ja/latest/method/Object/i/public_send.html
https://qiita.com/okuramasafumi/items/178006b9adb17a96cea8
```
