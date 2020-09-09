---
layout: post
title:  "css box-sizing에 대해 알아보자"
description: "box-sizing은 어떤 것을 기준으로 박스의 크기를 계산할지를 정하는 속성
"
author: negabaro kim
tags:	css
---


# box-sizing이란

box-sizing은 어떤 것을 기준으로 박스의 크기를 계산할지를 정하는 속성이다.


# 4가지 속성

box-sizing은 아래의 속성을 가진다.


content-box : 콘텐트 영역을 기준으로 크기를 정함(default)
border-box : 테두리를 기준으로 크기를 정함
initial : 기본값으로 설정
inherit : 부모 요소의 속성값을 상속

# 자주 사용하는 속성은 border-box

테두리 기준으로 box크기를 잡는게 직관적이므로 `box-sizing: border-box;`을 많이 사용함


디폴트(content-box)와의 차이는 아래와 같다.


## box-sizing: content-box;(default)

![image](https://user-images.githubusercontent.com/4640346/92560205-f233d000-f2ac-11ea-8d57-43b6f8bb5858.png)


## box-sizing: border-box;

![image](https://user-images.githubusercontent.com/4640346/92560484-78e8ad00-f2ad-11ea-9f31-6ef891b7ba0a.png)