## factory-bot(FactoryBot)

FactoryBot(FactoryGirl)チートシート
Rails
FactoryGirl
FactoryBot
この記事は最終更新日から1年以上が経過しています。
(2019/11/24) 大人の事情で(だいぶ前に)FactoryGirlがFactoryBotに改名されたので、本記事も更新しました。
単純置換しただけで内容は依然書いた当時のままなので、最新版とは乖離があるかもですご注意ください

Railsのテスト環境として人気のあるFactoryBot/RSpecの組み合わせを学習中です。同時に学ばれている方も多いかと思うのですが、混乱しそうなのでFactoryBotだけ先に調べてみました。

概要
FactoryBot = データ(モデルインスタンス)生成のためのライブラリ

オープンソース / MITライセンス
柔軟に記述できるため、Rails標準のfixturesの代替として人気
主にテストデータの生成に利用する
導入
Railsの場合はgem factory_bot_rails をインストールする。

Gemfile
group :development, :test do
  gem 'factory_bot_rails'
end
$ bundle install
単体あるいはRails以外の場合はgem factory_botをインストールして使う

$ gem install factory_bot
設定
テストにおいてデータを使うにあたって、各テストケースクラスにファクトリ操作用のメソッドをincludeしておく。
minitestの場合は以下:

test/test_helper.rb
class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods
end
RSpecの場合:

spec/rails_helper.rb
# spec/support/ など、RSpec.cinfigureが呼べるファイルなら他でもいい
RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
FactoryBotの挙動はapplication.rbで設定できる

config/application.rb
config.generators do |g|

  # Railsジェネレータがfactory_bot用のファイルを生成するのを無効化
  g.factory_bot false

  # ファクトリファイルの置き場を変更
  g.factory_bot dir: 'custom/dir/for/factories'
end
基本
ファイルを配置する
factory_bot_railsのインストール後にrails g(enerate)でモデルを生成すると、fixturesの変わりにファクトリファイルが作られる。

$ rails g model user name:string admin:boolean
...
#>       invoke      factory_bot
#>       create        test/factories/users.rb
...
あるいは直接配置する:

Rails標準(minitest)の場合はtest/factories/以下に配置
RSpecを使っている場合はspec/factories/以下に配置
データを作成する
factory()を使ってファクトリ(テストデータの型)を定義する。

test/factories/users.rb
FactoryBot.define do

  # Userモデルのテストデータaliceを定義
  factory :alice, class: User do
    name 'Alice'
    admin true
  end

  factory :bob, class: User do
    name 'Bob'
    admin false
  end

  # ...

end
データを生成する
ファクトリとして定義したデータは、復数の方法のいずれかによって生成(インスタンス化)することで、テストデータとして利用できる。

test
alice = build(:alice)
#=> #<User id: nil, name: "Alice", admin: true, created_at: nil, updated_at: nil>
ファクトリの生成
DBへの保存状態を変えて生成する(build/build_stubbed/create/attributes_for)
生成するメソッドによって、DBへの保存状態や取得対象を変えることができる。

メソッド	戻り値	DB保存	DB保存(アソシエーション)	ID
build()	モデルインスタンス	x	o	nil
build_stubbed()	モデルインスタンス	x	x	適当な値
create()	モデルインスタンス	o	o	DB保存された値
attributes_for()	パラメータハッシュ	x	x	なし
test
# DB保存しない状態で生成(アソシエーションは保存する)
alice = build(:alice)
#=> #<User id: nil, name: "Alice", admin: true, created_at: nil, updated_at: nil>

# DB保存しない状態で生成(アソシエーションも保存しない, IDには適当な値が入る)
alice = build_stubbed(:alice)
#=> #<User id: 1001, name: "Alice", admin: true, created_at: nil, updated_at: nil>

# DB保存された状態で生成
alice = create(:alice)
#=> #<User id: 1, name: "Alice", admin: true, created_at: "2017-06-06 17:42:09", updated_at: "2017-06-06 17:42:09">

# 属性のハッシュを生成
alice = attributes_for(:alice)
#=> {:name=>"Alice", :admin=>true}
動的に生成する
ファクトリの生成時に属性値を決定することができる。

test
alice = build_stubbed(:alice, name: 'Alpha')
p alice
#=> #<User id: 1001, name: "Alpha", admin: true, created_at: nil, updated_at: nil>
同じデータを復数件生成する(*_list)
生成系のメソッドのそれぞれに対応する*_list()メソッドで、同じデータを複数件生成できる。
build_list(), build_stubbed_list(), create_list(), attributes_for_list()

test
alices = build_list(:alice, 3)
p alices

#=> [
#   #<User id: nil, name: "Alice", admin: true, created_at: nil, updated_at: nil>,
#   #<User id: nil, name: "Alice", admin: true, created_at: nil, updated_at: nil>,
#   #<User id: nil, name: "Alice", admin: true, created_at: nil, updated_at: nil>
#   ]
連番を持ったデータを生成する(sequence)
sequence-generateを使って、生成するたびに特定の属性をインクリメントできる。

factory
sequence :golgo_title do |i|
  "ゴルゴ13 #{i}"
end

factory :golgo, class: Book do
  title { generate :golgo_title }
  author
end
test
p build(:golgo)
p build(:golgo)
p build(:golgo)

#=> #<Book id: nil, title: "ゴルゴ13 1", author_id: 1, created_at: nil, updated_at: nil>
#=> #<Book id: nil, title: "ゴルゴ13 2", author_id: 2, created_at: nil, updated_at: nil>
#=> #<Book id: nil, title: "ゴルゴ13 3", author_id: 3, created_at: nil, updated_at: nil>
ファクトリの定義
遅延評価により定義する({})
ブロック({})で囲んだ値をフィールドに渡すと、その内容は生成時に評価される。
現在時刻など、生成のタイミングで値を得たい場合に使える。

また、遅延評価ブロック内の文字列は属性(とtransient)の値を式展開できる。

factory
factory :alice, class: User do
  name 'Alice'
  account { "#{name}".downcase }
end
アソシエーションを定義する(association)
アソシエーションが設定されたフィールドに対しては、associationを使って定義する。

factory
factory :gamma, class: User do
  name  : 'Erich Gamma',
end

factory :gof, class: Book do
  title 'Design Patterns:Elements of Reusable Object-Oriented Software'

  association :author,
    factory: :gamma,    # アソシエーション先のファクトリを明示
    strategy: :build,   # アソシエーションの生成方法を指定(任意)
    admin: true         # アソシエーション先の属性をオーバーライドできる(任意)

end
test
gof = build_stubbed(:gof)
p gof.author
#=> #<User id: 1001, name: "Eric Gamma", admin: false, created_at: nil, updated_at: nil>
エイリアスを定義する(aliases)
ファクトリに別名をつけることができる。
アソシエーションと同じ別名を付けることで、記述を省略できる。

factory
factory :gamma, class: User, aliases: [:author] do
  name  : 'Erich Gamma',
end

factory :gof, class: Book do
  title 'Design Patterns:Elements of Reusable Object-Oriented Software'

  # ↓と同義になる
  #association :author, factory: :gamma
  author

end
予約語を回避する(add_attribute)
属性名が予約語やFactoryBotのメソッド名とかぶる場合は、add_attribute()による記述で回避する。

factory
factory :user do
  add_attribute(:do){ 'do value' }
end
属性以外のパラメータを持たせる(transient)
transientによって、モデルの属性以外のデータをファクトリに含めることができる。

生成した後に参照することはできない。
生成時にパラメータとして渡し、組み立ててファクトリの動的な生成に使える。

factory
factory :user do
transient do
  name_is ''
  be_admin false
end

name { "#{name_is}" }
admin { "#{be_admin}" }
end
test
user = build(:user, name_is: 'bob', be_admin: true)
p user.name
p user.admin
#=> "bob"
#=> true
継承する
ファクトリをネスト定義することで、親の内容を継承できる。

factory
factory :user do
  name '-'
  admin false

  factory :alice do
      name 'Alice'
      admin true
  end
  factory :bob do
      name 'Bob'
  end
end
ネストせずに分離して記述することもできる。

factory
# 以下も同義
factory :alice, parent: :user do
  name 'Alice'
  admin true
end
test
p build(:alice)
p build(:bob)
p build(:user)

#=> #<User id: nil, name: "Alice", admin: true, created_at: nil, updated_at: nil>
#=> #<User id: nil, name: "Bob", admin: false, created_at: nil, updated_at: nil>
#=> #<User id: nil, name: "-", admin: false, created_at: nil, updated_at: nil>
継承せずに改変する(modify)
ファクトリを継承せずに(= 名前を変えずに)内容を変えることもできる。

factory
FactoryBot.define do
  factory :alice do
    name 'Alice'
    admin true
  end
end

FactoryBot.modify do
  factory :alice do
    name 'Alex'
  end
end
test
alice = build(:alice)
p alice
#=> #<User id: nil, name: "Alex", admin: true, created_at: nil, updated_at: nil>
外部から提供されたファクトリを、呼び出す側を改変せずに内容を差し替えたい場合などに便利とのこと。

属性グループの組み合わせで定義する(trait)
属性のグループ(trait)を定義し、それの組み合わせによってファクトリを構築できる。

factory
factory :message do

  trait :color_light do
    font 'black'
    back 'white'
  end

  trait :color_dark do
    font 'white'
    back 'black'
  end

  trait :message_success do
    title 'success'
    body '...'
  end

  trait :message_error do
    title 'error'
    body '...'
  end

  # traitで未指定の属性は、親:messageを継承する
  factory :light_success, traits: [:color_light, :message_success]
  factory :light_error, traits: [:color_light, :message_error]

  # このようにも書ける
  factory :dark_success do
    color_dark
    message_success
  end

  factory :dark_error do
    color_dark
    message_error
  end

end
その他
コールバックを受ける
ファクトリの挙動に対するコールバックを取得できる。

コールバック	タイミング	対象となる生成方法
after(:build)	ファクトリがビルドされた後	build(), create()
before(:create)	ファクトリがDBに保存される前	create()
after(:create)	ファクトリがDBに保存される前	create()
after(:stub)	スタブとして生成された後	build_stubbed()
factory
factory :alice, class: User do
  name 'Alice'
  admin true

  after(:build) do  |alice|
    # ...
  end

  # 同じタイミングのコールバックを復数定義できる(上書きされない)
  after(:build) do  |alice|
    # ...
  end
end
データの生成をテストする(lint)
lint()によって、生成中にエラーが発生するファクトリがないかチェックする。

test
# test_helper.rbに設定したincludeとは名前空間が違うので、プリフィクスの指定が必要な点に注意
FactoryBot.lint

# エラーがあった場合は実行時に例外が投げられる
#=> FactoryBot::InvalidFactoryError: The following factories are invalid:
#=> ...

---

https://qiita.com/morrr/items/f1d3ac46b029ccddd017
