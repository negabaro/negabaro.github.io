---
layout: post
title:  "webdriverio element접근 방법"
author: negabaro kim
categories: webdriverio
tags:	webdriverio e2e
cover:  "/assets/twice.jpg"
---

webdriverio에서 브라우저 조작시 자주사용하는 [element]에 대해 알아보자. 

### 샘플DOM

{% highlight html %}
<ul class="items" dropdown-menu>
	<li class="item">
		<a ng-click="showProjects()">
			Projects
		</a>
	</li>
	<li class="item">
		<a ng-click="showArchive()">
			Archive
		</a>
	</li>
</ul>
{% endhighlight %}


### debug용 크롬 기동하는 방법

{% highlight node %}
./node_modules/.bin/wdio repl chrome
{% endhighlight %}


### 특정 브라우저에 억세스 하는방법

{% highlight node %}
browser.url("https://localhost:8090");
{% endhighlight %}


### a ng-click="showProjects()" 부분의 attributes에 접근하는 방법

{% highlight node %}
browser.element("[ng-click='showProjects()']");
{% endhighlight %}

### 특정 attribute의 자식안에있는 attribute를 접근하는 방법

{% highlight node %}
browser.element("[dropdown-menu] a[ng-click='showProjects()']");
{% endhighlight %}


### 첫번째 attribute취득 방법

구별이 불가능한 복수의 a태그가 있을경우 first-child를 이용해서 1번째 attribute에 접근가능

#### 예1)

{% highlight node %}
browser.element("a:first-child");
{% endhighlight %}

#### 예2)

{% highlight node %}
browser.element("[dropdown-menu]  a:first-child");
{% endhighlight %}

### 두번째 이후의 attribute접근은 nth-child를 이용

{% highlight node %}
browser.element("[dropdown-menu]  a:nth-child(2)");
{% endhighlight %}

### 텍스트를 이용해서 엘리먼트에 접근하는 방법

[='텍스트']형식으로 접근 가능


#### 예1)

{% highlight node %}
browser.element("=Projects");
{% endhighlight %}

#### 예2)

{% highlight node %}
browser.element("[dropdown-menu]").element("=Projects");
{% endhighlight %}


[reference]: http://blog.kevinlamping.com/selecting-elements-in-webdriverio/
[element]: http://webdriver.io/api/protocol/element.html
      