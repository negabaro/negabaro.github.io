N+1と戦うツール2点
リポジトリ: k0kubun/activerecord-precounter: Yet Another N+1 COUNT Query Killer for ActiveRecord


リポジトリ: flyerhzm/eager_group: fix n+1 aggregate sql functions for rails
つっつきボイス:「この間公開した翻訳記事↓でこの2つのgemが紹介されていたので」



「activerecord-precounterはk0kubunさんのgemか」「これもk0kubunさんのactiverecord-precountより設計のきれいな、counter cacheのオルタナティブ」「わかる: Active Recordにパッチを当てるgemって結構コワイし👺」

# 同リポジトリより
tweets = Tweet.all
ActiveRecord::Precounter.new(tweets).precount(:favorites)
tweets.each do |tweet|
  p tweet.favorites_count
end
# SELECT `tweets`.* FROM `tweets`
# SELECT COUNT(`favorites`.`tweet_id`), `favorites`.`tweet_id` FROM `favorites` WHERE `favorites`.`tweet_id` IN (1, 2, 3, 4, 5) GROUP BY `favorites`.`tweet_id`
「もうひとつのeager_group gemは集計関数を扱うヤツみたいです」

-- 同リポジトリより
SELECT "posts".* FROM "posts";
SELECT COUNT(*) FROM "comments" WHERE "comments"."post_id" = 1 AND "comments"."status" = 'approved'
SELECT COUNT(*) FROM "comments" WHERE "comments"."post_id" = 2 AND "comments"."status" = 'approved'
SELECT COUNT(*) FROM "comments" WHERE "comments"."post_id" = 3 AND "comments"."status" = 'approved'

-- ↓ 
SELECT "posts".* FROM "posts";
SELECT COUNT(*) AS count_all, post_id AS post_id FROM "comments" WHERE "comments"."post_id" IN (1, 2, 3) AND "comments"."status" = 'approved' GROUP BY post_id;
「なるほど、1つのSQLに集約してくれるのか」「きれいに動いてくれてればいいけど、scopedとかでおかしなことになったりしないかな😅」

# 同リポジトリより
class Post < ActiveRecord::Base
  has_many :comments

  define_eager_group :comments_average_rating, :comments, :average, :rating
  define_eager_group :approved_comments_count, :comments, :count, :*, -> { approved }
end

class Comment < ActiveRecord::Base
  belongs_to :post

  scope :approved, -> { where(status: 'approved') }
end
「こういうふうに↑define_eager_groupと書かなければ勝手に動き出さないということらしい↓: 自分はこういうときに生SQL書くことが多いけど、同じようなコードが何度も出てくるような状況ならこういうのを使ってもいいかな😋」「なるほど」「生SQLも似たようなものをいくつも書くことになるの多いですし😆」「たしかに😆」「使うならscopedでは避けたい気がしますね: joinしてscopedなものにこのgemをかけると変なことになったりして😆」

「このgemの作者としては、こうやってオブジェクトの属性の1個になるように書けるのがいいということなんでしょうね☺️」「たしかにシンプルですね😋」「ハッシュが登場してハッシュをループで回したりするのは気持ちよくないでしょうし」「それにQuery Objectにするにしても何個も似たようなQuery Objectができるのはあんまりうれしくないし」「こう書きたい気持ちはワカル」

