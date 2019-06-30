■ その 2：ignore_nil!

よく考えたら上記のような問題、わざわざ Stack Overflow で聞かなくてもコードを読めば分かることでしたね。反省。
という訳でコードを読んでみたら merge!の他にも Jbuilder の READEME.md で利用方法が紹介されてないメソッドがあと 2 つありましたので、それらを紹介したいと思います。

二つ目は ignore_nil!です。例えば以下のコード、@item.number が nil の場合は JSON 上は number: null と表示されます。

json.number @item.number
この時「値が nil の場合はそもそも要素自体を表示させたくない」という場合は以下のように if や unless での制御が必要になります。

json.number @item.number unless @item.number.nil?
でもこのコードもちょっと汚いですよね。

このような場合、ignore_nil!を利用すれば値が nil の時は要素自体が表示されなくなります。なおこの設定は、ignore_nil!メソッドの記述直後に有効化され、元の「nil を ignore しない状態」に戻すには、ignore_nil! false を記述します。

````ruby
json.var1 nil

json.ignore_nil!
json.var2 nil

json.ignore_nil! false
json.var3 nil
結果（var2: null は表示されていません）：

{
var1: null,
var3: null
}
```

こちらはクラスメソッドも用意されていますので、設定ファイルに以下を記述しておけば、アプリケーション全体でこの設定を有効化できます。
http://tech.gmo-media.jp/post/90700224919/rails-jbuilder-merge-ignore-nil-child
````
