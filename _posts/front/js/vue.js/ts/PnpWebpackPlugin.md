PnpWebpackPlugin.tsLoaderOptionsについて
上記の ts-loaderの設定ファイル（ /config/webpack/loaders/typescripts.js ）で、 PnpWebpackPlugin.tsLoaderOptions()のようにオプション指定されていて、これが何かも気になったので、調べてみました。



# Pnp란?

Yarn 2.0에 도입된 node_modules에 대채한 패키지 의존관계를 해결하는 API인 Plug'n'Play의 앞문자를 따온것.
Plug'n'Play를 도입하면 용량이 큰 node_modules에 비해 .pnp.js라는 단일파일만으로 의존관계를 해결가능해
node_modules보다 70% 속도가 개선된다고 함.



ただし、Webpackerのissueを見ると、2020/5/16時点ではまだ使える状態にはなさそうなので、恩恵を受けられる日が来るのを待ちましょう。


# PnpWebpackPlugin.tsLoaderOptionsはなぜ要るのか？

Plug'n'Playが導入されると、Typescript のimport 文やRefarenceディレクティブが参照する箇所を node_modules から変えないといけないので、Plug'n'Playが有効になっている場合のみ、ts-loaderのオプションに

resolveModuleName
resolveTypeReferenceDirective
というオプションを渡して、TypeScriptのデフォルトの実装（import 文やRefarenceディレクティブ）と動きが変わるようにしてあげる必要があるようです。

PnpWebpackPlugin.tsLoaderOptionsの実装は以下のコードを確認しました。

https://simple-minds-think-alike.hatenablog.com/entry/rails-vue-typescript