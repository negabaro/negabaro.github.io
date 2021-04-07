そのうち ブラックボックス も言葉狩りに遭うのかなって思ったんですけど、あれ？もしかして black box って和製英語なのかな...
https://ruby-jp.slack.com/archives/CLWSHA76V/p1592553480312400
ttanimichi
この block で渡す処理を他の部分（今回で言うと controller の before_action で呼ぶ処理）と共通化したかったので、block でベタ書きするのではなく lambda   を定義して block に変換して渡すようにしていたわけなんですけど、gem 側のコードをブラックボックスであると捉えるなら、gem 側がその block を呼び出す時に引数を渡すか渡さないか分からないわけだから、こういうときは lambda ではなく Proc を渡すようにしておいたほうが無難ですね。実装したときは問題なく実行できたとしても gem のバージョンアップとかで簡単に壊れる可能性がありそう。

https://en.wikipedia.org/wiki/Black_box


1945年くらいに生まれた表現なのか……


blackboxは電気回路などでよく使いますよ。


いわゆる仕様が公開されてない入力と出力だけがわかっているもののことですね
（その意味だとプログラミングにおける関数とかAPIと違いはないと思う）

ブラックホールはどうなるんだろ。

ブラックアウト/ホワイトアウト

遊戯王的にブラックホールは昔から Dark Hole ですよ。

https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=4342


本気で言葉狩りすると、カードゲームのM:TGの色の一つとしてのBlackとかもどうするんだろうってなりますね
17:28
http://mtgwiki.com/wiki/%E9%BB%92 とかみると、黒はネガティブなイメージある前提で設計されているっぽいし……