与えられたデータを Base64 エンコードした文字列を返します。 このメソッドは [RFC2045] に対応しています。 エンコード後の文字で 60 文字ごとに改行を追加します。

module function Base64.#encode64 (Ruby 2.5.0)

ということでRFC2045の仕様に基づいて60文字ごとに改行が入る



sample.rbとして以下のようなコードを書いて…

require 'base64'

str = "あいうえおかきくけこさしすせそたちつてと"
p Base64.encode64(str)
実行すると

$ ruby sample.rb 
"44GC44GE44GG44GI44GK44GL44GN44GP44GR44GT44GV44GX44GZ44Gb44Gd\n44Gf44Gh44Gk44Gm44Go\n"







---------


なお、入ってほしくない場合は Base64.strict_encode64() を利用すると良い。

例としてsample2.rbとして以下のようなコードを書いて…

require 'base64'

str = "あいうえおかきくけこさしすせそたちつてと"
p Base64.strict_encode64(str)
実行すると

$ ruby sample2.rb 
"44GC44GE44GG44GI44GK44GL44GN44GP44GR44GT44GV44GX44GZ44Gb44Gd44Gf44Gh44Gk44Gm44Go"

改行コードが消えた

https://shinkufencer.hateblo.jp/entry/2018/09/03/220440
