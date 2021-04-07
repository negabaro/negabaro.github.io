ujihisa:工場:  07:20
https://ruby-jp.slack.com/archives/CLTRGLV4Z/p1592251468088500
https://ruby-jp.slack.com/archives/CLTRGLV4Z/p1592251487089000
Bの方が人気だけど圧倒的人気というわけでもなくそこそこ分かれるという感じですね
VoteVote
raiseの書き方 (Choose one)
#random への投稿 | 6月16日 | メッセージを確認する
ujihisa
A: raise AnExceptionClass.new(msg)
#random への投稿 | 6月16日 | メッセージを確認する
07:20
https://ruby-jp.slack.com/archives/CLTRGLV4Z/p1592251506089300
ujihisa
B: raise AnExceptionClass, msg
#random への投稿 | 6月16日 | メッセージを確認する

gotoken  07:45
カスタム例外で引数を渡すことがあるから出来ればAに揃えたいけど1行が長すぎるとcopに叱られるのでBにするという感じです…

ujihisa:工場:  07:46
あーrubocopがdefaultでBなんですね

僕も最初はAで書いてたけど、社のrubocopが入ってた(今は外された)リポジトリの影響でBに洗脳されつつある
08:04
まあでも最近も自分しか触らないコードではAで書いてるぽい

ujihisa:工場:  08:04
rubocopの影響力改めて大きいですね

ubocopはよくマイクロ最適化の指摘をしてくるので、そう指摘されると .new がついてない奴の方がもしかして速いのではみたいな印象操作が行なわれる 

(実際にはBでも少なくともexceptionオブジェクトは作ってると思うけど、.newのメソッド呼び出し分のコストは実際減るのかもしれない(未確認)、けど確認するのもめんどいしな、みたいな気持ちに)
08:11
既に速いこと/理由を知ってて速い方で書く場合はいいけど、本質を知ってるわけではなくて単にrubocopに指摘されたみたいな状態で習慣が矯正されるの、あまり良い体験ではない

A. Exception.new + Exception#exception
B. Exception.exception (= Exception.new)
なので、何もしないメソッドException#exceptionの呼び出しの分Aのほうが遅いはず
08:32
riでException.exceptionが出てこない

例外をfiberなみに飛ばしまくるなら別だけど、raise自体の速度は正直そんなに問題ないのでは…と思ったけど rails だと馬鹿にならなかったりするのかも？

秒速で億例外投げていきましょう

n0kada  08:36
また億劫なことを
08:38
そんなに投げてると遅れが否めない

-jitつけたらちょっとだけ遅くなりました
:goodpoem:
1


gotoken  08:46
たしかに new が少し遅いのか。しかしそんなに呼ばれないよな…

例外処理を--jitで速くするみたいなの今のところ入ってないですね


class MyError < StandardError
end
obj = Object.new
def obj.exception(arg)
  p arg #=> 12345
  MyError.new
end
raise obj, 12345 #=> MyError
08:55
A は例外以外のものでも受け取れるというどうでもいい知識

gotoken  08:55
知らなかった

n0kada  08:58
raise/rescueとthrow/catchってどのくらい速度違うんだっけ

mame  08:59
そんなものの速度とか気にする人類ダメ

raise HogeError, "msg" を raise HogeError.new("msg") と書くのは、なんか class Hoge' を Hoge = Class.new と書くような違和感がある。

細かいことを言うと、A と B でできることが微妙に違うから、そういう cop は有効にしない方がいいのでは…