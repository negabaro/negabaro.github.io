return render

コントローラのearly returnって、皆さんどう書いてますか？
# andつかう
render and return
# 改行してreturn
render
return
# ; で1行にまとめる
render; return
18:14
Rails Guideとか、ソースコード見ると and が正当っぽいんですが https://github.com/rails/rails/blob/master/actionpack/lib/action_controller/base.rb#L159 （編集済み） 
18:14
Rubocopのこのissueとか見ると、改行か ; のほうが良いのかなという気もしており https://github.com/rubocop-hq/rubocop/issues/1083#issuecomment-348249534 （編集済み） 

r7kamura  18:16
特別にRailsだから・コントローラだからこうするということは全く意識していなくて、Rubyだったらどう書くかということだけ考えて書いています
:naruhodo:
1

18:19
render and return と render; return は、renderの戻り値を評価するかどうかという点でそもそも挙動が異なるので、この二択の場合、評価したい場合は前者、評価したくない場合は後者を使うと思います

sue445  18:20
僕は2番目で書くことが多いかな。
18:20
# andつかう
render and return
and と && の演算子の優先順位が違ってて && だとダメというのを昔聞いたことあるんだけどどこだったかなぁ...

junk0612  18:24
render('hogehoge') and return のはずが render('hogehoge' && return) になっちゃうとかですかね
:naruhodo:
2

18:26
render and return だけ慣習的にこうして (1つ目にして) ますけど、そのほかだったら2つ目にしますね

sakuro  18:27
そもそも and は Perl で、こういうときに使うための優先度の低い && として導入されているので （編集済み） 
18:27
ここで使うのは割と自然

r7kamura  18:27
renderが返す値ってRails公式のAPIとして定められているんだろうか？

sakuro  18:29
そういえば明示されてないような

ttanimichi  18:33
render; return が正しいと知りつつ render and return ってキメたくなるのが人情ってものじゃありません？ （編集済み） 

sakuro  18:35
みたところ render の返値がなんであるかは明言されてないな。

r7kamura  18:35
キメるなら render foo then return にしてみたいな

sakuro  18:36
明言されてないなら and でつなぐこと自体が危険 (たまたま動いている) という気が。

ttanimichi  18:36
then プロダクトコードで一回も使ったことない...

r7kamura  18:39
Object#then を悪用できないか考えたけど、レシーバが無いとキーワードになってしまうので駄目そうですね…

hanachin  18:41
and returnドキュメントで出てなかったっけ

sue445  18:41
then 、僕も全然使ったことないな
:dajare:
4


r7kamura  18:42
もっとポエトリーに書きたい (けど壊れてほしくはない) という本能的な欲求は確かに分かるので、言語的に何か不自由なところがあるのかもしれない…

hanachin  18:43
Railsガイドに載っているand return (APIドキュメントにも例として出てた気がするけど忘れた...)
https://guides.rubyonrails.org/layouts_and_rendering.html#avoiding-double-render-errors （編集済み） 

wakaba260  18:48
andと&&って一見いい感じに書きたい時用のイディオムに見えて挙動が違うのが厄介だと思っていて、細かい挙動の使いわけを意識したくないのでandは基本的に使わないのがいいんじゃないかと思ってたりします
唐突にandじゃないとダメみたいなのをさっとコード読んだ時に勘違いせずに意図を読み取れる人少なそうですし（自分は見過ごす自信がある
が、controllerでのrender and returnについてはガイドでも提示されてますしRails的なイディオムとしていいんじゃないかと思ってる派ですねえ

hanachin  18:48
or die文化
:wakaru:
3


r7kamura  18:50
or die はわりとミーム化しているけど、and return は特にミーム化していないので、もっと強い言葉を言語に入れていったほうが流行るかもしれない （編集済み） 
:+1:
1


genya0407  18:52
気持ち的には return render(hoge) とか書きたいような気もしてます

r7kamura  18:53
入力は引数、出力は戻り値、っていう基本的な発想があるので、コントローラの出力であるところのレスポンスを返したいという気持ちを表現したいですよね
:wakaru:
3


genya0407  18:57
特にaction args使ってると、入力がちゃんと引数でやってきてくれるので、出力は戻り値にできたら一番自然な感じしますね

r7kamura  19:04
これはかなり言いすぎだと思うので聞き流してほしいんですが、
「そういう感じになっていないRailsのactionって一体何なんだ……?」と考えた結果、actionはRubyのメソッドという形を借りたコールバック関数であって、内部機構が利用者に対してわりと露出してしまっており (インスタンス変数がViewに渡されるという冗談みたいな機構もあるよ)、あまりRuby的な表現に綺麗に落とし込めていない低級なレイヤーのAPIである……という悪い印象を持っています……
:naruhodo:
4
:iizo:
2
:kannzenndoui:
1
:両目:
1


sinsoku  19:44
インスタンス変数を参照できるのは、たしかに暗黙的で微妙な感じしますよね。

kuboon  20:55
私は return render 派です。
and return 、流行ってるけどほんとは駄目だと思う。

genya0407  20:59
return render、actionの返り値がなにか意味を持つように見えてしまって良くないのかなと思ってたんですが、そこは許容という感じでしょうか

kuboon  22:38
通常なにも明示的に return してないところに何を返しても何も起きない （単に破棄される）というのは想定可能だと思うんですよね
22:41
render and return は、 render の末尾に明示的に true とか書いてあるならまあアリかなと思うんだけどそうはなってないし、実際何が返ってくるかよくわからないものに依存して and return するのはどうかなと思うし、詳しくない人は構文と誤解して別の文脈で使って死んだりしそう
22:44
なんか大昔に rails guide の and return にプルリク出してボツにされたような記憶が。。。（夢かもしれない）

genya0407  23:03
詳しくない人が誤解する可能性でいうと、return renderも結構危なそう。こっちは誤解されても死ぬことはないかもですけど。

znz  00:20
render and return は render 失敗したら偽が返ってくるのかな、と誤解しそうだし、 return render は render したらその結果を return しないといけないのかな、と誤解しそう。