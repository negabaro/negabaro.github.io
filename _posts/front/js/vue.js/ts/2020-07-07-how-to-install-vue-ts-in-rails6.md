---
layout: post
title:  "rails6 + typescript + vue.js 2.6.1 설치방법"
author: negabaro kim
tags:	vue.js rails/front
---

# vue,typescript 인스톨

```ruby
bundle exec rake webpacker:install:vue
bundle exec rake webpacker:install:typescript
```

를 실행해주면 70%완료이다.
몇가지 설정만 바꿔주면 끝이다.

# config/webpack/loaders/typescript.js 수정

PnpWebpackPlugin.tsLoaderOptions에 
`appendTsSuffixTo: [/\.vue$/]`를 추가해줌


## Before

```js
const PnpWebpackPlugin = require('pnp-webpack-plugin')

module.exports = {
  test: /\.(ts|tsx)?(\.erb)?$/,
  use: [
    {
      loader: 'ts-loader',
      options: PnpWebpackPlugin.tsLoaderOptions()
    }
  ]
}
```

## After

```js
const PnpWebpackPlugin = require('pnp-webpack-plugin')

module.exports = {
  test: /\.(ts|tsx)?(\.erb)?$/,
  use: [
    {
      loader: 'ts-loader',
      options: PnpWebpackPlugin.tsLoaderOptions({
        appendTsSuffixTo: [/\.vue$/]
      })
    }
  ]
```


# app/javascript/app.vue

을 아래와 같이 수정

바뀌는 부분은 `script lang="ts"`와 `Vue.extend`를 추가해주는 부분

```js
<template>
  <div id="app">
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      message: "Hello Vue!"
    };
  }
});
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
```


# javascript_pack_tag추가

```js
//app/views/layouts/application.html.erb
 <%= javascript_pack_tag 'hello_vue' %>
```

추가


# 동작 확인

webpack-dev-server를 기동하고 콘솔로그에 아래와 같이 표시되면 정상적으로 동작하는것임.

```js
Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
```

----



```ruby
bundle exec rake webpacker:install:vue
bundle exec rake webpacker:install:typescript
```

아래는 위 커맨드 실행시 생성되는 파일들이다.

## app/javascript/packs/hello_vue.js


```js
import Vue from "vue";
import App from "@/src/app.vue";

document.addEventListener("DOMContentLoaded", () => {
  //const container = document.querySelector("#v-page");
  //if (container === null) return;

  const app = new Vue({
    render: h => h(App)
  }).$mount();
  //container.appendChild(app.$el);
  document.body.appendChild(app.$el);

  console.log(app);
});
```

## package.json


```js
"ts-loader": "^7.0.5",
"typescript": "^3.9.6",
"vue": "^2.6.11",
"vue-loader": "^15.9.3",
"vue-template-compiler": "^2.6.11"
```

## tsconfig.json

```js
{
  "compilerOptions": {
    "declaration": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": ["es6", "dom"],
    "module": "es6",
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
        "*": ["node_modules/*", "app/javascript/*"]
    },
    "sourceMap": true,
    "target": "es5"
  },
  "exclude": [
    "**/*.spec.ts",
    "node_modules",
    "vendor",
    "public"
  ],
  "compileOnSave": false
}
```

## vue-loader

```js
//config/webpack/loaders/vue.js
module.exports = {
  test: /\.vue(\.erb)?$/,
  use: [{
    loader: 'vue-loader'
  }]
}
```

#  메모1. config/webpack/loaders/typescript.js 수정을 안하면

```
Property or method "message" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property
```

에러를 만나게 된다.
`config/webpack/loaders/typescript.js`수정을 꼭 할것

---

[Link1]: http://clash-m45.hatenablog.com/entry/2019/09/21/120215
