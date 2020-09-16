---
layout: post
title: "webpack4에서 splitChunks 사용해서 중복된 모듈 없애기"
author: negabaro kim
categories: webpack
tags: webpack js
---

# 목표

webpack4에서 `splitChunks`을 사용해서 중복된 모듈을 없애보자

# 초기설정 + webpack install

[webpack4 install방법]({% post_url 2019-04-11-webpack4-install %})

# moment,lodash npm 인스톨

후술할 `app/index.js`안에서 사용되는 외부 패키지를 설치

```js
npm install moment lodash --save
```

#### lodash

유틸리티 라이브러리로 array, collection, date, number, object 등이 있으며, 데이터를 쉽게 다룰 수 있도록 도와준다

#### moment

날짜관련 작업을 위한 자바스크립트 라이브러리

# 테스트용 설정파일

## 1. index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Libraries Code Splitting</title>
  </head>
  <body>
    <header>
      <h3>Libraries Code Splitting</h3>
    </header>
    <div>
      <label for="p1"><strong>Moment JS : </strong></label>
      <p class="p1">
        not yet loaded
      </p>
      <label for="p2"><strong>Lodash JS : </strong></label>
      <p class="p2">
        not yet loaded
      </p>
    </div>
    <script src="dist/vendor.js"></script>
    <script src="dist/main.js"></script>
  </body>
</html>
```

## 2. app/index.js

index.html의`not yet loaded`로 되어있는 부분안에 moment,loadash를 이용한 리턴값을 넣어주는 코드다.

```js
var moment = require("moment");
var _ = require("lodash");
var ele = document.querySelectorAll("p");

document.addEventListener("DOMContentLoaded", function(event) {
  ele[0].innerText = moment().format();
  ele[1].innerText = _.drop([1, 2, 3], 0);
});
```

## 3. webpack.config.js

```js
var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: {
    main: "./app/index.js",
    vendor: ["moment", "lodash"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  }
};
```

entry에 `app/index.js` 이외에 monet,lodash라는 외부패키지를 `vendor.js`라는 이름으로 번들링하는 예제이다.

moment,lodash 이 부분은 npm install 해서 node_modules에 해당 패키지가 존재하지 않으면 추가가 불가능

# webpack실행(splitChunks 사용하기전)

```js
npx webpack
```

## result

```js
Hash: 8cf75a53511be7a1ec91
Version: webpack 4.29.6
Time: 505ms
Built at: 2019-04-11 15:34:38
    Asset      Size  Chunks             Chunk Names
  main.js  1.12 MiB    main  [emitted]  main
vendor.js  1.12 MiB  vendor  [emitted]  vendor
Entrypoint main = main.js
Entrypoint vendor = vendor.js
[0] multi moment lodash 40 bytes {vendor} [built]
[./app/index.js] 253 bytes {main} [built]
[./node_modules/moment/locale sync recursive ^\.\/.*$] ./node_modules/moment/locale sync ^\.\/.*$ 3 KiB {main} {vendor} [optional] [built]
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {main} {vendor} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {main} {vendor} [built]
    + 129 hidden modules
```

정상적으로 실행되면 dist/ 밑에 `main.js` 와 `vendor.js`가 생성되어 있을것이다

# 여기까지 문제점

dist/ 밑에 `main.js` 와 `vendor.js`안에 각각 완벽하게 똑같은 lodash,moment 코드가 중복해서 들어가 있다.

이 부분을 효율적으로 관리해주기 위해 `splitChunks` 를 사용해 중복되는 부분을 공통영역으로 만들어 줄 수 있다.

# 이하와 같이 webpack.config.js 변경

optimization 부분을 추가

```js
var path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./app/index.js",
    vendor: ["moment", "lodash"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial"
    }
  }
};
```

# webpack실행(splitChunks 사용후)

```js
npx webpack
```

## result

```js
Hash: b6b89be7ea558d5f36b5
Version: webpack 4.29.6
Time: 507ms
Built at: 2019-04-11 16:13:28
    Asset      Size  Chunks             Chunk Names
  main.js  21.8 KiB    main  [emitted]  main
vendor.js  1.12 MiB  vendor  [emitted]  vendor
Entrypoint main = vendor.js main.js
[0] multi moment lodash 40 bytes {vendor} [built]
[./app/index.js] 253 bytes {main} [built]
[./node_modules/moment/locale sync recursive ^\.\/.*$] ./node_modules/moment/locale sync ^\.\/.*$ 3 KiB {main} {vendor} [optional] [built]
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {vendor} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {vendor} [built]
    + 129 hidden modules
```

실행결과만 봐도 splitChunks 사용전에는 main.js가 1.12MiB였는데 21.8KiB로 줄어들은걸 알 수 있다.
dist/vendor.js에만 lodash,moment관련 패키지가 있고 dist/main.js에는 존재하지 않는다.

# 하나더..runtimeChunk나눠주기

웹펙을 초기화할때 사용하는 부분(webpackBootstrap)도 `runtimeChunk`라는 옵션으로 따로 빼낼 수 있다.

설정을 이하와 같이 변경

```js
var path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./app/index.js",
    vendor: ["moment", "lodash"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    runtimeChunk: {
      //추가 부분
      name: "runtime"
    },
    splitChunks: {
      name: "vendor",
      chunks: "initial"
    }
  }
};
```

# webpack실행(runtimeChunk 적용후)

```js
npx webpack
```

## result

```js
Hash: 6fb2c91d04c5f9bd3863
Version: webpack 4.29.6
Time: 503ms
Built at: 2019-04-11 16:43:18
     Asset      Size   Chunks             Chunk Names
   main.js  15.7 KiB     main  [emitted]  main
runtime.js  6.04 KiB  runtime  [emitted]  runtime
 vendor.js  1.12 MiB   vendor  [emitted]  vendor
Entrypoint main = runtime.js vendor.js main.js
[0] multi moment lodash 40 bytes {vendor} [built]
[./app/index.js] 253 bytes {main} [built]
[./node_modules/moment/locale sync recursive ^\.\/.*$] ./node_modules/moment/locale sync ^\.\/.*$ 3 KiB {main} {vendor} [optional] [built]
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {vendor} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {vendor} [built]
    + 129 hidden modules
```

runtime.js라는게 추가된걸 확인

# etc

## 1. CommonsChunkPlugin is dead.

webpack 4 이전에는

```js
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor" // Specify the common bundle's name.
  })
];
```

이런식으로 추가해줬었는데 webpack4부터 `CommonsChunkPlugin`가 사라져서 위와 같은 방법으로 적어주면 이하와 같은 에러가 발생한다

```js
webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.
```

---

The CommonsChunkPlugin has been removed in v4.
You better open a new issue, this thread is dead.

Read this and tell me if it solves your problem.

---

https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693

## 2. 당연한 얘기지만 npm install하지않으면 entry에 패키지 추가 안됨

lodash를 일부로 uninstall하고 webpack실행하면 이하와 같은 에러가 발생하게됨

```js
ERROR in multi moment lodash
Module not found: Error: Can't resolve 'lodash' in '/Users/sehwakim/docker/LearnWebpack/example2-1-CommonsChunkPlugin'
 @ multi moment lodash vendor[1]
```

```json
 runtimeChunk: {
            name: 'vendor'
        },
```

# 코드

## splitChunks 사용전 코드

[URL](https://github.com/negabaro/LearnWebpack/tree/master/example2-1-problem-output-duplicated)


## splitChunks 적용후 코드

[URL](https://github.com/negabaro/LearnWebpack/tree/master/example2-2-SplitChunksPlugin)

## runtimeChunk 적용후 코드

[URL](https://github.com/negabaro/LearnWebpack/tree/master/example2-3-SplitChunksPlugin-runtimeChunk)

### Reference Link:

[link](https://www.zerocho.com/category/Webpack/post/58ad4c9d1136440018ba44e7)
[link2](https://qiita.com/soarflat/items/1b5aa7163c087a91877d)
(https://www.inflearn.com/course/webpack-%EC%9B%B9%ED%8C%A9-%EA%B0%95%EC%A2%8C/%EC%8B%A4%EC%8A%B5-libraries-codes-splitting-1-bundling-libraries/)
