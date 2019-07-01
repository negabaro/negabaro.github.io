#iframe mode と inline mode
webpack-dev-server は以下の iframe mode と inline mode という 2 つのモードがあります。
どちらのモードも、ファイルの変更を検知してブラウザを自動リロードする機能（Automatic Refresh）を備えています。
また、どちらのモードも後述する Hot Module Replacement（HMR）に対応しています。

## inline mode

特に何も設定しなかった場合のモードです。
この場合、アクセスする URL は http://localhost:8080/webpack-dev-server/ のように、
末尾に webpack-dev-server がついた URL を使います。

表示される画面は下のキャプチャのように、アプリケーション上部にヘッダーのようなものが表示された状態です。

## iframe mode

また、iframe mode というだけあって、アプリケーションの部分は iframe で埋め込まれているのがわかります。

# webpack-dev-server는 편리해

JavaScript のビルドに webpack を使っている場合、ローカルでの開発には webpack-dev-server を使うと便利です。
通常の webpack コマンドも --watch （または -w）オプションつきで実行することにより
ファイルの変更を検知して自動でリビルドを行うことが可能ですが、
webpack-dev-server は上記に加えて

ローカルサーバーも起動してくれる（中身は Node.js の Express サーバーらしい）

ファイルの変更を検知して自動ビルドした後、ブラウザも自動的にリロードしてくれる（Automatic Refresh）

`ブラウザ全体のリロードではなく、編集したモジュールのみを更新する Hot Module Replacement という仕組みが使える`（後述）

といった機能を備えているため、ローカルで開発する分にはこちらを使う方が便利です。

### Reference Link:

https://dackdive.hateblo.jp/entry/2016/05/07/183335
https://dackdive.hateblo.jp/entry/2016/05/07/183335
