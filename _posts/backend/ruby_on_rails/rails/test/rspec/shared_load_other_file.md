오오오 이런걸 원했지

修正した検証ロジックをテストとは別のファイルに切り出す
ここまでで定義した shared_context や shared_examples はファイルをまたがって使い回すことはできません。そこでこれを別ファイルに切り出します。
rails_helper.rb にある下記の行を有効にしておいてください。

Dir[Rails.root.join('spec', 'support', '**', '*.rb')].each { |f| require f }
切り出す先のファイルを作成 ここでは Rails.root/spec/support/shared_contexts3.rb というファイルに切り出すことにします。
shared_context をコピーして以下のように修正 shared_context を RSpec.shared_context とします。切り出した箇所は元のファイルから削除しておいてください。
  RSpec.shared_context :presence_validation do |type, expected|
    let(:actual) { build(factory, attribute => value) }

    context (type == :nil ? 'nil' : 'empty') do
      let(:value) { type == :nil ? nil : '' }
      it { expect(actual).to (expected ? be_valid : be_invalid) }
    end
  end
切り出したファイルを元のファイルから読み込む
共用する shared_context があるファイルを require して完了です。
切り出した元のファイルだけでなく、別のファイルからでも同じように require すれば検証内容がそのまま使えます。

require 'support/shared_contexts3'

https://qiita.com/outerlet/items/27520b9916daab7eae1a