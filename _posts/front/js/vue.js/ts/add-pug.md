Pug を導入する
個人的には Vue の SCF の template は Pug で記述したいので、Pug を導入します。

$ yarn add pug pug-plain-loader
// config/webpack/loaders/pug.js
module.exports = {
  test: /\.pug$/,
  use: [
    {
      loader: 'pug-plain-loader'
    }
  ]
}
// config/webpack/environment.js
const pug = require('./loaders/pug')

environment.loaders.prepend('pug', pug)

https://notes.tmtr.jp/2019/09/30/vue-ts-rails/