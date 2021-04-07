## discard

Gemfile
gem 'discard', '~> 1.0'

Migration
論理削除が必要なモデルにdatetimeタイプのdiscarded_atというフィールドを追加します。論理削除する際、model.discardというメソッドを呼ぶことでdiscarded_atに論理削除した時間が入ります。元に戻す場合はmodel.undiscardでフィールドをnilにする事が出来ます


## Model
discard gemを使うためinclude Discard::Modelをモデルincludeします。
論理削除されていないレコードだけをデフォルトで返すようにしたい為、default_scope -> { kept }を追加します。

class SurveyItem < ApplicationRecord
   include Discard::Model
   default_scope -> { kept }

   belongs_to :survey
end


## command

```ruby
コマンド実行例
# 削除
post.discard       # => true
# 確認
post.discarded?    # => true

# 強制削除。既に削除済の場合は、exceptionが発生する。
post.discard!      # => true
post.discard!      # Discard::RecordNotDiscarded: Failed to discard the record

# 削除したレコードを元に戻す
post.undiscard     # => true
post.undiscard!    # => Discard::RecordNotUndiscarded: Failed to undiscard the record
post.discarded_at  # => nil

# 削除した日時を確認
post.discarded_at  # => Mon, 21 Oct 2019 14:34:41 JST +09:00

# 削除されたレコード一覧
Post.discarded     # => [#<Post:0x00007fc04dbe3010 ...]
# 削除されていないレコード一覧
Post.kept          # => []
```


## default_scopeの導入について
デフォルトでは、Post.allは削除されたレコードも含めて返す。
この挙動を変えて削除されていないものだけ返すようにするには、default_scope -> { kept }を設定する。

```ruby
class Post < ApplicationRecord
  include Discard::Model
  default_scope -> { kept }
end

Post.all                       # 削除されていないレコードのみ
Post.with_discarded            # 全てのレコード
Post.with_discarded.discarded  # 削除されたレコードのみ
```


---

[rails 논리삭제와 물리삭제에 대해]: https://negabaro.github.io/archive/rails-soft-delete-physical-delete

[discard]: https://github.com/jhawthorn/discard

[Rails - Discardを使って論理削除を実装する方法]: https://qiita.com/ryujignh/items/18bb2a868bbb232d1a07