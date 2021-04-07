서비스층이 있으면 test작성시


FactoryBot케이스가 아니고 service층을 그대로 갖다써도 될떄가 있음



おまけ: Test Factory
Factory Girl や fabrication のような gem は便利ですが、サービス層を作成しておくと、サービス層を Test Factory として使うことができます。

describe Comment::Update do
  it "updates" do
    comment = Comment::Create.(comment: {body: "Operation rules!"}).model # this is a factory.

    Comment::Update.(id: comment.id, comment: {body: "FTW!"})
    expect(comment.body).to eq("FTW!")
  end
end
(http://trailblazer.to/gems/operation/ の "Testing With Operations" より)

上記の例の場合、Comment::Create.(comment: {body: "Operation rules!"}).model は Comment.create(body: "Operation rules!") と同じように見えます。
しかし、ここで重要なことは Comment.create により 「Comment データを 1 件作る」ことではなく、ユーザーがアプリケーション上で「コメントを投稿する操作」を行った後であるという状況を表現できていることです。
実際 Comment::Create が内部で単に Comment.create を実行しているだけなら同じことですが、例えば投稿時にコメント数をカウントアップしたり通知処理を行ったりする場合、 Comment::Create を用いることで再現できます。

同じようなことを Factory Girl の callback や trait で実装することがあるわけですが、そこに間違いが含まれる危険を考えればアプリケーション上のロジックがそのまま使えるほうが良いことは明らかです。

ただ、上記の場合 comment: {body: "Operation rules!"} をデフォルト値としてデータを作成してくれる機能がほしくなります。
これは専用の class を用意するだけで十分かと思います。

# spec/factories/comment_factory.rb または test/factories/comment_factory.rb
class CommentFactory
  def self.create(params = {})
    default_params = {comment: {body: "Operation rules!"}}

    Comment::Create.(default_params.merge(params)).model
  end
end

# テスト中での利用
describe Comment::Update do
  it "updates" do
    comment = CommentFactory.create
    # ...
細かいロジックはサービス層にあるので Factory の役割は Test を書くのが楽になるようにデフォルトのパラメータを用意することです。
デフォルトのパラメータを複数用意したいケースでは CommentFactory のメソッドを工夫すると良いと思います。

また、 Factory を作ることのメリットはもうひとつあります。
それはサービス層が未実装である場合に、テストデータを用意する部分のインタフェースを統一することです。
サービス層をテストデータの生成に利用する方法は、事前にサービス層が作られていることが前提となります。
しかし、システム開発では Create や Update よりも先に Read の機能を作成するケースが多々あります。
その場合は Factory を仮実装しておいて、 Create や Update のサービス層ができたらそちらを使うように置き換えます。

class CommentFactory
  def self.create(params = {})
    default_params = {comment: {body: "Operation rules!"}}

    # TODO サービス層ができたら置き換えること
    Comment.create(default_params.merge(params)[:comment])
  end
end

https://qiita.com/kbaba1001/items/e265ad1e40f238931468