---
layout: post
title: "webpack4 manifest plugin도입"
author: negabaro kim
categories: webpack
tags: webpack js
---

# webpack-manifest-plugin이란

번들링시 생성되는 코드에 대한 정보를 json파일로 저장하여 관리

번들링할때 hash값을 이용해 파일명을 생성시 문제가 매번 hash값이 바뀌므로 최종 번들링된 파일명을 import할때 특정하기 어려웠음

이때 webpack-manifest-plugin을 사용하면

manifest.json을 생성해 매번 생성된 최종결과물과 매치되는 스태틱한 파일명을 alias와 같은 형태로 사용할 수 있게 해주므로
import시는 고정값을 사용가능하게 됨

# 베이스는 이전 포스트에 이어서 실행한다

[webpack4에서 splitChunks 사용해서 중복된 모듈 없애기]({% post_url 2019-04-11-webpack-splitChunks %})

# npm install webpack-manifest-plugin

webpack-manifest-plugin플러그인을 인스톨

```js
npm i webpack-manifest-plugin --save-dev
```

# webpack.config.js

```js
var path = require("path");
var ManifestPlugin = require("webpack-manifest-plugin");
module.exports = {
  mode: "development",
  entry: {
    main: "./app/index.js",
    vendor: ["moment", "lodash"]
  },
  output: {
    filename: "[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    //이부분
    new ManifestPlugin({
      fileName: "manifest.json",
      basePath: "./dist/"
    })
  ],
  optimization: {
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      name: "vendor",
      chunks: "initial"
    }
  }
};
```

```json
  plugins: [
    new ManifestPlugin({
      fileName: "manifest.json",
      basePath: "./dist/"
    })
  ],
```

이 부분이 포인트

# webpack실행

```js
npx webpack
```

## result

```js
Hash: 4216a9e8e22e709a7fe1
Version: webpack 4.29.6
Time: 602ms
Built at: 2019-04-11 17:18:14
                         Asset       Size   Chunks             Chunk Names
       4216a9e8e22e709a7fe1.js   6.04 KiB  runtime  [emitted]  runtime
  main.4216a9e8e22e709a7fe1.js   15.7 KiB     main  [emitted]  main
                 manifest.json  160 bytes           [emitted]
vendor.4216a9e8e22e709a7fe1.js   1.12 MiB   vendor  [emitted]  vendor
Entrypoint main = 4216a9e8e22e709a7fe1.js vendor.4216a9e8e22e709a7fe1.js main.4216a9e8e22e709a7fe1.js
[0] multi moment lodash 40 bytes {vendor} [built]
[./app/index.js] 253 bytes {main} [built]
[./node_modules/moment/locale sync recursive ^\.\/.*$] ./node_modules/moment/locale sync ^\.\/.*$ 3 KiB {main} {vendor} [optional] [built]
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {vendor} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {vendor} [built]
    + 129 hidden modules
```

manifest.json이 추가된걸 확인

## cat dist/manifest.json

안을 보면 이런식으로 스태틱한 파일명이 있는걸 알 수있다.

```js
{
  "./dist/main.js": "main.4216a9e8e22e709a7fe1.js",
  "./dist/runtime.js": "4216a9e8e22e709a7fe1.js",
  "./dist/vendor.js": "vendor.4216a9e8e22e709a7fe1.js"
}
```

---

また、ハッシュ値はファイルの内容が変わる度に異なるものが生成されますが、build フォルダに出力されたファイルは消えるわけではありません。これだとファイルが溜まる一方なので、ビルド時に出力先フォルダの中身を空にするプラグイン clean-webpack-plugin も使いましょう。

```js
npm install --save-dev clean-webpack-plugin
```

```js
npm i --save-dev html-webpack-plugin@next
```

분리된 파일들은 서버가 열리면 HtmlWebpackPlugin 이 알아서 index.html에 주입해준다. 물론 production 빌드를 하면 분리된 번들 파일 두개가 생성된다

template 옵션에는 해당하는 html파일의 패스를 입력해주시면 됩니다. \$ webpack 명령어를 실행해주면 dist 폴더에 index.html파일이 생성되고 자동으로 bundle된 css파일과 js파일이 link태그와 script태그로 추가된 것을 확인하실 수 있습니다. !

안나오는디..?

# 코드

https://github.com/negabaro/LearnWebpack/tree/master/example2-4-webpack-manifest-plugin

### Reference Link:

http://cloudcafe.tech/?p=653
https://www.inflearn.com/course/webpack-%EC%9B%B9%ED%8C%A9-%EA%B0%95%EC%A2%8C/%EC%8B%A4%EC%8A%B5-libraries-codes-splitting-3-manifest-plugin/
