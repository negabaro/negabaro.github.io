グローバル変数化したい、コンパイル時に変数を埋め込みたい
あまり良くない事でですが、変数やクラスをグローバル変数として使用したいことがあります。（例えば別ライブラリで使いたい時等）
expose を使うことで、対象の module を Global 化出来ます。

require('expose?Global!./src/Global'); // `src/Global`という Module を外に出せる。 完全 Global 化
ただし、ほとんどのケースでは Global 化は必要ないでしょう。
webpack を使用している場合、 ProvidePlugin を使うことで擬似グローバル化が出来ます。
ライブラリの外では使用できませんし、ターミナルからも使えませんが、同じ output のコード全体で使用できます。

また、環境ごとに設定値をコードに埋め込みたい場合は、 DefinePlugin を使うと、ES6 コンパイル時に外から文字列をコードに埋め込むことが出来ます。

webpack.config.js では、

```
  plugins: [
    new webpack.ProvidePlugin({
      Global: 'Global' // Globalというmoduleを、関連コード全体で使うことが出来る。
    }),
    new webpack.DefinePlugin({
      __HOGE__: `"hoge"`,  // コード内の__HOGE__が"hoge"として使える。
      __FUGA__: `1`,       // コード内の__FUGA__が1として使える。
    }),
  ],
```

詳しい設定は、 https://webpack.github.io/docs/webpack-dev-server.html を見て下さい。
