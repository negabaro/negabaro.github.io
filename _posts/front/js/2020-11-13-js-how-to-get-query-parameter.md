---
layout: post
title: "Javascript에서 query parameter값 가져오는 방법"
author: negabaro kim
tags: js
---


아래 URL로 악세스시 test1,test2이라는 query parameter를 가져오는 방법

`http://localhost:8080?test=11&test2=22`



```js
export const getParam = sname => {
  const param = location.search.substr(location.search.indexOf("?") + 1);

  let sval = "";

  const params = param.split("&");

  for (let i = 0; i < params.length; i++) {
    const temp = params[i].split("=");

    if ([temp[0]] == sname) {
      sval = temp[1];
    }
  }

  return sval;
};
```


동작확인 

```js
console.log(getParam('test1'))
console.log(getParam('test2'))
```