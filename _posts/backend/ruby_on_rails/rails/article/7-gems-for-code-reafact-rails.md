開発
 2017.10.25
# Railsコードを改善する7つの素敵なGem（翻訳）

 interactor（固定リンク）
 2. draper（固定リンク）
7. groupdate（固定リンク）









----------------------------

8. virtus（固定リンク）
シンプルなRubyオブジェクトをそのまま使っても要件を満たせないことがあります。たとえば1つのページに複雑なフォームがいくつもあり、フォームごとに異なるモデルとしてデータベースに保存しなければならないとします。こんなときはvirtusです。次の例をご覧ください。

class User
  include Virtus.model

  attribute :name, String
  attribute :age, Integer
  attribute :birthday, DateTime
end
user = User.new(:name => 'Piotr', :age => 31)
user.attributes # => { :name => "Piotr", :age => 31, :birthday => nil }

user.name # => "Piotr"

user.age = '31' # => 31
user.age.class # => Fixnum

user.birthday = 'November 18th, 1983' # => #<DateTime: 1983-11-18T00:00:00+00:00 (4891313/2,0/1,2299161)>

# mass-assignment
user.attributes = { :name => 'Jane', :age => 21 }
user.name # => "Jane"
user.age  # => 21
見てのとおり、virtusは標準的なOpenStructクラスと似ていますが、ずっと機能が豊富です。ぜひvirtusを隅々まで試してみてください。

virtusは手始めに使うのによいgemですが、もっと高度な技法を使いたい場合は、dry-types、dry-struct、dry-validation gemもぜひお試しください。


4. cells（固定リンク）
Nick Suttererの手によるRuby on Railsの高度なアーキテクチャをまだご存じない方は、ぜひ一度チェックしてみましょう。このアーキテクチャのコンセプト全体を既存のアプリに必ずしも適用できるとは限りませんが、ユーザーの種類などに応じた条件をいくつも適用していくうちにビューが複雑になりすぎてしまったらcells gemの出番です。cellsはビューの一部を切り離し、Rubyの通常のクラスとしてコンポーネント化できます。次のコードサンプルをご覧ください。

# app/cells/comment_cell.rb
class CommentCell < Cell::ViewModel
  property :body
  property :author

  def show
    render
  end

  private

  def author_link
    link_to "#{author.email}", author
  end
end
<!-- app/cells/comment/show.html.erb -->
<h3>New Comment</h3>
  <%= body %>

By <%= author_link %>
# app/controllers/dashboard_controller.rb
class DashboardController < ApplicationController
  def index
    @comments = Comment.recent
  end
end
<!-- app/controllers/dashboard/index.html.erb -->
<% @comments.each do |comment| %>
  <%= cell(:comment, comment) %>
<% end %>
上の例では、ダッシュボードに最近のコメントを表示したいと考えています。すべてのコメント表示をアプリ上で同一にすることが前提です。Railsはレンダリングに共有パーシャルを使うこともできますが、代わりにCommentCellオブジェクトを使います。このオブジェクトは、前述のdraperにビューのレンダリング機能を組み合わせたものとみなせますが、もっと機能が豊富です。すべてのオプションの詳細についてはgemのReadmeをご覧ください。


5. retryable（固定リンク）
現代的なWebアプリにはさまざまな機能が統合されています。確実なAPI呼び出しが使えることもありますが、ファイルのFTPアップロードや何らかのバイナリプロトコルを使わなければならないこともあります。後者の問題は、呼び出しがこれといった理由なしにときどき失敗することです。このような場合にできる最善手はリトライです。次のようなコードを書いて切り抜けなければならなかったことがあるでしょう。

begin
  result = YetAnotherApi::Client.get_info(params)
rescue  YetAnotherApi::Exception => e
  retries ||= 0
  retries += 1
  raise e if retries > 5
  retry
end
こんなときこそretryableの出番です。このgemを使って上のコードを次のように書き直してみましょう。

Retryable.retryable(tries: 5, on: => YetAnotherApi::Exception) do
  result = YetAnotherApi::Client.get_info(params)
end
コードがずっとすっきりしましたね。retryableは他の状況にも使えるので、ぜひチェックしてみてください。


6. decent_exposure（固定リンク）
（Rubyの）マジックがあまり好きでない方はこのライブラリを使わなくてもよいでしょう。しかしアプリによっては、きわめてシンプルな標準CRUDアクションがたくさん複製されることがあります。こんなときにはdecent_exposureの出番です。何かを管理する新しいコントローラを作成するときを考えてみましょう。scaffoldすると次のような感じになります。

class ThingsController < ApplicationController
  before_action :set_thing, only: [:show, :edit, :update, :destroy]

  def index
    @things = Thing.all
  end

  def show
  end

  def new
    @thing = Thing.new
  end

  def edit
  end

  def create
    @thing = Thing.new(thing_params)

    respond_to do |format|
      if @thing.save
        format.html { redirect_to @thing, notice: 'Thing was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end

  def update
    respond_to do |format|
      if @thing.update(thing_params)
        format.html { redirect_to @thing, notice: 'Thing was successfully updated.' }
      else
        format.html { render :edit }
      end
    end
  end

  def destroy
    @thing.destroy
    respond_to do |format|
      format.html { redirect_to things_url, notice: 'Thing was successfully destroyed.' }
    end
  end

  private

  def set_thing
    @thing = Thing.find(params[:id])
  end

  def thing_params
    params.require(:thing).permit(:for, :bar)
  end
end
コードが60行にもなればもう少ないとは言えません。Rubyistたるものコードはいつもできるだけ最小限に保ちたいものです。decent_exposureを使えば、以下のようなコードを書けます。

class ThingsController < ApplicationController
  expose :things, ->{ Thing.all }
  expose :thing

  def create
    if thing.save
      redirect_to thing_path(thing)
    else
      render :new
    end
  end

  def update
    if thing.update(thing_params)
      redirect_to thing_path(thing)
    else
      render :edit
    end
  end

  def destroy
    thing.destroy
    redirect_to things_path
  end

  private

  def thing_params
    params.require(:thing).permit(:foo, :bar)
  end
end
できました！何ひとつ機能を失わずにコードが30行そこそこにまで減っています。お気付きのとおり、すべてのマジックを発揮しているのはexposeです。内部の詳しい動作を理解するにはgemのドキュメントをご覧ください。


7. groupdate（固定リンク）
開発者なら誰しも、異なるタイムゾーンを扱うつらさが身に沁みていることでしょう。データベースで集約（aggregation）を行うときは特にそうで、私も「今月のユーザー数を日別で取れるようにせよ: ただし無料ユーザーは除くこと」などといったオーダーはいつも悩みの種です。でもこのgemがあればそんな心配から解放されます。次の例をご覧ください。

User.paid.group_by_week(:created_at, time_zone: "Pacific Time (US & Canada)").count
# {
#   Sun, 06 Mar 2016 => 70,
#   Sun, 13 Mar 2016 => 54,
#   Sun, 20 Mar 2016 => 80
# }
ご紹介した7つのgemで皆様が快適な開発生活を送ることを願っています。質の高いコードを高い表現力で書けるツールを他にもご存知でしたら、ぜひ私どもまでお知らせください
https://techracho.bpsinc.jp/hachi8833/2017_10_25/47160