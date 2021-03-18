---
layout: post
title:  "Rails의 scope,scope module,namespace의 차이"
author: negabaro kim
tags:	rails/routing
---


### scope module

{% highlight ruby %}
scope module: :admin do
  resources :users
do
{% endhighlight %}


 `scope module: :xxx` 의 xxx에 해당하는 부분이 controller명 앞에 디렉토리 path로 추가된다.



![image](https://user-images.githubusercontent.com/4640346/37858368-42d42f36-2f47-11e8-949e-e43e9d5dad55.png)



### scope

{% highlight ruby %}
scope '/admin' do
  resources :users
do
{% endhighlight %}


 

scope의 경우, URL부분에만 패스가 추가됨.


![image](https://user-images.githubusercontent.com/4640346/37858487-74171e04-2f48-11e8-9226-ced5d9897f2f.png)


### namespace

{% highlight ruby %}
namespace :admin do
  resources :users
do
{% endhighlight %}
 
namespace는 URL과controller양쪽에 패스가 추가됨.


![image](https://user-images.githubusercontent.com/4640346/37858495-90d1109a-2f48-11e8-868a-be9c2144a8fb.png)