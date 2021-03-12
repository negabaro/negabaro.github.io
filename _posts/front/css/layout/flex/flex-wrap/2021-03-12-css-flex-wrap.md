---
layout: post
title:  "css flex의 flex-wrap옵션에 대해"
author: negabaro kim
tags:	css/flex
---


## flex-wrap

Flex Items의 여러 줄 묶음(줄 바꿈) 설정

디폴트값은 한줄에 모두 표시하므로 크기를 벗어날시 화면을 삐져나올 수 있다는점을 인지할것!

### nowrap(★★★)

디폴트값

모든 Itmes를 여러 줄로 묶지 않음(한 줄에 표시)

![image](https://user-images.githubusercontent.com/4640346/110898879-6d9d3980-8343-11eb-80c4-1d52be196127.png)

### wrap(★★★)

Items를 여러 줄로 묶음

아이템들 사이에 더이상 공간이 없을때 행을 나눠주게 됨


![image](https://user-images.githubusercontent.com/4640346/110898893-71c95700-8343-11eb-9d34-21895b9d9652.png)

### wrap-reverse

wrap아이템 반대로 

![image](https://user-images.githubusercontent.com/4640346/110899027-b2c16b80-8343-11eb-8c95-fdb71b2f411d.png)

---

## 참고

[MDN]

[Github]

[헤로피 CSS Flex완벽 가이드]

[헤로피 CSS Flex완벽 가이드]: https://www.tabmode.com/homepage/flex-direction.html

[MDN]: https://developer.mozilla.org/ja/docs/Web/CSS/flex-wrap

[Github]: https://github.com/negabaro/css-masterclass-nomad-coders/pull/4