---
layout: post
title: "webpack4 + css-loader,style-loader를 사용해서 css를 loader해보자"
author: negabaro kim
categories: webpack
tags: webpack css js
---

# 목표

webpack4에서 css-loader와style-loader라는 loader를 사용해
css파일을 읽어서 번들링하고 정상적으로 동작하는지 확인해보자

# 초기설정 + webpack install

[webpack4 install방법]({% post_url 2019-04-11-webpack4-install %})

을 참고

# style-loader,css-loader인스톨

```js
npm i css-loader style-loader --save-dev
```

#### css-loader

css를 읽어서 js화(?) 시켜주기 위해 필요한 loader

#### style-loader

js화 시켜준 css(?)를 HTML안 style태그에 직접 붙여주는 역할.

# 테스트용 설정 파일

이하는 테스트용 설정파일이다.

## 1. base.css작성

```js
p {
  color: blue;
}
```

## 2. app/index.js작성

```js
import "../base.css";
```

## 3. index.html작성

```js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>CSS & Libraries Code Splitting</title>
  </head>
  <body>
    <header>
      <h3>CSS Code Splitting</h3>
    </header>
    <div>
      <p>
        This text should be colored with blue after injecting CSS bundle
      </p>
    </div>
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

## 4. webpack.config.js작성

#### webpack.config.js 설정 내용에 대한 해설

app/index.js를 모듈번들 해서 dist/bundle.js로 만들어준다
이때, css확장자의 파일의 경우 css-loader -> style-loader 순으로 loader를 적용시켜준다.

※webpack에서 설정해준 설정이(use부분) 오른쪽에서 왼쪽순으로 실행된다는게 포인트

```js
var path = require("path");

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
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
```

# webpack실행

```js
npx webpack
```

#### result:

```
Hash: 959f2c579034581d9f75
Version: webpack 4.29.6
Time: 259ms
Built at: 2019-04-11 12:30:29
    Asset      Size  Chunks             Chunk Names
bundle.js  23.4 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./app/index.js] 22 bytes {main} [built]
[./base.css] 1.05 KiB {main} [built]
[./node_modules/css-loader/dist/cjs.js!./base.css] 162 bytes {main} [built]
    + 3 hidden modules
```

위와 같이 실행되어서
dist/bundle.js라는 파일이 생성되있으면 성공이다.

# 동작확인

index.html 페이지를 확인하면 이하와 같이 파란색 글씨로 css가 적용되어있는걸 확인 가능하다.
![image](https://user-images.githubusercontent.com/4640346/55928393-72d34480-5c53-11e9-8dde-8025ca857c01.png)

또한 html에 base.css의 내용이 붙어져 있는걸 확인 가능하다.
이렇게 HTML에 붙여주는건 `style-loader`가 해준것

![image](https://user-images.githubusercontent.com/4640346/55926114-08b6a180-5c4b-11e9-9b87-7c79f91198cb.png)

# 이 코드의 문제점

style-loader를 이용해 HTML에 직접 css설정을 넣는것은 확장성이 낮아서 실무에서 잘 쓰지 않음(퍼포먼스 향상은 있을 수 있으나..)
다음 포스트에서는 확장성을 위해 css부분을 분리하는 방법을 알아보자

# 코드

위에서 설명한 내용의 자세한 코드는 아래 링크를 참조

https://github.com/negabaro/LearnWebpack/tree/master/example1-1-css-loader-style-loader

### Reference Link:

https://qiita.com/civic/items/82c0184bcadc50965f91
