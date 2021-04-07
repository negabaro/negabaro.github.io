


## attributes

attributeをクラスの冒頭に並べておくと、「このクラスは何をパラメータとして受け取るのか」を明示できるというメリットもあります。なお、この例のtagsは配列で、指定できる型がないので型を指定していません。


defaultオプションで初期値を指定できます。Procも指定できます。

  attribute :published_at, :datetime, default: ->{ Time.now }

## 型キャスト

ActiveModel::Attributes を使わずに型キャストをしたいときは、 ActiveRecord以外で型キャストを使う を参照しくてください。

https://qiita.com/kazutosato/items/9073e76bdca669085fba

## attributes vs assign_attributes

아무런 차이가 없다.

단순 alias관계

```
# ActiveRecord::AttributeAssignment内
alias attributes= assign_attributes
```

https://qiita.com/alpaca_taichou/items/bebace92f06af3f32898

[rails attributes vs assign_attributes]: https://teratail.com/questions/93027
https://qiita.com/kazutosato/items/91c5c989f98981d06cd4

https://ushinji.hatenablog.com/entry/2019/06/17/220611