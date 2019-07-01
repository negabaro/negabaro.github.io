---
layout: post
title: "babel 기초"
author: negabaro kim
categories: js
tags: js babel
---

```
npm install -g babel babel-cli
```

```
npm init
npm install --save-dev babel-preset-es2015
```

.babelrc

```
{
  "presets": ["es2015"]
}
```

```
babel src/sample.js -o dist/build.js
```

#### src/sample.js

```
const ES6 = 'ECMAScript2015';
console.log(ES6);
```

#### dist/build.js

```
"use strict";

var log = function log() {
  console.log("ECMAScript2015");
};
```

#### Reference Link:

```
https://mae.chab.in/archives/2547
```
