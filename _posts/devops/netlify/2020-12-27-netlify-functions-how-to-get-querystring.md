---
layout: post
title: "Netlify functions에서 querystring값 가져오는 방법"
author: negabaro kim
tags: devops/netlify
---

event인자로 부터 `event["queryStringParameters"]` 를 이용해 querystring값을 취득할 수 있다.


## 예제

예를들어 symbol이라는 queryParameter값을 가져오기 위해서는 `event["queryStringParameters"]["symbol"]`
로 접근이 가능하다.

http://localhost:9000/.netlify/functions/index?symbol=test


## 코드예제

아래는 실제 코드예제이다.

```js
exports.handler = async (event, context, callback) => {

  const symbol = event["queryStringParameters"]["symbol"];
  if (!symbol) {
    return { statusCode: 405, body: "Symbol Params is missing" };
  }
};
```

Netlify functions는 aws lambda기반으로 동작하므로 lambda에서 같은 방법으로 queryString값을 취득할 수 있다.

---

[Link]: https://stackoverflow.com/questions/31329958/how-to-pass-a-querystring-or-route-parameter-to-aws-lambda-from-amazon-api-gatew