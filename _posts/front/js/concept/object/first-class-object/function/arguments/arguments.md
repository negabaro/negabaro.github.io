---
layout: post
title: "Javascript 함수의 숨겨진 프로퍼티(속성) arguments"
author: negabaro kim
categories: javascript
tags: javascript
---

함수의 arguments를 조작할 때 사용합니다. arguments는 함수라면 처음부터 갖고 있는 숨겨진 속성인데요. 바로 함수에 들어온 인자를 배열 형식으로(배열은 아닙니다. 유사 배열이라고 부릅니다.) 반환합니다.

```
function example() {
  console.log(arguments);
}
example(1, 'string', true); // [1, 'string', true]
```

생긴 건 배열이지만, 배열이 아니라 유사 배열이기 때문에, 배열의 메소드는 쓸 수 없습니다.

```
function example2() {
  console.log(arguments.join());
}
example2(1, 'string', true); // Uncaught TypeError: arguments.join is not a function
```

### Reference Link:

https://www.zerocho.com/category/JavaScript/post/57433645a48729787807c3fd
