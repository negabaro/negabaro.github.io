## Iterator	

1つ1つ数え上げる

どんなパターンか
集約オブジェクト（コンポジット）の全ての子オブジェクトを連続で走査し、また任意のロジックを適用する。

イテレータ用の外部クラスを用いて実現する外部イテレータと、
（例えばeachのように）オブジェクト自身がブロックを受け取り、子オブジェクトに適用する内部イテレータが存在する。

内部イテレータ
コードブロックの利用によって集約オブジェクトにロジックを伝える
（子オブジェクトたちそれぞれに対してコードブロックを呼ぶ）。
繰り返し処理の全てが集約オブジェクト内で起こるため、内部イテレータと呼ぶ。

配列を内部イテレータで走査
Arrayにはもともとイテレータメソッドeachが存在する。

array = ['red', 'green', 'blue']

array.each do |val|
  p val
end
"red"
"green"
"blue"

https://qiita.com/kidach1/items/afa4c6c29a6eb6be487a