Ruby 2.6ではJIT (Just-in-time) コンパイラが導入されました。

JITコンパイラはあらゆるRubyプログラムの実行を高速化することを目的としています。 他言語の一般的なJITコンパイラと異なり、RubyのJITコンパイラはC言語のソースコードをファイルとしてディスクに書き、通常のCコンパイラを用いてネイティブコードに変換することでJITコンパイルを行うという手法を用いています。(参考: MJIT organization by Vladimir Makarov)


ITコンパイルを有効にするには --jit オプションをコマンドラインまたは$RUBYOPT環境変数を指定します。--jit-verbose=1を指定すれば指定すれば実行中のJITコンパイルの基本的な情報を表示します。

https://www.ruby-lang.org/ja/news/2018/12/25/ruby-2-6-0-released/

Ruby 2.6.0の時点で、OptcarrotというCPU負荷中心のベンチマークにおいてRuby 2.5の約1.7倍の性能向上を達成しました。一方、Railsアプリケーションなどのメモリ負荷の高い環境における性能は現在改善中で、まだ性能向上が期待できる状態には達しておりません。詳細はRuby 2.6 JIT - Progress and Futureをご覧ください。

https://qiita.com/k0kubun/items/e668e272a5817ebe409d


JITコンパイラ is なに？
JITコンパイラは Ruby2.6 からオプションで追加された、Rubyを高速に実行しようとする仕組みです。
JIT(Just-In-Time Compiler)とは、コードがまさに実行されるそのときにコンパイルされる仕組みのことで、RubyだけでなくJavaの実行環境でも取り入れられている仕組みです。
JITコンパイルという用語は、ソフトウェアを構成するモジュールやクラス、関数などの、ある単位のコードがまさに実行されるその時に、コンパイルされることから「Just In Time」の名前が付けられた
wikipediaより　https://ja.wikipedia.org/wiki/%E5%AE%9F%E8%A1%8C%E6%99%82%E3%82%B3%E3%83%B3%E3%83%91%E3%82%A4%E3%83%A9

RubyのJITはMJITという名前がよく出ていますが、しくみを理解する上ではRubyのJITの実装周りの総称として覚えておいて良さそうです。
参考：https://k0kubun.hatenablog.com/entry/ruby26-jit





Rubyはインタープリタ型言語なので、コンパイルして直接機械語に変換されるわけではありません。どうやって実行されているというと、Rubyのコードは字句・構文解析を経てYARVバイトコードというものに変換されます。バイトコードはプログラム言語と機械語との中間にあたるようなコードです。

でもYARVバイトコードはあくまでバイトコードであって機械語ではないので、CPUはこの YARVバイトコード を直接解釈して実行することはできません。
そこで、CPUに変わってYARVバイトコードを解釈し、CPUに命令を発行してくれるのがバーチャルマシン(VM)であるYARVです。

こうしてRubyのコードは、明示的な機械語へのコンパイルを必要とせずに、実行することができます。

MJITを有効にしたRuby2.6
（これらの理解の拠り所として Cコンパイラを利用したRubyのJITコンパイラ を参考にさせていただきました。）

YARVバイトコード が生成されるところまではこれまでと変わりません。
そして、バーチャルマシンであるYARVもこれまで通り登場しますが、JITコンパイラーという役者が増えています。



あるプログラムが実行されたとき、YARV(以下VM) は生成された YARVバイトコードを解釈し、CPUが理解できる命令を発行し、実行してくれます。

ここで、あるメソッドが5回以上呼ばれたとします。そのときVMのスレッドは、JITのキューに、このメソッドを積みます。
JITはVMとは別のスレッドで動いて、積まれたメソッドをYARVバイトコードからCのコードに変換します。
生成されたCのコードはやがて機械語に変換され.soファイルが生成されます。
.soファイルの中身はバイナリコード（=機械語)です。これは動的にVMから呼ばれるようにリンクされます。

なので、もし次のタイミングでVMが処理しようとしているYARVバイトコードの中に、先ほどJITコンパイラが処理したのと同じメソッドがあった場合、
VMはYARVバイトコードを解釈してメソッドを実行するのではなく、機械語にコンパイル済みのメソッド.soファイルを関数ポインタを通じて読み込むことで、より高速に同メソッドを実行することができます。

現状での速さ/ベンチマーク
JITの仕組みによりRubyの高速化が図られたわけですが、いったいどれだけ早くなったのかというデータは検証方法によってバラツキがあるようです。

これはCコードを生成する際の最適化、Cコードから機械語に翻訳する際の最適化など、様々な要素が絡みあっているからのようで、単純に「何倍早くなった！」と言えるわけではないようでした。

また、JITを有効にしてRuby on Railsで作成したWebアプリケーションを実行すると、かえって遅くなるようなデータもrubykaigiでは示されていました。
ただ最新の実験ではJITを有効化しても、無効化時と同程度のスコアが出るようにはなったそうです....ここからが本番。(2019/4 rubykaigi)

（これは筆者の感覚的理解ですが、単純に処理が増えたのだからそれは遅くなっても仕方なさそうだし、プログラムの実行時間が長くなり機械語にコンパイル済みのメソッドが増えれば増えるほど高速化してゆくようなパラダイムでもあるし....納得、という感じです。）

さらに、JIT以外の速度改善についても、「rubyのインタープリタをrubyで書く」といった内容があり、非常に興味のそそるものでした。RubyKaigi 2019: Write a Ruby interpreter in Ruby for Ruby 3

おわりに
rubykaigiを振り返ると自分はいかにRubyを知らなかったのか思い知らされます。日常的にRailsに触っていると、Railsが行ってくれている魔術が当たり前になってしまうことがあったかもしれません。
一方、周りを見渡すと、Railsを使いながらもRubyで内製ツールを作って開発効率を上げている例が多くあることを知り、そういった活動が組織の技術力を作り、またOSSの活動へと広がってゆくことを実感しました。

Rubyというプログラミング言語を通し、技術に向き合うとうことを再確認したrubykaigiの３日間でした。


https://qiita.com/yu_ra/items/0bdef90999949c5d95b0