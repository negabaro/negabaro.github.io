---
layout: post
title:  "css inline,inline-block,block에 대해서"
author: negabaro kim
categories: css
tags:	css
---

### inline,inline-block,block의 차이

inline-block과 block은 박스이나 inline은 text에 가깝다.


### inline-block과 block의 차이

block은 세로로 나열되는 형태.

inline-block은 가로로 나열되는 형태


### block이란

blcok은 바로옆에 아무것도 없을때 블록이라함

브라우저 요소검사로 확인해 보면 박스는 가로전체를 차지하는데 실제 엘리먼트 크기가 큰것이 아니라
자기 외의 다른것이 옆에 있는것을 허용하지 않기때문임

![image](https://user-images.githubusercontent.com/4640346/40262853-2bb3d6a0-5b46-11e8-8aff-879b087ddf2e.png)

옆에 위치하지 못하게 하므로 위치가 밑으로 떨어지게 되는것임

아무것도 지정안하면 디폴트설정이 block이다

```css
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Inline Example</title>
  <style>
  .box{
    background-color: red;
    width:200px;
    height:200px;
    border:2px solid black;
  }
  </style>
</head>
<body>
  <div class="box">1</div>
  <div class="box">1</div>
  <div class="box">1</div>
</body>
</html>
```

### inline-block이란

```css
 display: inline-block;
```

block은 자기 외의 다른 요소가 옆에 있는것을 허용하지 않는데 그것을 허용하게 해주는 설정
inline-block을 설정하면 각 박스들이 서로서로 옆에 있게 됨


![image](https://user-images.githubusercontent.com/4640346/40262905-848ca46e-5b46-11e8-9b10-9e52b5087ecd.png)

### inline이란?

```css
 display: inline;
```

box의 모든 property값을 지움. 텍스트와 같은 상태


![image](https://user-images.githubusercontent.com/4640346/40262916-afc8bec4-5b46-11e8-90d5-3a1899948384.png)


div내에 있는 컨텐츠의 폭,높이 만큼의 스타일만 적용됨
이전에 작성한 박스의 폭,높이가 적용되지 않음

즉 inline으로 설정하면 이건 박스가 아니고 텍스트처럼 적용이 되버림
텍스트는 높이도 폭도 없이 오로 컨텐츠의 길이만 존재하는데 그것과 같은상태인것




### 코드

[Source]


[Source]: https://github.com/negabaro/kakao-clone-examples/blob/master/03-inline-block-inline-block/index.html