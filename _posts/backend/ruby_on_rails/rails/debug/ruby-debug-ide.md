## ruby-debug-ide

VSCode에서 ide디버깅이 가능


Visual Studio Codeでruby-debug-ideを使ってデバッグ
会社では開発メンバーそれぞれが好きなエディタを使ってRailsのアプリ開発を行なっています。
以前はAtomを使っていましたが、Atomにプラグインを入れすぎたからか重くなったので ここ１年くらいはVisual Studio Codeを使いデバッグはpryです。

Visual Studio Codeを使っていると右側にDebuggingアイコンが表示されています。
今まであまり気にしていなかったのですが
これ、どうやって使うんだと思い使ってみました。


デバッガーをインストール
ruby-debug-ideとdebaseをインストールします。

必要なGemをGemfileに追加
ruby-debug-ideとdebaseをGemfileに追加します。

  gem "ruby-debug-ide"
  gem "debase"
bundle install
$ bundle install --path vendor/bundle
ruby-debug-ideをインストール
$ gem install ruby-debug-ide
アプリを実行してみる
構成の追加
Visual Studio codeの左側のDebuggingアイコンを選択するとデバッグビューが表示されます。 デバッグビューには変数、ウォッチ式、コールスタック、ブレークポイントがあり、上部のプルダウンメニューに「構成がありません」表示されていま

---

http://kurusaki.hatenablog.com/entry/2018/07/20/035927

[ruby-debug-ide]: https://github.com/ruby-debug/ruby-debug-ide