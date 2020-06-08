---
layout: post
title:  "electron hello world"
author: negabaro kim
categories: electron
tags:	electron
---

# 공식 홈페이지 HandsOn

### Clone the Quick Start repository

```
$ git clone https://github.com/electron/electron-quick-start
```

### Go into the repository

```
$ cd electron-quick-start
```

### Install the dependencies and run

```
$ npm install && npm start
```

---

## electron install


```
npm install -g electron-prebuilt
```

```
which electron
```

## 새로운 프로젝트 작성

Electron로 Hello World
새로운 프로젝트 작성


### 디렉토리 구성

```
ElectronApp
├── index.html
├── index.js
└── package.json
```


### 새로운 프로젝트 작성

```
$ mkdir ElectronApp
$ cd ElectronApp
$ npm init -y
```


## package.json

```
{
  "name": "ElectronApp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "electron index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

## index.js

```js
"use strict";

// 어플리케이션을 컨트롤하는 모듈
var electron = require("electron");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

//메인윈도우는 GC안되게 글로벌 변수화
let mainWindow;

// 전체 윈도우가 닫기면 종료
app.on("window-all-closed", function() {
  if (process.platform != "drawin") {
    app.quit();
  }
});

// Electron초기화 완료후에 실행
app.on("ready", function() {
  // メイン画面の表示
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.loadURL("file://" + __dirname + "/index.html");

  // 윈도우를 닫으면 어플 종료
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
});

```


## index.html

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ElectronApp</title>
  </head>
  <body>
    <p>Hello World</p>
  </body>
</html>
```


#### 소스코드:

https://github.com/negabaro/electron-hello-world

#### Reference link:

https://qiita.com/yoshizaki_kkgk/items/8917fc4350d17a44773d
https://electronjs.org/
https://github.com/greggman/electron-hello-world