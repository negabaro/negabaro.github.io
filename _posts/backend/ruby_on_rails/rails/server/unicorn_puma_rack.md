# unicorn vs puma vs rack차이?

# rackとは

rackはそもそもrubyで書かれた様々なwebフレームワークとwebサーバーをrack自身の柔軟性によって繋いでくれるもので、webサーバ、webフレームワークのどちらが変わってもサイトとしてうまく機能をするようにしてくれているものです。イメージ的にはwebサーバーが動的な要素を取りに行く際にrack内でwebフレームワークを起動させておくことでうまくwebフレームワークにリクエストを送れるといったイメージです。
つまり、rackはrubyで書かれたwebフレームワークをうまく動かすためのアプリケーションサーバということができます。

rails　sでrailsを立ち上げたときは特にwebサーバが立ち上がっている訳ではありませんが、rackがもつ柔軟性によってrailsがうまくリクエストを返せるようになっているので、ローカルで立ち上がっています。

結局のところ、rackはrailsの起動をうまく行ってくれて(アプリケーションサーバとしてのメイン)、かつ、webサーバがなくてもうまい具合に処理してくれるもの(おまけ)というイメージで大丈夫です。

(起動時のrackの挙動について詳しく説明しようとするとかなり長くなってしまうので端折ります

# Unicornとは

UnicornはNginxとRackをうまく繋いでくれるWebサーバとアプリケーションサーバの中間のような存在。
実際Webサーバとしても起動するので、UnicornとRackだけでRailsを動かすことも可能。しかし、プロセス数が少ないため、大勢のアクセスへの対処が難しい。よって、プロセス数が多いwebサーバと合わせて使うことが理想。
Unicornのドキュメントでもnginxと組み合わせることを推奨しているため、Unicornを選ぶ際にwebサーバも自然とNginxになる。

Unicornを使うメリット
プロセスがmaster1つと複数個のworkerに別れていて、masterがソースコードを保持しており、実際に動くのはmasterのプロセスのコピーを持ったworkerプロセス群である。

よって、ソースコードを読み込む必要があるのがmasterだけであり、起動が早くデプロイ時のダウンタイムもない。
また、Nginxがつなぐのはmasterのみなので、masterは各workerにロードバランサーのような形で負荷分散をしながらリクエストを送ることができる。


# unicorn

rack アプリケーション用サーバ。 マルチプロセス。 HTTPリクエストを受け取って rack インタフェースにそったオブジェクトを rack アプリケーションに渡してくれるWebサーバ、だけど rack gem に依存はしていない。（開発環境のみ依存）

RackがよくわからなかったのでRackアプリケーションをUnicornで動かしてnginxからリクエストを転送してみた - woshidan's blog

# puma

rack ハンドラ（rack アプリケーション用サーバと同義？）マルチプロセス&マルチスレッド。

unicorn を代替するために作られた？ Heroku が推してる。

https://scoutapm.com/blog/which-ruby-app-server-is-right-for-you-ja
https://daido.hatenablog.jp/entry/2019/09/30/231854
https://qiita.com/takahiro1127/items/fcb81753eaf381b4b33c
https://qiita.com/jnchito/items/3884f9a2ccc057f8f3a3
