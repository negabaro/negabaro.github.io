---
layout: post
title: "webpack4 + extract-text-webpack-plugin로 css파일 분리"
author: negabaro kim
categories: webpack
tags: webpack css js
---

# 이전까지

[webpack4 + css-loader,style-loader를 사용해서 css를 loader해보자]({% post_url 2019-04-11-webpack-css-loader-style-loader %})
로 webpack으로 css파일을 번들링하는 방법을 알아봤다.

이 방법은 확장성이 낮은 문제점이 있었으므로 이번 포스트에서는 확장성을 높이기 위해 css를 분리하는 방법을 알아보자

# extract-text-webpack-plugin추가

extract-text-webpack-plugin으로 인스톨 하면 webpack 버전3가 호환이 되어있는 패키지가 인스톨되어 버리므로
webpack4과의 호환을 위해서 `@next`를 붙이자.

※extract-text-webpack-plugin 대신에 `mini-css-extract-plugin`을 사용해도 해결된다고 함

```js
npm i extract-text-webpack-plugin@next -–save-dev
```

# 설정변경

## 1. index.html추가

```html
<link rel="stylesheet" href="dist/styles.css" />
```

css를 분리할것이므로 분리된 파일을 index.html에서 읽어올수 있게 위 설정을 추가해줌

## 2. webpack.config.js

이하와 같이 변경

```js
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //변경부분

module.exports = {
  mode: "development",
  entry: "./app/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        //use: ["style-loader", "css-loader"] //변경부분2
        use: ExtractTextPlugin.extract({
          //변경부분3
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [new ExtractTextPlugin("styles.css")]
};
```

# webpack실행

```js
npx webpack
```

#### result

```js
Hash: 86dddeb6df8cc1d408fa
Version: webpack 4.29.6
Time: 220ms
Built at: 2019-04-11 12:33:42
     Asset      Size  Chunks             Chunk Names
 bundle.js  4.38 KiB    main  [emitted]  main
styles.css  21 bytes    main  [emitted]  main
Entrypoint main = bundle.js styles.css
[./app/index.js] 22 bytes {main} [built]
[./base.css] 41 bytes [built]
[./node_modules/css-loader/dist/cjs.js!./base.css] 162 bytes [built]
    + 3 hidden modules
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/dist/cjs.js!base.css:
    Entrypoint undefined = extract-text-webpack-plugin-output-filename
    [./node_modules/css-loader/dist/cjs.js!./base.css] 162 bytes {0} [built]
        + 1 hidden module
```

dist/안에 `bundle.js`와 더불어 `style.css`가 생성되어 있으면 성공이다.

# 동작확인

동일하게 index.html 페이지를 확인하면 이하와 같이 파란색 글씨로 css가 적용되어있는걸 확인 가능하다.
![image](https://user-images.githubusercontent.com/4640346/55928393-72d34480-5c53-11e9-8dde-8025ca857c01.png)

[webpack4 + css-loader,style-loader를 사용해서 css를 loader해보자]({% post_url 2019-04-11-webpack-css-loader-style-loader %})
과 다르게 html안 style태그에 css를 붙이지 않고 분리된 dist/style.css파일을 link rel로 불러서 적용하고 있다.

# 코드

https://github.com/negabaro/LearnWebpack/tree/master/example1-2-extract-text-webpack-plugin
