---
layout: post
title:  "rails factoryBot create_list"
tags: rails/factorybot
---


# syntax

```ruby
create_list(<作成したいファクトリ名>, <作成するインスタンス数>, *<トレイトやオーバーライドしたい項目>)
```

# 戻り値はArray
具体例

create_list(:user, 3, :admin, :male, name: "Jon Snow")
adminとmaleはここではtrait
nameはオーバーライドさせている


RSpec.describe 'yyyy' do
  let(:note1) { create(:note) }
  let(:note2) { create(:note) }
  let(:note3) { create(:note) }
  let(:note4) { create(:note) }
  let(:note5) { create(:note) }
  ...
end
ここで登場するのがcreate_listです。
これを使えば、まとめてnoteインスタンスを作成することが可能です。

spec/system/xxx_spec.rb
RSpec.describe 'yyyy' do
  notes = create_list(:note, 5)
  ...
end
第1引数に元になるファクトリ、第2引数に作成する数を指定します。
（notes =の部分は無くても可）

ちなみに属性の一部を上書きして作成することも可能です（下記参照）。

spec/system/xxx_spec.rb
RSpec.describe 'yyyy' do
  notes = create_list(:note, 5, title: 'Hello, World')
  ...
end



# 1

```ruby
users = create_list(:users, 2)
create(:organization, users: users)
```

# 2

```ruby
user1 = create(:user, role: "admin")
user2 = create(:user, role: "sales")
create(:organization, users: [user1, user2])
```



### reference:

```
https://qiita.com/luigiii/items/32717b6c382272e2134e
```