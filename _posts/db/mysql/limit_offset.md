開発
 2018.01.11
Rails: データベースのパフォーマンスを損なう3つの書き方（翻訳）
 hachi8833
 シェア
 
 ツイート
 
 ブックマーク
 
 LINE
概要
原著者の許諾を得て翻訳・公開いたします。

英語記事: Common Rails Idioms that Kill Database Performance
原文公開日: 2017/01/03
著者: Starr Horne
サイト: https://www.honeybadger.io/
Rails: データベースのパフォーマンスを損なう3つの書き方（翻訳）
2005年にRailsのActiveRecordを初めて見たときに、稲妻のような天啓を感じたのを未だに覚えています。当時はPHPアプリで生SQLクエリを書いていましたが、それまで面倒で退屈でたまらなかったデータベースの扱いが、そのときを境に突如として簡単で楽しいものに変身したのです。そう、楽しくなったのです。
…やがて、ActiveRecordのパフォーマンスの問題に気づくようになりました。

ActiveRecordそのものが遅いわけではありませんでした。ちょうどその頃には実際に実行されるクエリに注意を払わなくなっていたのです。やがて、Rails CRUDアプリで用いられる最も定番のデータベースクエリの中に、データセットが巨大化したときのデフォルトのパフォーマンスがかなり見劣りするものがあることがわかってきました。

本記事では、パフォーマンスを損なう3つの主要な犯人について解説します。しかし最初に、データベースクエリが正常にスケールしているかどうかを調べる方法について説明しましょう。

パフォーマンスの測定
データセットが十分小さければ、どんなデータベースクエリでも十分パフォーマンスを発揮できます。したがって、本当のパフォーマンスを実感するには本番のサイズでデータベースのベンチマークを取る必要があります。ここでは22,000レコードを持つfaultsというテーブルを用いることにします。

データベースはPostgreSQLです。PostgreSQLでパフォーマンスを測定するには次のようにexplainを使います。

# explain (analyze) select * from faults where id = 1;
                                     QUERY PLAN
--------------------------------------------------------------------------------------------------
 Index Scan using faults_pkey on faults  (cost=0.29..8.30 rows=1 width=1855) (actual time=0.556..0.556 rows=0 loops=1)
   Index Cond: (id = 1)
 Total runtime: 0.626 ms
クエリ実行の見積もりコスト(cost=0.29..8.30 rows=1 width=1855)と、実際の実行にかかった時間(actual time=0.556..0.556 rows=0 loops=1)の両方が表示されます。

もう少し読みやすくしたいのであれば、次のようにYAML形式で出力することもできます。

# explain (analyze, format yaml) select * from faults where id = 1;
              QUERY PLAN
--------------------------------------
 - Plan:                             +
     Node Type: "Index Scan"         +
     Scan Direction: "Forward"       +
     Index Name: "faults_pkey"       +
     Relation Name: "faults"         +
     Alias: "faults"                 +
     Startup Cost: 0.29              +
     Total Cost: 8.30                +
     Plan Rows: 1                    +
     Plan Width: 1855                +
     Actual Startup Time: 0.008      +
     Actual Total Time: 0.008        +
     Actual Rows: 0                  +
     Actual Loops: 1                 +
     Index Cond: "(id = 1)"          +
     Rows Removed by Index Recheck: 0+
   Triggers:                         +
   Total Runtime: 0.036
(1 row)
本記事では、「Plain Rows」と「Actual Rows」の2つだけに注目することにします。

Plan Rows: クエリに応答するときに、最悪DBがループを何行回すかという予測を示します
Actual Rows: クエリの実行時にDBが実際にループを何行回したかを示します
上のように「Plain Rows」が1の場合、このクエリは正常にスケールすると見込まれます。「Plain Rows」がデータベースの行数と等しい場合、クエリが「フルテーブルスキャン」を行っていることが示されます。この場合クエリはうまくスケールできないでしょう。

クエリパフォーマンスの測定方法の説明が終わりましたので、Railsのいくつかの定番コードでどんな問題が起きているかを見てみましょう。

犯人1: count
以下のコードはRailsビューで非常によく見かけます。

Total Faults <%= Fault.count %>
このコードから生成されるSQLは次のような感じになります。

select count(*) from faults;
explainで調べてみましょう。

# explain (analyze, format yaml) select count(*) from faults;
              QUERY PLAN
--------------------------------------
 - Plan:                             +
     Node Type: "Aggregate"          +
     Strategy: "Plain"               +
     Startup Cost: 1840.31           +
     Total Cost: 1840.32             +
     Plan Rows: 1                    +
     Plan Width: 0                   +
     Actual Startup Time: 24.477     +
     Actual Total Time: 24.477       +
     Actual Rows: 1                  +
     Actual Loops: 1                 +
     Plans:                          +
       - Node Type: "Seq Scan"       +
         Parent Relationship: "Outer"+
         Relation Name: "faults"     +
         Alias: "faults"             +
         Startup Cost: 0.00          +
         Total Cost: 1784.65         +
         Plan Rows: 22265            +
         Plan Width: 0               +
         Actual Startup Time: 0.311  +
         Actual Total Time: 22.839   +
         Actual Rows: 22265          +
         Actual Loops: 1             +
   Triggers:                         +
   Total Runtime: 24.555
(1 row)
これは…シンプルなcountクエリが22,265回もループしているではありませんか。これはテーブルの全行数です。PostgreSQLでは、countは常に全レコードセットをループします。

このレコードセットのサイズを減らすには、クエリにwhere条件を追加します。要件によっては、パフォーマンスが十分受け入れられる程度にサイズを減らすことができるでしょう。

この問題を回避する他の方法として、唯一、count値をキャッシュする方法があります。Railsにはそのための仕組みがあるので、以下のように設定できます。

belongs_to :project, :counter_cache => true
クエリが何らかのレコードを返すかどうかのチェックにも別の方法があります。Users.count > 0をやめて、代わりにUsers.exists?をお試しください。こちらの方がずっとパフォーマンスは上です（情報提供いただいたGerry Shawに感謝いたします）。

訳注: より高度なcounter_culture gemを使う方法もあります。



犯人2: ソート
indexページは、ほぼどんなアプリにも1つや2つあるでしょう。indexページでは、データベースから最新の20レコードを取り出して表示します。これをどうやってもっとシンプルにできるのでしょうか？

レコード読み出し部分はおおよそ以下のような感じになっていると思います。

@faults = Fault.order(created_at: :desc)
このときのSQLは次のような感じになります。

select * from faults order by created_at desc;
分析してみましょう。

# explain (analyze, format yaml) select * from faults order by created_at desc;
              QUERY PLAN
--------------------------------------
 - Plan:                             +
     Node Type: "Sort"               +
     Startup Cost: 39162.46          +
     Total Cost: 39218.12            +
     Plan Rows: 22265                +
     Plan Width: 1855                +
     Actual Startup Time: 75.928     +
     Actual Total Time: 86.460       +
     Actual Rows: 22265              +
     Actual Loops: 1                 +
     Sort Key:                       +
       - "created_at"                +
     Sort Method: "external merge"   +
     Sort Space Used: 10752          +
     Sort Space Type: "Disk"         +
     Plans:                          +
       - Node Type: "Seq Scan"       +
         Parent Relationship: "Outer"+
         Relation Name: "faults"     +
         Alias: "faults"             +
         Startup Cost: 0.00          +
         Total Cost: 1784.65         +
         Plan Rows: 22265            +
         Plan Width: 1855            +
         Actual Startup Time: 0.004  +
         Actual Total Time: 4.653    +
         Actual Rows: 22265          +
         Actual Loops: 1             +
   Triggers:                         +
   Total Runtime: 102.288
(1 row)
このクエリを実行するたびに、データベースが22,265行をソートしていることがわかります。これはあかんやつです。

SQLはデフォルトで、ORDER BY句のたびにレコードセットをその場でソートします。これにはキャッシュも効きませんし、うまいマジックもありません。

解決法は、インデックスを用いることです。この例のようにシンプルであれば、created_atカラムにソート済みインデックスを追加するだけでクエリはかなり高速になります。

Railsのマイグレーションに以下を追加します。

class AddIndexToFaultCreatedAt < ActiveRecord::Migration
  def change
    add_index(:faults, :created_at)
  end
end
このマイグレーションで、以下のSQLが実行されます。

CREATE INDEX index_faults_on_created_at ON faults USING btree (created_at);
末尾の(created_at)はソート順を指定しています。デフォルトは昇順です。

これでソートのクエリを再度実行してみると、ソートが行われなくなることがわかります。インデックスからソート済みのデータを読み出すだけで済むようになりました。

# explain (analyze, format yaml) select * from faults order by created_at desc;
                  QUERY PLAN
----------------------------------------------
 - Plan:                                     +
     Node Type: "Index Scan"                 +
     Scan Direction: "Backward"              +
     Index Name: "index_faults_on_created_at"+
     Relation Name: "faults"                 +
     Alias: "faults"                         +
     Startup Cost: 0.29                      +
     Total Cost: 5288.04                     +
     Plan Rows: 22265                        +
     Plan Width: 1855                        +
     Actual Startup Time: 0.023              +
     Actual Total Time: 8.778                +
     Actual Rows: 22265                      +
     Actual Loops: 1                         +
   Triggers:                                 +
   Total Runtime: 10.080
(1 row)
複数のカラムでソートする場合は、複数カラムでソートしたインデックスを作成する必要があります。Railsマイグレーションでは以下のような感じで記述します。
add_index(:faults, [:priority, :created_at], order: {priority: :asc, created_at: :desc)
より複雑なクエリに対処する場合は、explainで確認するとよいでしょう。なるべく早いうちに頻繁に行うのがポイントです。クエリによっては、わずかな変更をかけただけで、PostgreSQLでソートのインデックスが効かなくなることに気づくかもしれません。

犯人3: limitとoffset
データベースの全項目をindexページに表示することはめったにありません。普通はページネーションを使って、一度に10件から30件、50件程度を表示します。このときに最もよく使われるのがlimitとoffsetの組み合わせです。Railsでは次のような感じになります。

Fault.limit(10).offset(100)
このときのSQLは次のような感じになります。

select * from faults limit 10 offset 100;
ここでexplainを実行してみると奇妙なことに気づきます。スキャンされた行数は110件で、ちょうどlimitとoffsetを足したのと同じです。

# explain (analyze, format yaml) select * from faults limit 10 offset 100;
              QUERY PLAN
--------------------------------------
 - Plan:                             +
     Node Type: "Limit"              +
     ...
     Plans:                          +
       - Node Type: "Seq Scan"       +
         Actual Rows: 110            +
         ...
ここでoffsetを10,000に増やしてみると、スキャンされた行数も一気に10010件に増加し、クエリの実行時間も64倍に増えます。

# explain (analyze, format yaml) select * from faults limit 10 offset 10000;
              QUERY PLAN
--------------------------------------
 - Plan:                             +
     Node Type: "Limit"              +
     ...
     Plans:                          +
       - Node Type: "Seq Scan"       +
         Actual Rows: 10010          +
         ...
ここから残念な結論が得られます。ページネーションでは後のページになるほど速度が低下します。上の例では1ページあたり100件を表示するので、100ページ目になると1ページ目より13倍も時間がかかってしまいます。

どうしたらよいでしょうか？

正直に申し上げると、これについて完全な解決法をまだ見つけられていません。私なら、ページ数が100ページや1000ページにならないよう、まずはデータセットのサイズを減らせないか検討するかもしれません。

レコードセットのサイズを減らすのが無理であれば、offsetとlimitをwhereに置き換える方法が一番有望でしょう。

# データの範囲を指定
Fault.where("created_at > ? and created_at < ?", 100.days.ago, 101.days.ago)

# またはidの範囲を指定
Fault.where("id > ? and id < ?", 100, 200)

https://techracho.bpsinc.jp/hachi8833/2018_01_11/50793