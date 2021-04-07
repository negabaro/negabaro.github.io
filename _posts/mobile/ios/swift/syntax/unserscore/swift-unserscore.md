

## underscore(_)란?

swift에서 underscore(_)란 어떤것을 생략해준다는 의미로 쓰인다.

아래에서 자세히 알아보자.


```swift
_ = intToString(1)
```

「intToString」メソッドから戻り値が返ってくるが、その戻り値は使用しない。
という意味のアンダースコアです。
このアンダースコアを付けないと、Xcodeが「Result of call to 'intToString' is unused」というワーニングを出してきます。

戻り値を使用しないときはアンダースコアを付けておいた方が良さそうです。





「intToString」メソッドから戻り値が返ってくるが、その戻り値は使用しない。
という意味のアンダースコアです。
このアンダースコアを付けないと、Xcodeが「Result of call to 'intToString' is unused」というワーニングを出してきます。


## (2)のアンダースコア

func intToString(_ value: Int) -> String {
1
func intToString(_ value: Int) -> String {
「intToString」メソッドを呼ぶとき、引数に「value」を付けなくてもOK！
という意味のアンダースコアです。

intToString(value: 1)
1
intToString(value: 1)
こうではなく

intToString(1)
1
intToString(1)
こう

メソッド名から何を引数に設定するかが明確な場合など、アンダースコアを付与してあげると、コードがすっきりするので良さそうです。

## • (3)のアンダースコア
case .result1(_):
case .result2(_):
1
2
case .result1(_):
case .result2(_):
「result1」「result2」は何らかの値を返してくれるが、その値は使用しない。
という意味のアンダースコアです。
(1)のアンダースコアと同じような感じです。

こちらもアンダースコアを付けないと、Xcodeが「Immutable value 'xxx' was never used; consider replacing with '_' or removing it」というワーニングを出してきます。


---

[Swiftでとまどった「_」(アンダースコア)]: https://www.indetail.co.jp/blog/170220/


[Swift underscore]: https://hcn1519.github.io/articles/2017-01/swift_underscore

[Swift underscore(_)]: https://medium.com/@codenamehong/swift-underscore-90dcbec5072f