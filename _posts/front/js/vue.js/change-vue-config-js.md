2. npm scripts を追加、変更する
   step1. 調査する
   @vue/cli-service/lib/Service.js を見てみると、L.261 あたりに下記の記述があります。

```js
Service.js;
const configPath =
  process.env.VUE_CLI_SERVICE_CONFIG_PATH ||
  path.resolve(this.context, "vue.config.js");
```

環境変数に VUE_CLI_SERVICE_CONFIG_PATH を指定してあげれば良さそうです。

step2. npm scripts を書く
変更前

```js
package.json
"scripts": {
  "serve": "vue-cli-service serve",
},
```

変更後

```js
package.json
"scripts": {
  "serve": "VUE_CLI_SERVICE_CONFIG_PATH=$PWD/config/vue.config.js vue-cli-service serve",
  "serve:sp": "VUE_CLI_SERVICE_CONFIG_PATH=$PWD/config/vue.config.sp.js vue-cli-service serve",
},
```

https://qiita.com/negibouze/items/3f02188058bd5bfbf678
