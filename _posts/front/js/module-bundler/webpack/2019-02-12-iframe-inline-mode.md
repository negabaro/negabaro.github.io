webpack-dev-server は以下の iframe mode と inline mode という 2 つのモードがあります。
どちらのモードも、ファイルの変更を検知してブラウザを自動リロードする機能（Automatic Refresh）を備えています。
また、どちらのモードも後述する Hot Module Replacement（HMR）に対応しています。

inline mode

特に何も設定しなかった場合のモードです。
この場合、アクセスする URL は http://localhost:8080/webpack-dev-server/ のように、
末尾に webpack-dev-server がついた URL を使います。

表示される画面は下のキャプチャのように、アプリケーション上部にヘッダーのようなものが表示された状態です

https://dackdive.hateblo.jp/entry/2016/05/07/183335

また、iframe mode というだけあって、アプリケーションの部分は iframe で埋め込まれているのがわかります。

inline mode

こちらは、実行時にオプション --inline を指定して実行する必要があります。

inline mode の場合、アプリケーションは http://localhost:8080 から確認できます。
先ほどの iframe mode と違ってヘッダー部分もなく、開発中のアプリケーションそのものが表示されます

また、inline mode を指定した場合でも、http://localhost:8080/webpack-dev-server/ にアクセスすれば iframe mode で表示することが可能です。
URL によって「どちらのモードで見ているか」という言い方が変わってくるだけ、という理解です。

ポイント：inline mode を指定してないのに、http://localhost:8080 でアプリケーションが表示される？

これ、私もしばらく原因がわかっていませんでした。
--inline を指定していないはずなのに、http://localhost:8080 でアプリケーションが普通に表示されています。

ただ、これは実際には inline mode で動いているわけではなく、単に指定した Content Base に index.html があるので表示されるだけです。
そのため、ファイルを変更した時に Automatic Refresh は機能しません。

inline mode で正しくサーバーが起動していれば、ファイルを変更した時、ブラウザのコンソールに以下のように表示されるはずです。
