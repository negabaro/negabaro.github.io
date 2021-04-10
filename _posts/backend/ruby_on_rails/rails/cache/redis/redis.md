
## redis

Rails에서 redis캐쉬 사용하는 방법

Rails.cache.fetchを使ってクエリ結果をストアへ保存
Redisへの保存はRails.cache.fetchを使うことで簡単に書くことができます。このメソッドは引数で指定したキーに対応するキャッシュがあったらキャッシュを返す/無かったら生成して返すという動きをします。

コントローラを以下のように修正します。

# ./app/controllers/articles_controller.rb

  # 追加したメソッドからarticlesを取得するように変更
  def index
    # @articles = Article.all
    @articles = cache_articles
  end


  private
    # Rails.cache.fetchを使いキャッシュからArticle.allを取得する
    # cache_articlesというキーで保存。cache_articlesはキャッシュの有効期間
    def cache_articles
      Rails.cache.fetch("cache_articles", expires_in: 60.minutes) do
        Article.all
      end
    end
キャッシュに保存されるデータについて
ブラウザで http://localhost:3000/articles に複数回アクセスしてログを確認します。

# 1回目のページアクセス
Started GET "/articles" for 127.0.0.1 at 2018-11-10 17:04:28 +0900
Processing by ArticlesController#index as HTML
  Rendering articles/index.html.erb within layouts/application
  Article Load (0.3ms)  SELECT "articles".* FROM "articles"
  ↳ app/views/articles/index.html.erb:15
  Rendered articles/index.html.erb within layouts/application (10.6ms)
Completed 200 OK in 206ms (Views: 194.5ms | ActiveRecord: 0.9ms)

# 2回目のページアクセス
Started GET "/articles" for 127.0.0.1 at 2018-11-10 17:04:33 +0900
Processing by ArticlesController#index as HTML
  Rendering articles/index.html.erb within layouts/application
  Article Load (0.2ms)  SELECT "articles".* FROM "articles"
  ↳ app/views/articles/index.html.erb:15
  Rendered articles/index.html.erb within layouts/application (2.2ms)
Completed 200 OK in 25ms (Views: 20.6ms | ActiveRecord: 0.2ms)
2回目以降のページアクセスでは、DBアクセスが発生してほしくないところですが, Article Load (0.2ms) SELECT "articles".* FROM "articles" のようにDBアクセスが発生してしいます。

キャッシュ保存時の注意点
キャッシュを保存する際は、クエリが発行されるタイミングに注意する必要があります。

上の例で cache_articles メソッドを実行後に保存された結果を確認するとクエリの実行した結果ではなく、実行前のクエリの情報がActiveRecord_Relationとして保存されます。実際にクエリが実行されるのは、例えばviewのループ処理の中であったりするため、キャッシュしても毎回クエリが実行されることになります。

以下のようにto_aを追加するなどクエリ実行後の結果を保存することで回避できます。

# ./app/controllers/articles_controller.rb

  private
    def cache_articles
      Rails.cache.fetch("cache_articles", expires_in: 60.minutes) do
        # Article.all
        Article.all.to_a
      end
    end
修正後の確認を行う前にredis-cliからキャッシュを削除しておきます。
（redis-cliがインストールされてない場合は、 Rails.cache.delete('cache_articles') のコードを実行することでも削除できます）

$ redis-cli
127.0.0.1:6379> 
127.0.0.1:6379> DEL cache:cache_articles
修正後にもう一度ログを確認すると２回目移行はクエリが実行されていないことがわかります。

# 修正後のログ
# 1回目のページアクセス 
Started GET "/articles" for 127.0.0.1 at 2018-11-10 17:40:19 +0900
Processing by ArticlesController#index as HTML
  Article Load (0.4ms)  SELECT "articles".* FROM "articles"
  ↳ app/controllers/articles_controller.rb:78
  Rendering articles/index.html.erb within layouts/application
  Rendered articles/index.html.erb within layouts/application (1.7ms)
Completed 200 OK in 41ms (Views: 26.9ms | ActiveRecord: 1.0ms)

# 2回目のページアクセス
Started GET "/articles" for 127.0.0.1 at 2018-11-10 17:40:24 +0900
Processing by ArticlesController#index as HTML
  Rendering articles/index.html.erb within layouts/application
  Rendered articles/index.html.erb within layouts/application (1.5ms)
Completed 200 OK in 24ms (Views: 20.1ms | ActiveRecord: 0.0ms)
まとめ
Rails.cache.fetch を使ってRailsアプリケーションでクエリの結果をキャッシュする方法を紹介しました。

キャッシュを使ってDBアクセスを減らす方法は、動的だが更新頻度が少ないページや決まったクエリを発行することが多いページでは有用な方法だと思います。

私が開発しているWebサービスではサイトのトップページに人気の商品やおすすめ商品などいくつかの商品のリストをDBから取得して表示しますが、アクセスの度に内容が変更されるようなものではないためキャッシュに持たせるようにすることで表示速度が改善されました。

サイトの速度改善などの参考になればと思います。

[Railsでクエリ結果をキャッシュしてDB負荷を軽減する]: https://qiita.com/yamashun/items/bf9a3d29de749cf18f2e

[【Rails】キャッシュについてわかりやすくまとめてみた]: https://qiita.com/yokoto/items/52a05bca505a30d64130