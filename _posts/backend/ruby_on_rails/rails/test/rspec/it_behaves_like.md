it_behaves_like は、新しいコンテキストを自動生成して、そこにテストケースを埋め込む。
基本的に it_behaves_like を使った方が良い。

it_behaves_like の動作
it_behaves_like は、 新しいコンテキストを自動生成して、そこにテストケースを埋め込みます。

これもコードで見た方が分かりやすいです。
以下のようにコードを記述すると、

# 共有したい example を定義
shared_examples 'test1' do
  it 'something が 1 であること' do
    expect(something).to eq 1
  end
end

# テストを記述
describe 'hoge' do
  let(:something) { 1 }

  it_behaves_like 'test1'
end
実行時には以下のように解釈されます。

describe 'hoge' do
  let(:something) { 1 }

  # it_behaves_like 'test1' の部分に、自動で新しい context が生成される
  context 'behaves like a test1' do
    it 'something が 1 であること' do
      expect(something).to eq 1
    end
  end
end


一方、 it_behaves_like ならば、

describe 'hoge' do
  context 'behaves like a test1' do
    let(:something) { 1 }

    it 'something が 1 であること' do
      expect(something).to eq 1
    end
  end

  context 'behaves like a test2' do
    let(:something) { 2 }

    it 'something が 2 であること' do
      expect(something).to eq 2
    end
  end
end
のように context が分離されるため、安全です。