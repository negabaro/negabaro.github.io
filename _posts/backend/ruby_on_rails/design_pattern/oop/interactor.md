## Interactor

interactor-rails: RailsでInteractorパターン
リポジトリ: collectiveidea/interactor-rails: Interactor Rails provides Rails support for the Interactor gem.
# 同リポジトリより
class AuthenticateUser
  include Interactor

  def call
    # 何かする
  end
end
つっつきボイス:「interactor-railsは取り上げたことがありそうでなかったので」「interactor gemをRailsですぐ使えるようにした感じみたい」「interactorはさっきのマスト19 gemにも載ってましたし😆」「どうせRailsで使うことが多いでしょうから統合したんでしょうし😆」「使いたいならどうぞ〜😋」

interactor gemは以下の翻訳記事にも載っています

https://github.com/collectiveidea/interactor-rails


開発
 2017.10.25
Railsコードを改善する7つの素敵なGem（翻訳）
 hachi8833
 シェア
 
 ツイート
 
 ブックマーク
 
 LINE
概要
原著者の許諾を得て翻訳・公開いたします。

英語記事: 7 Gems Which Will Make Your Rails Code Look Awesome
公開日: 2017/10/14
著者: Val Zavadskiy
サイト: https://blog.rubyroidlabs.com/
Rubyroid Labsの別記事「Ruby on Railsで使ってうれしい19のgem（翻訳）」も合わせてどうぞ。

Railsコードを改善する7つの素敵なGem（翻訳）


私たちRubyroid Labはアプリのアーキテクチャに多くの情熱を注ぎ込んでいます。手がけているプロジェクトの多くが長期にわたっているので、設計のどこかで少し油断すると、機能を1つ追加するのにプロジェクトをスクラッチからやり直す方が早い、といった事態になりかねません。こんな目には遭いたくないものです。

新しく参加したメンバーがロジック把握のためにソースコードを読みとおすだけでかなり時間がかかるようなら、それはプロジェクトが病んでいることを示す兆候のひとつです。本記事では、コードを整理してチームメンバーの笑顔を取り戻してくれるさまざまなgemをご紹介いたします。


1. interactor（固定リンク）
何らかの複雑なビジネスロジックを書くときには必ず私たちのリストに入るほど素晴らしいライブラリです。さてinteractorとは何でしょうか？Readmeには「ビジネスロジックのカプセル化というひとつの目的だけを持つシンプルなオブジェクトです」とあります。ビジネスロジックのカプセル化といえば皆さんの大好きなService Objectを連想するかもしれませんが、interactorはずっと機能が豊富です。早速コード例をご覧に入れましょう。

# app/interactors/create_order.rb
class CreateOrder
  include Interactor

  def call
    order = Order.create(order_params)

    if order.persisted?
      context.order = order
    else
      context.fail!
    end
  end

  def rollback
    context.order.destroy
  end
end
# app/interactors/place_order.rb
class PlaceOrder
  include Interactor::Organizer

  organize CreateOrder, ChargeCard, SendThankYou
end
コード例を見れば、このgemの実に素晴らしい機能がいくつもあることにお気づきかと思います。
まず、シンプルなinteractorをいくつかまとめて1つの実行可能なチェインにできるという点です。contextという特殊変数は、異なるinteractor同士でステートを共有するのに使われています。
次に、interactorのひとつが何らかの理由で失敗すると、それまでのinteractorはすべてロールバックします。CreateOrderクラスには#rollbackがあり、たとえばChargeCardやSendThankYouが失敗すればorderは破棄されます。
実にクールなgemですね。
