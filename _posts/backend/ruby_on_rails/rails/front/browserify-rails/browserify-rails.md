browserify-rails で簡単な babel 環境を作ったが、ビルド速度がちょっとストレスを感じるくらい遅かったので webpack を使ってみたときのメモです。

せっかくなので browserify-rails と webpack の両方を載せておきます。

browserify_rails.commandline_options で browserify が実行されるときのコマンドオプションを記述できる。babel を使ってコンパイルするようにオブションを設定。

browserify-rails を使えばパッケージをインストールして簡単な設定を書くだけで、gulp を使って task を書いたり、watchfy を使って監視させる必要もなく、ブラウザをリロードさせる度に自動でビルドが走る。また、browserify-rails は sprockets のディレクティブと共存可能なので application.js の中に直接 require しても問題なく動く。

ただ、ビルドの速度が遅くて、お試しで書いた hello world 程度のコードでも 10 秒くらい掛かる。

# その他の選択肢

## browserify + watchify

browserify でも watchify を使えば速いらしい。今回は以前にちょろっとだけ触って雰囲気だけ知っていたので、webpack を使ってみた。どっちがよいとか、どっちもよくわかっていないので今回みたいな Rails に簡単な babel 環境を作るくらいならどっちでもいい気がしている。

## sprockets-es6

これも babel でコンパイルされて、一番手軽そうな選択肢だが import/export が使えないらしい。

# cookpad

browserify を使う
そこで今回はまず、browserify を直接利用し、それ以外は Rails に任せるという方法を採用しました。まず、次のように browserify で対象のファイルをビルドし、成果物を app/assets/javascripts 以下に出力します。

\$ browserify -t babelify app/assets/javascripts/src/main.js -o app/assets/javascripts/bundle.js
babelify というのは browserify のビルド過程で Babel による変換を行ってくれる browserify のプラグイン\*2 です。

このとき、元のソースファイル（ここでは main.js）は app/assets/javascripts 以下でなくてもどこにあっても構いません。重要なのは bundle.js を Sprockets の load path 以下に出力することです。そうすることで application.js 等から以下のように生成したファイルを呼び出せます。

//= require bundle.js
こうすることで、ECMAScript6 へのトランスパイルやモジュールの依存関係の解決などは browserify に任せつつ、Sprockets との併用ができますし、デプロイ時も assets:precompile の前に browserify のビルドコマンドを実行するだけで済みます。

実際の開発時には watchify という対象の JavaScript ファイルの変更を監視して、変更があったときに browserify の差分ビルドを行ってくれるツールを利用していました。環境やコード量にもよりますが、browserify は単体で実行すると 10 秒近くビルドに時間がかかる場合もありますが、watchify の差分ビルドだと 1 秒弱ぐらいまで高速化されます。

この方法はある程度うまくいっていたのですが、JavaScript のファイルを変更してすぐにブラウザをリロードしたときに、ビルド途中の中途半端な状態で Sprockets のほうにキャッシュにされ、再度 JavaScript のファイルを何かしら更新してビルドし直さないとバグったままになってしまうという現象に悩まされました。そんなに頻繁に発生するわけではないのですが、一日開発していたら数回は遭遇するのでけっこうなストレスです\*3。

また、ビルドされたファイルはバージョン管理システムの管理には含めないので、JavaScript の開発を行わないエンジニアやデザイナがアプリケーションの開発を行うとき、手元でビルドプロセスを走らせる必要があります。そこまで大きな問題ではないですが、できればこれまで通り rails server を立ち上げるだけで開発できるようにしたほうがよいと考え、次で説明する browserify-rails を導入することにしました。

browserify-rails を使う
browserify-rails はその名の通り、Rails で browserify を使うための gem です。現状はひとまずこの方法に落ち着いています。

https://github.com/browserify-rails/browserify-rails

Sprockets のプラグインになっており、Sprockets のビルドプロセスの中で browserify が実行されます（正確には Sprockets の Post Proceccer として動作します）。

つまり、ブラウザのリロードをしたタイミングで browserify のビルドが走るため rails server 以外に別プロセスを起動するといったことが不要になりますし、ビルドのタイムラグでタイミングによっては JavaScript が更新されないという問題もなくなります。また、当然 Sprockets と併用でき、Rails が提供している asset の仕組みをそのまま使うことができます。

browserify-rails の最大の問題点はビルドの速度です。browserify-incremental というツールを使うため、browserify をそのまま使うよりは多少速いですが、watchify ほどの速度はでません。JavaScript を更新してブラウザをリロードすると数秒待ち時間が発生します。

browserify-rails のドキュメントにあるように、browserify の Multiple bundles を使ってサイズが大きいライブラリ（React.js など）を別ファイルにするという方法もありますが、それでもこれまで通りのレスポンス速度で開発できるほどは速くなりません。（JavaScript に変更がない場合はキャッシュが効いて即レスポンスが返るので JavaScript を変更しない場合の開発の速度には関係ありません）

逆に、速度以外で困ることはほとんどなく、Rails のレールをできるだけ外れずにモダンな JavaScript 開発環境が作れるので、browserify-rails のような仕組みを高速化していくというのは一つの方向性としてはよいのではないかと個人的には思っています。

以下に最小限の構成を作ったので興味がある方は試してみてください。

https://github.com/hokaccha/browserify-rails-example

# まとめ

Rails で ECMAScript6 や npm などのモダンな JavaScript 環境を整えるためのノウハウについて書きました。

フロントエンドの開発環境まわりはまだまだ過渡期なので、これという決定的な方法が確立されているわけではありません。今回紹介したような方法をはじめ、いくつかの選択肢があるのでプロジェクトの規模や好みに合った方法を探してみてください。

# xxxxx

http://engineer.crowdworks.jp/entry/2016/05/24/174511
browserify / webpack などで一度ビルドしたものを Sprockets のパスに突っ込み、最終的なビルドは Sprockets に任せます。

この方法なら開発中のビルドは watchify などを使って差分で実施できるので browserify-rails に比べてビルド時間はかなり短くできます( crowdworks は現在この方法で一部の JS のビルドを行っています。)。
ただ自分の開発環境のせいかもしれませんが何度かビルドし直す / F5 連打しないと更新されなかったりといった問題がありますし、Sprockets に一度読み込ませる方式だと後述する Hot Module Replacemet といった便利な機能がそのまま使用できません。

### Reference Link:

https://techlife.cookpad.com/entry/2015/12/14/130041

https://qiita.com/nullabletypo/items/8f7f67bfd726de023f13
