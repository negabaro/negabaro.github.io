---
layout: post
title: "javascript에서 if문  한줄로 쓰는법"
description: if (조건문) xx;
author: negabaro kim
tags: js
---

if,else일때는 삼항연산자를 사용하면 한줄로 쓸 수 있는데
if문만 있을때는 어떻게 해야할까?

# before

```js
if(조건){
    xx;
}
```

# after

```js
if(조건) xx;
```

또는 

```js
조건 && xx;  
```

으로 사용 가능


# 주의사항

if return을 한줄로 적을때는 
`조건 && xx;` 이 문법은 사용이 불가능

`if (조건) return "xx";`은 가능

# 결론

if문 한줄로 적을때 `if(조건) xx;`를 사용하자.


### reference:

```
https://stackoverflow.com/questions/8860654/javascript-single-line-if-statement-best-syntax-this-alternative
```