
You generally want to use where except in special circumstances -- most commonly, to apply conditions to a secondary (joined) table in the query. This is becase

it's shorter / clearer / more idiomatic, and
merge has tricky edge cases: it mostly combines the two queries, but there are situations where one side's value will just override the other.
Given that, even your existing condition doesn't need merge:


Parent.joins(
  child: [
    great_grand_sons: :great_great_grand_son
  ]
).merge(GreatGreatGrandSon.where(id: funfun))

mergeメソッドといっても、２つあります。
ひとつはRuby自体のメソッドで、ハッシュの結合に利用するものです（今回は説明を割愛します）。

merge, merge! (Hash) - Rubyリファレンス - AmiWiki
（https://ref.xaio.jp/ruby/classes/hash/merge）

もうひとつは、ActiveRecordのmergeメソッドです。
今回は言うまでもなくこちらですね。
（mergeってドキュメントないから困る）

mergeは、複数の条件を併合（＝マージ）するメソッドです。

ざっくり言うと、直前に行った条件に対して、さらに絞り込みを行いたい時に使います。
SQLでいうと、最後に書くWHERE句的な感じですかね。

ここで、もう一度コードを見ましょう。

Parent.joins(
  child: [
    great_grand_sons: :great_great_grand_son
  ]
).merge(GreatGreatGrandSon.where(id: funfun))
今回は、先ほどJOINした結果のParentにさらに絞り込みを掛けるイメージです。
絞り込む条件は、「idがfunfunであるGreatGreatGrandSon」ということですね。

mergeの中の条件は簡単なので説明はいらないと思います。

ちなみに、mergeの一般的な使い方はコレではなく、モデルのscopeを利用するパターンが多いと思います。
scopeについては、こちら。

Ruby On Railsのscopeメソッドで検索を効率化する
（https://programming-beginner-zeroichi.jp/articles/62）

ざっくり言うと、「よく使う絞り込みを、あらかじめモデル内に設定しておく」ということですね。

今回はmergeのこの機能を使わず、単に条件を追加する用途で使っています。
モデルによってscopeをうまく設定して使ってあげることで、controllerの記述をシンプルにして、fat_controller化することを防げますので、効率的に使いましょう。


### reference:

```ruby
https://qiita.com/TeruhisaFukumoto/items/007ad22cc170d297dbcc
https://stackoverflow.com/questions/50490009/rails-activerecord-where-vs-merge
https://qiita.com/hirohero/items/8194b8012b9a5f6e592e
```
