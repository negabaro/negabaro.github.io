---
layout: post
title: "rails에서 material-icon추가"
author: negabaro kim
tags: css
---

## webfont추가


```slim
#app/views/layouts/application.html.slim
head
  link(href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet")
```

해주면 끝

## icon추가

```slim
i.material-icons(style="vertical-align:middle; font-size: 16.5px;")
  | attach_file
p(style="margin-left: 0.5rem; display: inline-block; color: #43a4d4;")
  xx
```

## 주의사항

아이콘 추가해줄때 material_icon추가시 태그가 아니라 `문자열`로 추가해줘야한다.


```
<icon class="material-icons">
  <attach_file></attach_file>
</icon>
```

이 아니고

```
<icon class="material-icons">
  attach_file
</icon>
```

이렇게 되야한다.

## 아이콘 검색

아이콘 검색을 [마테리알 아이콘 검색] 사이트를 이용한다.


[마테리알 아이콘 검색]: https://material.io/resources/icons/?style=baseline
