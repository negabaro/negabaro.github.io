---
layout: post
title: "vue-cli webpack 빌드디렉토리 변경하는 방법"
author: negabaro kim
tags: webpack
---

vue-cli에서 빌드디렉토리 변경하는 방법

# vue.config.js

```js
const path = require("path");
module.exports = {
  outputDir: path.resolve(__dirname, '../priv/static');
};
```

-----------

# 관련에러


## Configuration Error: Avoid modifying webpack output.path directly. Use the "outputDir" option instead

webpack의 `config.output.path`를 직접 변경시 발생 

위 예제와 같이 outputDir를 직접변경 해줘야한다.


## Configuration Error: Do not set output directory to project root.

`outputDir: path.resolve(__dirname)` 이런식으로 프로젝트 루트를 지정하면 에러가발생





### reference:

[Link]:(https://github.com/vuejs/vue-cli/issues/1496#issuecomment-410546250)
