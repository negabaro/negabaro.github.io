
specファイルが書かれていないクラスはカバレッジ計測されません
（他のテストケースを実行したときに呼ばれれば計測される）
全テスト対象クラスを最初から用意しておくことを激しくお勧めします
テスト結果が正しくないまま「カバレッジが高いぞ！」ってはしゃぐことになります

https://qiita.com/hiroky_814/items/2881f8459ce401dcd6ed

spec/spec_helper.rb

require 'simplecov'
SimpleCov.start

これで準備は完了

使い方
rspecでテストを実行する。

$ bundle exec rspec spec/
するとプロジェクトフォルダ直下に「coverage」というフォルダが作成される。


coverageフォルダ配下の「index.html」をブラウザで開く。
f:id:maetoo11:20160411194648p:plain

するとファイルごとのカバレッジ一覧が表示される。

f:id:maetoo11:20160411195350p:plain

ファイル名をクリックすれば、行単位で通った・通っていないが確認できる。

f:id:maetoo11:20160411195827p:plain

I'd recommend SimpleCov for this.

Here's a nice starting configuration for it to put in your spec_helper.rb:

SimpleCov.start do
  add_filter '/test/'
  add_filter '/config/'
  add_filter '/vendor/'

  add_group 'Controllers', 'app/controllers'
  add_group 'Models', 'app/models'
  add_group 'Helpers', 'app/helpers'
  add_group 'Mailers', 'app/mailers'
end
# This outputs the report to your public folder
# You will want to add this to .gitignore
SimpleCov.coverage_dir 'public/coverage'

https://stackoverflow.com/questions/22893907/how-to-check-rspec-code-coverage