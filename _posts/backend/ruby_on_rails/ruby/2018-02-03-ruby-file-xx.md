File.expand_path('相対パス', **FILE**)

以下のように使う
こうすれば、プロセスのカレントワーキングディレクトリがどこであっても、相対的な位置関係を参照できる

# このソースファイルと同ディレクトリにある b.rb を require

require File.expand_path('../b', **FILE**)

# このソースファイルと同ディレクトリにある lib ディレクトリを require のロードパスに追加

\$: << File.expand_path('../lib', **FILE**)

3 回調べたらブログに書きましょうシリーズ。Ruby でファイルの親ディレクトリを取得したい。やり方はいろいろあるけど、下記の書き方が一番しっくりきた。

File.expand_path('..', **dir**)
**dir** が使えない環境（**dir** が使えるのは Ruby 2.0 から）では

File.expand_path('..', File.dirname(**FILE**))

## `File.dirname(_FILE_)`

ruby2.0이후부터는

## `__dir__`

Reference Link:

```
https://blog.inouetakuya.info/entry/2016/07/31/200600
http://maeharin.hatenablog.com/entry/20130104/p1
```
