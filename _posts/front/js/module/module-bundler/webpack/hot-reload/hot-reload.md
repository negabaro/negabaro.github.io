# webpack-dev-server でホットリロードが出来る

webpack-dev-server を使うと、コードを編集すると自動的にブラウザのページをリロードしてくれます。
いわゆる Hot Module Reload です。神機能です。

```
module.exports = {
  entry: [
    'babel-polyfill', // polyfillです。これを書くとES6未対応ブラウザでもES6のコードが書けます。
    "webpack/hot/dev-server",
    "webpack-dev-server/client?http://localhost",
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
      },
    ],
  },
  output: {
    filename:   'build.js',
    path:       path.resolve(__dirname, '/build/'),
    publicPath: path.resolve(__dirname, '/'),
  },
};
```

起動は package.json のスクリプトに、

"dev": "webpack-dev-server --inline --hot"
と書けば、npm run dev で起動します。
上の書き方は、一部 module のみ更新可能な場合はその module だけ更新され、不可能なときはページ全体を更新します。

--hot옵션없이
bin/webpack-dev-server
만 실행해도 JS 파일 변경시 자동으로 웟치해서 리로드해줬다

HMR도 관계없음
