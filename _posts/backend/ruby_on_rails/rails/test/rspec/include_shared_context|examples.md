include_context と include_examples はエイリアスの関係。動作は変わらない。
include_(context|examples) は、現在のコンテキストに直接テストケースを埋め込む。


include_context の動作
include_context は、 現在のコンテキストに直接テストケースを埋め込みます。

……え、意味が分からない？ 大丈夫、私もドキュメントの "include the examples in the current context" という解説を初めて見たときは理解できませんでした。

言葉では説明しづらいので、コードで説明します。

例えば、以下のようにコードを記述したとき

# 共有したい example を定義
shared_examples 'test1' do
  it 'something が 1 であること' do
    expect(something).to eq 1
  end
end

# テストを記述
describe 'hoge' do
  let(:something) { 1 }

  include_context 'test1'
end


つまり、 include_examples の動作は include_context と全く同じです。
どうして同じ機能が別々の名前で用意されているのかというと、 rspec は自然言語(人間が普段つかう言葉)に近い文章でテストが書けることを目指して作られているからです。
「人間が読んだ時に、より理解しやすい方を選んでね」って意図で、複数の名前が定義されているんですね。
rspec は他にも、違う名前で同じ振る舞いをするものが沢山あります。



include_(context|examples) の罠
一見、直接埋め込もうが、自動でコンテキストを挿入しようが、たいした違いはなさそうに思えます。
しかし、実は include_(context|examples) には、「定義の上書き」と呼ばれる(というか僕が勝手にそう呼んでいる)罠があるのです。

以下のようなテストコードを考えてみましょう。

shared_examples 'test1' do
  let(:something) { 1 }

  it 'something が 1 であること' do
    expect(something).to eq 1
  end
end

shared_examples 'test2' do
  let(:something) { 2 }

  it 'something が 2 であること' do
    expect(something).to eq 2
  end
end

describe 'hoge' do
  include_context 'test1'
  include_context 'test2'
end
上記のテストは、実行時には以下のように解釈されます。

describe 'hoge' do
  let(:something) { 1 }

  it 'something が 1 であること' do
    expect(something).to eq 1
  end

  let(:something) { 2 }

  it 'something が 2 であること' do
    expect(something).to eq 2
  end
end
同じコンテキストに２つの let が埋め込まれることで、片方の定義が上書きされてしまい、「something が 1 であること」のテストが失敗します。
include_(context|example) をメソッド感覚で使うと、上記のようなミスを犯してしまいがちです。


"include_context と include_examples はエイリアスの関係" と書きましたが、実は alias include_context include_examples のように、はっきりエイリアス定義されているわけではないです。
ただ、例外時のメッセージ以外は全く同じ挙動をするよう実装されているので、実質、エイリアスと考えて問題ありません。
(2020-01-21 時点)
https://github.com/rspec/rspec-core/blob/master/lib/rspec/core/example_group.rb



# 역할 분담.. ㅋ

기능은 똑같은데 파라메터 넘기냐 안넘기냐에 따라 이름을 달리 가지는것도 괜찮은 어프로치


複数のテストで使えるよう検証ロジックを独立
上記では nil と空文字それぞれについて別々の context で検証していますが、異なるのは let(:title) の値だけで、それ以外は期待する入力も結果も全く同じです。

そこで、この context を共用できるようにまとめます。
まとめる方法はいくつかありますが shared_context は引数を取ることができますので、以下の2通りを考えます。
（ちなみに shared_context だけでなく shared_examples も引数を取ることができます）

引数から値を得る shared_context
引数がなく let で値を得る shared_examples
https://qiita.com/outerlet/items/27520b9916daab7eae1a




https://qiita.com/shinoharat/items/0a481bc33d9a5e81012e



난중에 한번읽어보자 스택오버플로우

rspec shared examples vs shared context
https://stackoverflow.com/questions/21117123/rspec-shared-examples-vs-shared-context