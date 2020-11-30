---
layout: post
title:  "css button태그를 a태그처럼 사용할때 커서 변경방법"
author: negabaro kim
tags:	css
---

button태그에 아래 속성을 추가해준다.

```
cursor:pointer;
```


# 메모

vue.js에서 a태그에 `v-on:click`이벤트를 주면 정상적으로 동작하지 않았다.
href가 우선적용된것 같다.

button태그로 변경하니 클릭시 정상적으로 click이벤트가 동작함

다만 button사용시 마우스 오버시에 a태그 처럼 커서가 변경되지 않아서 부자연스러웠기에 검색해봄

---

참고: [how-to-get-the-cursor-to-change-to-the-hand-when-hovering-a-button-tag]

[how-to-get-the-cursor-to-change-to-the-hand-when-hovering-a-button-tag]: https://stackoverflow.com/questions/8762201/how-to-get-the-cursor-to-change-to-the-hand-when-hovering-a-button-tag
