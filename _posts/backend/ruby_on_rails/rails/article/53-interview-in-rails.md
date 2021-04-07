## Rails Interview

Rails開発者が採用面接で聞かれる想定Q&A 53問（翻訳）

Ruby / Rails関連
 2020.05.13
Rails開発者が採用面接で聞かれる想定Q&A 53問（翻訳）
 hachi8833
 シェア
 
 ツイート
 
 ブックマーク
 
 LINE
概要
原著者の許諾を得て翻訳・公開いたします。

英語記事: 53 Ruby on Rails Interview Questions and Answers - Better Programming - Medium
原文公開日: 2020/04/03
著者: Chris — データサイエンティスト、フルスタックエンジニア、起業家。トロント在住。
日本語タイトルは内容に即したものにしました。

Rails開発者が採用面接で聞かれる想定Q&A 53問（翻訳）
私はこれまで100人を超えるRuby on Rails開発者と面接を重ね、私自身も職階に関する面談をいくつも受けました。本記事は、これまで私が受けたり尋ねたりした質疑応答をまとめたものです。

2020年現在、どれほど多くの大企業がRailsを利用していることを知ったら皆さんは驚くかも知れません。Shopify、Airbnb、GitHub、Dribble、Etsy、Kickstarter、Zendesk、Twitch、500px、InstacartもRailsを採用している大企業です。

本記事が、これから面接を受ける開発者や、開発者候補の面接を担当する面接官のお役に立てば幸いです。

それでは質疑応答集を順不同でご紹介しましょう。

⚓Q1: ブログアプリで記事のリストを取得するときのリクエスト/レスポンスサイクルをひととおり説明してください
ユーザーがボタンをクリックすると、/articlesというURLへのGETリクエストが発生します。Webサーバーがこのリクエストを受け取ります。続いてRailsは、routes.rbで割り当てられているURL/コントローラに基づいて、リクエストに対応するコントローラアクション#indexを実行します。

コントローラはArticle.allを呼び出して、Articleモデル経由でデータベースから記事のコレクションを読み込みます。このコレクションは、あるインスタンス変数に代入されます。

ビューは、記事のリストを表示するためにそのインスタンス変数の値を展開し、リクエストを送信したユーザーに向けてレンダリングします。

⚓Q2:「Rubyでは（ほぼ）あらゆるものがオブジェクトである」について説明してください
オブジェクト指向言語におけるオブジェクトとは、クラスのインスタンスのことです。Rubyの場合、たとえば以下のように、あらゆるクラスがClassクラスのインスタンスになっています。

7.class #=> Fixnum
7.class.class #=> Class
ただし、中にはオブジェクトではないものもあります。ブロック、メソッド、（ifやelseなどの）条件文などはオブジェクトではありません。

これは、Rubyにおいてほとんどのものが同じように振る舞い、それによって他の言語よりも扱いやすくなっていることをあなたが理解しているかどうかを尋ねる質問です。

⚓Q3: Rubyの型は静的ですか？動的ですか？
Rubyは動的型付けです。したがって、変数の型をいつでも変更できます。

Rubyでは、以下のようなコードを繰り返し実行してもエラーにはなりません。

x = 1
x = "foo"
⚓Q4: Rubyのゲッターとセッターについて説明してください
Rubyではゲッター（getter）を用いてインスタンス変数にアクセスでき、セッター（setter）を用いてインスタンス変数に値を設定できます。

ゲッターメソッドやセッターメソッドは、以下のように手動で定義することもできます。

class Car
  def color
    @color
  end
  def color=(color)
    @color = color
  end
end
c = Car.new
c.color = 'red'
puts c.color # => red
view rawCar.rb hosted with ❤ by GitHub
Rubyでは、よりクリーンな方法でゲッターやセッターを定義できる以下の3種類のアクセサメソッドが提供されています。

attr_reader（ゲッター）
attr_writer（セッター）
attr_accessor（ゲッターとセッター）
class Car
  attr_accessor :color
end
c = Car.new
c.color = 'blue'
puts c.color #=> blue
view rawCar.rb hosted with ❤ by GitHub
⚓Q5: Rubyであるメソッドを呼び出したときの動作を説明してください
メソッド名を含む1件のメッセージがそのオブジェクトに送信されます。オブジェクトにそのメソッドが存在する場合は、オブジェクトがそのメソッドを呼び出します。

以下のようにRubyのsendメソッドの動作を考えると、この点がよりよく見えてきます。

obj.hello  #=> 'hello'
obj.send(:hello) #=> 'hello'
⚓Q6: あるRailsアプリ内のルーティングをすべて表示してください
$ rake routes
上の後に| grep <keyword>を追加して、表示されたルーティングをフィルタすることもできます。

⚓Q7: Gemfileについて説明してください
Gemfileは、ひとつのRubyアプリケーションで利用される依存関係を指定します。これはプロジェクトのルートディレクトリに置かれます。

⚓Q8: Gemfile.lockについて説明してください
Gemfile.lockには、インストールされたgemの正確なバージョンが記録されています。これにより、プロジェクトを別のPCにクローンしたときに同じバージョンのgemがインストールされます。

対照的に、Gemfileで特定のバージョンを指定していないgemについては、最新バージョンのgemがインストールされます。

⚓Q9: Railsでどんなデザインパターンを使ったことがありますか？
Railsには、Service Objectパターン、Value Objectパターン、Form Objectパターン、Query Objectパターン、View Objectパターン、Policy Objectパターン、Decoratorパターンといった多くのデザインパターンがあります。

各デザインパターンとコード例については、以下のチュートリアル記事に詳しく載っています。

参考: 7 Design Patterns to Refactor MVC Components in Rails — SitePoint

⚓Q10: Railsではデータベースのステートをどのように管理するか説明してください
開発者は手動でマイグレーションファイルを生成し、そこに指示を追加します。

これらのマイグレーションファイルは、Active Recordに対して既存のデータベースのステートの「変更方法」を指示します。そのために、過去のマイグレーションファイルを削除または変更するとデータベースのステートに悪影響を及ぼす可能性があり、おすすめできません。

対照的に、Djangoなどの他のフレームワークではマイグレーションファイルを作成する場合は、データベースの「最終的なステート」を指示し、それを元に必要な変更を行うためのマイグレーションファイルが自動生成されます。

⚓Q11: countとlengthとsizeの違いを説明してください
count
レコードの件数をカウントするSQLクエリを実行します。これはDBとメモリでレコード数が違う可能性がある場合に有用です。
length
メモリ上のコレクションに含まれるアイテムの件数を返します。データベーストランザクションを実行しない分、countより高速です。lengthは文字列の文字数をカウントするときにも使われます。
size
これはlengthのエイリアスなので動作はlengthと同じです。
⚓Q12: 認可（authorization）をどのように実装しましたか？
（認証: authenticationとお間違いなきよう）

認可は、ユーザーの種類に応じて、アプリで許可するアクセスレベルを変更することに関連します。これは、アクセスレベルの異なるユーザータイプがとても多い場合に便利です。

認可実装用にはPunditやCanCanCanといったgemがあります。

⚓Q13: コールバックとは何かを説明してください
コールバック（callback）は誤解を招きがちな用語です（訳注: 英語圏では電話の「折り返し」を想像させるためと思われます）。コールバックは、オブジェクトのライフサイクルの中でメソッドを実行するフックを指します。

before_validation、after_save、after_destroyなど、オブジェクトの作成、更新、削除などに多くのコールバックが存在します。

コールバックは、たとえばUserレコードが作成されたときに、それに関連付けられているContactレコードを作成するといった条件付けのロジックを記述するのに有用です。

⚓Q14: before_saveコールバックとafter_saveコールバックの使い分けについて説明してください
あるオブジェクトがsaveされた後に更新をかける場合、更新を永続化させるために追加のデータベーストランザクションが必要になります。つまり、あるオブジェクトの「属性」を更新する場合はbefore_saveコールバックの方が効率的です。

しかし、オブジェクトを保存するまでは存在しない情報もあります（idなど）。つまり、関連付けられたレコードの作成にidが必要な場合は、after_saveコールバックを実行しなければならないでしょう。

⚓Q15: Railsの「イニシャライザ」について説明してください
イニシャライザには、アプリの起動時にのみ実行する設定ロジックを置きます。つまり、イニシャライザの内容を変更した場合はRailsサーバーの再起動が必要です。イニシャライザは/config/initializers/ディレクトリの下に置かれます。

⚓Q16: deleteとdestroyの違いを説明してください
delete
レコードを1件削除する
destroy
レコードを1件削除し、コールバックを実行する
Railsアプリのモデルファイル関連付けで最もよく使われるのはdestroyコールバックです。たとえば、以下のコードはarticleがdestroyされると関連するcommentsもdestroyされます。

class Article < < BaseController
  has_many :comments, dependent: :destroy
end
⚓Q17:「ファットモデル、薄いコントローラ」の意味を説明してください
ビジネスロジックはコントローラではなくモデルに配置すべきです。そうすることでロジックの単体テストが行いやすくなり、再利用性も向上します。

コントローラは、ビューとモデルの間で情報を受け渡しするための場でしかありません。

これはあくまで新人Rails開発者向けの一般的なアドバイスであり、特に巨大なアプリでは実際には推奨されていません。

訳注: 巨大なアプリでは、モデルやコントローラ以外のロジックの置き場所を別途定めるのが普通です。

⚓Q18:「薄いコントローラ、薄いモデル」の意味を説明してください
コードベースが成長するに連れて、ファットモデルが手に負えなくなり、モデルの責務が過剰になって管理不能に陥ってしまいます。モデルは永続化に専念し、モデル内のロジックを肥大化させないようにすべきです。

「単一責任の原則」を常に意識し、ロジックをモデルから他のデザインパターン（Service Objectなど）に追い出すことで、モデルをもっと薄くできます。

⚓Q19: クラスメソッドとインスタンスメソッドの違いを説明してください
クラスメソッドはクラス上で利用でき、インスタンスメソッドはインスタンス上で利用できます（当たり前ですが）。両者の利用目的は異なるのが普通です。

Articleというクラスで考えましょう。インスタンスメソッドは、特定の記事1件の本文に含まれるワード数をカウントするのに利用できます。クラスメソッドは、すべての記事のうち特定の著者が書いた記事の件数をカウントするのに利用できます（スコープが違うことにお気づきでしょうか？）。

クラスメソッドはdef self.メソッド名のように定義します。

class Greeting
  def self.hello_from_class
    puts 'class: hello'
  end
  def hello_from_instance
    puts 'instance: hello '
  end
end
# class method
Greeting.hello_from_class # => 'class: hello'
# instance method
g = Greeting.new
g.hello_from_instance # => instance: hello
view rawGreeting.rb hosted with ❤ by GitHub
⚓Q20: POROについて説明してください
POROは「Plain Old Ruby Object」の略です。

Rubyではほぼあらゆるものがオブジェクトですが、Active Recordでは複雑なオブジェクトが多数使われがちです。一般にPOROという用語は、ビジネスロジックをサポートするシンプルな小さいオブジェクトを強調するのに使われます。

⚓Q21: Rubyで多重継承は使えますか？
Rubyでは複数の親クラスからの多重継承は許されていません。その代わり、includeやextendによるモジュールのミックスインが利用できます。

⚓Q22: Rubyは「強い型付け」「弱い型付け」のどちらですか？
Rubyは「強い型付け」の言語です。"hello" + 3を計算するとエラーになります。

対照的にJavaScriptは「弱い型付け」言語であり、"hello" + 3の結果は"hello3"になります。

⚓Q23: バックグラウンドジョブにどんなフレームワークを使ったことがありますか？
Delayed::Job
使いやすく、セットアップも簡単です。キューは1つのデータベーステーブルに保存されます。Delayed::Jobとproductionで同じデータベースが使われている場合、ジョブが増えすぎるとデータベースがボトルネックになる可能性があります。
Sidekiq
Redisを用いてジョブをキューイングします。Radisはインメモリデータストアなので高速です。Sidekiqを使うにはRedisの追加が必要なので、インフラがその分複雑になります。
Sucker Punch
Rubyの1つのプロセスとして実行され、すべてのジョブをメモリ上に配置します。プロセスがクラッシュするとジョブが失われるので、クリティカルなタスクには不向きです。
⚓Q24: Rubyのクラスでコンストラクタを宣言する方法を説明してください
コンストラクタはinitializeメソッドで定義します。このメソッドはクラスの新しいインスタンスが初期化されたときに呼び出されます。initializeメソッドの定義は必須ではなく、新しいインスタンスに属性値を提供するときによく利用されます。

class Thing
  attr_reader :name
  def initialize(name)
    @name = name
  end
end
t = Thing.new('dog')
puts t.name # => 'dog
view rawThing.rb hosted with ❤ by GitHub
⚓Q25: ヘルパーにはどのようなロジックを置きますか？
ヘルパーのロジックは、ビューだけをサポートすべきです。

ヘルパーの候補としては、複数の異なるビューで必要になる日付フォーマットロジックがよい例です。

⚓Q26: Active Recordについて説明してください
Active Recordは、モデルとデータベースを対応付けるORM（Object-Relational Mapping）です。Active Recordを用いることで、オブジェクトの読み込みや保存や削除を直接SQLで記述する必要がなくなり、アプリのセットアップがシンプルになります。

Active Recordは、ある程度のSQLインジェクションの保護機能も提供しています。

⚓Q27: Rubyのselfはどんなときに使うかを説明してください
クラスメソッドの定義や呼び出しではselfを使う
クラス内ではselfを用いて現在のクラスを参照する、つまり、あるクラスメソッドから（訳注: 同じクラス内の）別のクラスメソッドを呼び出すときに必須となる
インスタンスからクラスメソッドを呼び出す場合はself.class.methodという呼び出し方法が必須となる
class Adder
  def self.call(*num)
    num.inject(:+)
  end
end
# class method being called by class
puts Adder.call(1,2,3) # => 6
view rawAdder.rb hosted with ❤ by GitHub
⚓Q28: Rackについて説明してください
Rackは、WebサーバーとRailsの間に位置するAPIです。Rackではプラグインを利用できるほか、フレームワークを差し替えたり（RailsをSinatraに差し替えるなど）、Webサーバーを差し替えたり（UnicornをPumaに置き換えるなど）できます。

⚓Q29: MVCについて説明してください
MVC（Model-View-Controller）はRailsを構築するソフトウェアデザインパターンです。MVCでは情報の扱いを以下の3つに分割しています。

モデルはデータとロジックを管理します。ビューは情報を表示します。コントローラは入力を受け取り、モデルやビューに渡すデータを準備します。



⚓Q30: Rubyのブロックについて説明してください
Rubyのブロックは、コードを中かっこ{ }または「doとend」で囲んだものです。eachを呼び出すときにはブロックをひとつ渡します。

ブロックには独自のスコープがあり、ブロックの外からアクセスできない独自の変数を1つまたは複数定義できます。ただしブロックの外で定義された変数はブロック内でも変更可能です。

{|x| puts x} # ブロックの例
⚓Q31: procとlambdaの違いを説明してください
procもlambdaも、ブロックを保存したものであるという点では同じですが、構文や振る舞いがわずかに異なります。

lambdaの中に書いたreturnはlambda自身から抜けますが、procの中に書いたreturnはそのprocを含むメソッドから抜けます。

def method_proc
  thing  = Proc.new { return 1}
  thing.call
  return 2
end
def method_lambda
  thing  = lambda { return 1}
  thing.call
  return 2
end
puts method_proc # => 1
puts method_lambda # => 2
view rawmethod_proc.rb hosted with ❤ by GitHub
上のmethod_procで1が返る点にご注目ください。これは、procを呼び出すとその時点でmethod_procメソッド内での実行が終了するためです。

訳注: procから値を返すにはnextを使います。
参考: 手続きオブジェクトの挙動の詳細 (Ruby 2.7.0 リファレンスマニュアル)

⚓Q32: Rubyのyieldについて説明してください
yieldは、メソッドに渡されたブロックにアクセスします。Railsアプリケーションのレイアウトファイルで使われるyieldが典型的です。

def puts_stuff
 puts 'first line'
 yield if block_given?
 puts 'third line'
 yield if block_given?
end
puts_stuff { puts 'its me' }
# => first line
# => its me 
# => third line
# => its me
view rawputs_stuff.rb hosted with ❤ by GitHub
上のコードではyieldを呼び出したときに「its me」が出力されます。

⚓Q33: content_forの使いみちを説明してください
content_forは、ビュー内でコンテンツを定義したりレンダリングしたりできます。これは、コンテンツを1箇所で定義してさまざまな場所でレンダリングするのに便利です。

⚓Q34: HashとJSONの違いを説明してください
HashはRubyのクラスであり、キーを指定して値にアクセスできるキーバリューペアのコレクションです。

JSONは、データ送信に用いる特定のフォーマットを持つ文字列です。

⚓Q35: Active Jobについて説明してください
Active Jobは、バックグラウンドジョブを作成して、Delayed::JobやSidekiqといったさまざまなバックエンドにキューイングします。

Active Jobの典型的な利用法は、メインのWebスレッドで実行する必要のないコードの実行です。ユーザーにメール通知を送信するときによく使われます。

⚓Q36: Railsのどういうところが好きですか？
私の場合は、さまざまなWebフレームワークを使ってきましたが、RailsほどMVPを短期間で構築できるものは他にありませんでした。他にも以下の点が特に気に入っています。

開発が楽しい。Time.now + 5.daysやobj.nil?といった書き方ができるのは幸せ。
コミュニティの存在がとても助けになり、サンプルやドキュメントが簡単に見つかる。
「設定より規約」とは、新しい巨大なコードベースに触れたときにどこを見ればいいかがわかるということ。Djangoのような設定を好む他のフレームワークと比較したときに、特にそれを感じる。
⚓Q37: Railsのどういうところがキライですか？
私の場合は、機械学習系のライブラリ開発が乏しかったり存在しなかったりする点。

⚓Q38: ご贔屓のRuby gemを教えて下さい
Rails開発者なら誰もがご存知のDeviseが好きです。認証のような複雑なものを2分でセットアップできるからです。

⚓Q39: springについて説明してください
springはアプリケーションプリローダーであり、アプリケーションをバックグラウンドで実行し続けることでマイグレーションやrakeタスクを実行するときにアプリケーションの起動が不要になります。

⚓Q40: アセットパイプラインについて説明してください
ブラウザで使われるJavaScriptやCSSを用意するフレームワークです。

⚓Q41: Railsで認証を管理するときには何を使っていましたか
Deviseです。

⚓Q42: splat演算子について説明してください
splat演算子は、メソッドに渡される引数の数を事前に決めておきたくない場合に使われます。Rubyにはsplat演算子*とdouble splat演算子**の2種類があります。

splat演算子*は想像どおり以下のように動作します。

def do_sth(*input)
  input.each {|x| puts x }
end
do_sth(3,4,5)
# => 3
# => 4
# => 5
view rawdo_sth.rb hosted with ❤ by GitHub
double splat演算子**は通常のsplat演算子*と似ていますが、キーバリューを引数に取る点が異なります。

def do_sth(**input)
  input.each {|k,v| puts v }
end
do_sth('a':3, 'b':4, 'c':5)
# => 3
# => 4
# => 5
view rawdo_sth.rb hosted with ❤ by GitHub
⚓Q43: includeとextendの違いを説明してください
includeとextendはどちらもミックスインであり、別のモジュールのコードを注入するのに使われます。

ただしincludeではそのコードにインスタンスメソッドとしてアクセスできますが、extendではそのコードにクラスメソッドとしてアクセスできる点が異なります。

module Greetings
  def hello
    puts 'hello'
  end
end
module Farewells
  def bye
    puts 'bye'
   end
end
class Conversation
  extend Greetings
  include Farewells
end
# class method
Conversation.hello
# => hello
# instance method
c = Conversation.new
c.bye
# => bye
view rawGreetings.rb hosted with ❤ by GitHub
⚓Q44: loadとrequireの違いを説明してください
load
別のファイルを読み込む（既にメモリ上に読み込まれている場合でも実行する）
require
別のファイルを1度だけ実行する（何度requireしても同じ）
⚓Q45: クラスとモジュールの違いを説明してください
クラスには属性とメソッドが1つ以上ある。クラスはインスタンスを作成できる。
モジュールは単なるメソッドと定数のコレクションであり、他のモジュールやクラスにミックスインできる。
⚓Q46: Active Recordのスコープについて説明してください
Active Recordのスコープは、Active Recordモデル内で定義され、他のどこからでも呼び出せるクエリロジックです。

アプリ内のさまざまな場所で同じロジックを複製するよりも、スコープを定義する方が便利なことがあります。

# スコープの例
class Post
  scope :active_posts, -> { where(active:true) }
end
⚓Q47: クラス変数とインスタンス変数の違いを説明してください
インスタンス変数は@で表記され、クラスのインスタンスに関連付けられます。あるインスタンスで属性の値を変更しても、他のインスタンスにある同じインスタンス変数には影響しません。

クラス変数は@@で表記されますが、インスタンス変数よりも直感に反します。クラス変数は、クラスのあらゆるインスタンスで共有されるので、あるインスタンスでクラス変数を変更すると、すべてのインスタンスのクラス変数に影響します。

class Coffee
  @@likes = 0
  def like
    @@likes += 1
  end
  def likes
    puts @@likes
  end
end
coffee_one = Coffee.new
coffee_two = Coffee.new
coffee_one.like
coffee_two.like
coffee_one.likes
=> 2
view rawCoffee.rb hosted with ❤ by GitHub
上のコード例で、クラスのどのインスタンスからでもクラス変数を変更できることがわかります。

⚓Q48: Active Recordのfind、find_by、whereの違いを説明してください
find
引数を1つ取り、その引数とマッチする主キーを持つレコードを探索します。
find_by
キーと値を引数に取り、マッチする最初のレコードを返します。
where
キーと値を引数に取り、マッチするレコードのコレクションを返します。マッチしない場合は空のコレクションを返します。
⚓Q49: selectとmapとcollectの違いを説明してください
3つともブロックをひとつ引数として受け取ります。

select
コレクションのサブセットを取得するのに使います。!付きのselect!を呼ぶと、元のコレクションが改変されます。
i = [1,2,3,4,5]
i.select {|x| x % 2 == 0}
# => [2, 4]
map
コレクションの各要素に対して操作を実行し、更新されたコレクションを出力します。!付きのmap!を呼ぶと、本のコレクションが改変されます。
i = [1,2,3,4,5]
i.map {|x| x+1}
# => [2,3,4,5,6]
collect
mapのエイリアスなので動作は同じです。
⚓Q50: RailsのCRUD verbと、それに対応するアクションを述べてください
verb	アクション
GET	index
GET	new
POST	create
GET	show
GET	edit
PATCH/PUT	update
DELETE	destroy
⚓Q51: createアクションへのルーティングを、resourcesを使わないで定義してください
resourcesありの場合
resources :photos
resourcesなしの場合
post '/photos', to: 'photos#create', as: :create_photo
⚓Q52: Rubyの3段階のアクセス制御を述べてください
public
このメソッドは任意のオブジェクトから呼び出せる
protected
このメソッドは、そのメソッドが定義されているクラスと、そのクラスのサブクラスからしか呼び出せない
private
このメソッドは、そのオブジェクト自身しか呼び出せない
⚓Q53: Rubyのシングルトンの使いみちを説明してください
シングルトンは、クラスにインスタンスを1つしか持たせないデザインパターンです。シングルトンはRuby界隈では嫌われがちですが、Rubyにはシングルトン用のモジュールも付属しています。

require 'singleton'
class Thing
  include Singleton
end
puts Thing.instance
# => #<Thing:0x00007fdd492cf488>
view rawThing.rb hosted with ❤ by GitHub
参考: module Singleton (Ruby 2.7.0 リファレンスマニュアル)

まとめ
面接を受ける方は、本記事をRuby on Railsに関する一般的な自分の知識を評価するのにお使いください。本記事がすべてを網羅しているわけではありませんが、ジュニア開発者や中堅開発者が受ける質問の大半をカバーしているはずです。

面接官の方は、本記事から質問を見繕うことから始めるとよいでしょう。

Zack Shapiroに感謝いたします

https://techracho.bpsinc.jp/hachi8833/2020_05_13/91211

