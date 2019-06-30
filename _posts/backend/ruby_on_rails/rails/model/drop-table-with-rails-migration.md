---
layout: post
title: "xx"
author: negabaro kim
categories: xx
tags: xx
---

rails destroy model (削除する)モデル名

rails generate migration rocords

```ruby
class DeleteRocords < ActiveRecord::Migration[5.1]
  def change
    drop_table :rocords
  end
end
```

bundle exec rake db:migrate

### Reference Link:

https://qiita.com/kanuu/items/a9223712ee0ff8d19d56
https://qiita.com/Kuragasaki/items/7d98cf29341611fb189a
