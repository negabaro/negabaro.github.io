単純に@import
style の中で@import すれば読み込むことが可能です。

# App.vue

```js
<template>...</template>
<script>...</script>

<style lang='scss' scoped>
@import "../style/global.scss";

h1 {
  @include font-size($font-md);
}
</style>
```

[vue-cli]3.0 環境だと、設定がかなり隠蔽された

```js code:vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "global.scss";',
        includePaths: [path.resolve(__dirname, "./src/sass/")]
      }
    }
  }
};
```

css.loaderOptions.sass
に渡せば sass-loader の option を渡せる

しかし、この方法だと各ファイルの style に@import を記述する必要があり、保守性も悪いため実用的ではありません。

```js
npm install sass-loader node-sass --save-dev
```

### Reference Link:

http://system.blog.uuum.jp/entry/2018/01/10/110000
https://scrapbox.io/web/vue%E3%81%A7%E5%85%B1%E9%80%9A%E3%81%AEscss%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E8%AA%AD%E3%81%BF%E8%BE%BC%E3%82%80

https://vueschool.io/articles/vuejs-tutorials/globally-load-sass-into-your-vue-js-applications/
