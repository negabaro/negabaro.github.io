---
layout: post
title:  "Vuepress란?"
author: negabaro kim
tags:	js/vuepress
---


## VuePress란?

Vue.js기반의 SSG이다.

Vue.js공식 프로젝트로 도큐멘트 페이지가 Vuepress로 만들어져있다.


## 특징

Markdown을 사용(그 외에는 사용불가)

엄청 가벼움,빠른 렌더링속도(jeykell보다 월등히 렌더링속도가 빠름/ Gatsby,Gridsome보다도 가볍다고함)

`Google Page Speed Insights`에서 100,99점 맞을정도

설치도 엄청간단

간단히 자기가만든 OSS의 도큐멘트 페이지 만들때 사용하면 좋을듯

블로그 운용 목적에서도 보일러 프레이트들이 몇개 존재하니 그걸 사용해도 가능

---

디폴트가 Vue.js에서 제공하는 디자인을 사용하는데 디자인 변경하려면 꽤 까다로운편

jeykell에서 Vuepress로 마이그레이트가 힘듬
이 부분은 따로 포스팅




## 설치방법

아래 커맨드 하나로 간단히 환경구축이 가능했다.

```
yarn create vuepress-site [optionalDirectoryName]
```

자세한 내용은 [how to install]을 참고



# 메모

## Github page공개시에는 config.js의 base를 수정해야함

Githb page에 디플로이시

config.js의 base를 리포지토리명으로 수정한후에 push해야한다.

https://유저명.github.io/리포지토리명/

```js
module.exports = {
    base: '/리포지토리명/',
}
```

위 설정이 없으면 페이지 루팅이 정상동작하지 않았다.
예를들어 /about.html 페이지에 이동하려하면

https://xx.github.io/yy/about.html

이렇게 되어야 하는데 아래와 같은 URL로 이동해버린다.

https://xx.github.io/about.html



## 유용한 툴

[awesome-vuepress]
유용한 플러그인들이나 예제확인가능

[Vuepress Tools]에서 플러그인 검색가능
이 페이지 자체도 vuepress로 만들어져서 분석용으로도 괜찮음


## 기동시 option

```
--host <host>
```

호스트명 지정시

```
#--open
```

기동시 browser 띄어주기

---

[awesome-vuepress]: https://github.com/vuepress/awesome-vuepress
[Vuepress Tools]: https://z3by.github.io/vuepress-tools/
[vuepress]: https://github.com/vuejs/vuepress
[how to install]: https://vuepress.vuejs.org/guide/getting-started.html#prerequisites

[VuePress をお試ししてみた]: https://qiita.com/dojineko/items/aae7e6d13479e08d49fd