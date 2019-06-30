callback で変更されたカラムの情報を利用したい場合、

after_save までは changes で取得できるが

after_commit では当然だが変更が完了しているため取得できない。

previous_changes を使うことで取得できる

```ruby


class User < ApplicationRecord
  after_save do
    p "after_save"
    p "changes"
    p self.changes
    p "previous_changes"
    p self.previous_changes
  end

  after_commit do
    p "after_commit"
    p "changes"
    p self.changes
    p "previous_changes"
    p self.previous_changes
  end
end

u = User.find 1
u.name = "BBB"
u.save

# "after_save"
# "changes"
# {"name"=>["AAA", "BBB"], "updated_at"=>[Tue, 09 Aug 2016 10:57:44 UTC +00:00, Tue, 09 Aug 2016 10:58:51 UTC +00:00]}
# "previous_changes"
# {}

# "after_commit"
# "changes"
# {}
# "previous_changes"
# {"name"=>["AAA", "BBB"], "updated_at"=>[Tue, 09 Aug 2016 10:57:44 UTC +00:00, Tue, 09 Aug 2016 10:58:51 UTC +00:00]}
```

https://qiita.com/nog/items/1174ac3a9b841a250085
