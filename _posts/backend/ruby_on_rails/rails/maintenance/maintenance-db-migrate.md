
migration


While running migrations as a part of the deploy is the default approach used by most of companies, for some reason Rails community never reconsidered alternatives.
https://kirshatrov.com/2018/04/01/async-migrations/


# 디플로이와 DB migration 사용

```ruby
Results (40 voters):
███████████ (28) 동시에 실행
███ (9) 따로 실행
(1) 그외 방법
(1) Abstain
```

※여기서 동시는 ですです。migration -> deployの一連の流れをデプロイパイプラインやデプロイスクリプトで組んでいて、間に人が介在しないようなやり方を「同時にやる」と表現してました

# 따로 실행

先に自分の意見を書くと別々にやるのが好みです。


## 의존관계

deployment와 DB migration간의 의존관계를 만들기 싫으므로 따로한다

ex) DB migrationが完了しないとdeploymentが行えない
deployしたいアプリケーションコードの変更と関係ないDB migrationが暗黙的に実行される

カラムの追加とかあったとき、コードだけ新しくするとエラーとか起きちゃうのはどう対処する感じですか？
(昔こういう話はよくやられてたけど今はあんまりされてない感はある)


## migration실행시간이 많이걸리기 때문

migrationによってはtable rebuildが発生して時間がかかることがあるので、別々で実行してます。



# 따로 실행시

ybiquitous  21:26
先に db/**/*.rb だけ含んでデプロイ& rails db:migrate しておいて、あとで他のコードをデプロイしてますねー。
削除の場合は逆に、消すattributeの参照を全部消してデプロイ→ ignored_colums セットしてデプロイ→ db/ だけデプロイ& db:migrate → ignored_columns 消す
みたいにしてます。

時間空けないですぐにやってます。




# 동시


* webアプリのコードとDBスキーマはそもそも不可分である。(アプリケーションのdeploymentとDB migrationの間の依存関係は必然とみなす)
* 
* コードのデプロイと、(ユーザからみえる)機能のリリースはそもそもDarklaunchなどのFeature togglesで分離しているので、↑の依存をそれほど問題視しない

ujihisaさんのおっしゃるとおり、スキーマ変更とアプリの改修は不可分だと思うので、migrationとdeployを同時にやらないことでどのようなメリットがあるのかあまりわかりませんでした…

------

tsugimoto  23:40
必要だからスキーマ変更をマージしているのだから、次のデプロイでそれが migration されるのは致し方なしなのかなという感覚でした（次の本番デプロイで走って困る migration は feature ブランチとかに隔離しておく発想）

ohbarye:github_octocat:  00:01
スキーマ変更とアプリの改修は不可分
なるほどー！自分はDBの変更とアプリの改修は概ね不可分だがそうでないこともある、ぐらいの認識でした。


migrationだけすれば良い例
インデックスや制約を作成/削除する
(アプリからすでに利用されない) 古いcolumn/tableを消す

アプリだけデプロイすれば良い例
実行されるmigrationと関係ない変更をデプロイする
「必要だからスキーマ変更をマージしている」のが殆どのケースだと思いますが、分離することで
片方だけをやりたいケースに対応できる

走って困るmigrationをfeatureブランチに隔離させておく、という開発者のbranch管理コストが下がる
あたりがメリットかなと思っています。
00:04
:考えの吹き出し: 別々に実行するためにかかる人的コストも当然あるが…

chiastolite  00:14
migrationとデプロイを分けると、今のサーバーの状態をどうにか把握しておく必要が出てきてそのうち反映されるべきmigrationが実行されていないとかでトラブルとかありそう （編集済み） 


migrationとデプロイを分けるとしたら、どちらかというとインフラ要因でやりそう

koheisg  00:17
1. migrationのみデプロイ
2. 初期データを投入 (バッチとか。migrationに書いてしまうプロジェクトもある)
3. migrationの変更を利用する機能のリリース
とか毎日のようにやってます
それぞれマージされたら実行されるような感じもあるし、chatopsやデプロイツール(jenkinsやrundeckなど)でやることもありますね。 （編集済み） 

genya0407  00:20
走って困るmigrationが入ったブランチをデプロイするのこわい

koheisg  00:22
それって、メソッドシグネチャのrename/削除とかもですかね？ （編集済み） 

ohbarye:github_octocat:  00:24
どちらかというとインフラ要因でやりそう
Shopifyのブログだと「シャーディングしてたらそれぞれのDBにmigrationしなければいけない」「migrationに時間かかったらそのぶんデプロイがブロックされる」（たぶんmigrationに依存してないデプロイのことを言ってる）みたいな記述がありました :メモ:

koheisg  00:25
シャーディングしてるようなDBにmigration当てる話だったら、絶対に同時にデプロイとか厳しいですよね。。
:ariuru:
1
:両目:
1



koheisg  00:27
そもそもpt-online schema changeとか使わないとだめなんでしょうけど、うまくいった試しがないので、土下座してメンテインしてる。。(誰か教えてください。。。 （編集済み） 
00:30
(なので、規模によるので、データ量とアクセス数によってmigration分けたり、アプリと同時にやってたりいろいろなのでその他に入れました。)
:wakarite:
1




ohbarye:github_octocat:  00:40
（自分も好みは書きましたがどちらが正解とかは考えていなくて、チームや規模に基づいて生じるトレードオフがあるよな〜と思いつつ、どのあたりが判断基準なのかを手探っているので皆さんの状況も知りたい！というお気持ちです）


自分も基本同時派（デプロイコマンドを一発打てば、マイグレーションや初期化処理、
バッチ等を含め、全依存タスクが自動で完了するのが好き）なんですが、
ダウンタイムをゼロにするためのアプローチの1つ

というのは、分離で得られるメリットですね。
昔ながらの技術を使った例になりますが、
アプリから参照されないレプリカに対して、長時間の alter (migration) を実施
migration完了後に、フェイルオーバーを発生させ、プライマリに昇格 (ダウンタイム数秒)
旧アプリからのアクセス時、新カラム等はDB側の初期値で初期化
全レプリカを、同様に、一つずつサービスから切り離しつつ、migrationを浸透させる
新スキーマになった状態で、新アプリをdeploy
deploy の複雑化や工程/時間増のデメリットが非常に大きいので、
ここぞというタイミング以外は同時deployしてましたが。
:ariuru:
1


ohbarye:github_octocat:  21:53
同時派の中でも
アプリケーションにmigration前のDBに対しての前方互換性を持たせる派（migrationがコケてもデプロイできるよ派）
持たせない派（migrationが終わらないとdeployさせないよ派）
がいることがわかってきました

suusan2go  22:55
今まで自分が遭遇したケースだとこんな感じでしたね
歴史の浅い小規模なRailsアプリ => デプロイ頻度も多いのであえてmigrationを分けると手間。デプロイのタイミングでマイグレーションも走らせる。

歴史の長い大規模なRailsアプリ => データ量の多いテーブルに関するmigrationはレビュー等で注意して、必要に応じてメンテなど調整の上migrationだけ個別にメインブランチにマージしてデプロイ。

それ以外のものは小規模Railsアプリと同じ。


DBを他のアプリと共有しているRailsアプリ => DB変更が他のアプリに影響を与える可能性があるので、デプロイとは別のタイミングに実施。

DB変更用のリポジトリ作ってRailsのマイグレーション使ってないケースもあった(正直辛かった)s