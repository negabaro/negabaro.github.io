hanami나Trailblazer 에서 사용하는 view의 로직정의 패턴

template마다 로직을 정의하는 클래스가 존재함



Template (Partial) 毎にロジックを記述するクラスを定義する
Trailblazer (正確には Cells または Apotomo) や
Lotus では Template (Partial) 毎にロジックを定義する仕組みがあります。

View が複雑になってくると、View の一部だけを扱いたいケースがあります。
例えば、ブログの記事のページで記事の内容、コメントの投稿、検索フォーム、過去の記事の一覧を表示するような場合です。
このときコンポーネント毎に partial を分ければ template は分割できますが、インスタンス変数や Helper メソッドはコントローラのアクション単位でしか扱えません。

Cells はロジック付き partial のような機能を提供します。
Cells のディレクトリ構成は次のようになります。

app
├── concepts
│   ├── comment
│   │   ├── cell.rb
│   │   ├── views
│   │   │   ├── show.haml
app/concepts/comment/views/show.haml が partial のようなもので、 app/concepts/comment/cell.rb がそのためのロジックです。
内容はそれぞれ次のようになります。

# app/concepts/comment/cell.rb
class Comment::Cell < Cell::Concept
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
-# app/concepts/comment/views/show.haml
%h3 New Comment
  = body

  -# Comment::Cell の private メソッドも呼び出せます
  = author_link
Cell は通常の View から concept メソッド (または cell メソッド) を使うことで render します。

-# app/views/comments/show.html.haml
= concept("comment/cell", @comment)
app/concepts/comment/cell.rb の単体テストで View コンポーネントのテストを書くことができるので、E2E テストで担保する範囲を減らすことができます。

Lotus の View も Cell 同様 Ruby のクラスファイルと erb などの Template ファイルが1セットになっています。
参考: http://lotusrb.org/guides/views/overview/

https://qiita.com/kbaba1001/items/e265ad1e40f238931468
