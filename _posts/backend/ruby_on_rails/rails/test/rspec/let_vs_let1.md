

# let

지연평가
let을 사용하는 행에서 실행


## 장점

## 단점

# let!


## 장점

## 단점

해당행에서 바로실행


letは遅延初期化されるという特性があり、この動きを理解していないと「パスするはずのテストがパスしない」という問題を引き起こす場合があります。

# なぜかパスしないRailsのテストの例
let(:blog) { Blog.create(title: 'RSpec必勝法', content: 'あとで書く') }

it 'ブログの取得ができること' do
  expect(Blog.first).to eq blog
end
上のようなテストはletの代わりにlet!を使うとパスするようになります。
詳しくは以前書いたこちらのQiita記事を参考にしてみてください。



https://qiita.com/clbcl226/items/3db2189f75747b4af2d3