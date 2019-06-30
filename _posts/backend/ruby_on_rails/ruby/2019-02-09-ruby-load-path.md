---
layout: post
title: "ruby LOAD_PATH"
author: negabaro kim
categories: ruby
tags: ruby
---

## \$: << File.dirname(**FILE**)란?

```
$: << File.dirname(__FILE__)
```

## ruby -l

ruby に-l オプションを指定すればいいだけですよ。
-l オプションは、$LOAD_PATH($:)にディレクトリを追加する
オプションです。

## \$LOAD_PATH << File.dirname(File.expand_path(**FILE**))

$LOAD_PATH のオブジェクトは Array とほぼ同じメソッドを持っています。 
スクリプト内でパスを追加したい場合には << などのメソッドで $LOAD_PATH に追加します。

例えば、スクリプトファイルがあるディレクトリーをパスに追加する場合は次のようになります

## unshift

Ruby がライブラリを検索する順位は \$LOAD_PATH の先頭から順番です。
なので、追加するパスを最優先にしたい場合は unshift で先頭に追加してください。

例)

\$LOAD_PATH.unshift File.dirname((File.expand_path(**FILE**))

```
puts  $LOAD_PATH.class
puts  $LOAD_PATH
p $LOAD_PATH
p $:
```

```
Array
/usr/local/Cellar/rbenv/1.1.1/rbenv.d/exec/gem-rehash
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/gems/2.6.0/gems/did_you_mean-1.3.0/lib
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/site_ruby/2.6.0
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/site_ruby/2.6.0/x86_64-darwin18
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/site_ruby
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/vendor_ruby/2.6.0
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/vendor_ruby/2.6.0/x86_64-darwin18
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/vendor_ruby
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/2.6.0
/Users/sehwakim/.rbenv/versions/2.6.0/lib/ruby/2.6.0/x86_64-darwin18
```

Ruby で Active Support の自動 require を使う
Rails の Active Support がやってくれる自動 require を、Ruby スクリプト内で実行する方法がかなり便利そうだったので共有！

require 'active_support/dependencies'
ActiveSupport::Dependencies.autoload_paths << "/path/to/my_library"
これで、/パス/to/my_library 次にあるファイルを自動で Require してくれるそうです。

Reference Link:

```
https://teratail.com/questions/978
https://altarf.net/computer/ruby/509
https://morizyun.github.io/blog/ruby-require-active_support-load/index.html
```
