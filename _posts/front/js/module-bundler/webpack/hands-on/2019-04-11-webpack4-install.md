---
layout: post
title: "webpack4 install 방법"
author: negabaro kim
categories: webpack
tags: webpack js
---

# npm초기 설정

```
npm init -y
```

# webpack인스톨

webpack4부터 webpack-cli도 추가 인스톨이 필요함

`-g`를 붙여서 글로벌 인스톨해도 가능한데 프로젝트 마다 웹펙의 버전이 다를 가능성이 있으므로 글로벌 인스톨은 피하고 싶기에
`--save-dev`를 붙임

```
npm install webpack webpack-cli --save-dev
```

# 동작확인

해당 디렉토리에서 이하 커맨드를 실행해서 webpack의 버전을 확인해서 이하와 같이 표시되면 인스톨 성공

```js
./node_modules/.bin/webpack -v
4.29.6

or

npx webpack -v
4.29.6
```

# package.json내용

정상적으로 설치된 package.json은 이하와 같았음

```
{
  "name": "example1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.29.6",
    "webpack-cli": "^3.3.0"
  }
}
```

### Reference Link:

https://qiita.com/civic/items/82c0184bcadc50965f91
