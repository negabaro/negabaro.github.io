---
layout: post
title:  "css flex의 flex-direction옵션에 대해"
author: negabaro kim
tags:	css/flex
---

## flex-direction

Items의 주 축(main-axis)을 설정

아이템들을 어느쪽으로 배치할지 정하는 옵션이다.

자주 쓰는 옵션은 row(가로 배치), coumn(세로 배치))

### row(★★★)

디폴트값.

텍스트의 자식 요소와 같은 방향으로, 일반적으로 flex 아이템은 왼쪽에서 오른쪽으로 수평으로 배치

![image](https://user-images.githubusercontent.com/4640346/110898309-5c076200-8342-11eb-91c9-6f2df39186d8.png)

### row-reverse

row 속성값의 반대로, flex 아이템은 오른쪽에서 왼쪽으로 수평 방향으로 배치

![image](https://user-images.githubusercontent.com/4640346/110898356-717c8c00-8342-11eb-9bf5-5b0cf3462cca.png)

### column(★★★)

flex 아이템은 위에서 아래로 수직 방향으로 배치

![image](https://user-images.githubusercontent.com/4640346/110898318-6164ac80-8342-11eb-9dc4-2b5f56d80995.png)


### column-reverse

flex 아이템은 아래에서 위로 수직 방향으로 배치

![image](https://user-images.githubusercontent.com/4640346/110898374-76414000-8342-11eb-8307-1a2c3c1c53a8.png)


---

## 참고

[MDN]

[헤로피 CSS Flex완벽 가이드]

[Main Axis and Cross Axis]

[MDN]: https://developer.mozilla.org/ja/docs/Web/CSS/flex-direction

[헤로피 CSS Flex완벽 가이드]: https://www.tabmode.com/homepage/flex-direction.html

[Main Axis and Cross Axis]: https://github.com/negabaro/css-masterclass-nomad-coders/pull/3