
オブジェクトのメソッド存在チェック
前提
存在しないメソッドを呼び出すと例外

hoge = nil
hoge.fuga #=> NoMethodError: undefined method `fuga' for nil:NilClass

# respond_to?

メソッドが存在しているか確認できる

hoge.respond_to? :fuga #=> false

레일즈에서는 try(&.)로 전부 대체가능하므로
respond_to?는 ruby에서만 사용할듯


### reference:

```
https://qiita.com/anoworl/items/8d5ff9c95c2097d6b53b