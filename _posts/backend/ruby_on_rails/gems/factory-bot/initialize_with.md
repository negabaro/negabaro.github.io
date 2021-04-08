## initialize_with

はじめに
Webアプリケーションを作っていると、ユーザー入力値ではなく固定されたマスターデータをDBで扱うことがしばしばあると思います。例えば都道府県など。

prefectures.rb
# == Schema Information
#
# Table name: prefectures # 都道府県
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Prefecture < ApplicationRecord
  has_many :cities
  has_many :addresses, through: :cities
end
このモデルの FactroryGirl の設定を考えます。一般的なモデルにならうと

prefectures.rb
FactoryGirl.define do
  factory :prefecture do
    name '東京都'
  end
end
となりますが、これだとテストを実行する度に東京都がたくさん生成されます。しかも、場合によっては Prefecture のインスタンス数が47を超えます。現実的でありませんね。かといって

prefectures.rb
FactoryGirl.define do
  factory :prefecture do
    id 13
    name '東京都'
  end
end
# ActiveRecord::RecordNotUnique: Mysql2::Error: Duplicate entry '13' for key 'PRIMARY': INSERT INTO `prefectures` (`id`, `name`, `created_at`, `updated_at`) VALUES (13, '東京都', '2017-10-26 10:31:00', '2017-10-26 10:31:00')
# from /Users/***/.rbenv/versions/2.3.3/lib/ruby/gems/2.3.0/gems/mysql2-0.4.5/lib/mysql2/client.rb:120:in `_query'
としてしまうと今度はDBの一意性制約に引っかかって怒られます。

initialize_with を使う
FactoryGirl が用意している initialize_with メソッドを使用すると、何回 build や create を呼んでも特定のインスタンス (テスト用DBの同一のレコード) を返す Factory が定義できます。

prefectures.rb
FactoryGirl.define do
  factory :prefecture do
    id 13
    name '東京都'

    initialize_with do
      Prefecture.find_or_initialize_by(
        id: 13,
        name: '東京都')
    end
  end
end
find_or_initialize_by を使っているので、これはデータベースが真っさらな状態でも期待通り動きます。

しかも、 association でつながっている他のFactoryを create や build した時、SQLの CREATE ではなく SELECT が走るので、SQLの実行時間ひいてはテストの実行時間を削減できることが期待できます。

[7] pry(main)> FactoryGirl.create(:city)
  Prefecture Load (0.4ms)  SELECT  `prefectures`.* FROM `prefectures` WHERE `prefectures`.`id` = 13 AND `prefectures`.`region_id` = 3 AND `prefectures`.`name` = '東京都' LIMIT 1
  SQL (27.7ms)  INSERT INTO `cities` (`prefecture_id`, `name`, `created_at`, `updated_at`) VALUES (13, '新宿区', '2017-10-26 10:43:52', '2017-10-26 10:43:52')
   (2.8ms)  COMMIT
prefectures テーブルに対する CREATE 文が走っていないことが分かります。

注意点
ただし、これを使うと本当に他の値を使いたくてもできなくなるという欠点があります。データ作成時に CREATE ではなく UPDATE が走るためです。

[5] pry(main)> FactoryGirl.create(:prefecture, id: 14, name: '神奈川県')
  SQL (5.1ms)  UPDATE `prefectures` SET `id` = 14, `name` = '神奈川県', `updated_at` = '2017-10-26 10:39:14' WHERE `prefectures`.`id` = 13
ActiveRecord::StatementInvalid: Mysql2::Error: Cannot delete or update a parent row: a foreign key constraint fails (`***_development`.`cities`, CONSTRAINT `fk_rails_cc74ecd368` FOREIGN KEY (`prefecture_id`) REFERENCES `prefectures` (`id`)): UPDATE `prefectures` SET `id` = 14, `name` = '神奈川県', `updated_at` = '2017-10-26 10:39:14' WHERE `prefectures`.`id` = 13
外部キー制約に引っかかっています。

対策
この場合は Factory を使わず ActiveModel.create を使います。

[11] pry(main)> Prefecture.create(name: '神奈川県')
   (0.2ms)  BEGIN
  SQL (9.0ms)  INSERT INTO `prefectures` (`name`, `created_at`, `updated_at`) VALUES ('神奈川県', '2017-10-26 10:46:44', '2017-10-26 10:46:44')
   (6.7ms)  COMMIT
これは新規Factoryつまりダミーデータが非常に作りにくくなる事実を示しています。カラムが多いレコードに対してここで紹介した方法を使うのは得策でないでしょう。

まとめ
initialize_with と find_or_initialize_by を使うと、固定されたデータから参照する形式のFactoryが定義できる。
しかし新規ダミーデータを作成するのは大変になる。
使いどころが肝心

https://qiita.com/port-development/items/a1c551f8e761204e5b2c