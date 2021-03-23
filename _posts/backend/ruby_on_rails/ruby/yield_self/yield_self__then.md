yield_self  존나 가독성안좋은 이름이라고 then으로 바뀜


開発
 2018.02.08
# Ruby 2.5の`yield_self`が想像以上に何だかスゴい件について（翻訳）


英語記事: yield_self is more awesome than you could think
原文公開日: 2018/01/24
著者: Victor Shepelev（zverok）
Ruby 2.5のyield_selfが想像以上に何だかスゴい件について（翻訳）
…メソッド名はやっぱり最低だけど

既にご存じかと思いますが、Ruby 2.5でKernel#yield_selfメソッドが導入され、あらゆるオブジェクトで利用できるようになりました。第一印象では、その名のとおり適用対象のオブジェクトをyieldしてその結果を返すだけの、特にどうということもないメソッドかと思いました。

1.yield_self { |i| i + 2 } # => 3
しかし見た目の（馬鹿馬鹿しいほどの）シンプルさにもかかわらず、このメソッドは値の処理をすっきりとチェインできるという素晴らしい機能を与えてくれるのです。

# 変更前
url = construct_url
response = Faraday.get(url)
data = JSON.parse(response.body)
id = data.dig('object', 'id') || '<undefined>'
return "server:#{id}"
# 以下は短い代わりに可読性が下がる
return "server:" +
  (JSON.parse(Faraday.get(construct_url)).dig('object', 'id') || '<undefined>')

# 変更後
construct_url
  .yield_self { |url| Faraday.get(url) }
  .yield_self { |response| JSON.parse(response) }
  .dig('object', 'id').yield_self { |id| id || '<undefined>' }
  .yield_self { |id| "server:#{id}" }

# method()も併用した場合
construct_url
  .yield_self(&Faraday.method(:get))
  .body
  .yield_self(&JSON.method(:parse))
  .dig('object', 'id').yield_self { |id| id || '<undefined>' }
  .yield_self { |id| "server:#{id}" }
最後の例には「あいまいだ」「初心者にとって読みづらい」といった意見が常に寄せられますが、ほとんどの人にとってはかなりRubyらしい書き方であり、これと同様のコレクションの扱い（mapやselectやrejectなどのブロック処理のチェイン）で培われた習慣や直感とうまく調和します。

メモ: このyield_selfメソッドよりも、Elixirっぽいパイプ演算子|>の方がいいという人を非常に多く見かけました。パイプ演算子の場合、既存の構文やエコシステムとうまく調和できません。このことは既に次の簡単な例からもわかります。「パイプ演算子の後ろに何かをチェインする場合はbody |> JSON.method(:parse).dig(...)と書くべきか」「それとも(body |> JSON.method(:parse)).dig(...)か」「後者の場合、囲みはどこから始めるべきか」といった具合です。

もひとつメモ: method(:メソッド名)という記法は便利ですしRubyの慣習にも沿っていますが、私たちのほとんどにとっては明らかに長ったらしく思えます。#13581では、どんなショートハンド構文がよいかについてRuby-coreによる議論が今も続いています。

ここまでは別に目新しい話ではありません

しかしyield_selfがRubyのエコシステムと調和すべく設計されたという事実から、なかなか興味深い結果が生じています。これを追ってみることにしましょう。

またまたメモ: あなたの考え方次第では、以下にご紹介するコード例に大賛成するか毛嫌いするかのどちらかになるかもしれません。私は「こう書け」と言いたいのではなく、これらの例がいずれもちゃんと動作することと外見上はロジカルであるという事実と、時にそれが私のハートを心地よく揺さぶっていることをお伝えしたいのです。

まずは簡単な例から。

"Ruby".yield_self # => #<Enumerator: "Ruby":yield_self>
やはり面白い挙動です。これでどんなことができるでしょうか。

"Ruby".yield_self.to_a # => ["Ruby"]
まあ予想どおりの挙動です。これがメソッドを3〜5個ほどチェインしたときの末尾だとしましょう。（後でarrayだけを使うメソッドで処理したいなどの理由で）最終的に必要なのがarrayであれば、おそらくこれは一番すっきり書ける変換方法でしょう。

しかしこれでおしまいではありません。ここまでは単なるウォーミングアップです。

その後の処理で(id, human title)のような値のペアが必要になるが、この特定のメソッドがidだけをフェッチするとします。そしてこの状況で[id, id]を返して欲しいとします。

# 普通の書き方
id = really.long.chain.of.processing
[id, id]

# 凶悪な書き方
"Ruby".yield_self.cycle.take(2)
# => ["Ruby", "Ruby"]
あるいは、何らかのページパーサーでページのパラグラフを取り出して、最終的に[page_title, paragraph]の形のペアにしたいとしましょう。

# 普通の書き方
paragraphs.map { |para| [page_title, para] }

# 凶悪な書き方
%w[2.2 2.3 2.4].zip('Ruby'.yield_self.cycle).map(&:reverse)
# => [["Ruby", "2.2"], ["Ruby", "2.3"], ["Ruby", "2.4"]]
なお、この程度の凶悪さでは物足りない方は、次の例を実行して動作の仕組みをじっくり理解してみると面白いと思います。

def fmt((software, version))
  puts "#{software}, v#{version}"
end
%w[2.2 2.3 2.4].zip('Ruby'.yield_self.cycle).map(&:reverse).each(&method(:fmt))
次の例では、Enumerator::Lazyで処理を遅延します。

require 'open-uri'
postponed = 'http://ruby-lang.org'
  .yield_self.lazy.map((&method(:open)).map(&method(:read)).map(&:length))
# => #<Enumerator::Lazy: #<Enumerator::Lazy: #<Enumerator::Lazy: #<Enumerator::Lazy: #<Enumerator: "http://ruby-lang.org":yield_self>>:map>:map>:map>
# まだ何も実行されない

postponed.first
# => 1002
しかし私の思いつく限りで最も便利そうな例は「誤った結果をnil化する」場合（サーバーエラー時にnilを返すなど）です。nilは有害だという反論があることは承知していますので、そうお思いの方は試さないことです。

# 変更前
def fetch_something(url)
  response = Faraday.get(url)
  response.success? ? response.body : nil
end

# 変更後
def fetch_something(url)
  Faraday.get(url).yield_self.detect(&:success?)&.body
end
もう少し複雑な例です。

# 変更前
response = Faraday.get(url)
return nil unless response.success?
data = JSON.parse(response.body)
...

# 変更後
Faraday.get(url)
  .yield_self.select(&:success?)
  .map(&JSON.method(:parse)) # まるでいにしえの関数型「map」のようだ

# 変更前
value.match(DATE_PATTERN) ? Date.parse(value) : nil
# 変更後
value.yield_self.grep(DATE_PATTERN).map(&Date.method(:parse)).first


https://techracho.bpsinc.jp/hachi8833/2018_02_08/51680
