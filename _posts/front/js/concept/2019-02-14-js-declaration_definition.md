---
layout: post
title: "javascript　선언과 정의란?"
author: negabaro kim
categories: js
tags: js concept
---

## 여기까지 복습

여기서 중요한 것은 선언만 끌어 올려진다는 것이며, 할당은 끌어 올려지지 않는 다는 겁니다.

호이스팅은 선언과 정의의 개념에 밀접한 연관이 있습니다.

일부 언어는 선언(declaration) 정의(definition)를 명확히 구분합니다.

선언 :: 변수를 선언한다는 것은 식별자를 주어서 그 존재를 알리는 것
정의 :: 변수를 정의한다는 것은 선언과 함께 값도 부여하는 것

자바스크립트에서는 모든 변수를 동시에 값이 주어지므로 두 용어를 구분하지 않습니다.
명시적으로 정하지 않으면 undefined가 암시적으로 적용됩니다.

```
var a;        // 선언
var b = 'b';  // 선언 + 정의
let c;        // 선언
let d = 'd';  // 선언 + 정의
```

```
// 함수의 선언이 이루어진 예입니다.
function funcA() { }

// 함수의 선언과 정의가 동시에 이루어진 예입니다.
var funcA = function() {}
```

### Reference Link:

```
http://insanehong.kr/post/javascript-function/
```
