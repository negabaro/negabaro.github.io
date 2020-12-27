---
layout: post
title: "webpack4에서 yml,yaml파일 읽어오는 방법"
author: negabaro kim
tags: webpack
---

`js-yaml-loader`를 이용해 간단히 yml,yaml파일을 읽어올 수 있다.


## 설치

```
npm install --save js-yaml-loader
```

## webpack설정

```js
module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  module: {
    rules: [
      {
        test: /\.ya?ml$/,
        use: "js-yaml-loader"
      }
    ]
  }
};
```

## load방법

```
import yaml from <path-to-yaml-file>
```

`src/common/settings.yml`에 아래와 같은 파일이 있다고 하면

```yml
  title: "Reading and Writing YAML to a File in Node.js/JavaScript"
  url path: "/reading-and-writing-yaml-to-a-file-in-node-js-javascript"
  domain: "stackabuse.com"
  port: 443
  is-https: true
  meta:
    published-at: "Nov. 1st, 2019"
    author:
      name: "Scott Robinson"
      contact: "scott@stackabuse.com"
    tags:
      - javascript
      - node.js
      - web development
```

이렇게 import해준다.

```js
import settings from "@/common/settings.yml";
```


# 메모


## webpack4에서 yaml-loader가 동작하지 않음

webpack3에서는 아래와 같은 설정으로 정상동작했는데

```js
config.module.rules.push({
  test: /\.ya?ml$/,
  use: [
    { loader: 'json-loader' },
    { loader: 'yaml-loader' }
  ]
})
```

webpack4에서는 `cannot find module/Module parse failed: Unexpected token`에러가 발생했다.
