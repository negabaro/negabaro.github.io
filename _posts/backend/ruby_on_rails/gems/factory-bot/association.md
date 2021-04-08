## association

テストデータ作成に便利なgem「FactoryBot」で使えるassociationメソッドについて、これなにしてくれてるんだっけ？となってググって秒でわかるのが意外と無かったので、自分のメモも兼ねて書いておきます。

例えば次のようなモデルがあったとします。

# app/models/user.rb
class User < ApplicationRecord
  has_many :comments          
end                           
# app/models/comment.rb
class Comment < ApplicationRecord
  belongs_to :user          
end                           
次のようなファクトリがあったとします。

# spec/factories/users.rb
FactoryBot.define do
  factory :user do
  end
end
# spec/factories/comments.rb
FactoryBot.define do
  factory :comment do
  end
end
ここでCommentモデルのオブジェクトを1つ作りたいとします。

FactoryBotでCommentモデルのオブジェクトを作るには、belongs_to :userのため、下記のようにUserモデルのオブジェクトを先に作ってから、Commentモデルのオブジェクトにuserオブジェクトを与えてあげる必要があります。

user = FactoryBot.create(:user)
comment = FactoryBot.create(:comment, user: user)
つまりcommentオブジェクトを作りたいだけなのに、それに関係するuserオブジェクトを一緒に作らないといけません。

associationは、commentオブジェクトを作るときに、関係するuserオブジェクトも自動的に作成してくれるものです。下記のようにファクトリに設定します。

# spec/factories/comments.rb
FactoryBot.define do
  factory :comment do
    association :user # => 今回のように関係するモデルとファクトリ名が同じ場合は user だけでもOK(※)
  end
end
※このあたりの話はこちらの記事が参考になります。

こうすると下記の1行だけでcommentオブジェクトが作れます。

comment = FactoryBot.create(:comment)

https://qiita.com/johnslith/items/c0b2a9b8ce8770e5d317


[FactoryBot（旧FactoryGirl）で関連データを同時に生成する方法いろいろ]: https://qiita.com/metheglin/items/47116ccbdb26aa00e034