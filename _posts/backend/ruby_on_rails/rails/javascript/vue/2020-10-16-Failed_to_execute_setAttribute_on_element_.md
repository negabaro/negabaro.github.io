---
layout: post
title:  "rails template에서 일부분만 vue사용시 발생하는 에러 Failed to execute 'setAttribute' on 'Element': ','에 대해"
tags:	rails/vue
---


# 결론

dom의 속성사이에 `,`를 빼줍시다!

# 개요

rails template에서 특정 부분만 vue로 구현시 브라우저에서 아래와 같은 에러를 발견했다.

```js
vue.esm.js:4487 Uncaught DOMException: Failed to execute 'setAttribute' on 'Element': ',' is not a valid attribute name.
```

원인은 아래와 같이 dom의 속성인 type과 id사이에 콤마(,)가 들어있는게 원인이었다.

```pug
button(type="button", id='xxxx')
```

순수 rails template에서는 위 코드는 콤마가 있든 없든 정상작동하지만

vue로 렌더링한 돔 이하에 저런 코드가 있다면 콤마 자체도 하나의 속성으로 판단하고 그러한 속성이 없다고 에러를 발생시키는것이다.

--------

# 에러해결 방법

대응방법으로는 크게 두가지일텐데

## 1. 콤마를 빼준다.

```pug
main#vvv-vue-rendering
  button(type="button" id='xxxx')
```

## 2. vue렌더링할 부분을 바꿔준다.

```pug
main
  section#vvv-vue-rendering
  button(type="button", id='xxxx')
```

일단 에러가 나면 어느 부분이 에러인지 찾기가 힘들고
콤마가 있든 없든 rails에서는 정상동작하므로
콤마를 안넣는 코딩컨벤션으로 통일하는것이 좋을듯하다.





